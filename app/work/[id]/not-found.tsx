import { createDoc } from "@/actions/menu";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export default function NotFound() {
  const handlerAdd = async () => {
    "use server";
    await createDoc(nanoid());
    revalidatePath("/work", "layout");
  };
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>找不到该文档，也可能是您没有对应的权限。</p>
      <Button onClick={handlerAdd}>新建文档</Button>
    </main>
  );
}
