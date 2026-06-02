import { useState } from "react"
import { useNavigate } from "react-router"
import Lottie from "lottie-react"
import transistionAnimation from "../assets/animation/onboarding1.json"

export default function OnboardingPage() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [showTransition, setShowTransition] = useState(false);

    const handleNext = () => {
        setShowTransition(true);
        setTimeout(() => {
            setShowTransition(false);
            setCurrentSlide(2);
        }, 2000);
    };

    const handleBack = () => {
        setCurrentSlide(1);
      };   

    return (
      <div className="onboarding-container">
        {showTransition ? (
            
        )}


      </div>
    );
}