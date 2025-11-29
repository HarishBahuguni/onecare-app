"use client";
import {supabase} from "@/lib/supabaseClient";

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}
