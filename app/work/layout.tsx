import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sider from "@/components/work/sider";

/**
 * 如果存在动态路由参数，将 layout 放在内部，当参数变化时，会导致重新渲染，并且 client state 会还原
 * 这里我们放在外面
 */
export default async function LayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="min-w-44 max-w-[500px]" defaultSize={18}>
        <Sider />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={82}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
