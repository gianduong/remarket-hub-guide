import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Info, Copy } from "lucide-react";
import { useState } from "react";

interface ServiceDetail {
  label: string;
  value: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: (active: boolean) => void;
  details: ServiceDetail[];
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function ServiceCard({
  title,
  description,
  isActive,
  onToggle,
  details,
  actionLabel,
  onAction,
  icon,
}: ServiceCardProps) {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    if (checked) {
      // If activating service, activate immediately
      onToggle(true);
    } else {
      // If deactivating service, show warning modal
      setShowWarningModal(true);
    }
  };

  const handleConfirmDeactivate = () => {
    onToggle(false);
    setShowWarningModal(false);
  };

  const handleCopyValue = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: "Value copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy value to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 border-border/50 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {icon && <>{icon}</>}
            <div>
              <div className="flex item-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  {title}
                </CardTitle>
                <Switch
                  checked={isActive}
                  onCheckedChange={handleToggle}
                  className="data-[state=checked]:bg-success"
                />
              </div>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-2 mb-4">
          {details.map((detail, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                {detail.label}:
                {detail.label === "Product identifier" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-blue-500 hover:text-blue-600 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          This Product ID must match the Product ID in Google Merchant Center 
                          to ensure high catalog match rate and effective remarketing.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div 
                className="text-xs text-card-foreground font-mono bg-muted/50 p-2 rounded text-center truncate cursor-pointer hover:bg-muted/70 transition-colors group relative"
                onClick={() => handleCopyValue(detail.value)}
                title="Click to copy"
              >
                {detail.value}
                <Copy className="h-3 w-3 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="outline"
            size="sm"
            className="w-full bg-card hover:bg-accent"
          >
            {isActive ? (
              <Edit3 className="w-4 h-4 mr-2" />
            ) : (
              <Settings className="w-4 h-4 mr-2" />
            )}
            {actionLabel}
          </Button>
        )} */}
      </CardContent>
    </Card>

    {/* Warning modal when deactivating service */}
    <AlertDialog open={showWarningModal} onOpenChange={setShowWarningModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <AlertDialogTitle>Warning: Deactivate Service</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Are you sure you want to deactivate <strong>{title}</strong>? 
            <br /><br />
            When deactivated, this service will not function and may affect related features. 
            You can reactivate it at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirmDeactivate}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Deactivate Service
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
