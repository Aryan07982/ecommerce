'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Leaf, Recycle, Trophy, Droplet, Sprout, Sun, ShoppingBag } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Page = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState("");

  const rewards = [
    {
      id: 1,
      name: "Eco-Friendly Earbuds",
      points: 100,
      description: "Made from recycled materials with sustainable packaging",
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      stats: "Saved 2kg plastic waste"
    },
    {
      id: 2,
      name: "Green Discount Coupon",
      points: 10,
      description: "10% off on eco-friendly products",
      icon: <Recycle className="h-12 w-12 text-green-600" />,
      stats: "Promotes sustainable shopping"
    },
    {
      id: 3,
      name: "Reusable Water Bottle",
      points: 50,
      description: "Premium stainless steel bottle, reducing single-use plastic",
      icon: <Droplet className="h-12 w-12 text-green-600" />,
      stats: "Prevents 300+ plastic bottles annually"
    },
    {
      id: 4,
      name: "Composting Starter Kit",
      points: 75,
      description: "Complete kit to start your home composting journey",
      icon: <Sprout className="h-12 w-12 text-green-600" />,
      stats: "Reduces 200kg yearly food waste"
    },
    {
      id: 5,
      name: "Solar-Powered Charger",
      points: 120,
      description: "Charge your devices using clean solar energy",
      icon: <Sun className="h-12 w-12 text-green-600" />,
      stats: "Saves 50kg CO2 emissions yearly"
    },
    {
      id: 6,
      name: "Zero-Waste Shopping Kit",
      points: 85,
      description: "Includes mesh bags, jars, and produce bags",
      icon: <ShoppingBag className="h-12 w-12 text-green-600" />,
      stats: "Eliminates 100+ plastic bags monthly"
    }
  ];

  const handleClaim = (rewardName: string) => {
    setSelectedReward(rewardName);
    setShowSuccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Trophy className="h-16 w-16 text-green-600" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-green-800 mb-4"
            variants={fadeIn}
          >
            EcoRewards Hub
          </motion.h1>
          <motion.p 
            className="text-lg text-green-600"
            variants={fadeIn}
          >
            Turn your sustainable actions into amazing rewards
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-white hover:shadow-xl transition-all duration-300 border-green-200 hover:border-green-400">
                <CardHeader>
                  <motion.div 
                    className="flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    {reward.icon}
                  </motion.div>
                  <CardTitle className="text-2xl text-center text-green-800">{reward.name}</CardTitle>
                  <CardDescription className="text-center text-green-600">
                    {reward.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {reward.points} Points
                    </div>
                    <div className="text-sm text-green-600">
                      {reward.stats}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                    onClick={() => handleClaim(reward.name)}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-green-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-800">Reward Claimed Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-green-600">
              You've successfully claimed {selectedReward}. Thank you for contributing to a sustainable future!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowSuccessDialog(false)}
            >
              Continue Making Impact
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;