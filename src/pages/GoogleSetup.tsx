import { useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import googleTagManagerLogo from "@/assets/google-tag-manager-logo.png";
import googleAnalyticsLogo from "@/assets/google-analytics-logo.png";
import googleAdsLogo from "@/assets/google-ads-logo.png";

export default function GoogleSetup() {
  const [gtmActive, setGtmActive] = useState(true);
  const [ga4Active, setGa4Active] = useState(true);
  const [adsActive, setAdsActive] = useState(false);

  const gtmDetails = [
    { label: "GTM Account", value: "Fishing / 6305453488" },
    { label: "Container", value: "TRAKPILOT CONTAINER 175688575464F / 228903794" },
    { label: "GTM ID", value: "GTM-KKTV17KJ" }
  ];

  const ga4Details = [
    { label: "GA4 Account", value: "Rin test" },
    { label: "GA4 Property Name", value: "TRAKPILOT Rin test's property175688575143434" },
    { label: "GA4 Data Stream Name", value: "TRAKPILOT DataStream 175688575299935" },
    { label: "GA4 measurement ID", value: "G-3N58J2JPZ" },
    { label: "Total events tracking", value: "9" }
  ];

  const adsDetails = [
    { label: "Conversion id", value: "null" },
    { label: "Total events tracking", value: "0" }
  ];

  const activeServices = [gtmActive, ga4Active, adsActive].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Google Marketing Setup</h1>
          <p className="text-lg text-muted-foreground">
            Configure your Google marketing channels for optimal tracking and performance
          </p>
          
          {/* Status Overview */}
          <Card className="max-w-md mx-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Setup Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Services:</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {activeServices} of 3
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <ServiceCard
            title="Google Tag Manager"
            description="Manage and deploy marketing tags without modifying code"
            isActive={gtmActive}
            onToggle={setGtmActive}
            details={gtmDetails}
            actionLabel="Edit"
            onAction={() => console.log("Edit GTM")}
            icon={<img src={googleTagManagerLogo} alt="GTM" className="w-5 h-5" />}
          />

          <ServiceCard
            title="Google Analytics 4"
            description="Advanced analytics and insights for your website performance"
            isActive={ga4Active}
            onToggle={setGa4Active}
            details={ga4Details}
            actionLabel="Setting up"
            onAction={() => console.log("Setup GA4")}
            icon={<img src={googleAnalyticsLogo} alt="GA4" className="w-5 h-5" />}
          />

          <ServiceCard
            title="Google Ads Remarketing"
            description="Target visitors who previously interacted with your website"
            isActive={adsActive}
            onToggle={setAdsActive}
            details={adsDetails}
            actionLabel="Setting up"
            onAction={() => console.log("Setup Ads Remarketing")}
            icon={<img src={googleAdsLogo} alt="Google Ads" className="w-5 h-5" />}
          />
        </div>

        {/* Help Section */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              ⚠️ Setup Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Events "Lead" and "Request a Quote" require specific tracking conditions such as button clicks or 
              popup appearances. Please contact our Support team for setup assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}