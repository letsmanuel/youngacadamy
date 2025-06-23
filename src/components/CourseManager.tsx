
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCollection, addDocument, updateDocument, deleteDocument } from '@/hooks/useFirestore';
import { Course, CourseVideo } from '@/types/firebase';
import { Plus, Edit2, Trash2, Video, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseManager = () => {
  const { data: courses, loading } = useCollection<Course>('courses');
  const { toast } = useToast();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    tierRequired: 'Starter' as 'Starter' | 'Pro' | 'Ultra',
    thumbnailUrl: '',
    instructor: '',
    level: 'Anfänger' as 'Anfänger' | 'Fortgeschritten' | 'Experte',
    videos: [] as CourseVideo[]
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      tierRequired: 'Starter',
      thumbnailUrl: '',
      instructor: '',
      level: 'Anfänger',
      videos: []
    });
    setEditingCourse(null);
    setIsCreating(false);
  };

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      tierRequired: course.tierRequired,
      thumbnailUrl: course.thumbnailUrl,
      instructor: course.instructor,
      level: course.level,
      videos: course.videos || []
    });
    setEditingCourse(course);
    setIsCreating(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const addVideo = () => {
    const newVideo: CourseVideo = {
      id: Date.now().toString(),
      title: '',
      youtubeUrl: '',
      duration: 0,
      order: formData.videos.length + 1
    };
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, newVideo]
    }));
  };

  const updateVideo = (index: number, field: keyof CourseVideo, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map((video, i) => 
        i === index ? { ...video, [field]: value } : video
      )
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      const courseData = {
        ...formData,
        duration: formData.videos.reduce((total, video) => total + video.duration, 0)
      };

      if (editingCourse) {
        await updateDocument('courses', editingCourse.id, courseData);
        toast({
          title: "Kurs aktualisiert",
          description: "Der Kurs wurde erfolgreich aktualisiert."
        });
      } else {
        await addDocument('courses', courseData);
        toast({
          title: "Kurs erstellt",
          description: "Der neue Kurs wurde erfolgreich erstellt."
        });
      }
      resetForm();
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Speichern des Kurses.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (courseId: string) => {
    if (confirm('Möchtest du diesen Kurs wirklich löschen?')) {
      try {
        await deleteDocument('courses', courseId);
        toast({
          title: "Kurs gelöscht",
          description: "Der Kurs wurde erfolgreich gelöscht."
        });
      } catch (error) {
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Löschen des Kurses.",
          variant: "destructive"
        });
      }
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Starter": return "bg-green-600/20 text-green-400 border-green-400/30";
      case "Pro": return "bg-blue-600/20 text-blue-400 border-blue-400/30";
      case "Ultra": return "bg-purple-600/20 text-purple-400 border-purple-400/30";
      default: return "bg-gray-600/20 text-gray-400 border-gray-400/30";
    }
  };

  if (loading) return <div className="text-white">Lade Kurse...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Kurse verwalten</h2>
        <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Neuen Kurs erstellen
        </Button>
      </div>

      {(isCreating || editingCourse) && (
        <Card className="bg-slate-800 border-slate-700 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-white">
              {editingCourse ? 'Kurs bearbeiten' : 'Neuen Kurs erstellen'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-white">Titel</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="instructor" className="text-white">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Beschreibung</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price" className="text-white">Preis (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="tier" className="text-white">Tier</Label>
                <Select
                  value={formData.tierRequired}
                  onValueChange={(value: 'Starter' | 'Pro' | 'Ultra') => 
                    setFormData(prev => ({ ...prev, tierRequired: value }))
                  }
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="Starter">Starter</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Ultra">Ultra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level" className="text-white">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value: 'Anfänger' | 'Fortgeschritten' | 'Experte') => 
                    setFormData(prev => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="Anfänger">Anfänger</SelectItem>
                    <SelectItem value="Fortgeschritten">Fortgeschritten</SelectItem>
                    <SelectItem value="Experte">Experte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="thumbnail" className="text-white">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg">Videos</Label>
                <Button onClick={addVideo} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Video className="h-4 w-4 mr-2" />
                  Video hinzufügen
                </Button>
              </div>

              {formData.videos.map((video, index) => (
                <Card key={video.id} className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-white text-sm">Titel</Label>
                        <Input
                          value={video.title}
                          onChange={(e) => updateVideo(index, 'title', e.target.value)}
                          className="bg-slate-600 border-slate-500 text-white"
                          placeholder="Video Titel"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-sm">YouTube URL</Label>
                        <Input
                          value={video.youtubeUrl}
                          onChange={(e) => updateVideo(index, 'youtubeUrl', e.target.value)}
                          className="bg-slate-600 border-slate-500 text-white"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                      <div>
                        <Label className="text-white text-sm">Dauer (Min)</Label>
                        <Input
                          type="number"
                          value={video.duration}
                          onChange={(e) => updateVideo(index, 'duration', parseInt(e.target.value))}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => removeVideo(index)}
                          size="sm"
                          variant="destructive"
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Speichern
              </Button>
              <Button onClick={resetForm} variant="outline" className="border-slate-600 text-slate-300">
                <X className="h-4 w-4 mr-2" />
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Card key={course.id} className="bg-slate-800 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105 animate-fade-in">
            <div className="relative">
              <img 
                src={course.thumbnailUrl} 
                alt={course.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <Badge className={`absolute top-2 left-2 ${getTierColor(course.tierRequired)}`}>
                {course.tierRequired}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-white text-lg">{course.title}</CardTitle>
              <CardDescription className="text-slate-300">
                {course.instructor} • €{course.price} • {course.videos?.length || 0} Videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(course)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Bearbeiten
                </Button>
                <Button
                  onClick={() => handleDelete(course.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Löschen
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;
