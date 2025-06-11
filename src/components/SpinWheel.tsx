
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Play } from 'lucide-react';

interface SpinWheelProps {
  userBalance: number;
  setUserBalance: (balance: number) => void;
}

const SpinWheel = ({ userBalance, setUserBalance }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);

  const spinRewards = [0.01, 0.02, 0.03, 0.05, 0.08, 0.10];

  const handleSpin = () => {
    if (hasSpunToday) return;
    
    setIsSpinning(true);
    
    setTimeout(() => {
      const reward = spinRewards[Math.floor(Math.random() * spinRewards.length)];
      setSpinResult(reward);
      setUserBalance(userBalance + reward);
      setIsSpinning(false);
      setHasSpunToday(true);
    }, 3000);
  };

  const handleWatchAd = () => {
    // Simulate watching an ad
    setTimeout(() => {
      handleSpin();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-white space-y-2">
        <h1 className="text-2xl font-bold">Daily Spin</h1>
        <p className="text-white/80">Watch an ad and spin to earn USDT!</p>
      </div>

      {/* Spin Wheel */}
      <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="text-center space-y-6">
          <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center border-4 border-white/20 ${isSpinning ? 'animate-spin' : ''}`}>
            <div className="w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Gift className="h-16 w-16 text-white" />
            </div>
          </div>

          {spinResult && (
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold text-foreground">Congratulations!</div>
              <div className="text-2xl font-bold text-green-400">
                +${spinResult.toFixed(2)} USDT
              </div>
            </div>
          )}

          {!hasSpunToday ? (
            <div className="space-y-4">
              <Button 
                onClick={handleWatchAd}
                disabled={isSpinning}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {isSpinning ? 'Spinning...' : 'Watch Ad & Spin'}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="text-muted-foreground">Come back tomorrow for another spin!</div>
              <div className="text-sm text-green-400">✓ Today's spin completed</div>
            </div>
          )}
        </div>
      </Card>

      {/* Rewards List */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold mb-3 text-foreground">Possible Rewards</h3>
        <div className="grid grid-cols-3 gap-2">
          {spinRewards.map((reward, index) => (
            <div key={index} className="text-center p-2 bg-accent/50 rounded">
              <div className="text-sm font-medium text-foreground">${reward.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SpinWheel;
