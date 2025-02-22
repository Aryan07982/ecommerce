"use client";

import React, { createContext, useContext, useState } from 'react';

// Types
type Transaction = {
  id: string;
  type: 'EARNED' | 'SPENT';
  points: number;
  description: string;
  timestamp: Date;
  expiryDate?: Date;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
  earned: boolean;
};

type RewardsContextType = {
  wishlist: number[];
  transactions: Transaction[];
  achievements: Achievement[];
  toggleWishlist: (id: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
};

// Create context
const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

// Provider component
export const RewardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'Eco Starter',
      description: 'Made your first sustainable choice',
      icon: '🌱',
      threshold: 1,
      earned: false,
    },
    {
      id: '2',
      name: 'Green Champion',
      description: 'Spent 1000 points on eco-friendly rewards',
      icon: '🌍',
      threshold: 1000,
      earned: false,
    },
    {
      id: '3',
      name: 'Waste Warrior',
      description: 'Successfully managed waste 10 times',
      icon: '♻️',
      threshold: 10,
      earned: false,
    },
  ]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setTransactions(prev => [...prev, newTransaction]);
    
    // Update achievements
    const totalSpent = transactions
      .filter(t => t.type === 'SPENT')
      .reduce((sum, t) => sum + t.points, 0) + (transaction.type === 'SPENT' ? transaction.points : 0);
    
    setAchievements(prev => prev.map(achievement => ({
      ...achievement,
      earned: 
        achievement.id === '1' ? true :
        achievement.id === '2' ? totalSpent >= 1000 :
        achievement.earned
    })));
  };

  return (
    <RewardsContext.Provider value={{
      wishlist,
      transactions,
      achievements,
      toggleWishlist,
      addTransaction,
    }}>
      {children}
    </RewardsContext.Provider>
  );
};

// Custom hook
export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};