import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/screening", label: "Screening" },
  { href: "/education", label: "Education" },
  { href: "/resources", label: "Resources" },
  { href: "/chatbot", label: "Chat Assistant" },
];

export default function Nav() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Activity className="h-6 w-6 text-primary" />
            <span>HIV Screening Tool</span>
          </Link>

          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}