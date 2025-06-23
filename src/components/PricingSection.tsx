
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Book } from "lucide-react";

interface PricingSectionProps {
  onRegister: () => void;
}

const PricingSection = ({ onRegister }: PricingSectionProps) => {
  const plans = [
        {
      name: "Young Academy Artikel",
      price: "0",
      description: "Unser gesamtes Text-Kursangebot kostenlos!",
      icon: Book,
      popular: false,
      features: [
        "Statt Videos: Artikel",
        "Vollen Zugriff auf alle Kurse",
        "Alles kostenlos!",
        "24/7 Zugriff",
        "Und mehr..."
      ],
      buttonText: "Registrieren",
      buttonVariant: "default" as const
    },
            {
      name: "Young Academy All-Inclusive",
      price: "0",
      description: "Unser gesamtes Kursangebot kostenlos!",
      icon: Crown,
      popular: true,
      features: [
        "Zugriff auf alle Kurse",
        "Vereinzelte Live-Sessions",
        "Kurs Wünsche",
        "Discord Support",
        "Und mehr..."
      ],
      buttonText: "Registrieren",
      buttonVariant: "default" as const
    },
    {
      name: "Young Academy Starter",
      price: "0",
      description: "Unser gesamtes Video-Kursangebot kostenlos!",
      icon: Zap,
      popular: false,
      features: [
        "Zugriff auf alle Kurse",
        "Vereinzelte Live-Sessions",
        "Kurs Wünsche",
        "Discord Support",
        "Und mehr..."
      ],
      buttonText: "Registrieren",
      buttonVariant: "default" as const
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-400/30">
            💎 Unser Versprechen
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Für immer, gratis!
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Alle Kurse sind für immer kostenlos verfügbar. Wir glauben an die Macht der Bildung und möchten, dass jeder die Möglichkeit hat, IT zu lernen. Spenden sind willkommen, um die Plattform am Leben zu erhalten!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 bg-slate-800/80' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Unser bestes Angebot
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                  plan.popular ? 'bg-blue-600' : 'bg-slate-700'
                }`}>
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                <div className="flex items-center justify-center mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}€</span>
                  <span className="text-slate-400 ml-2">/Monat</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300">
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                  onClick={onRegister}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            ✨ Young Academy ist eine Plattform, die sich der kostenlosen IT-Ausbildung verschrieben hat. Wir bieten eine Vielzahl von Kursen an, die dir helfen, deine Fähigkeiten zu verbessern und in der IT-Welt erfolgreich zu sein.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-2" />
              Keine Einrichtungsgebühren
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-2" />
              Keine Haken oder versteckte Kosten
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-2" />
              Support bei Fragen und Problemen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
