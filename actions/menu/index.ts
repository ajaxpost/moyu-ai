'use server';
import { auth } from '@/auth';
import { DocumentVO } from '@/shared';
import { createClient } from '@/supabase/server';
import { cookies } from 'next/headers';

export async function getMenus() {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('document_v2')
    .select('*')
    .order('create_at', { ascending: true })
    .eq('creator', session.user.name)
    .eq('creator_email', session.user.email);

  return (data || []) as DocumentVO[];
}

export async function createDoc(id: string, parent_id?: string) {
  const session = await auth();
  if (!session?.user) return;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase
    .from('document_v2')
    .insert({
      id,
      creator: session.user.name,
      creator_email: session.user.email,
      parent_id,
    })
    .select();

  return data;
}

export async function delDoc(ids: string[]) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase.from('document_v2').delete().in('id', ids);
  return data;
}

export async function delTipDoc(id: string) {
  const appId = process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID as string;
  const apiId = process.env.NEXT_PUBLIC_TIPTAP_API_ID as string;
  const doc_name = `doc_${id}`;
  const data = await fetch(
    `https://${appId}.collab.tiptap.cloud/api/documents/${doc_name}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: apiId,
      },
    }
  );
  return data;
}

export async function updateTitle(id: string, title: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from('document_v2').update({ title }).eq('id', id);
}
