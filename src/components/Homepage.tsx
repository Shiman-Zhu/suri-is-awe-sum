import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface HomepageProps {
  currentLocation: string;
  destination: string;
  onCurrentLocationChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onGetDirections: () => void;
}

export function Homepage({
  currentLocation,
  destination,
  onCurrentLocationChange,
  onDestinationChange,
  onGetDirections,
}: HomepageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLocation.trim() && destination.trim()) {
      onGetDirections();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="mb-4 text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent px-[0px] py-[20px] transform -rotate-1" style={{ fontFamily: '"Times New Roman", "Chalkduster", "Bradley Hand", cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          <span>Sig</span>
            <span className="mb-4 text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 bg-clip-text text-transparent px-[0px] py-[20px] relative mx-1" >
              <span className="absolute -top-36 mb-4 font-bold bg-gradient-to-b from-purple-600 via-pink-500 bg-clip-text text-transparent px-[0px] py-[70px] left-1/3 transform -translate-x-1/2 -rotate-90 origin-center">aps</span>
              <span>Σ</span>
              </span>
          </h1>
          <div/>
          <p className="text-gray-600 text-lg px-4" style={{ fontFamily: '"Comic Sans", "Chalkduster", "Bradley Hand", cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            Directions, but make them funny.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-location" className="text-gray-700 mb-2 block">
                  Current Location
                </Label>
                <Input
                  id="current-location"
                  type="text"
                  value={currentLocation}
                  onChange={(e) => onCurrentLocationChange(e.target.value)}
                  placeholder="Where are you stuck?"
                  className="bg-white/80 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                />
              </div>
              
              <div>
                <Label htmlFor="destination" className="text-gray-700 mb-2 block">
                  Destination
                </Label>
                <Input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => onDestinationChange(e.target.value)}
                  placeholder="Where do you want to be confused about going?"
                  className="bg-white/80 border-2 border-cyan-200 focus:border-cyan-400 rounded-xl"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!currentLocation.trim() || !destination.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            Get Directions
          </Button>
        </form>

        {/* Fun decorative elements */}
        <div className="mt-8 flex justify-center space-x-4 text-2xl">
          <span className="animate-bounce">🗺️</span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🧭</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🚶</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>❓</span>
        </div>
      </div>
    </div>
  );
}