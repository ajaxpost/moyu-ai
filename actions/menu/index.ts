"use server";
import { auth } from "@/auth";
import {
  DocumentVO,
  PermissionVO,
  POWER_OPTION,
  ShareEntiry,
  UserInfo,
} from "@/shared";
import { PermissionEnum } from "@/shared/enum";
import { createClient } from "@/supabase/server";
import { isEmpty } from "lodash-es";
import { cookies } from "next/headers";

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

export async function getShareMenus() {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("document_v2")
    .select<
      string,
      | (DocumentVO & {
          share?: (ShareEntiry & { shareUserInfo?: UserInfo })[];
        })
      | undefined
    >(
      `*,permission (
        permission
      ),share(*)`
    )
    .order("create_at", { ascending: true })
    .neq("uid", session.user.id)
    .eq("share.uid", session.user.id);

  const { data: users } = await supabase
    .schema("next_auth")
    .from("users")
    .select<string, UserInfo>("*");

  const newData = data || [];
  const filter = newData
    .filter((o) => o?.share?.length)
    .map((item) => {
      const currentShare = item?.share?.find((o) => o.uid === session.user.id);
      delete item?.["share"];
      return {
        ...item,
        currentShare: {
          ...currentShare,
          shareUserInfo: users?.find((o) => o.id === currentShare?.sharer_uid),
        },
      };
    });

  return filter as (DocumentVO & {
    currentShare: ShareEntiry & { shareUserInfo?: UserInfo };
  })[];
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
  await supabase
    .from("permission")
    .insert({
      did: id,
      permission: PermissionEnum.PRIVATE,
    })
    .select();

  return data;
}

export async function delDoc(ids: string[]) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("permission").delete().in("did", ids);
  await supabase.from("share").delete().in("did", ids);
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
    .single<DocumentVO>();

  if (data) {
    return data;
  }

  const permission = await getPermission(id);

  if (!data && !isEmpty(permission)) {
    const { data } = await supabase
      .from("document_v2")
      .select(
        `*,permission (
        permission
      ),share(*)`
      )
      .eq("id", permission.did)
      .single<
        DocumentVO & {
          share?: ShareEntiry[];
        }
      >();

    if (
      data &&
      (data.permission?.permission !== PermissionEnum.PRIVATE ||
        data.share?.some(
          (o) =>
            o.uid === session.user.id &&
            POWER_OPTION.some((i) => i.value === o.power)
        ))
    ) {
      const currentShare = data?.share?.find((o) => o.uid === session.user.id);
      delete data["share"];
      data["currentShare"] = currentShare;
      return data;
    }
  }
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
