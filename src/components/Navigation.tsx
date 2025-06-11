
import React from 'react';
import { Card } from '@/components/ui/card';
import { Home, Gift, TrendingUp, Users, Wallet } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation = ({ currentPage, setCurrentPage }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'spin', icon: Gift, label: 'Spin' },
    { id: 'tasks', icon: TrendingUp, label: 'Tasks' },
    { id: 'referrals', icon: Users, label: 'Referrals' },
    { id: 'withdraw', icon: Wallet, label: 'Withdraw' }
  ];

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 rounded-none">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default Navigation;
