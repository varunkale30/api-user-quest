import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/ui/user-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorDisplay } from "@/components/ui/error-display";
import { UserService } from "@/services/userService";
import { RefreshCw, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/user";

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await UserService.fetchUsers();
      setUsers(userData);
      
      if (userData.length > 0) {
        toast({
          title: "Success!",
          description: `Loaded ${userData.length} users successfully.`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              User Directory
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Discover our amazing community of users from around the world
            </p>
            <Button 
              onClick={handleRetry}
              disabled={loading}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm transition-all"
              size="lg"
            >
              {loading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <RefreshCw className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Loading...' : 'Refresh Data'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" text="Fetching user data..." />
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto">
            <ErrorDisplay 
              message={error} 
              onRetry={handleRetry}
            />
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Our Community
              </h2>
              <p className="text-muted-foreground">
                {users.length} amazing {users.length === 1 ? 'member' : 'members'} and counting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user, index) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No users found
            </h3>
            <p className="text-muted-foreground mb-6">
              It looks like there are no users to display right now.
            </p>
            <Button onClick={handleRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
