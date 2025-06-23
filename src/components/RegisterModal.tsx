
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Fehler",
        description: "Die Passwörter stimmen nicht überein.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Fehler",
        description: "Bitte akzeptiere die Nutzungsbedingungen.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast({
        title: "Registrierung erfolgreich!",
        description: "Willkommen in der Young Academy! Du kannst jetzt starten.",
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleGoogleRegister = () => {
    toast({
      title: "Google Registrierung",
      description: "Google OAuth wird implementiert...",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Jetzt registrieren
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-center">
            Erstelle deinen Account und starte deine Lernreise in der Young Academy!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Vollständiger Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="name"
                type="text"
                placeholder="Max Mustermann"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-white">E-Mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="register-email"
                type="email"
                placeholder="deine@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-white">Passwort</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">Passwort bestätigen</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-slate-300">
              Ich akzeptiere die{" "}
              <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                Nutzungsbedingungen
              </Button>{" "}
              und{" "}
              <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                Datenschutzrichtlinien
              </Button>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Registrierung..." : "Kostenlos registrieren"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-800 px-2 text-slate-400">oder</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
          onClick={handleGoogleRegister}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Mit Google registrieren
        </Button>

        <p className="text-sm text-slate-400 text-center">
          Bereits ein Konto?{" "}
          <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
            Jetzt anmelden
          </Button>
        </p>

        <div className="bg-slate-700/50 p-3 rounded-lg">
          <p className="text-xs text-slate-300 text-center">
            🎉 <strong>Gratis Zugriff!</strong><br />
            Keine Kreditkarte erforderlich • Keine Tricks
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
