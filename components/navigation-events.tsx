"use client";

import { FC, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavigationEvents: FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("eeee");
  }, [pathname]);

  return null;
};

export default NavigationEvents;
