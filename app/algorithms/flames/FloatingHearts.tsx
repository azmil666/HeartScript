import React from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${(i * 7 + 3) % 100}%`,
    top: `${(i * 13 + 7) % 100}%`,
    size: (i % 3 + 1) * 20 + 10,
    delay: `${i * 0.5}s`,
    duration: `${6 + (i % 5)}s`
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-200/40 animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;