import { Link } from "wouter";
import { Heart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="relative">
            <Heart className="w-8 h-8 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <span className="font-display font-bold text-xl md:text-2xl text-gradient">
            Valentine's Pro
          </span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/create">
            <button className="hidden sm:inline-flex px-4 py-2 rounded-full bg-white border border-pink-200 text-pink-600 font-semibold text-sm hover:bg-pink-50 transition-colors shadow-sm">
              Create Yours
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
