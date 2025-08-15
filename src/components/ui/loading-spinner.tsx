import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingSpinner = ({ className, size = "md", text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className="relative">
        <Loader2 className={cn(
          "animate-spin text-primary",
          sizeClasses[size]
        )} />
        <div className="absolute inset-0 animate-pulse-glow">
          <Loader2 className={cn(
            "text-primary-glow opacity-50",
            sizeClasses[size]
          )} />
        </div>
      </div>
      {text && (
        <p className="text-muted-foreground text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};