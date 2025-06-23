
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Users, Calendar, Award, MessageSquare, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Monitor,
      title: "Hochwertige Tutorials",
      description: "Hochwertige Video-Tutorials mit praktischen Tipps und Tricks, die dir helfen, schnell zu lernen."
    },
    {
      icon: Users,
      title: "Live-Sessions",
      description: "Regelmäßige Live-Kurse mit Experten für direktes Lernen und Q&A-Sessions."
    },
    {
      icon: Calendar,
      title: "Flexible Zeiten",
      description: "Lerne in deinem eigenen Tempo - alle Inhalte sind 24/7 verfügbar."
    },
    {
      icon: Award,
      title: "Eigene Kurse",
      description: "Wünsche dir Kurse, und mit etwas Glück wird dein Wunschkurs umgesetzt!"
    },
    {
      icon: MessageSquare,
      title: "Community",
      description: "Vernetze dich mit anderen Lernenden und tausche Erfahrungen aus."
    },
    {
      icon: Headphones,
      title: "Premium Support",
      description: "Direkter Support von unseren Experten bei Fragen und Problemen."
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Warum Young Academie?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Unsere Plattform bietet alles, was du für eine erfolgreiche IT-Karriere brauchst.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
