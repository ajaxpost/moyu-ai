import { getDoc } from "@/actions/menu";
import BlockEditor from "@/components/work/block-editor";
import { isHomeId } from "@/shared";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === isHomeId) {
    return <div>首页</div>;
  }
  const doc = await getDoc(id);

  return <BlockEditor doc={doc!} />;
}
