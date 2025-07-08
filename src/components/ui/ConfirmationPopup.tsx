
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ConfirmationPopup = ({ isVisible, onClose }: ConfirmationPopupProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleBackToHome = () => {
    onClose();
    navigate('/');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-md w-full border-[#E5989B] shadow-xl animate-scale-in">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-[#B5828C] mx-auto mb-3 animate-pulse" />
            <h3 className="text-xl font-semibold text-[#B5828C] mb-2">
              Thanks for reaching out!
            </h3>
            <p className="text-gray-600">
              We'll get back to you shortly.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleBackToHome}
              className="w-full bg-[#B5828C] hover:bg-[#B5828C]/90 text-white"
            >
              Back to Home
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationPopup;
