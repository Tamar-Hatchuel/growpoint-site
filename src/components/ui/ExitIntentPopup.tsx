
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExitIntentPopupProps {
  debugMode?: boolean;
}

const ExitIntentPopup = ({ debugMode = false }: ExitIntentPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[ExitIntentPopup] Initializing exit intent detection');
    
    // Check if popup has already been shown this session
    const hasShown = sessionStorage.getItem('exit-intent-popup-shown');
    console.log(`[ExitIntentPopup] Session storage check - hasShown: ${hasShown}`);
    
    if (hasShown && !debugMode) {
      console.log('[ExitIntentPopup] Popup already shown in this session, skipping');
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (debugMode) {
        console.log(`[ExitIntentPopup] Mouse position: x=${e.clientX}, y=${e.clientY}`);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      console.log(`[ExitIntentPopup] Mouse leave detected at: x=${e.clientX}, y=${e.clientY}`);
      
      // More lenient exit intent - trigger when mouse leaves toward top or sides
      const triggerExit = e.clientY <= 10 || e.clientX <= 10 || e.clientX >= window.innerWidth - 10;
      
      if (triggerExit && !isVisible) {
        console.log('[ExitIntentPopup] Exit intent triggered, showing popup');
        setIsVisible(true);
        if (!debugMode) {
          sessionStorage.setItem('exit-intent-popup-shown', 'true');
        }
      }
    };

    // Also listen for visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden && !isVisible) {
        console.log('[ExitIntentPopup] Tab hidden, triggering exit intent');
        setIsVisible(true);
        if (!debugMode) {
          sessionStorage.setItem('exit-intent-popup-shown', 'true');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible, debugMode]);

  const handleClose = () => {
    console.log('[ExitIntentPopup] Popup closed by user');
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    console.log('[ExitIntentPopup] Button clicked, navigating to demo');
    handleClose();
    navigate('/demo');
  };

  // Debug indicator
  if (debugMode && !isVisible) {
    return (
      <div className="fixed bottom-4 left-4 bg-blue-500 text-white p-2 rounded text-xs z-50">
        Exit Intent Active<br/>
        Mouse: {mousePosition.x}, {mousePosition.y}
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-md w-full border-[#E5989B] shadow-xl animate-scale-in">
        <CardContent className="p-6 relative">
          {debugMode && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
              EXIT INTENT DEBUG
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
