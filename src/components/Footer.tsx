import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail,
  MapPin,
  Phone
} from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Career Assessment", href: "#" },
        { name: "Explore Careers", href: "#" },
        { name: "Learning Paths", href: "#" },
        { name: "Mentorship", href: "#" },
        { name: "Job Market Data", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Career Guide", href: "#" },
        { name: "Skill Assessments", href: "#" },
        { name: "Industry Reports", href: "#" },
        { name: "Success Stories", href: "#" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">SkillScope</span>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering students to discover their perfect career path through 
                AI-powered assessments and personalized guidance.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>hello@skillscope.in</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Stay Updated with Career Insights
              </h3>
              <p className="text-muted-foreground text-sm">
                Get the latest career trends, job market insights, and success tips delivered to your inbox.
              </p>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="default" size="sm" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 SkillScope. All rights reserved. Built with ❤️ for students.
            </div>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-secondary hover:bg-primary text-muted-foreground hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};