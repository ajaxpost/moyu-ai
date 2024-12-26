import { getDoc } from "@/actions/menu";
import BlockEditor from "@/components/work/block-editor";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDoc(id);
  if (!doc) {
    notFound();
    return;
  }

  return <BlockEditor />;
}
