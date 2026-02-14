/**
 * Drake Equation Love Calculator Component
 * 
 * Interactive React component for calculating potential romantic partners.
 * Uses Tailwind CSS for styling (consistent with project standards).
 * 
 * Features:
 * - Form validation
 * - Animated results
 * - Step-by-step breakdown
 * - Responsive design
 * 
 * @component
 */

"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Telescope, MapPin, Calendar, GraduationCap, Sparkles, Heart, Users, RotateCcw } from "lucide-react";
import {
  calculatePotentialPartners,
  getHumorCategory,
  validateInput,
  LOCATIONS,
  AGE_RANGES,
  EDUCATION_LEVELS,
  ATTRACTIVENESS_LEVELS,
  RECIPROCITY_LEVELS,
  PERSONALITY_TAGS,
  type DrakeInput,
  type DrakeResult,
  type PersonalityTag
} from "@/algorithms/drake-equation";

interface FormState {
  locationKey: string;
  ageRangeKey: string;
  educationKey: string;
  attractivenessIndex: number;
  selectedTags: string[];
  reciprocityIndex: number;
  singleOnly: boolean;
}

export default function DrakeCalculator() {
  const [formState, setFormState] = useState<FormState>({
    locationKey: "hong-kong",
    ageRangeKey: "24-30",
    educationKey: "university",
    attractivenessIndex: 2,
    selectedTags: [],
    reciprocityIndex: 2,
    singleOnly: true
  });

  const [result, setResult] = useState<DrakeResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTagToggle = useCallback((tagId: string) => {
    setFormState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }));
  }, []);

  const constructInput = useCallback((): DrakeInput => {
    const selectedTagObjects = formState.selectedTags
      .map(id => PERSONALITY_TAGS.find(tag => tag.id === id))
      .filter((tag): tag is PersonalityTag => tag !== undefined);

    return {
      location: LOCATIONS[formState.locationKey],
      ageRange: AGE_RANGES[formState.ageRangeKey],
      education: EDUCATION_LEVELS[formState.educationKey],
      attractiveness: ATTRACTIVENESS_LEVELS[formState.attractivenessIndex],
      personalityTags: selectedTagObjects,
      reciprocity: RECIPROCITY_LEVELS[formState.reciprocityIndex],
      singleOnly: formState.singleOnly
    };
  }, [formState]);

  const handleCalculate = useCallback(async () => {
    setError(null);
    setIsCalculating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const input = constructInput();
      const validation = validateInput(input);
      
      if (!validation.valid) {
        setError(validation.error || "Invalid input");
        setIsCalculating(false);
        return;
      }

      const calculationResult = calculatePotentialPartners(input);
      setResult(calculationResult);
    } catch (err) {
      setError("Calculation failed. Please try again.");
      console.error("Drake Equation error:", err);
    } finally {
      setIsCalculating(false);
    }
  }, [constructInput]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setFormState({
      locationKey: "hong-kong",
      ageRangeKey: "24-30",
      educationKey: "university",
      attractivenessIndex: 2,
      selectedTags: [],
      reciprocityIndex: 2,
      singleOnly: true
    });
  }, []);

  const currentAttractiveness = ATTRACTIVENESS_LEVELS[formState.attractivenessIndex];
  const currentReciprocity = RECIPROCITY_LEVELS[formState.reciprocityIndex];

  if (result) {
    const humor = getHumorCategory(result.finalNumber);
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Result Header */}
          <div 
            className="p-8 text-center text-white"
            style={{ backgroundColor: humor.color }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              {humor.emoji}
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">{humor.title}</h2>
            <p className="opacity-90">Drake Equation Result</p>
          </div>

          {/* Result Body */}
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                {result.finalNumber.toLocaleString()}
              </motion.div>
              <p className="text-gray-600 text-lg mt-2">Potential Soulmates</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{humor.text}</p>
            </div>

            {/* Calculation Steps */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Telescope className="w-5 h-5 text-indigo-600" />
                Calculation Breakdown
              </h3>
              <code className="block bg-gray-100 p-3 rounded-lg text-sm text-gray-700 mb-4 font-mono">
                {result.formula}
              </code>
              
              <div className="space-y-2">
                {result.steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500"
                  >
                    <div>
                      <span className="font-medium text-gray-800">{step.label}</span>
                      <span className="text-gray-500 text-sm ml-2">({step.symbol})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-indigo-600">{step.percentage.toFixed(1)}%</span>
                      {step.runningTotal && (
                        <span className="text-green-600 text-sm ml-2">
                          → {Math.round(step.runningTotal).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Calculate Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <Telescope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Drake Equation</h1>
          <p className="text-gray-600">Calculate your potential soulmates using mathematics</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
          
          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Location
            </label>
            <select
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={formState.locationKey}
              onChange={(e) => setFormState({...formState, locationKey: e.target.value})}
            >
              {Object.entries(LOCATIONS).map(([key, loc]) => (
                <option key={key} value={key}>
                  {loc.name}, {loc.country} ({(loc.population / 1000000).toFixed(1)}M)
                </option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Age Range
            </label>
            <select
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={formState.ageRangeKey}
              onChange={(e) => setFormState({...formState, ageRangeKey: e.target.value})}
            >
              {Object.entries(AGE_RANGES).map(([key, range]) => (
                <option key={key} value={key}>
                  {range.label} (~{(range.factor * 100).toFixed(0)}% of population)
                </option>
              ))}
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Education Level
            </label>
            <select
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={formState.educationKey}
              onChange={(e) => setFormState({...formState, educationKey: e.target.value})}
            >
              {Object.entries(EDUCATION_LEVELS).map(([key, edu]) => (
                <option key={key} value={key}>
                  {edu.name} (~{(edu.factor * 100).toFixed(0)}%)
                </option>
              ))}
            </select>
          </div>

          {/* Attractiveness */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Attractiveness Standard
            </label>
            <input
              type="range"
              min="0"
              max={ATTRACTIVENESS_LEVELS.length - 1}
              value={formState.attractivenessIndex}
              onChange={(e) => setFormState({
                ...formState, 
                attractivenessIndex: parseInt(e.target.value)
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="mt-2 text-center">
              <span className="font-semibold text-indigo-600">{currentAttractiveness.label}</span>
              <p className="text-sm text-gray-500">{currentAttractiveness.description}</p>
            </div>
          </div>

          {/* Personality Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Heart className="w-4 h-4 text-indigo-600" />
              Personality Traits (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PERSONALITY_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    formState.selectedTags.includes(tag.id)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-1">{tag.icon}</span>
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Reciprocity */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Reciprocity Probability
            </label>
            <select
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={formState.reciprocityIndex}
              onChange={(e) => setFormState({
                ...formState, 
                reciprocityIndex: parseInt(e.target.value)
              })}
            >
              {RECIPROCITY_LEVELS.map((level, index) => (
                <option key={index} value={index}>
                  {level.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">{currentReciprocity.description}</p>
          </div>

          {/* Single Status */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="singleOnly"
              checked={formState.singleOnly}
              onChange={(e) => setFormState({...formState, singleOnly: e.target.checked})}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="singleOnly" className="text-gray-700">
              Only count single people (~40% of population)
            </label>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Telescope className="w-6 h-6" />
                </motion.div>
                Calculating Destiny...
              </>
            ) : (
              <>
                <Telescope className="w-6 h-6" />
                Calculate My Soulmates
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}