
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/FirebaseAuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(loginData.email, loginData.password);
      toast({
        title: "Erfolgreich angemeldet!",
        description: "Willkommen zurück in der Young Academie.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Fehler beim Anmelden",
        description: error.message || "Ein unbekannter Fehler ist aufgetreten.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Fehler",
        description: "Die Passwörter stimmen nicht überein.",
        variant: "destructive"
      });
      return;
    }

    if (!registerData.agreeToTerms) {
      toast({
        title: "Fehler",
        description: "Bitte akzeptiere die Nutzungsbedingungen.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await signUp(registerData.email, registerData.password, registerData.name);
      toast({
        title: "Registrierung erfolgreich!",
        description: "Willkommen in der Young Academie! Du bist automatisch angemeldet.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Fehler bei der Registrierung",
        description: error.message || "Ein unbekannter Fehler ist aufgetreten.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Google Authentication",
      description: "Google OAuth wird implementiert...",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Young Academy
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-center">
            Melde dich an oder registriere dich für Zugang zu allen Kursen
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-blue-600 transition-all">Anmelden</TabsTrigger>
            <TabsTrigger value="register" className="text-white data-[state=active]:bg-blue-600 transition-all">Registrieren</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 animate-fade-in">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-white">E-Mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="deine@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-white">Passwort</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Anmeldung..." : "Anmelden"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 animate-fade-in">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-white">Vollständiger Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Max Mustermann"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-all"
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
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-all"
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
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-all"
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
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={registerData.agreeToTerms}
                  onCheckedChange={(checked) => setRegisterData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm text-slate-300">
                  Ich akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinien
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Registrierung..." : "Kostenlos registrieren"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-800 px-2 text-slate-400">⤵️</span>
          </div>
        </div>

        <div className="bg-slate-700/50 p-3 rounded-lg animate-pulse">
          <p className="text-xs text-slate-300 text-center">
            🎉 <strong>Gratis Zugriff!</strong><br />
            Keine Kreditkarte erforderlich • Keine Tricks
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
