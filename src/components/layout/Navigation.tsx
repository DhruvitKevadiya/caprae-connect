import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  MessageCircle, 
  FileText, 
  Settings, 
  Building2,
  BarChart3,
  Bell
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    current: false,
  },
  {
    name: 'Matches',
    href: '/matches',
    icon: Users,
    current: false,
    badge: '3'
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: MessageCircle,
    current: false,
    badge: '5'
  },
  {
    name: 'Deal Flow',
    href: '/acquisition-process',
    icon: FileText,
    current: false,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    current: false,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    current: false,
  },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-neutral-900">Caprae Capital</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
            </Button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">JS</span>
              </div>
              <span className="text-sm font-medium text-neutral-900 hidden sm:block">
                John Smith
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-neutral-200">
        <div className="flex overflow-x-auto px-4 py-2 space-x-4">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <div className="relative">
                  <Icon className="w-4 h-4" />
                  {item.badge && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs min-w-[1rem] h-4 flex items-center justify-center p-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};