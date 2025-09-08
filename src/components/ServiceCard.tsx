import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings, Edit3 } from "lucide-react";

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
  icon
}: ServiceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isActive ? "default" : "secondary"} className={
              isActive 
                ? "bg-success text-success-foreground" 
                : "bg-muted text-muted-foreground"
            }>
              {isActive ? "On" : "Off"}
            </Badge>
            <Switch 
              checked={isActive} 
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-success"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 mb-4">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="text-sm font-medium text-muted-foreground">{detail.label}:</span>
              <span className="text-sm text-card-foreground font-mono">{detail.value}</span>
            </div>
          ))}
        </div>
        
        {actionLabel && onAction && (
          <Button 
            onClick={onAction} 
            variant="outline" 
            size="sm"
            className="w-full bg-card hover:bg-accent"
          >
            {isActive ? <Edit3 className="w-4 h-4 mr-2" /> : <Settings className="w-4 h-4 mr-2" />}
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}