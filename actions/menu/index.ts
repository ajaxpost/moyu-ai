"use server";
import { auth } from "@/auth";
import { DocumentVO, PermissionVO } from "@/shared";
import { PermissionEnum } from "@/shared/enum";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

// const cookieStore = await cookies();

// export async function getStaticIds() {
//   const supabase = createClient(cookieStore);
//   const { data } = await supabase
//     .from("document_v2")
//     .select("*")
//     .order("create_at", { ascending: true });

//   return (data || []) as DocumentVO[];
// }

export async function getMenus() {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("document_v2")
    .select(
      `*,permission (
        permission
      )`
    )
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
      parent_id,
    })
    .select();
  await supabase.from("permission").insert({
    did: id,
    permission: PermissionEnum.PRIVATE,
  });

  return data;
}

export async function delDoc(ids: string[]) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("permission").delete().in("did", ids);
  const data = await supabase.from("document_v2").delete().in("id", ids);
  return data;
}

export async function updateTitle(id: string, title: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("document_v2")
    .update({ title: title ?? "" })
    .eq("id", id);
}

export async function getDoc(id: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("document_v2")
    .select(
      `*,permission (
        permission
      )`
    )
    .eq("id", id)
    .eq("uid", session.user.id)
    .single();
  const permission = await getPermission(id);
  if (!data && permission && permission.permission !== PermissionEnum.PRIVATE) {
    const { data } = await supabase
      .from("document_v2")
      .select(
        `*,permission (
        permission
      )`
      )
      .eq("id", permission.did)
      .single();
    return data;
  }
  return {
    ...data,
    permission: permission?.permission,
  } as DocumentVO & {
    permission: PermissionEnum;
  };
}

export async function getPermission(id: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("permission")
    .select("*")
    .eq("did", id)
    .single();
  return data as PermissionVO;
}

export async function updatePermission(id: string, permission: PermissionEnum) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("permission").update({ permission }).eq("did", id);
}
