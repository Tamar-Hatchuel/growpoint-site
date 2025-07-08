
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if popup has already been shown this session
    const hasShown = sessionStorage.getItem('exit-intent-popup-shown');
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop when mouse leaves toward the top of the page
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true);
        sessionStorage.setItem('exit-intent-popup-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    handleClose();
    navigate('/demo');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-md w-full border-[#E5989B] shadow-xl animate-scale-in">
        <CardContent className="p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#B5828C] mb-4">
              Wait! Before you go, see how GrowPoint can help your team thrive.
            </h3>
            
            <div className="space-y-3">
              <Button
                onClick={handleButtonClick}
                className="w-full bg-[#B5828C] hover:bg-[#B5828C]/90 text-white"
              >
                Watch the Demo
              </Button>
              
              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800"
              >
                No thanks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;
