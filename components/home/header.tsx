import Image from "next/image";
import { ModeToggle } from "../mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Image src="/icon.png" width={48} height={50} alt="logo" />
        <span className="ml-2 text-3xl font-pmzdcst">摸鱼记</span>
      </div>
      <ModeToggle />
    </header>
  );
}
