
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, Play } from 'lucide-react';

interface TasksProps {
  userBalance: number;
  setUserBalance: (balance: number) => void;
}

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  type: 'video' | 'survey' | 'app' | 'social';
  completed: boolean;
  timeRequired: string;
}

const Tasks = ({ userBalance, setUserBalance }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Watch Video Ad',
      description: 'Watch a 30-second advertisement',
      reward: 0.05,
      type: 'video',
      completed: false,
      timeRequired: '30s'
    },
    {
      id: 2,
      title: 'Complete Survey',
      description: 'Answer a quick 5-question survey',
      reward: 0.25,
      type: 'survey',
      completed: false,
      timeRequired: '2 min'
    },
    {
      id: 3,
      title: 'Download App',
      description: 'Download and try a recommended app',
      reward: 0.50,
      type: 'app',
      completed: false,
      timeRequired: '5 min'
    },
    {
      id: 4,
      title: 'Follow Social Media',
      description: 'Follow our official social media accounts',
      reward: 0.10,
      type: 'social',
      completed: true,
      timeRequired: '1 min'
    },
    {
      id: 5,
      title: 'Rate App',
      description: 'Rate our app on the app store',
      reward: 0.15,
      type: 'app',
      completed: false,
      timeRequired: '2 min'
    }
  ]);

  const handleCompleteTask = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId && !task.completed) {
          setUserBalance(userBalance + task.reward);
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '📺';
      case 'survey':
        return '📋';
      case 'app':
        return '📱';
      case 'social':
        return '👥';
      default:
        return '✨';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalEarnings = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.reward, 0);

  return (
    <div className="space-y-6">
      <div className="text-center text-white space-y-2">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-white/80">Complete tasks to earn USDT rewards</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Completed</div>
            <div className="text-xl font-bold text-green-400">{completedTasks}/{tasks.length}</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Earned</div>
            <div className="text-xl font-bold text-blue-400">${totalEarnings.toFixed(2)}</div>
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <Card key={task.id} className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getTaskIcon(task.type)}</div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.description}</div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-green-400 font-medium">
                      +${task.reward.toFixed(2)} USDT
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.timeRequired}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                {task.completed ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Done</span>
                  </div>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => handleCompleteTask(task.id)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
