"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabaseClient";
import {useRouter, useSearchParams} from "next/navigation";
import MicroBar from "@/components/MicroBar";
import DotWave from "@/components/AppleWave";

export default function LoginPage() {
  const search = useSearchParams();
  const authError = search?.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(
    authError === "access_denied"
      ? "Your Google account is not authorised."
      : ""
  );
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email, password});
    if (error) setMsg(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "email profile",
      },
    });
    if (error) {
      setMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">OneCare Login</h1>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full mb-4 flex items-center justify-center gap-2 btn primary">
          {loading ? <MicroBar /> : "Continue with Google"}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn primary w-full">
            {loading ? <MicroBar /> : "Sign In"}
          </button>
          {msg && <p className="text-red-600 text-sm text-center">{msg}</p>}
        </form>

        {/* Dev bypass – remove before production */}
        <p className="text-xs text-center text-gray-400 mt-4">
          RLS disabled for dev.{" "}
          <a href="/dashboard" className="underline">
            Skip to app
          </a>
        </p>
      </div>
    </div>
  );
}
