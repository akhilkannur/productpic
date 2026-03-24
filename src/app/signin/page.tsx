"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import { Sparkles, Mail, Lock, CheckCircle } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full bg-background text-textMain">
      <Header />

      <main className="max-w-[480px] mx-auto px-6 py-20 text-center flex-grow flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20">
          <Lock className="text-accent" size={32} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-textMain">
          Sign In <span className="text-textMuted font-light">to Vault.</span>
        </h1>
        
        <p className="text-textMuted text-lg mb-10 font-light max-w-sm mx-auto">
          We'll send a secure magic link to your email to sign you in instantly. No passwords required.
        </p>

        {success ? (
          <div className="w-full p-8 rounded-3xl bg-surface border border-accent/20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-textMain">Check your inbox.</h3>
            <p className="text-textMuted text-sm font-light">
              We've sent a magic link to <span className="text-accent font-medium">{email}</span>. Click the link to log in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignIn} className="w-full space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-accent transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-borderSubtle focus:border-accent/40 rounded-xl py-4 pl-12 pr-4 outline-none transition-all font-light text-textMain placeholder:text-textMuted/40"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent text-background px-8 py-4 rounded-xl text-sm font-bold hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(210,180,140,0.2)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Send Magic Link <Sparkles size={16} /></>
              )}
            </button>
          </form>
        )}

        <p className="mt-12 text-xs text-textMuted">
          By signing in, you agree to our Terms and Privacy Policy.
        </p>
      </main>

      <footer className="w-full border-t border-borderSubtle bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-textMuted text-sm font-light">
          <p>© 2026 ProductPhoto.pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
