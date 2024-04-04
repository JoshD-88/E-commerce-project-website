import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HeroBanner.css'; 
import consoleImg from "../../public/Home_Imgs/consoleImg.jpeg";
import gameImg from "../../public/Home_Imgs/gameImg.png";

const HeroBanner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(3000); // Duration for each image (in milliseconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 2);
    }, scrollSpeed);

    return () => clearInterval(interval);
  }, [scrollSpeed]);

  return (
    <div className="hero-banner">
      {/* Show the current image only */}
      <div className="hero-images" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
        <div className="image-container">
          <Link to="/consolesPage" className="banner-link">
            <img src={consoleImg} alt="Consoles" className="banner-image" />
            <span className="image-text">Consoles</span>
          </Link>
        </div>
        <div className="image-container">
          <Link to="/VideoGames" className="banner-link">
            <img src={gameImg} alt="Games" className="banner-image" />
            <span className="image-text">Games</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
