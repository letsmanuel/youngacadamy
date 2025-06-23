
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Menu, X, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/FirebaseAuthContext";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAuthModal = (tab: "login" | "register") => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-all" onClick={() => navigate("/")}>
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Young Academy</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className="text-white hover:text-blue-400 hover:scale-105 transition-all"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-blue-400 hover:scale-105 transition-all"
                onClick={() => navigate("/courses")}
              >
                Kurse
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="text-white hover:text-purple-400 hover:scale-105 transition-all"
                      onClick={() => navigate("/admin")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  )}
                  <div className="flex items-center space-x-2 text-white">
                    <User className="h-4 w-4" />
                    <span>{user.displayName || user.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-red-400 hover:scale-105 transition-all"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Abmelden
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-blue-400 hover:scale-105 transition-all"
                    onClick={() => handleAuthModal("login")}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all"
                    onClick={() => handleAuthModal("register")}
                  >
                    Jetzt starten
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:scale-105 transition-all"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700 animate-fade-in">
              <div className="flex flex-col space-y-4 pt-4">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-blue-400 justify-start hover:scale-105 transition-all"
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-blue-400 justify-start hover:scale-105 transition-all"
                  onClick={() => {
                    navigate("/courses");
                    setIsMenuOpen(false);
                  }}
                >
                  Kurse
                </Button>
                
                {user ? (
                  <>
                    {isAdmin && (
                      <Button 
                        variant="ghost" 
                        className="text-white hover:text-purple-400 justify-start hover:scale-105 transition-all"
                        onClick={() => {
                          navigate("/admin");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    )}
                    <div className="flex items-center space-x-2 text-white px-4">
                      <User className="h-4 w-4" />
                      <span>{user.displayName || user.email}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-white hover:text-red-400 justify-start hover:scale-105 transition-all"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Abmelden
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="text-white hover:text-blue-400 justify-start hover:scale-105 transition-all"
                      onClick={() => {
                        handleAuthModal("login");
                        setIsMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white justify-start hover:scale-105 transition-all"
                      onClick={() => {
                        handleAuthModal("register");
                        setIsMenuOpen(false);
                      }}
                    >
                      Jetzt starten
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authTab}
      />
    </>
  );
};

export default Navbar;
