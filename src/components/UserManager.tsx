
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCollection, updateDocument } from '@/hooks/useFirestore';
import { User } from '@/types/firebase';
import { Users, Crown, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserManager = () => {
  const { data: users, loading } = useCollection<User>('users');
  const { toast } = useToast();

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      await updateDocument('users', userId, { isAdmin: !currentStatus });
      toast({
        title: currentStatus ? "Admin-Rechte entfernt" : "Admin-Rechte gewährt",
        description: `Der Benutzer wurde erfolgreich ${currentStatus ? 'zum normalen Benutzer' : 'zum Administrator'} gemacht.`
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Aktualisieren der Benutzerrechte.",
        variant: "destructive"
      });
    }
  };

  if (loading) return <div className="text-white">Lade Benutzer...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Benutzer verwalten</h2>

      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.uid} className="bg-slate-800 border-slate-700 hover:bg-slate-800/70 transition-all animate-fade-in">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {user.displayName || 'Unbekannter Benutzer'}
                    {user.isAdmin && <Crown className="h-4 w-4 text-yellow-400" />}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {user.email}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {user.isAdmin ? (
                    <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-400/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Administrator
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                      Benutzer
                    </Badge>
                  )}
                  {user.subscription && (
                    <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/30">
                      {user.subscription.tier}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-400">
                  Registriert: {user.createdAt?.toLocaleDateString('de-DE')}
                </div>
                <Button
                  onClick={() => toggleAdmin(user.uid, user.isAdmin || false)}
                  size="sm"
                  variant={user.isAdmin ? "destructive" : "default"}
                  className={user.isAdmin ? "" : "bg-yellow-600 hover:bg-yellow-700"}
                  disabled={user.email === 'luap.palu@gmail.com'}
                >
                  {user.isAdmin ? 'Admin entfernen' : 'Admin machen'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
