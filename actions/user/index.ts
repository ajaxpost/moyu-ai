"use server";

import { auth } from "@/auth";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

interface IUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export async function saveUser(user: IUser) {
  const session = await auth();
  if (!session?.user || !user.id) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const id = user.id;
  const image = user.avatar;
  Reflect.deleteProperty(user, "id");
  Reflect.deleteProperty(user, "avatar");
  return await supabase
    .schema("next_auth")
    .from("users")
    .update({
      ...user,
      image,
    })
    .eq("id", id);
}
