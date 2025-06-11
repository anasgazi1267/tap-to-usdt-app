
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, DollarSign, Settings, LogOut, Search, Check, X } from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users] = useState([
    { id: 1, username: 'alice123', balance: 2.45, referrals: 8, status: 'Active', joined: '2024-01-15' },
    { id: 2, username: 'bob456', balance: 0.85, referrals: 3, status: 'Active', joined: '2024-01-10' },
    { id: 3, username: 'charlie789', balance: 5.20, referrals: 12, status: 'Blocked', joined: '2024-01-08' }
  ]);

  const [withdrawals] = useState([
    { id: 1, username: 'alice123', amount: 5.00, wallet: 'TR7NHqj...abc123', status: 'Pending', date: '2024-01-20' },
    { id: 2, username: 'bob456', amount: 1.00, wallet: 'TR9KLm4...def456', status: 'Approved', date: '2024-01-19' },
    { id: 3, username: 'charlie789', amount: 2.50, wallet: 'TR3Pqr8...ghi789', status: 'Denied', date: '2024-01-18' }
  ]);

  const [tasks] = useState([
    { id: 1, title: 'Watch Video Ad', reward: 0.05, active: true },
    { id: 2, title: 'Complete Survey', reward: 0.25, active: true },
    { id: 3, title: 'Download App', reward: 0.50, active: false }
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    totalWithdrawals: withdrawals.length,
    pendingWithdrawals: withdrawals.filter(w => w.status === 'Pending').length,
    totalPayout: withdrawals.filter(w => w.status === 'Approved').reduce((sum, w) => sum + w.amount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/80">Manage users, withdrawals, and system settings</p>
          </div>
          <Button onClick={onLogout} variant="outline" className="border-border/50 text-white hover:bg-accent/50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.pendingWithdrawals}</div>
                <div className="text-sm text-muted-foreground">Pending Withdrawals</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-foreground">${stats.totalPayout.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Total Payouts</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">User Management</h3>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-accent/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {users.filter(user => 
                  user.username.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-accent/30 rounded">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{user.username[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.username}</div>
                        <div className="text-sm text-muted-foreground">
                          Balance: ${user.balance.toFixed(2)} • Referrals: {user.referrals}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant={user.status === 'Active' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {user.status === 'Active' ? 'Block' : 'Unblock'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Withdrawal Requests</h3>
              <div className="space-y-3">
                {withdrawals.map(withdrawal => (
                  <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-accent/30 rounded">
                    <div>
                      <div className="font-medium text-foreground">{withdrawal.username}</div>
                      <div className="text-sm text-muted-foreground">
                        ${withdrawal.amount.toFixed(2)} USDT • {withdrawal.date}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {withdrawal.wallet}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={
                          withdrawal.status === 'Approved' ? 'default' : 
                          withdrawal.status === 'Denied' ? 'destructive' : 'secondary'
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                      {withdrawal.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Task Management</h3>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-accent/30 rounded">
                    <div>
                      <div className="font-medium text-foreground">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Reward: ${task.reward.toFixed(2)} USDT
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={task.active ? 'default' : 'secondary'}>
                        {task.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant={task.active ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {task.active ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Minimum Withdrawal ($1)
                    </label>
                    <Input 
                      type="number" 
                      defaultValue="5" 
                      className="bg-accent/50 border-border/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Required referrals</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Minimum Withdrawal ($5)
                    </label>
                    <Input 
                      type="number" 
                      defaultValue="10" 
                      className="bg-accent/50 border-border/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Required referrals</p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
