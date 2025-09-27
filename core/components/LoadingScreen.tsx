export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Spinning Compass Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-spin flex items-center justify-center">
              <div className="w-1 h-8 bg-white rounded-full transform -rotate-45"></div>
            </div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-pink-400 rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Walking figure animation */}
        <div className="mb-8 flex justify-center">
          <div className="text-4xl animate-bounce" style={{ animationDuration: '1s' }}>
            🚶‍♂️
          </div>
          <div className="mx-2 flex space-x-1 items-center">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="text-4xl animate-bounce" style={{ animationDuration: '1.2s' }}>
            🏁
          </div>
        </div>

        {/* Loading text */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 max-w-md mx-auto">
          <p className="text-2xl text-gray-700 mb-2">
            Calculating the funniest route…
          </p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Fun loading messages */}
        <div className="mt-6 text-gray-600">
          <p className="animate-pulse">Please wait while we ignore the fastest route...</p>
        </div>
      </div>
    </div>
  );
}