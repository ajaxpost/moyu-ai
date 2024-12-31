import { getDoc } from "@/actions/menu";
import BlockEditor from "@/components/work/block-editor";
import { notFound } from "next/navigation";
import { isEmpty, omit } from "lodash-es";

export async function generateStaticParams() {
  // const docs = await getStaticIds();
  // return docs.map((item) => ({
  //   id: item.id,
  // }));
  return [
    {
      id: "0",
    },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDoc(id);

  if (isEmpty(omit(doc, "permission"))) {
    notFound();
  }

  return (
    <BlockEditor
      title={doc?.title}
      permission={doc?.permission}
      userId={doc?.uid}
    />
  );
}
