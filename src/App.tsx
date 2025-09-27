import { useState } from "react";
import { Homepage } from "./components/Homepage";
import { LoadingScreen } from "./components/LoadingScreen";
import { DirectionsPage } from "./components/DirectionsPage";

type Screen = "homepage" | "loading" | "directions";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("homepage");
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleGetDirections = () => {
    setCurrentScreen("loading");
    // Show loading screen for 3 seconds before showing directions
    setTimeout(() => {
      setCurrentScreen("directions");
    }, 3000);
  };

  const handleBackToHome = () => {
    setCurrentScreen("homepage");
    // Reset form data
    setCurrentLocation("");
    setDestination("");
  };

  return (
    <div className="size-full">
      {currentScreen === "homepage" && (
        <Homepage
          currentLocation={currentLocation}
          destination={destination}
          onCurrentLocationChange={setCurrentLocation}
          onDestinationChange={setDestination}
          onGetDirections={handleGetDirections}
        />
      )}
      
      {currentScreen === "loading" && <LoadingScreen />}
      
      {currentScreen === "directions" && (
        <DirectionsPage
          destination={destination}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}