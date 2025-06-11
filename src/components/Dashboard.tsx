
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, Users, Gift } from 'lucide-react';

interface DashboardProps {
  userBalance: number;
  referralCount: number;
}

const Dashboard = ({ userBalance, referralCount }: DashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center text-white space-y-2">
        <h1 className="text-2xl font-bold">Welcome to EarnBot</h1>
        <p className="text-white/80">Start earning USDT today!</p>
      </div>

      {/* Balance Card */}
      <Card className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Wallet className="h-6 w-6 text-green-400" />
            <span className="text-white/80">Your Balance</span>
          </div>
          <div className="text-3xl font-bold text-green-400">
            ${userBalance.toFixed(2)} USDT
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <Users className="h-6 w-6 text-blue-400 mx-auto" />
            <div className="text-sm text-muted-foreground">Referrals</div>
            <div className="text-xl font-bold text-blue-400">{referralCount}</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <TrendingUp className="h-6 w-6 text-purple-400 mx-auto" />
            <div className="text-sm text-muted-foreground">Today's Earnings</div>
            <div className="text-xl font-bold text-purple-400">$0.15</div>
          </div>
        </Card>
      </div>

      {/* Earning Options */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Earning Options</h2>
        
        <div className="space-y-3">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Daily Spin</div>
                  <div className="text-sm text-muted-foreground">Earn up to $0.10 USDT</div>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                Spin
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Complete Tasks</div>
                  <div className="text-sm text-muted-foreground">Earn $0.05-$0.50 per task</div>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Start
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Invite Friends</div>
                  <div className="text-sm text-muted-foreground">Earn $0.20 per referral</div>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Invite
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
