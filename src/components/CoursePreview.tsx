
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Users, Star } from "lucide-react";

const CoursePreview = () => {
  const courses = [
    {
      title: "Minecraft Modding mit Java",
      description: "Alles über Minecraft Fabric Modding in 1.21.0. Von eigenem UI, zu custom Commands, über Blöcke und Networking ist alles dabei!",
      duration: "1h 30 Minuten",
      students: "Paul",
      rating: "4.9",
      tier: "Development",
      image: "https://imgs.search.brave.com/jtGSRpfZnMjJSNjmA_bbP2sdH0_oQYDcuY1E3eAwhfI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWluZWNyYWZ0LWhv/c3RpbmcucHJvL2Zp/bGVzL3BhY2tzL2Zh/bnRhc3ktbWMtZmFi/cmljXzQud2VicA",
      level: "Fortgeschritten"
    },
    {
      title: "WebDevelopment mit HTML, CSS und JavaScript",
      description: "Web Entwicklung von Grund auf. Lerne die Basics von HTML, CSS und JavaScript und erstelle deine erste Webseite.",
      duration: "3 Stunden",
      students: "Paul / Emanuel",
      rating: "4.8",
      tier: "Development",
      image: "https://imgs.search.brave.com/iyhVvRjpDDFUwkG70nlVLyr8XxNGqtFusJLtEdCIAiU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEyLzU4LzkwLzQ0/LzM2MF9GXzEyNTg5/MDQ0NTJfb05zR1Jp/SEw3MUc4ejhXZ3gz/OE5wQ2d4dUVia1Ex/VTcuanBn",
      level: "Anfänger"
    },
    {
      title: "Linux für Sicherheitsforscher",
      description: "Lerne die Grundlagen von Linux, von der Installation bis zur Nutzung der Kommandozeile.",
      duration: "2 Stunden",
      students: "Paul / Emanuel",
      rating: "4.7",
      tier: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      level: "Experte"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Cybersecurity": return "bg-green-600/20 text-green-400 border-green-400/30";
      case "Cybersecurity": return "bg-blue-600/20 text-blue-400 border-blue-400/30";
      case "Development": return "bg-purple-600/20 text-purple-400 border-purple-400/30";
      default: return "bg-gray-600/20 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Beliebte Kurse
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Entdecke unsere besten IT-Kurse und starte deine Lernreise heute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getTierColor(course.tier)}>
                    {course.tier}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {course.level}
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={() => window.location.href = "/courses"}
                >
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Zu allen Kursen
                </Button>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {course.rating}
                  </div>
                </div>
                
                <Button onClick={() => window.location.href = "/courses"} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Kurs starten
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
            onClick={() => window.location.href = "/courses"}
          >
            Alle Kurse anzeigen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursePreview;
