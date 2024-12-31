import { cn } from "@/lib/utils";
import { FC, HTMLProps } from "react";

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
  withBorder?: boolean;
};

export const Surface: FC<SurfaceProps> = ({
  children,
  className,
  withShadow = true,
  withBorder = true,
  ref,
  ...props
}) => {
  const surfaceClass = cn(
    className,
    "bg-white rounded-lg dark:bg-black",
    withShadow ? "shadow-sm" : "",
    withBorder ? "border border-neutral-200 dark:border-neutral-800" : ""
  );

  return (
    <div className={surfaceClass} {...props} ref={ref}>
      {children}
    </div>
  );
};

Surface.displayName = "Surface";
