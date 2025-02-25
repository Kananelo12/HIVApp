import Nav from "./nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>
          Medical Disclaimer: This tool is for informational purposes only and should not be used for
          self-diagnosis. Always consult a healthcare professional for medical advice.
        </p>
      </footer>
    </div>
  );
}
