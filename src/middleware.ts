import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {createClient} from "@/lib/supabaseServer";

export async function middleware(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  const isAuthPage = req.nextUrl.pathname === "/login";

  if (!user && !isAuthPage)
    return NextResponse.redirect(new URL("/login", req.url));
  if (user && isAuthPage)
    return NextResponse.redirect(new URL("/dashboard", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
