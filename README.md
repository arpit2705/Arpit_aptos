Crowdfix – Decentralized Civic Reporting & Accountability Platform

Crowdfix is a Web3-enabled civic engagement platform that empowers citizens to report real-world issues and promotes government accountability through verification workflows, gamification, and blockchain-based rewards.

🌐 Overview
Purpose

Crowdfix allows citizens to:

Report civic issues (roads, water, electricity, waste, etc.)

Track government action in real time

Earn rewards, badges, and leaderboard rankings

File escalations when issues are ignored

Improve transparency and accountability

Architecture

React Single Page Application (SPA)

Role-based access & auth

Blockchain reward system on Aptos

Gamification layer with streaks, badges, and points

Mock data backend (extendable to Firebase)

⭐ Core Highlights

Real-time issue feed

Government verification dashboard

Verified-impact leaderboard

Daily streak system

Badges and achievements

Escalation and complaint module

Blockchain reward contract (Aptos Move)

🛠 Technology Stack
Frontend

React (Hooks)

JavaScript (ES6+)

Styling

Tailwind CSS

Fully responsive dark-blue themed UI

Blockchain

Aptos (Move smart contract)

Reward vault

Secure token distribution

Gamification Engine

Photon (Mocked)

Streaks

Points

Achievements

Authentication

Email-based login

Extendable to wallet authentication

Role-based access (Citizen vs Government)

Data Layer

Mock JSON data

Structure ready for Firebase or custom backend

🚀 Getting Started
Prerequisites

Before you begin, ensure you have:

Node.js v14 or above

npm or yarn

Git

Setup
# Clone repository
git clone <YOUR_REPOSITORY_URL>
cd crowdfix

# Install dependencies
npm install

# Start development server
npm start


Local development server:
👉 http://localhost:3000

🔐 User Roles & Authorization
Citizen (Normal User)

Can post civic issues

Earns points, streaks, and badges

Appears in leaderboard

Can file escalations and complaints

Can view profile & gamification stats

Cannot access Government Dashboard

Government (Admin User)

Can verify reported issues

Can mark issues as fixed

Can view escalations & complaints

Can access only the Government Dashboard

Cannot post issues

Cannot view profile, badges, or gamification stats

Government Email Restriction

Only the following emails get admin access:

admin@gov.in

official@crowdfix.gov

📌 Key Features
1. Civic Issue Reporting

Citizens submit issues with description, category, and image

Issues appear instantly in the public feed

2. Government Verification

Admins can:

Verify issues

Reject issues

Mark them as “Fixed”

Trigger rewards for citizens

3. Impact-Based Leaderboard

Only verified & fixed issues count

Highlights top citizens

Shows user’s personal rank

4. Daily Streak System

Streak increases on daily activity

Streak resets if a day is missed

Visible prominently in the UI

5. Badges & Achievements

Citizen earns badges like:

First Step (first issue reported)

Civic Hero (5 issues reported)

Streak Master (3-day streak)

Problem Solver (1 verified issue)

Wealthy Citizen (50+ points)

Locked badges appear greyed out.

6. Coin Reward System

Posting → small reward

Government verification → large reward

Fix confirmation → bonus reward

Will connect with Aptos wallet in full Web3 mode

7. Escalation & Complaint System

If an issue stays pending too long

Citizen can escalate the issue

Escalated issues get red/high priority

Government dashboard sorts by complaint count

🧭 Navigation Logic
Citizen Screens

Feed

Report Issue

Profile

Leaderboard

❌ No Government Dashboard

Government Screens

Feed (public)

Leaderboard

Government Dashboard

❌ No reporting, ❌ No profile

🔗 Planned Blockchain Integration (Aptos)

A Move smart contract will:

Store reward funds

Allow admin-only reward distribution

Handle secure token transfers

Prevent unauthorized payouts

📦 Data Export (Future Feature)

Admins will be able to export:

Verified issue datasets

Escalation logs

Citizen-impact reports

CSV/Excel formats

📄 License

(Add MIT / Apache 2.0 / GPL License here)

🤝 Contributing

Contributions welcome!

# Fork repo
# Create new branch
git checkout -b feature-name

# Commit changes
git commit -m "Add feature"

# Push
git push origin feature-name


Open a Pull Request 🚀

📬 Contact

For support or feature requests:

Open a GitHub Issue

Contact the project maintainer
