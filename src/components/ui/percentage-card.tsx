import { cn } from "@/lib/utils";

interface PercentageCardProps {
  percentage: number;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  className?: string;
  showBorder?: boolean;
}

const getSizeClasses = (size: "sm" | "md" | "lg" | "xl") => {
  switch (size) {
    case "sm":
      return {
        container: "w-12 h-12",
        text: "text-xs font-bold",
        label: "text-xs mt-1"
      };
    case "md":
      return {
        container: "w-16 h-16",
        text: "text-lg font-bold",
        label: "text-xs mt-1"
      };
    case "lg":
      return {
        container: "w-20 h-20",
        text: "text-xl font-bold",
        label: "text-sm mt-2"
      };
    case "xl":
      return {
        container: "w-24 h-24",
        text: "text-2xl font-bold",
        label: "text-sm mt-2"
      };
    default:
      return {
        container: "w-16 h-16",
        text: "text-lg font-bold",
        label: "text-xs mt-1"
      };
  }
};

const getVariantClasses = (variant: string, percentage: number, showBorder: boolean) => {
  switch (variant) {
    case "success":
      return showBorder 
        ? "bg-success/10 border-2 border-success text-success"
        : "bg-success text-success-foreground";
    case "warning":
      return showBorder
        ? "bg-warning/10 border-2 border-warning text-warning"
        : "bg-warning text-warning-foreground";
    case "error":
      return showBorder
        ? "bg-destructive/10 border-2 border-destructive text-destructive"
        : "bg-destructive text-destructive-foreground";
    case "gradient":
      return "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg";
    case "default":
    default:
      // Dynamic color based on percentage
      if (percentage >= 80) {
        return showBorder
          ? "bg-success/10 border-4 border-success text-success"
          : "bg-success text-success-foreground shadow-[var(--shadow-percentage)]";
      } else if (percentage >= 60) {
        return showBorder
          ? "bg-primary/10 border-4 border-primary text-primary"
          : "bg-primary text-primary-foreground";
      } else {
        return showBorder
          ? "bg-warning/10 border-4 border-warning text-warning"
          : "bg-warning text-warning-foreground";
      }
  }
};

const getMatchLevel = (percentage: number) => {
  if (percentage >= 80) return "STRONG MATCH";
  if (percentage >= 60) return "GOOD MATCH";
  return "FAIR MATCH";
};

export function PercentageCard({ 
  percentage, 
  label, 
  size = "md", 
  variant = "default",
  className,
  showBorder = true
}: PercentageCardProps) {
  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant, percentage, showBorder);
  const displayLabel = label || (variant === "default" ? getMatchLevel(percentage) : undefined);

  return (
    <div className={cn("text-center", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center",
        sizeClasses.container,
        variantClasses
      )}>
        <span className={sizeClasses.text}>{percentage}%</span>
      </div>
      {displayLabel && (
        <p className={cn("font-medium text-center max-w-[80px]", sizeClasses.label)}>
          {displayLabel}
        </p>
      )}
    </div>
  );
}