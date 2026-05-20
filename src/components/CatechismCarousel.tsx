import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

const IMAGES = [
  "https://iili.io/C9TJPVa.md.jpg",
  "https://iili.io/C9TJ6og.md.jpg",
  "https://iili.io/C9TJrDF.md.jpg",
  "https://iili.io/C9TJiiJ.md.jpg",
  "https://iili.io/C9TJLKv.md.jpg",
  "https://iili.io/C9TJQlR.md.jpg",
  "https://iili.io/C9TJZSp.md.jpg"
];

const CatechismCarousel: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    // 7 images of 256px (w-64) + 16px (gap-4) = 272px each. 7 * 272 = 1904px total translate distance.
    controls.start({
      x: [0, -1904],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35, // Butter smooth speed animation
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section id="materials-action-carousel" className="py-12 bg-white overflow-hidden border-t border-b border-pink-100/40">
      <div className="text-center px-6 mb-8">
        <span className="inline-block bg-pink-100/80 text-pink-600 font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-sm border border-pink-200/40">
          Uso Real em Paróquias ❤️
        </span>
        <h2 className="text-[5.2vw] sm:text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-2 whitespace-nowrap">
          Nossos Materiais em Ação!
        </h2>
        <p className="text-[2.9vw] sm:text-sm text-gray-500 font-bold mx-auto leading-relaxed whitespace-nowrap">
          Crianças aprendendo com alegria por todo o Brasil! ✨
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden select-none py-2">
        {/* Soft fading gradient edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max"
          animate={controls}
        >
          {[...IMAGES, ...IMAGES, ...IMAGES].map((img, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-64 h-80 bg-gray-50 rounded-2xl overflow-hidden shadow-md border-4 border-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <img 
                src={img} 
                alt={`Atividade Catequese ${i}`} 
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CatechismCarousel;
