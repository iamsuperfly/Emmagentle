import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id, user_id, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminUser) {
    redirect("/admin/login?error=not-authorized");
  }

  return { supabase, user, adminUser };
}