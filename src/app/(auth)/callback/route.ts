import {createClient} from "@/lib/supabaseServer";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams, origin} = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) return NextResponse.redirect(`${origin}/login?error=auth_failed`);

  const sb = await createClient();
  const {error: exchError} = await sb.auth.exchangeCodeForSession(code);
  if (exchError)
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);

  const {
    data: {user},
  } = await sb.auth.getUser();
  if (!user || !user.email)
    return NextResponse.redirect(`${origin}/login?error=no_email`);

  // staff allow-list
  const {data: allow} = await sb
    .from("allowed_emails")
    .select("role")
    .eq("email", user.email)
    .single();
  if (!allow) {
    await sb.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=access_denied`);
  }

  // ensure profile
  await sb.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata.full_name ?? user.email.split("@")[0],
      role: allow.role,
    },
    {onConflict: "id"}
  );

  return NextResponse.redirect(`${origin}${next}`);
}
