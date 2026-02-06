import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { insertProposalSchema, type InsertProposal } from "@shared/schema";
import { useCreateProposal } from "@/hooks/use-proposals";
import { Header } from "@/components/Header";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Loader2, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CreateProposal() {
  const [, setLocation] = useLocation();
  const { mutate, isPending } = useCreateProposal();
  const [previewName, setPreviewName] = useState("");

  const form = useForm<InsertProposal>({
    resolver: zodResolver(insertProposalSchema),
    defaultValues: {
      customMessage: "From the moment I met you, I knew you were special. Thank you for saying yes to being my Valentine. I promise to make this Valentine's Week 2026 unforgettable!",
    },
  });

  const onSubmit = (data: InsertProposal) => {
    mutate(data, {
      onSuccess: (proposal) => {
        setLocation(`/success/${proposal.id}`);
      },
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <FloatingHearts />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 md:p-8 rounded-3xl"
          >
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-2">Create Proposal</h1>
              <p className="text-gray-600">Fill in the details to generate your special link.</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Your Name</label>
                    <input
                      {...form.register("yourName")}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400"
                      placeholder="e.g. Romeo"
                    />
                    {form.formState.errors.yourName && (
                      <p className="text-red-500 text-sm ml-1">{form.formState.errors.yourName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Partner's Name</label>
                    <input
                      {...form.register("partnerName")}
                      onChange={(e) => {
                        form.register("partnerName").onChange(e);
                        setPreviewName(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400"
                      placeholder="e.g. Juliet"
                    />
                    {form.formState.errors.partnerName && (
                      <p className="text-red-500 text-sm ml-1">{form.formState.errors.partnerName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Your WhatsApp Number</label>
                  <input
                    {...form.register("phoneNumber")}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400"
                    placeholder="e.g. 919876543210 (Only digits)"
                  />
                  <p className="text-xs text-gray-500 ml-1">We'll use this to notify you when they say yes!</p>
                  {form.formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm ml-1">{form.formState.errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Message after they say Yes</label>
                  <textarea
                    {...form.register("customMessage")}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all min-h-[120px] resize-y placeholder:text-gray-400"
                    placeholder="Write something sweet..."
                  />
                  {form.formState.errors.customMessage && (
                    <p className="text-red-500 text-sm ml-1">{form.formState.errors.customMessage.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" /> Creating...
                    </>
                  ) : (
                    <>
                      Create Magic Link <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block relative"
          >
            <div className="sticky top-24">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-[2.5rem] blur opacity-30"></div>
              <div className="relative bg-black rounded-[2rem] border-[8px] border-gray-900 overflow-hidden shadow-2xl aspect-[9/19] max-h-[800px] w-full max-w-sm mx-auto">
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center">
                  <div className="w-32 h-4 bg-black rounded-b-xl"></div>
                </div>

                {/* Phone Screen Content */}
                <div className="h-full w-full bg-rose-50 overflow-hidden flex flex-col items-center justify-center p-6 text-center relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  
                  <div className="z-10 space-y-6">
                    <h2 className="text-3xl font-display font-bold text-pink-600">
                      Hey {previewName || "..."}! 💕
                    </h2>
                    
                    <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg bg-white">
                      <img 
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3lvMDF4OG1uy3pxdmdmbZ1kY2V6aWZ2b3p4bnl5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26FLdmIp6wJr91JAI/giphy.gif" 
                        alt="Cute bear" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800">
                      Will You Be My Valentine?
                    </h3>

                    <div className="flex flex-col gap-3 w-full px-4">
                      <div className="bg-primary text-white py-3 rounded-xl font-bold shadow-md">
                        YES, I WILL! 💖
                      </div>
                      <div className="bg-gray-200 text-gray-500 py-3 rounded-xl font-bold text-sm">
                        No 😢
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-12 bottom-20 bg-white p-4 rounded-xl shadow-lg transform rotate-6 max-w-[200px]">
                <p className="font-handwriting text-gray-600 text-sm">
                  👆 This is how it will look on their phone!
                </p>
                <div className="absolute -left-2 bottom-6 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
