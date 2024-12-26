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
    .from("document_v2")
    .select("*")
    .order("create_at", { ascending: true })
    .eq("uid", session.user.id);

  return (data || []) as DocumentVO[];
}

export async function createDoc(id: string, parent_id?: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase
    .from("document_v2")
    .insert({
      id,
      uid: session.user.id,
      purview: 0, // 私有
      parent_id,
    })
    .select();

  return data;
}

export async function delDoc(ids: string[]) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase.from("document_v2").delete().in("id", ids);
  return data;
}

export async function updateTitle(id: string, title: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("document_v2").update({ title }).eq("id", id);
}

export async function getDoc(id: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("document_v2")
    .select("*")
    .eq("id", id)
    .eq("uid", session.user.id)
    .single();
  return data as DocumentVO;
}
