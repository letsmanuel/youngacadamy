
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Star, Users, Calendar, Check, Code, Database, Cloud, Shield, Zap, BookOpen } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import CoursePreview from "@/components/CoursePreview";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/FirebaseAuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("register");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAuthModal = (tab: "login" | "register") => {
    if (user) {
      navigate("/courses");
    } else {
      setAuthTab(tab);
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-600/20 text-blue-400 border-blue-400/30">
              🚀 Neue Development Kurse verfügbar!
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Werde zum
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                IT-Liebhaber
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Die beste gratis Online-Lernplattform für IT-Kurse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
                onClick={() => handleAuthModal("register")}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                {user ? "Zu den Kursen" : "Kostenlos testen"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6"
                onClick={() => navigate("/courses")}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Kurse ansehen
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-slate-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">2000+</div>
                <div className="text-sm">Stunden an Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">10+</div>
                <div className="text-sm">IT-Kurse</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">95%</div>
                <div className="text-sm">Erfolgsrate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Beliebte Kurskategorien
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Minecraft Modding", courses: "1 Kurs", color: "bg-blue-600" },
              { icon: Cloud, title: "Web Development", courses: "4 Kurse", color: "bg-green-600" },
              { icon: Database, title: "Linux und co.", courses: "12 Kurse", color: "bg-purple-600" },
              { icon: Shield, title: "Cybersecurity", courses: "10 Kurse", color: "bg-red-600" }
            ].map((category, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-slate-400">{category.courses}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onRegister={() => handleAuthModal("register")} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Course Preview */}
      <CoursePreview />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Bereit um Durchzustarten?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Erstelle einen kostenlosen Account und entdecke unsere Kurse.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6"
              onClick={() => handleAuthModal("register")}
            >
              <Zap className="mr-2 h-5 w-5" />
              {user ? "Zu den Kursen" : "Jetzt kostenlos starten"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">Young Academie</span>
              </div>
              <p className="text-slate-400">
                Die führende Online-Plattform für IT-Bildung und berufliche Weiterentwicklung.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Kurse</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Programmierung</li>
                <li>Datenbanken</li>
                <li>Cloud Computing</li>
                <li>Cybersecurity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Hilfe-Center</li>
                <li>Kontakt</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Unternehmen</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Über uns</li>
                <li>Karriere</li>
                <li>Partner</li>
                <li>Datenschutz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Young Academie. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authTab}
      />
    </div>
  );
};

export default Index;
