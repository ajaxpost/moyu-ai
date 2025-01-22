"use server";
import { PowerEnum } from "@/shared/enum";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { ShareEntiry, UserInfo } from "@/shared";

interface ShareTokenProps {
  userId?: string;
  did?: string;
  power: PowerEnum;
}

export async function shareToken({ userId, did, power }: ShareTokenProps) {
  if (!userId || !did || !power) {
    return;
  }
  const SHARE_DOC_ID = process.env.SHARE_DOC_ID!;
  const token = await jsonwebtoken.sign(
    {
      sharer: userId, // 分享人 id
      did, // 文档 id
      power, // 权限标识
    },
    SHARE_DOC_ID,
    {
      expiresIn: "5m",
    }
  );
  return token;
}

export async function createShare({
  uid,
  sharer_uid,
  did,
  power,
  source,
}: Omit<ShareEntiry, "id" | "create_at" | "update_at">) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase
    .from("share")
    .insert({
      uid,
      sharer_uid,
      did,
      power,
      source,
    })
    .select();

  return data;
}

export async function getShares(did: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase
    .from("share")
    .select(`*`)
    .eq("did", did);
  const users = await supabase
    .schema("next_auth")
    .from("users")
    .select<string, UserInfo>("*");
  if (!error && !users.error) {
    return data.map((item) => {
      return {
        ...item,
        userInfo: users.data?.find((o) => o.id === item.uid),
      };
    });
  }
  return data;
}

export async function getShareByMore({
  uid,
  did,
  sharer_uid,
}: Omit<ShareEntiry, "id" | "create_at" | "update_at" | "power" | "source">) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase
    .from("share")
    .select(`*`)
    .eq("uid", uid)
    .eq("did", did)
    .eq("sharer_uid", sharer_uid)
    .single();
  if (!error) {
    return data;
  }
}

export async function updateShare({
  id,
  uid,
  sharer_uid,
  did,
  power,
  source,
  update_at,
}: Omit<ShareEntiry, "create_at">) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase
    .from("share")
    .update({
      uid,
      sharer_uid,
      did,
      power,
      source,
      update_at,
    })
    .eq("id", id);

  return data;
}
