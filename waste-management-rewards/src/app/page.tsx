"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Leaf, Search, ShoppingCart, Star, Filter, ChevronDown, Menu, X } from 'lucide-react';

export default function RewardsPage() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [userPoints, setUserPoints] = useState(2000);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [filteredRewards, setFilteredRewards] = useState([]);

  const categories = [
    "All Categories",
    "Electronics",
    "Home & Kitchen",
    "Fashion",
    "Sports",
    "Books",
    "Beauty",
  ];

  const allRewards = [
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      points: 100,
      originalPoints: 150,
      description: "High-quality sound with active noise cancellation",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      image: "https://m.media-amazon.com/images/I/713Lr2oNWaL._SX522_.jpg",
      inStock: true,
      delivery: "Delivery by Tomorrow"
    },
    {
      id: 2,
      name: "Smart Fitness Band",
      points: 300,
      originalPoints: 400,
      description: "Track your health and fitness goals",
      category: "Electronics",
      rating: 4.2,
      reviews: 256,
      image: "https://m.media-amazon.com/images/I/51iMzWsqrBL._SX679_.jpg",
      inStock: true,
      delivery: "Delivery in 2 days"
    },
    {
      id: 3,
      name: "Coffee Maker",
      points: 500,
      originalPoints: 600,
      description: "Premium coffee machine for perfect brews",
      category: "Home & Kitchen",
      rating: 4.7,
      reviews: 89,
      image: "https://m.media-amazon.com/images/I/41Hq2E2stgL._SX300_SY300_QL70_FMwebp_.jpg",
      inStock: true,
      delivery: "Delivery by Tomorrow"
    },
    {
      id: 4,
      name: "Running Shoes",
      points: 200,
      originalPoints: 250,
      description: "Professional running shoes with comfort fit",
      category: "Sports",
      rating: 4.3,
      reviews: 167,
      image: "https://m.media-amazon.com/images/I/71DHKbJfG0L._SY695_.jpg",
      inStock: true,
      delivery: "Delivery in 3 days"
    },
    {
      id: 5,
      name: "Fashion Book Collection",
      points: 150,
      originalPoints: 200,
      description: "Curated collection of fashion design books",
      category: "Books",
      rating: 4.4,
      reviews: 342,
      image: "https://m.media-amazon.com/images/I/51d8s6ptnXL._SX342_SY445_.jpg",
      inStock: true,
      delivery: "Express Delivery Available"
    },
    {
      id: 6,
      name: "Skincare Set",
      points: 180,
      originalPoints: 220,
      description: "Premium skincare collection",
      category: "Beauty",
      rating: 4.6,
      reviews: 95,
      image: "https://m.media-amazon.com/images/I/610BrrtNXaL._SX522_PIbundle-4,TopRight,0,0_AA522SH20_.jpg",
      delivery: "Delivery in 2-3 days"
    }
  ];

  // Filter and search functionality
  useEffect(() => {
    let results = allRewards;
    
    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      results = results.filter(reward => reward.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(reward => 
        reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredRewards(results);
  }, [selectedCategory, searchQuery]);

  // Cart functionality
  const addToCart = (reward) => {
    if (userPoints >= reward.points) {
      setCartItems([...cartItems, reward]);
      setUserPoints(userPoints - reward.points);
    }
  };

  const removeFromCart = (rewardId) => {
    const reward = cartItems.find(item => item.id === rewardId);
    setCartItems(cartItems.filter(item => item.id !== rewardId));
    setUserPoints(userPoints + reward.points);
  };

  // Cart Sidebar Component
  const CartSidebar = () => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <Button variant="ghost" onClick={() => setShowCart(false)}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-green-600 font-bold">{item.points} Points</p>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total Points:</span>
              <span className="font-bold text-green-600">
                {cartItems.reduce((sum, item) => sum + item.points, 0)}
              </span>
            </div>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => {
                setShowSuccessDialog(true);
                setShowCart(false);
              }}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">EcoRewards</span>
            </div>

            <div className="flex-1 max-w-2xl flex gap-2">
              <div className="flex-1 relative">
                <Input 
                  type="text"
                  placeholder="Search rewards..."
                  className="w-full py-2 px-4 rounded text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-white text-green-600 text-lg py-2">
                {userPoints} Points
              </Badge>
              <Button 
                variant="ghost" 
                className="relative"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-green-700 text-white py-2 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant="ghost" 
                className={`text-white hover:bg-green-600 ${
                  selectedCategory === category ? 'bg-green-600' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory}
            {filteredRewards.length > 0 && ` (${filteredRewards.length} items)`}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRewards.map((reward) => (
            <Card key={reward.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-medium text-lg mb-1 hover:text-green-600">
                  {reward.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-black ml-1">{reward.rating}</span>
                  </div>
                  <span className="text-gray-500">({reward.reviews})</span>
                </div>

                <div className="mb-2">
                  <span className="text-2xl font-bold">{reward.points}</span>
                  <span className="text-gray-500 line-through ml-2">
                    {reward.originalPoints}
                  </span>
                  <span className="text-green-600 ml-2">
                    {Math.round((1 - reward.points/reward.originalPoints) * 100)}% off
                  </span>
                </div>

                <div className="text-sm mb-3">
                  <span className="text-green-600">{reward.delivery}</span>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!reward.inStock || userPoints < reward.points}
                  onClick={() => addToCart(reward)}
                >
                  {!reward.inStock ? 'Out of Stock' : 
                   userPoints < reward.points ? 'Insufficient Points' : 
                   'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && <CartSidebar />}
      </AnimatePresence>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Confirmed!</AlertDialogTitle>
            <AlertDialogDescription>
              Your order has been placed successfully!
              <br /><br />
              Total Points Used: {cartItems.reduce((sum, item) => sum + item.points, 0)}
              <br />
              Estimated delivery: Within 3-5 business days
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setCartItems([]);
                setShowSuccessDialog(false);
              }}
            >
              Continue Shopping
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}