import { motion } from 'framer-motion';

export const MeshBackground = () => {
  // Color orbs - Blue & Purple parallel theme
  const orbs = [
    {
      color: 'hsl(217 91% 60%)', // Electric Blue
      size: '700px',
      initialX: '10%',
      initialY: '20%',
      delay: 0,
    },
    {
      color: 'hsl(262 83% 58%)', // Vibrant Purple
      size: '700px',
      initialX: '70%',
      initialY: '60%',
      delay: 7,
    },
    {
      color: 'hsl(217 91% 60%)', // Electric Blue
      size: '650px',
      initialX: '85%',
      initialY: '15%',
      delay: 14,
    },
    {
      color: 'hsl(262 83% 58%)', // Vibrant Purple
      size: '650px',
      initialX: '40%',
      initialY: '80%',
      delay: 10,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - The darkness of raw data */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/50" />
      
      {/* Animated blur orbs - The journey to insight */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="blur-orb"
          style={{
            backgroundColor: orb.color,
            width: orb.size,
            height: orb.size,
            left: orb.initialX,
            top: orb.initialY,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid overlay - Structure in data */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Noise texture - The chaos of big data */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial gradient overlay - Focus and depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background/80" />

      {/* Subtle scanning line effect - Active analysis */}
      <motion.div
        className="absolute inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};
