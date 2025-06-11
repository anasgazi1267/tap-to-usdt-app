
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react';

interface WithdrawProps {
  userBalance: number;
  referralCount: number;
}

const Withdraw = ({ userBalance, referralCount }: WithdrawProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawalHistory] = useState([
    { id: 1, amount: 1.00, status: 'Pending', date: '2024-01-20', txHash: '' },
    { id: 2, amount: 0.50, status: 'Completed', date: '2024-01-15', txHash: '0x123...abc' }
  ]);

  const canWithdraw1Dollar = referralCount >= 5 && userBalance >= 1;
  const canWithdraw5Dollar = referralCount >= 10 && userBalance >= 5;
  const canWithdraw = canWithdraw1Dollar || canWithdraw5Dollar;

  const handleWithdraw = () => {
    if (!canWithdraw || !walletAddress || !withdrawAmount) return;
    
    setIsProcessing(true);
    
    // Simulate withdrawal process
    setTimeout(() => {
      setIsProcessing(false);
      setWithdrawAmount('');
      setWalletAddress('');
      // Here you would typically update the withdrawal history and balance
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-white space-y-2">
        <h1 className="text-2xl font-bold">Withdraw</h1>
        <p className="text-white/80">Withdraw your USDT earnings</p>
      </div>

      {/* Current Balance */}
      <Card className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
        <div className="text-center space-y-2">
          <Wallet className="h-8 w-8 text-green-400 mx-auto" />
          <div className="text-sm text-white/80">Available Balance</div>
          <div className="text-3xl font-bold text-green-400">
            ${userBalance.toFixed(2)} USDT
          </div>
        </div>
      </Card>

      {/* Withdrawal Requirements */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold mb-3 text-foreground">Withdrawal Requirements</h3>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded ${canWithdraw1Dollar ? 'bg-green-500/20 border border-green-500/30' : 'bg-accent/30'}`}>
            <div>
              <div className="font-medium text-foreground">$1 Minimum</div>
              <div className="text-sm text-muted-foreground">Requires 5 referrals</div>
            </div>
            <div className="flex items-center space-x-2">
              {canWithdraw1Dollar ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              )}
              <span className="text-sm">{referralCount}/5</span>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded ${canWithdraw5Dollar ? 'bg-green-500/20 border border-green-500/30' : 'bg-accent/30'}`}>
            <div>
              <div className="font-medium text-foreground">$5 Minimum</div>
              <div className="text-sm text-muted-foreground">Requires 10 referrals</div>
            </div>
            <div className="flex items-center space-x-2">
              {canWithdraw5Dollar ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              )}
              <span className="text-sm">{referralCount}/10</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Withdrawal Form */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold mb-4 text-foreground">Withdraw Funds</h3>
        
        {canWithdraw ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-foreground">Amount (USDT)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-accent/50 border-border/50"
                min={canWithdraw5Dollar ? "5" : "1"}
                max={userBalance.toString()}
              />
            </div>

            <div>
              <Label htmlFor="wallet" className="text-foreground">USDT Wallet Address (TRC20)</Label>
              <Input
                id="wallet"
                placeholder="Enter your USDT wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-accent/50 border-border/50"
              />
            </div>

            <Button 
              onClick={handleWithdraw}
              disabled={isProcessing || !withdrawAmount || !walletAddress}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isProcessing ? 'Processing...' : 'Request Withdrawal'}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-3 py-6">
            <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto" />
            <div className="text-foreground">Withdrawal Requirements Not Met</div>
            <div className="text-sm text-muted-foreground">
              You need {5 - referralCount} more referrals to withdraw $1
            </div>
          </div>
        )}
      </Card>

      {/* Withdrawal History */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h3 className="font-semibold mb-3 text-foreground">Withdrawal History</h3>
        {withdrawalHistory.length > 0 ? (
          <div className="space-y-3">
            {withdrawalHistory.map((withdrawal) => (
              <div key={withdrawal.id} className="flex justify-between items-center p-3 bg-accent/30 rounded">
                <div>
                  <div className="font-medium text-foreground">${withdrawal.amount.toFixed(2)} USDT</div>
                  <div className="text-xs text-muted-foreground">{withdrawal.date}</div>
                  {withdrawal.txHash && (
                    <div className="text-xs text-blue-400 truncate w-32">{withdrawal.txHash}</div>
                  )}
                </div>
                <div className={`text-sm px-2 py-1 rounded ${
                  withdrawal.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {withdrawal.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            No withdrawals yet
          </div>
        )}
      </Card>
    </div>
  );
};

export default Withdraw;
