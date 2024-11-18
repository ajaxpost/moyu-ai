import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Layout } from '@douyinfe/semi-ui';
import { CSSProperties } from 'react';
import { ThemeBtn } from '../theme';

const { Header } = Layout;

export default function HeaderComponent({
  className,
  style,
  showUser = true,
}: {
  className?: string;
  style?: CSSProperties;
  showUser?: boolean;
}) {
  return (
    <Header
      style={style}
      className={cn(
        className,
        'sticky top-0 flex h-16 items-center justify-between border-b border-[var(--semi-color-border)] px-8 leading-[64px]'
      )}
    >
      <div>icon</div>
      <div className="flex items-center gap-3">
        <ThemeBtn />
        {showUser && (
          <>
            <SignedOut>
              <SignInButton>
                <span className="cursor-pointer">Sign in</span>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        )}
      </div>
    </Header>
  );
}
