import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MapPin } from "lucide-react";

export default function Resources() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">Support Resources</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">CDC Info</p>
                  <p className="text-sm text-muted-foreground">1-800-232-4636</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">National HIV Hotline</p>
                  <p className="text-sm text-muted-foreground">1-800-HIV-0440</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Find HIV testing locations near you using the CDC's testing locator:
              </p>
              <Button className="w-full">
                Find Testing Centers
                <MapPin className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <a
                href="https://www.cdc.gov/hiv/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full">
                  CDC HIV Resources
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://www.who.int/health-topics/hiv-aids"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full">
                  WHO HIV Information
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://www.hiv.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full">
                  HIV.gov
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
