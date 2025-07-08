import { Home, Share2 } from "lucide-react";

function Icons({ name, className }) {
  switch (name) {
    case "Home": {
      return <Home className={className} />;
    }
    case "Explore": {
      return <Share2 className={className} />;
    }
    default:
      return;
  }
}

export { Icons };
