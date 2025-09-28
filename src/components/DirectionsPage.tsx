import { Button } from "./ui/button";
import { useState } from "react";

interface DirectionsPageProps {
  destination: string;
  onBackToHome: () => void;
}

// Mock funny directions data
const funnyDirections = [
  {
    id: 1,
    video: "/demoVid_1.mp4",
    caption: "START HERE",
    description: "Look around. Are you lost already? Good, that's the spirit!"
  },
  {
    id: 2,
    video: "/demoVid_2.mp4",
    caption: "WALK FORWARD",
    description: "But not too right, we're not making political statements here"
  },
  {
    id: 3,
    video: "/demoVid_3.mp4",
    caption: "WALK ON THE RIGHT PATH",
    description: "Put one foot in front of the other. Revolutionary, I know."
  },
  {
    id: 4,
    video: "/demoVid_4.mp4",
    caption: "TURN LEFT",
    description: "Question all your life choices that led you here"
  },
  {
    id: 5,
    image: "🔄",
    caption: "DO A 360°",
    description: "Spin around because why not? You're probably dizzy anyway"
  },
  {
    id: 6,
    image: "🎯",
    caption: "YOU'VE ARRIVED!",
    description: "Congratulations! You made it... somewhere. Was this your destination? ¯\\_(ツ)_/¯"
  }
];

export function DirectionsPage({ destination, onBackToHome }: DirectionsPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNextStep = () => {
    if (currentStep < funnyDirections.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Loop back to start or show completion
      setCurrentStep(0);
    }
  };

  const currentDirection = funnyDirections[currentStep];
  const isLastStep = currentStep === funnyDirections.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <p className="text-gray-600 mb-2">Directions to</p>
        <h2 className="text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {destination}
        </h2>
        <p className="text-sm text-gray-500 mt-2">Step {currentStep + 1} of {funnyDirections.length}</p>
      </div>

      {/* Main Direction Card */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          {/* Large emoji/icon */}
          <div className="text-center mb-6">
            {currentDirection.video ? (
              <video
                className="mx-auto rounded-2xl mb-4"
                src={currentDirection.video}
                width="400"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
    <div className="text-8xl mb-4">{currentDirection.image}</div>
  )}
            
            {/* Meme-style caption */}
            <div className="relative inline-block">
              <h3 
                className="text-4xl px-6 py-3 relative z-10"
                style={{
                  color: 'white',
                  textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 0px #000',
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
              >
                {currentDirection.caption}
              </h3>
            </div>
          </div>

          {/* Funny description */}
          <div className="text-center">
            <p className="text-lg text-gray-700 bg-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
              {currentDirection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="max-w-md mx-auto mb-8">
        <div className="bg-white/70 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / funnyDirections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto space-y-4">
        <Button
          onClick={handleNextStep}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          {isLastStep ? "Start Over (You're Probably Lost Anyway)" : "I'm here, what's next?"}
        </Button>
        
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="w-full border-2 border-gray-300 hover:border-gray-400 bg-white/70 backdrop-blur-sm py-4 rounded-xl"
        >
          Main Page
        </Button>
      </div>

      {/* Fun footer */}
      <div className="text-center mt-8 text-gray-500">
        <p className="text-sm">
          Sigmap™ is not responsible for you ending up in another dimension
        </p>
        <div className="mt-2 space-x-2">
          <span>🤷‍♂️</span>
          <span>🗺️</span>
          <span>❓</span>
        </div>
      </div>
    </div>
  );
}