module crowdfix::crowdfix_core {
    use std::string::{String};
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::account;

    /// Errors
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ISSUE_NOT_FOUND: u64 = 2;
    const E_NOT_AUTHORIZED: u64 = 3;

    /// Issue Status
    const STATUS_PENDING: u8 = 0;
    const STATUS_RESOLVED: u8 = 1;
    const STATUS_REJECTED: u8 = 2;

    struct Issue has store, drop, copy {
        id: u64,
        reporter: address,
        category: String,
        description: String,
        location: String,
        image_url: String,
        status: u8,
        timestamp: u64,
    }

    struct UserProfile has key {
        total_issues: u64,
        resolved_issues: u64,
        crowd_points: u64,
        current_streak: u64,
        last_report_day: u64, // Days since epoch
    }

    struct State has key {
        issue_counter: u64,
        issues: vector<Issue>, // Using vector for simplicity in MVP, Table for prod
        admin: address,
    }

    struct IssueReportedEvent has drop, store {
        id: u64,
        reporter: address,
        category: String,
    }

    struct IssueResolvedEvent has drop, store {
        id: u64,
        resolver: address,
        reporter: address,
        points_awarded: u64,
    }

    fun init_module(account: &signer) {
        let admin_addr = signer::address_of(account);
        move_to(account, State {
            issue_counter: 0,
            issues: vector::empty(),
            admin: admin_addr,
        });
    }

    public entry fun report_issue(
        reporter: &signer,
        category: String,
        description: String,
        location: String,
        image_url: String
    ) acquires State, UserProfile {
        let reporter_addr = signer::address_of(reporter);
        let state = borrow_global_mut<State>(@crowdfix);

        let issue_id = state.issue_counter + 1;
        state.issue_counter = issue_id;

        let new_issue = Issue {
            id: issue_id,
            reporter: reporter_addr,
            category,
            description,
            location,
            image_url,
            status: STATUS_PENDING,
            timestamp: timestamp::now_seconds(),
        };

        vector::push_back(&mut state.issues, new_issue);

        // Update User Profile & Streak
        if (!exists<UserProfile>(reporter_addr)) {
            move_to(reporter, UserProfile {
                total_issues: 0,
                resolved_issues: 0,
                crowd_points: 0,
                current_streak: 0,
                last_report_day: 0,
            });
        };

        let profile = borrow_global_mut<UserProfile>(reporter_addr);
        profile.total_issues = profile.total_issues + 1;
        
        // Simple streak logic: check if last report was yesterday (approx)
        let current_day = timestamp::now_seconds() / 86400;
        if (profile.last_report_day == current_day - 1) {
            profile.current_streak = profile.current_streak + 1;
        } else if (profile.last_report_day < current_day - 1) {
            profile.current_streak = 1;
        } else if (profile.last_report_day == 0) {
             profile.current_streak = 1;
        };
        profile.last_report_day = current_day;
    }

    public entry fun resolve_issue(
        admin: &signer,
        issue_id: u64,
        points: u64
    ) acquires State, UserProfile {
        let state = borrow_global_mut<State>(@crowdfix);
        assert!(signer::address_of(admin) == state.admin, E_NOT_AUTHORIZED);

        // Find issue (Linear search for MVP vector)
        let issues_len = vector::length(&state.issues);
        let i = 0;
        let found = false;
        while (i < issues_len) {
            let issue = vector::borrow_mut(&mut state.issues, i);
            if (issue.id == issue_id) {
                issue.status = STATUS_RESOLVED;
                found = true;
                
                // Award points
                if (exists<UserProfile>(issue.reporter)) {
                    let profile = borrow_global_mut<UserProfile>(issue.reporter);
                    profile.resolved_issues = profile.resolved_issues + 1;
                    profile.crowd_points = profile.crowd_points + points;
                };
                break
            };
            i = i + 1;
        };
        assert!(found, E_ISSUE_NOT_FOUND);
    }
    
    #[view]
    public fun get_issue(issue_id: u64): Issue acquires State {
        let state = borrow_global<State>(@crowdfix);
        let issues_len = vector::length(&state.issues);
        let i = 0;
        while (i < issues_len) {
            let issue = vector::borrow(&state.issues, i);
            if (issue.id == issue_id) {
                return *issue
            };
            i = i + 1;
        };
        abort E_ISSUE_NOT_FOUND
    }

    #[view]
    public fun get_all_issues(): vector<Issue> acquires State {
        let state = borrow_global<State>(@crowdfix);
        state.issues
    }
    
    #[view]
    public fun get_user_profile(user: address): (u64, u64, u64, u64) acquires UserProfile {
        if (!exists<UserProfile>(user)) {
            return (0, 0, 0, 0)
        };
        let profile = borrow_global<UserProfile>(user);
        (profile.total_issues, profile.resolved_issues, profile.crowd_points, profile.current_streak)
    }
}
