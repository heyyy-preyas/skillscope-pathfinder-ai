import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Compass, User, BookOpen, Users } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Explore Careers", href: "#explore", icon: Compass },
    { name: "Learn", href: "#learn", icon: BookOpen },
    { name: "Connect", href: "#connect", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SkillScope</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{item.name}</span>
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="hero" size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};