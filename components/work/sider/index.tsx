import { SignedIn, UserButton } from '@clerk/nextjs';
import { Divider, Layout } from '@douyinfe/semi-ui';

const { Sider } = Layout;

export default function SiderComponent() {
  return (
    <Sider className="h-full bg-[var(--semi-color-fill-0)] p-2">
      <div className="flex min-h-7 cursor-pointer items-center justify-between gap-2 text-sm hover:font-medium">
        <SignedIn>
          <UserButton showName />
          用户/设置
        </SignedIn>
      </div>
      <Divider margin={12} />
    </Sider>
  );
}
