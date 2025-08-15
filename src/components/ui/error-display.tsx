import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay = ({ message, onRetry, className }: ErrorDisplayProps) => {
  return (
    <Card className={`bg-gradient-card border border-destructive/20 ${className}`}>
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Something went wrong
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              {message}
            </p>
          </div>

          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="outline"
              className="hover:bg-gradient-hover border-primary/20 hover:border-primary/40 transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};