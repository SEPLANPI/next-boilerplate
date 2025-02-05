import { LucideImage } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps extends ComponentProps<"div"> {
  iconClassName?: string;
}

export function ImagePlaceholder({
  iconClassName = 'size-8',
  className,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted rounded w-full h-20",
        className
      )}
      {...props}
    >
      <LucideImage className={cn(
        "text-muted-foreground size-4",
        iconClassName
      )} />
    </div>
  );
}
