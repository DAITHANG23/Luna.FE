import { cn } from "@/utils";

export const LoadingIndicator = ({ open }: { open: boolean }) => {
  if (!open) return null;

  return (
    <div
      className={cn(
        "bg-background fixed inset-0 z-30 backdrop-blur-sm transition-opacity",
        open ? "flex items-center justify-center opacity-100" : "hidden"
      )}
    >
      <div className="border-t-primary h-12 w-12 animate-spin rounded-full border-4 border-white/30"></div>
    </div>
  );
};
