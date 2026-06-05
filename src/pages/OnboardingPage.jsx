import logo from "../assets/logo.svg";
import logoBig from "../assets/logo-big.png";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import animation1 from "../assets/animation/onboarding-animation.json";

const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const animationContainer = useRef(null);

  // Funktioner til at skifte slide
  const nextSlide = () => {
    if (currentSlide < 3) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 1) setCurrentSlide(currentSlide - 1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Slide:", currentSlide);
    console.log("Container:", animationContainer.current);
    if (currentSlide === 2 && animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animation1,
      });

      return () => anim.destroy();
    }
  }, [currentSlide]);

  console.log(animation1);
  return (
    <div className="onboarding-container">
      <div>
        <div className="top-bar">
          {currentSlide > 1 ? (
            <button className="back-button" onClick={prevSlide}>
              ← Tilbage
            </button>
          ) : (
            <div />
          )}
          <span className="slide-indicator">{currentSlide} / 3</span>
        </div>

        <div className="slide-content">
          {/* SLIDE 1 */}
          {currentSlide === 1 && (
            <div className="text-group">
              <h1 className="slide-title">
                Velkommen til appen der hjælper dig med at spare både tid og
                penge på mad
              </h1>
              <div className="preview-box">
                <img src={logoBig} alt="" className="logo-onboarding" />
              </div>
            </div>
          )}

          {/* SLIDE 2 */}
          {currentSlide === 2 && (
            <div className="text-group">
              <h1 className="slide-title">Spar penge og få mere overskud i hverdagen</h1>
              <div className="preview-box">
                <div ref={animationContainer} className="onboarding-ani" />
              </div>
            </div>
          )}

          {/* SLIDE 3 */}
          {currentSlide === 3 && (
            <div className="text-group">
              <h1 className="slide-title">
                Klar til at få masse inspiration og både flere penge og mere
                tid?
              </h1>
              <div className="preview-box">
                <img src={logo} alt="" className="logo-onboarding" />
              </div>
            </div>
          )}

          {/* NAVIGATION I BUNDEN */}
          <div className="bottom-zone">
            {currentSlide < 3 ? (
              <button className="primary-button" onClick={nextSlide}>
                Fortsæt
              </button>
            ) : (
              <button
                className="primary-button success-button"
                onClick={() => navigate("/hjem")}
              >
                Kom i gang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
