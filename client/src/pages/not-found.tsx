import { Link } from "wouter";
import { FloatingHearts } from "@/components/FloatingHearts";
import { HeartCrack } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 text-center p-4">
      <FloatingHearts />
      <div className="glass-card p-12 rounded-3xl">
        <HeartCrack className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for seems to have broken up with us.</p>
        
        <Link href="/">
          <button className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
