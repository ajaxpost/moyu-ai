import BlockEditor from "@/components/work/block-editor";

export default async function Page() {
  // const { id } = await params;
  // const appId = process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID as string;
  // const apiId = process.env.NEXT_PUBLIC_TIPTAP_API_ID as string;
  // const res = await fetch(
  //   `https://${appId}.collab.tiptap.cloud/api/documents/${id}`,
  //   {
  //     headers: {
  //       Authorization: apiId,
  //     },
  //   }
  // );
  // const data = await res.arrayBuffer();
  // console.log(data);

  return <BlockEditor />;
}
