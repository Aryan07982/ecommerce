"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  X,
  Heart,
  CheckCircle,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

interface Reward {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string;
  image: string;
  category: "lamps" | "handbags" | "decor" | "others";
}

const RewardsPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "lamps" | "handbags" | "decor" | "others"
  >("all");
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Reward[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rewards: Reward[] = [
    {
      id: 1,
      name: "Recycled Denim Backpack",
      price: 300,
      description:
        "A trendy and durable backpack crafted from 100% recycled denim.",
      details: "8 pairs of jeans repurposed",
      image: "https://m.media-amazon.com/images/I/61eXtXoWpbL._SX679_.jpg",
      category: "others",
    },
    {
      id: 2,
      name: "Upcycled Glass Lamp",
      price: 250,
      description:
        "An elegant and sustainable glass lamp made from reclaimed bottles.",
      details: "5 glass bottles repurposed",
      image: "https://m.media-amazon.com/images/I/61aqkzbiRtL._SX679_.jpg",
      category: "lamps",
    },
    {
      id: 3,
      name: "Eco-Friendly Handbag",
      price: 450,
      description: "Stylish handbag made from sustainable materials.",
      details: "Vegan leather, recycled materials",
      image: "https://m.media-amazon.com/images/I/51IMN74wTRL._SX679_.jpg",
      category: "handbags",
    },
    {
      id: 4,
      name: "Recycled Metal Decor",
      price: 200,
      description: "Beautiful wall art made from recycled metal.",
      details: "100% recycled materials",
      image:
        "https://m.media-amazon.com/images/I/31k4TSCiC1L._SX300_SY300_QL70_FMwebp_.jpg",
      category: "decor",
    },
    {
      id: 5,
      name: "Recycled Denim Jacket",
      price: 300,
      description:
        "A trendy and durable jacket crafted from 100% recycled denim.",
      details: "8 pairs of jeans repurposed",
      image: "https://m.media-amazon.com/images/I/814BQlJrFtL._SY879_.jpg",
      category: "others",
    },
    {
      id: 6,
      name: "Upcycled Red Glass Lamp",
      price: 250,
      description:
        "An elegant and sustainable glass lamp made from reclaimed bottles.",
      details: "5 glass bottles repurposed",
      image:
        "https://m.media-amazon.com/images/I/41RXJJlvY3L._SX300_SY300_QL70_FMwebp_.jpg",
      category: "lamps",
    },
    {
      id: 7,
      name: "Organic Cotton Tote Bag",
      price: 450,
      description: "Stylish handbag made from sustainable materials.",
      details: "Vegan leather, recycled materials",
      image:
        "https://m.media-amazon.com/images/I/41aISMfUP6L._SX300_SY300_QL70_FMwebp_.jpg",
      category: "handbags",
    },
    {
      id: 8,
      name: "Recycled Plastic Sunglasses",
      price: 200,
      description: "Sunglasses made from recycled plastic.",
      details: "100% recycled materials",
      image: "https://m.media-amazon.com/images/I/41hB7sS0J4L._SX679_.jpg",
      category: "others",
    },
  ];

  const handleClaim = useCallback(
    (reward: Reward) => {
      setSelectedReward(reward);
      setShowSuccess(true);
      setCartItems([...cartItems, reward]);
    },
    [cartItems]
  );

  const filteredRewards = rewards.filter(
    (reward) =>
      (activeCategory === "all" || reward.category === activeCategory) &&
      reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FloatingCartButton = () => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
      onClick={() => setShowCart(true)}
    >
      <ShoppingCart className="h-6 w-6" />
      {cartItems.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
        >
          {cartItems.length}
        </motion.div>
      )}
    </motion.button>
  );

  const RewardCard = ({ reward }: { reward: Reward }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="group relative bg-white rounded-3xl p-6 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl border border-gray-100"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-xl mb-4">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={reward.image}
              alt={reward.name}
              width={500}
              height={500}
              className="w-full h-64 object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute top-2 right-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <Button
              variant="ghost"
              className="rounded-full bg-white/80 p-2 hover:bg-white"
            >
              <Heart className="h-5 w-5 text-red-500" />
            </Button>
          </motion.div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{reward.name}</h3>
        <p className="text-gray-600 mb-4">{reward.description}</p>
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-500">{reward.details}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-green-600">
            ₹{reward.price}
          </span>
          <Button
            onClick={() => handleClaim(reward)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
          >
            Add to Cart
          </Button>
        </div>
      </motion.div>
    );
  };

  const categories: ("all" | "lamps" | "handbags" | "decor" | "others")[] = [
    "all",
    "lamps",
    "handbags",
    "decor",
    "others",
  ];

  const CategoryButton = ({
    category,
    label,
  }: {
    category: typeof activeCategory;
    label: string;
  }) => (
    <button
      onClick={() => setActiveCategory(category)}
      className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
        activeCategory === category
          ? "bg-green-500 text-white shadow-lg transform scale-105"
          : "bg-white text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  const CartSidebar = () => (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-6 z-50"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-800 flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2 text-green-800" />
          Your Cart
        </h2>
        <Button variant="ghost" onClick={() => setShowCart(false)}>
          <X className="h-6 w-6 text-green-800" />
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <ShoppingCart className="h-16 w-16 text-gray-300" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-green-800">{item.name}</h3>
                <p className="text-green-600 font-bold">₹{item.price}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                className="rounded-full bg-red-500 text-white p-2 hover:bg-red-600"
                onClick={() =>
                  setCartItems(cartItems.filter((_, i) => i !== index))
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-green-800">
                Total ({cartItems.length} items)
              </span>
              <span className="font-bold text-green-600">
                ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}
              </span>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-lg font-medium"
              onClick={() => {
                setShowSuccess(true);
                setShowCart(false);
              }}
            >
              Checkout Now
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingCartButton />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            Bin.AI
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </main>

      <AnimatePresence>{showCart && <CartSidebar />}</AnimatePresence>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Added to Cart!
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedReward
                ? `${selectedReward.name} has been added to your cart.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        .animate-bounce-in {
          animation: bounce-in 1s cubic-bezier(0.36, 0, 0.66, 1) 0.6s both;
        }
      `}</style>
    </div>
  );
};

export default RewardsPage;
