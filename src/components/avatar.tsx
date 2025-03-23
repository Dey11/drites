import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  className?: string;
};

export default function Avatar({ name, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "mt-1 flex size-8 items-center justify-center rounded-full bg-slate-200",
        className
      )}
    >
      {name[0].toUpperCase()}
    </div>
  );
}
