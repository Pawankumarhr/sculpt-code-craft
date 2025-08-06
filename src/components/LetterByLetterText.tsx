import { useState, useEffect } from 'react';

interface LetterByLetterTextProps {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
}

export const LetterByLetterText = ({ 
  text, 
  className = '', 
  delay = 100, 
  startDelay = 0 
}: LetterByLetterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, delay, startDelay]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};