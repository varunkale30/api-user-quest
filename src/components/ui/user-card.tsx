import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Mail, Phone, Globe } from "lucide-react";
import type { User as UserType } from "@/types/user";

interface UserCardProps {
  user: UserType;
  index: number;
}

export const UserCard = ({ user, index }: UserCardProps) => {
  return (
    <Card className="group bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in border-0" 
          style={{ animationDelay: `${index * 100}ms` }}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {user.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                @{user.username}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm">{user.email}</span>
          </div>

          <div className="flex items-start space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              {user.address.street}, {user.address.suite}<br />
              {user.address.city} {user.address.zipcode}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm">{user.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm">{user.website}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">{user.company.name}</span>
          </p>
          <p className="text-xs text-muted-foreground italic">
            "{user.company.catchPhrase}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};