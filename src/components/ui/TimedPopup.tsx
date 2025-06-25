
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
}

const TimedPopup = ({ message, buttonText, buttonLink, delay, sessionKey }: TimedPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if popup has already been shown this session
    const hasShown = sessionStorage.getItem(sessionKey);
    if (hasShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, sessionKey]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(sessionKey, 'true');
  };

  const handleButtonClick = () => {
    handleClose();
    navigate(buttonLink);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-md w-full border-[#E5989B] shadow-xl">
        <CardContent className="p-6 relative">
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
