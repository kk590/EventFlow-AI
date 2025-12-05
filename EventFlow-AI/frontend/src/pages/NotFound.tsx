import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-8xl md:text-9xl font-bold gradient-text">404</h1>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button variant="hero" size="lg">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button variant="hero-outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
