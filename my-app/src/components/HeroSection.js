import React from 'react';
import { useLanguage } from './LanguageContext';
import './HeroSection.css';

const translations = {
  EN: {
    title: "DISCOVER OUR PRODUCTS",
    description: "Lorem ipsum dolor sit amet consectetur. Arcu sit posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.",
  },
  HI: {
    title: "हमारे उत्पादों की खोज करें",
    description: "Lorem ipsum dolor sit amet consectetur. Arcu sit posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.",
  },
};

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language]; // Access the appropriate translation

  return (
    <header className="hero-section">
      <h1 className="hero-title">{t.title}</h1>
      <p className="hero-description">{t.description}</p>
    </header>
  );
};

export default HeroSection;
