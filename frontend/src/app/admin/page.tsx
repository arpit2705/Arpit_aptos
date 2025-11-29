"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS, MODULE_NAME } from "@/constants";
import { aptosClient } from "@/lib/aptosClient";

// Define Issue type matching the Move struct
type Issue = {
  id: string;
  reporter: string;
  category: string;
  description: string;
  location: string;
  image_url: string;
  status: number; // 0: Pending, 1: Resolved, 2: Rejected
  timestamp: string;
};

export default function AdminPage() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      const payload = {
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_all_issues`,
        type_arguments: [],
        arguments: [],
      };
      const response = await aptosClient.view(payload);
      const allIssues = response[0] as any[];

      const pendingIssues = allIssues.map((issue: any) => ({
        id: issue.id,
        reporter: issue.reporter,
        category: issue.category,
        description: issue.description,
        location: issue.location,
        image_url: issue.image_url,
        status: issue.status,
        timestamp: new Date(parseInt(issue.timestamp) * 1000).toLocaleString(),
      })).filter((issue) => issue.status === 0);

      setIssues(pendingIssues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openRewardModal = (issue: Issue) => {
    if (!account) {
      alert("Please connect admin wallet");
      return;
    }
    // Basic check: ensure connected wallet is the admin (module deployer)
    // Note: In a real app, you might want a more robust check or a specific admin list.
    // Here we assume the module deployer is the admin.
    if (account.address !== MODULE_ADDRESS) {
      // We'll allow it for now but warn, or you can block it.
      // alert("You are not the admin!"); 
      // For hackathon/demo, maybe just a warning or check logic.
      console.warn("Connected wallet is not the module deployer.");
    }

    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const confirmResolve = async () => {
    if (!selectedIssue || !account) return;

    try {
      const payload: any = {
        data: {
          function: `${MODULE_ADDRESS}::${MODULE_NAME}::resolve_issue`,
          typeArguments: [],
          functionArguments: [
            selectedIssue.id,
            "10", // Award 10 points
          ],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction(response.hash);

      setIsModalOpen(false);
      setSelectedIssue(null);
      alert("Issue resolved! CrowdPoints sent to reporter. Tx: " + response.hash);

      fetchIssues();
    } catch (error) {
      console.error("Error resolving issue:", error);
      alert("Failed to resolve issue. Ensure you are the admin.");
    }
  };

  return (
    <div className="space-y-8 py-8 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Government Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage and approve community reports</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <span className="text-slate-500 font-medium">Pending Issues</span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">{issues.length}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading issues from blockchain...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-xl overflow-hidden relative shadow-inner">
                <img
                  src={issue.image_url}
                  alt={issue.category}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-slate-900">{issue.category}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-500 border border-slate-200">ID: {issue.id}</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      {issue.location}
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      {issue.timestamp}
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 text-lg leading-relaxed">{issue.description}</p>

                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 w-fit">
                  <span className="font-semibold text-slate-700">Reporter:</span>
                  <span className="font-mono">{issue.reporter.slice(0, 6)}...{issue.reporter.slice(-4)}</span>
                </div>

                <div className="pt-2 flex gap-4">
                  <button
                    onClick={() => openRewardModal(issue)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
                  >
                    <Check className="w-5 h-5" />
                    Approve & Reward (10 CP)
                  </button>
                  <button className="flex-1 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {issues.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">All Caught Up!</h3>
              <p className="text-slate-500">No pending issues to review at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Confirm Reward</h3>
              <p className="text-slate-600">
                You are about to approve this issue and send <span className="font-bold text-emerald-600">10 CrowdPoints</span> to the reporter.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Issue ID:</span>
                  <span className="font-mono font-medium">{selectedIssue.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reporter:</span>
                  <span className="font-mono font-medium">{selectedIssue.reporter.slice(0, 6)}...{selectedIssue.reporter.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reward:</span>
                  <span className="font-bold text-emerald-600">10 CP</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResolve}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                >
                  Confirm & Sign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
