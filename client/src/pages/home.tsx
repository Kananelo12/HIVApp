import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, BookOpen, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          HIV Symptom Screening & Education
        </h1>
        <p className="text-lg text-muted-foreground">
          A confidential tool to help you understand HIV symptoms and risk factors
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <ShieldCheck className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Confidential Screening</h2>
            <p className="mb-4 text-muted-foreground">
              Answer questions about your symptoms and risk factors privately
            </p>
            <Link href="/screening">
              <Button className="w-full">
                Start Screening
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <BookOpen className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Learn About HIV</h2>
            <p className="mb-4 text-muted-foreground">
              Educational resources about HIV transmission, prevention, and treatment
            </p>
            <Link href="/education">
              <Button variant="outline" className="w-full">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Heart className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Find Support</h2>
            <p className="mb-4 text-muted-foreground">
              Connect with healthcare providers and support services
            </p>
            <Link href="/resources">
              <Button variant="outline" className="w-full">
                View Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
