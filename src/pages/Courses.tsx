import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/FirebaseAuthContext";
import { useCollection } from "@/hooks/useFirestore";
import { addDocument, updateDocument } from "@/hooks/useFirestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, Clock, User, Star, ShoppingCart, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Course, CourseVideo, UserProgress, Purchase } from "@/types/firebase";
import { query, where } from "firebase/firestore";

const Courses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");

  const handleAuthModal = (tab: "login" | "register") => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };
  
  const { data: courses, loading } = useCollection<Course>('courses');
  const { data: purchases } = useCollection<Purchase>('purchases', user ? [where('userId', '==', user.uid)] : []);
  const { data: progress } = useCollection<UserProgress>('progress', user ? [where('userId', '==', user.uid)] : []);
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<CourseVideo | null>(null);

  const buyCourse = async (courseId: string, price: number) => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melde dich an, um Kurse zu erhalten.",
        variant: "destructive"
      });
      return;
    }

    try {
      await addDocument('purchases', {
        userId: user.uid,
        courseId: courseId,
        amount: price
      });

      toast({
        title: "Erfolg!",
        description: "Du hast jetzt Zugang zu diesem Kurs.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Kurs konnte nicht erhalten werden.",
        variant: "destructive"
      });
    }
  };

  const startWatchingCourse = (course: Course) => {
    setSelectedCourse(course);
    if (course.videos && course.videos.length > 0) {
      setSelectedVideo(course.videos[0]);
    }
  };

    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Anmeldung erforderlich</h1>
              <p className="text-slate-300">Bitte melde dich an oder erstelle einen gratis Account, um die Kurse zu sehen!</p>
            </CardContent>
          </Card>
        </div>
        
      );
    }

  const markVideoCompleted = async (courseId: string, videoId: string) => {
    if (!user) return;

    try {
      await addDocument('progress', {
        userId: user.uid,
        courseId: courseId,
        videoId: videoId,
        completed: true,
        completedAt: new Date().toISOString()
      });

      toast({
        title: "Lektion abgeschlossen!",
        description: "Dein Fortschritt wurde gespeichert.",
      });
    } catch (error) {
      console.error('Error marking video as completed:', error);
      toast({
        title: "Fehler",
        description: "Fortschritt konnte nicht gespeichert werden.",
        variant: "destructive"
      });
    }
  };

  const getCourseProgress = (courseId: string) => {
    if (!progress || !courses) return 0;
    
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.videos) return 0;
    
    // Get completed videos for this course
    const completedVideos = progress.filter(p => 
      p.courseId === courseId && 
      p.userId === user?.uid && 
      p.completed === true
    );
    
    // Calculate total duration of completed videos
    let completedDuration = 0;
    completedVideos.forEach(completedVideo => {
      const video = course.videos?.find(v => v.id === completedVideo.videoId);
      if (video) {
        completedDuration += video.duration;
      }
    });
    
    // Calculate percentage based on total course duration
    const progressPercentage = course.duration > 0 ? (completedDuration / course.duration) * 100 : 0;
    return Math.round(progressPercentage);
  };

  const isVideoCompleted = (courseId: string, videoId: string) => {
    if (!progress || !user) return false;
    
    return progress.some(p => 
      p.courseId === courseId && 
      p.videoId === videoId && 
      p.userId === user.uid && 
      p.completed === true
    );
  };

  const isCoursePurchased = (courseId: string) => {
    return purchases?.some(p => p.courseId === courseId) || false;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Starter": return "bg-green-600/20 text-green-400 border-green-400/30";
      case "Pro": return "bg-blue-600/20 text-blue-400 border-blue-400/30";
      case "Ultra": return "bg-purple-600/20 text-purple-400 border-purple-400/30";
      default: return "bg-gray-600/20 text-gray-400 border-gray-400/30";
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getCompletedVideosCount = (courseId: string) => {
    if (!progress || !user) return 0;
    
    return progress.filter(p => 
      p.courseId === courseId && 
      p.userId === user.uid && 
      p.completed === true
    ).length;
  };

  const getTotalVideosCount = (courseId: string) => {
    const course = courses?.find(c => c.id === courseId);
    return course?.videos?.length || 0;
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 animate-fade-in">
        <div className="container mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCourse(null);
                setSelectedVideo(null);
              }}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:scale-105 transition-all"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu den Kursen
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm animate-scale-in">
                <h1 className="text-3xl font-bold text-white mb-4">{selectedCourse.title}</h1>
                <p className="text-slate-300 mb-6">{selectedCourse.description}</p>
                
                {selectedVideo ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                      <iframe
                        src={getYouTubeEmbedUrl(selectedVideo.youtubeUrl)}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-white">{selectedVideo.title}</h2>
                        <p className="text-slate-400 text-sm">
                          Dauer: {selectedVideo.duration} Minuten
                        </p>
                        {isVideoCompleted(selectedCourse.id, selectedVideo.id) && (
                          <p className="text-green-400 text-sm flex items-center mt-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Abgeschlossen
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!isVideoCompleted(selectedCourse.id, selectedVideo.id) ? (
                          <Button 
                            className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all"
                            onClick={() => markVideoCompleted(selectedCourse.id, selectedVideo.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Lektion abgeschlossen
                          </Button>
                        ) : (
                          <Button 
                            variant="outline"
                            className="border-green-400/30 text-green-400 cursor-default"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Abgeschlossen
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PlayCircle className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-white">Wähle ein Video aus der Liste</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedCourse.videos && selectedCourse.videos.length > 0 && (
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-white">Kurslektionen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedCourse.videos.map((video, index) => {
                      const videoCompleted = isVideoCompleted(selectedCourse.id, video.id);
                      return (
                        <div
                          key={video.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                            selectedVideo?.id === video.id 
                              ? 'bg-blue-600/20 border border-blue-400/30' 
                              : 'bg-slate-700 hover:bg-slate-600'
                          }`}
                          onClick={() => setSelectedVideo(video)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-white font-medium">{video.title}</p>
                              <p className="text-slate-400 text-sm">{video.duration} Minuten</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {videoCompleted && (
                                <Badge className="bg-green-600/20 text-green-400 border-green-400/30">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Abgeschlossen
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-white">Kursfortschritt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={getCourseProgress(selectedCourse.id)} className="w-full" />
                    <p className="text-slate-300 text-sm">
                      {getCourseProgress(selectedCourse.id)}% abgeschlossen
                    </p>
                    <div className="text-xs text-slate-400">
                      {getCompletedVideosCount(selectedCourse.id)} von {getTotalVideosCount(selectedCourse.id)} Videos abgeschlossen
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-white">Kursdetails</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <Clock className="h-4 w-4 mr-2" />
                    {Math.floor(selectedCourse.duration / 60)}h {selectedCourse.duration % 60}m
                  </div>
                  <div className="flex items-center text-slate-300">
                    <User className="h-4 w-4 mr-2" />
                    {selectedCourse.instructor}
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Star className="h-4 w-4 mr-2" />
                    {selectedCourse.level}
                  </div>
                  <Badge className={getTierColor(selectedCourse.tierRequired)}>
                    {selectedCourse.tierRequired}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Meine Kurse</h1>
          <p className="text-xl text-slate-300">
            Entdecke und lerne mit unseren professionellen IT-Kursen
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 animate-pulse">
                <div className="h-48 bg-slate-700 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded mb-4"></div>
                  <div className="h-8 bg-slate-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses?.map((course) => {
              const courseProgress = getCourseProgress(course.id);
              const isPurchased = isCoursePurchased(course.id);
              
              return (
                <Card key={course.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all hover:scale-105 overflow-hidden animate-fade-in backdrop-blur-sm">
                  <div className="relative">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getTierColor(course.tierRequired)}>
                        {course.tierRequired}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {course.level}
                      </Badge>
                    </div>
                    {isPurchased && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Bereit
                        </Badge>
                      </div>
                    )}
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
                        {Math.floor(course.duration / 60)}h {course.duration % 60}m
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {course.instructor}
                      </div>
                      <div className="font-semibold text-blue-400">
                        €{course.price}
                      </div>
                    </div>

                    {isPurchased && courseProgress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-400 mb-1">
                          <span>Fortschritt</span>
                          <span>{courseProgress}%</span>
                        </div>
                        <Progress value={courseProgress} className="w-full" />
                      </div>
                    )}
                    
                    {isPurchased ? (
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all"
                        onClick={() => startWatchingCourse(course)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        {courseProgress > 0 ? "Fortsetzen" : "Starten"}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all"
                        onClick={() => buyCourse(course.id, course.price)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Kurs starten
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;