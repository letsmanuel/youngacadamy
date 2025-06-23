
import React, { useState } from 'react';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { useCollection } from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course, User } from '@/types/firebase';
import { Users, BookOpen, Settings, Plus } from 'lucide-react';
import CourseManager from './CourseManager';
import UserManager from './UserManager';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { data: courses } = useCollection<Course>('courses');
  const { data: users } = useCollection<User>('users');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Zugriff verweigert</h1>
            <p className="text-slate-300">Du hast keine Berechtigung für das Admin Panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="container mx-auto py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-300">Verwalte Kurse, Benutzer und Plattform-Einstellungen</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Gesamt Kurse</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{courses?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Gesamt Benutzer</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{users?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Admin Status</CardTitle>
              <Settings className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <Badge className="bg-purple-600 text-white">Aktiv</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="courses" className="text-white">Kurse verwalten</TabsTrigger>
            <TabsTrigger value="users" className="text-white">Benutzer verwalten</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-6">
            <CourseManager />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UserManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
