
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import SpinWheel from '../components/SpinWheel';
import Tasks from '../components/Tasks';
import Referrals from '../components/Referrals';
import Withdraw from '../components/Withdraw';
import AdminPanel from '../components/AdminPanel';
import Navigation from '../components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userBalance, setUserBalance] = useState(0.25);
  const [referralCount, setReferralCount] = useState(3);

  // Mock login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Mock admin login
  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentPage('admin');
  };

  if (!isLoggedIn && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                EarnBot
              </h1>
              <p className="text-muted-foreground">
                Earn USDT through daily spins, tasks, and referrals
              </p>
            </div>
            
            <div className="space-y-4">
              <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Login with Telegram
              </Button>
              
              <Button 
                onClick={handleAdminLogin} 
                variant="outline" 
                className="w-full border-border/50 hover:bg-accent/50"
              >
                Admin Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isAdmin) {
    return <AdminPanel onLogout={() => { setIsAdmin(false); setCurrentPage('dashboard'); }} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userBalance={userBalance} referralCount={referralCount} />;
      case 'spin':
        return <SpinWheel userBalance={userBalance} setUserBalance={setUserBalance} />;
      case 'tasks':
        return <Tasks userBalance={userBalance} setUserBalance={setUserBalance} />;
      case 'referrals':
        return <Referrals referralCount={referralCount} />;
      case 'withdraw':
        return <Withdraw userBalance={userBalance} referralCount={referralCount} />;
      default:
        return <Dashboard userBalance={userBalance} referralCount={referralCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6 pb-20">
        {renderPage()}
      </div>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Index;
