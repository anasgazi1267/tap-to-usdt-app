
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Share, Plus } from 'lucide-react';

interface ReferralsProps {
  referralCount: number;
}

const Referrals = ({ referralCount }: ReferralsProps) => {
  const [referralCode] = useState('EARN2024ABC');
  const [copied, setCopied] = useState(false);

  const referralLink = `https://t.me/earnbot?start=${referralCode}`;
  
  const referralData = [
    { name: 'Alice', earnings: 0.20, status: 'Active', joinDate: '2024-01-15' },
    { name: 'Bob', earnings: 0.20, status: 'Active', joinDate: '2024-01-10' },
    { name: 'Charlie', earnings: 0.20, status: 'Active', joinDate: '2024-01-08' }
  ];

  const totalEarnings = referralData.reduce((sum, ref) => sum + ref.earnings, 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join EarnBot',
        text: 'Start earning USDT with me on EarnBot!',
        url: referralLink
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-white space-y-2">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <p className="text-white/80">Invite friends and earn $0.20 per referral</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <Users className="h-6 w-6 text-blue-400 mx-auto" />
            <div className="text-sm text-muted-foreground">Total Referrals</div>
            <div className="text-2xl font-bold text-blue-400">{referralCount}</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <Plus className="h-6 w-6 text-green-400 mx-auto" />
            <div className="text-sm text-muted-foreground">Total Earned</div>
            <div className="text-2xl font-bold text-green-400">${totalEarnings.toFixed(2)}</div>
          </div>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Your Referral Link</h3>
          
          <div className="flex space-x-2">
            <Input 
              value={referralLink}
              readOnly
              className="bg-accent/50 border-border/50"
            />
            <Button 
              onClick={handleCopyLink}
              variant="outline"
              className="border-border/50"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <Button 
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <Share className="h-4 w-4 mr-2" />
            Share Link
          </Button>
        </div>
      </Card>

      {/* Referral Requirements */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold mb-3 text-foreground">Withdrawal Requirements</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Withdraw $1:</span>
            <span className="text-foreground">5 referrals needed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Withdraw $5:</span>
            <span className="text-foreground">10 referrals needed</span>
          </div>
          <div className="mt-3 p-2 bg-accent/50 rounded text-center">
            <span className="text-sm text-muted-foreground">
              Progress: {referralCount}/5 referrals for $1 withdrawal
            </span>
          </div>
        </div>
      </Card>

      {/* Referral List */}
      {referralData.length > 0 && (
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold mb-3 text-foreground">Your Referrals</h3>
          <div className="space-y-3">
            {referralData.map((ref, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-accent/30 rounded">
                <div>
                  <div className="font-medium text-foreground">{ref.name}</div>
                  <div className="text-xs text-muted-foreground">Joined {ref.joinDate}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-400">
                    +${ref.earnings.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">{ref.status}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Referrals;
