import { getDoc } from "@/actions/menu";
import { auth } from "@/auth";
import BlockEditor from "@/components/work/block-editor";
import { isHomeId } from "@/shared";
import Progress from "@/assert/svg/progress.svg";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return null;

  if (id === isHomeId) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="h-[80%] w-full">
          <Progress />
        </div>
        <div className="flex-1 text-lg font-bold">正在建设中...</div>
      </div>
    );
  }

  const doc = await getDoc(id);

  return <BlockEditor doc={doc!} session={session} />;
}
