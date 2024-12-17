"use server";
import { auth } from "@/auth";
import { DocumentVO } from "@/shared";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

export async function getMenus() {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("Document")
    .select()
    .eq("creator", session.user.name)
    .eq("creator_email", session.user.email)
    .order("id", { ascending: true });
  // .order("created_at", { ascending: true });
  return (data || []) as DocumentVO[];
}

export async function createDoc(parent_id: number) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase
    .from("Document")
    .insert({
      creator: session.user.name,
      creator_email: session.user.email,
      parent_id,
    })
    .select();
  return data;
}

export async function delDoc(ids: number[]) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("Document").delete().in("id", ids);
}

export async function updateTitle(id: number, title: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("Document").update({ title }).eq("id", id);
}
