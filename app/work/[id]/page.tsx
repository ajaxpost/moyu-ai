import { getDoc } from "@/actions/menu";
import { auth } from "@/auth";
import BlockEditor from "@/components/work/block-editor";
import { redirect } from "next/navigation";

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

  if (!session?.user) return redirect("/");

  const doc = await getDoc(id);
  return <BlockEditor doc={doc} session={session} />;
}
