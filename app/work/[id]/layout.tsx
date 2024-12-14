import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sider from "@/components/work/sider";

export default function LayoutComponent({
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
