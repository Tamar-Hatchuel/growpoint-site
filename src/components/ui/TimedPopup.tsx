
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TimedPopupProps {
  message: string;
  buttonText: string;
  buttonLink: string;
  delay: number;
  sessionKey: string;
  debugMode?: boolean;
}

const TimedPopup = ({ 
  message, 
  buttonText, 
  buttonLink, 
  delay, 
  sessionKey,
  debugMode = false 
}: TimedPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(delay);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`[TimedPopup] Initializing popup with sessionKey: ${sessionKey}`);
    
    // Check if popup has already been shown this session
    const hasShown = sessionStorage.getItem(sessionKey);
    console.log(`[TimedPopup] Session storage check - hasShown: ${hasShown}`);
    
    if (hasShown && !debugMode) {
      console.log(`[TimedPopup] Popup already shown in this session, skipping`);
      return;
    }

    console.log(`[TimedPopup] Starting countdown from ${delay}ms`);
    
    // Countdown timer for debugging
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        const newCount = prev - 1000;
        if (debugMode) {
          console.log(`[TimedPopup] Countdown: ${newCount / 1000}s remaining`);
        }
        return newCount;
      });
    }, 1000);

    const timer = setTimeout(() => {
      console.log(`[TimedPopup] Timer expired, showing popup`);
      setIsVisible(true);
      clearInterval(countdownInterval);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [delay, sessionKey, debugMode]);

  const handleClose = () => {
    console.log(`[TimedPopup] Popup closed by user`);
    setIsVisible(false);
    if (!debugMode) {
      sessionStorage.setItem(sessionKey, 'true');
      console.log(`[TimedPopup] Session storage updated: ${sessionKey} = true`);
    }
  };

  const handleButtonClick = () => {
    console.log(`[TimedPopup] Button clicked, navigating to: ${buttonLink}`);
    handleClose();
    navigate(buttonLink);
  };

  // Debug indicator
  if (debugMode && !isVisible && countdown > 0) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50">
        Popup in: {Math.ceil(countdown / 1000)}s
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-md w-full border-[#E5989B] shadow-xl animate-scale-in">
        <CardContent className="p-6 relative">
          {debugMode && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              DEBUG MODE
            </div>
          )}
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#B5828C] mb-4">
              {message}
            </h3>
            
            <div className="space-y-3">
              <Button
                onClick={handleButtonClick}
                className="w-full bg-[#B5828C] hover:bg-[#B5828C]/90 text-white"
              >
                {buttonText}
              </Button>
              
              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800"
              >
                Maybe later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimedPopup;
