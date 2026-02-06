import { useRoute } from "wouter";
import { useProposal } from "@/hooks/use-proposals";
import { Header } from "@/components/Header";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Copy, Check, MessageCircle, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Success() {
  const [, params] = useRoute("/success/:id");
  const id = params?.id || "";
  const { data: proposal, isLoading } = useProposal(id);
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4 bg-rose-50">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Proposal not found</h1>
          <p className="text-gray-500">This link might be invalid or expired.</p>
        </div>
      </div>
    );
  }

  const proposalUrl = `${window.location.origin}/proposal/${id}`;
  const whatsappText = encodeURIComponent(`Hi ${proposal.partnerName}! I have a special question for you... Open this link: ${proposalUrl}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(proposalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <FloatingHearts />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 z-10 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-xl w-full"
        >
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-primary to-pink-600 p-8 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/50">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">It's Ready! 🎉</h1>
              <p className="text-pink-100">Your proposal link has been generated.</p>
            </div>

            <div className="p-8 space-y-8">
              {/* Link Copy Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Share this link</label>
                <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl shadow-inner">
                  <input 
                    readOnly 
                    value={proposalUrl} 
                    className="flex-1 bg-transparent px-2 py-1 text-gray-700 outline-none font-mono text-sm"
                  />
                  <button 
                    onClick={handleCopy}
                    className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={`https://wa.me/?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> Share on WhatsApp
                </a>
                
                <a 
                  href={proposalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <ExternalLink className="w-5 h-5" /> Open Link
                </a>
              </div>

              {/* QR Code */}
              <div className="border-t border-gray-100 pt-8 text-center space-y-4">
                <p className="text-sm font-medium text-gray-500">Or let them scan this code</p>
                <div className="inline-block p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(proposalUrl)}`} 
                    alt="QR Code" 
                    className="w-40 h-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
