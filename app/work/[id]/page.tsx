import { getDoc } from "@/actions/menu";
import { auth } from "@/auth";
import BlockEditor from "@/components/work/block-editor";

export async function generateStaticParams() {
  return [{ id: "0" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return null;

  const doc = await getDoc(id);
  return <BlockEditor doc={doc} session={session} />;
}
