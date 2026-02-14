"use client";

import { Heart, Calculator, Flame, MessageCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AlgorithmsDashboard() {
  const router = useRouter();

  const algorithms = [
    {
      id: "love-calculator",
      title: "Love Calculator",
      description: "Calculate the love compatibility between two people using a special algorithm",
      icon: Calculator,
      color: "from-pink-500 to-rose-500",
      path: "/love-calculator",
    },
    {
      id: "flames",
      title: "FLAMES Game",
      description: "Discover your relationship status with the classic FLAMES algorithm",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      path: "/algorithms/flames",
    },
    {
      id: "nickname-generator",
      title: "Couple Nickname",
      description: "Generate cute couple nicknames by combining two names",
      icon: MessageCircle,
      color: "from-purple-500 to-pink-500",
      path: "/nickname-generator",
    },
    {
      id: "card-creator",
      title: "Valentine Card",
      description: "Create and send beautiful personalized valentine cards",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      path: "/create",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900">
              Love Algorithms
            </h1>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of romantic algorithms and tools to celebrate love
          </p>
        </motion.div>

        {/* Algorithm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {algorithms.map((algo, index) => (
            <motion.div
              key={algo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(algo.path)}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-8">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${algo.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <algo.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {algo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {algo.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-pink-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Try it now</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Decorative Hearts */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-white border-2 border-pink-200 rounded-xl text-gray-700 font-semibold hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    </main>
  );
}
