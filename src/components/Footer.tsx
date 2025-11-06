import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

const AnimatedCoffee = () => {
  return (
    <motion.div
      className="relative inline-block"
      animate={{
        rotate: [0, -10, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeInOut',
      }}
    >
      <Coffee className="w-5 h-5 text-primary" />
      
      {/* Steam animation */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        <motion.div
          className="w-1 h-2 bg-primary/40 rounded-full blur-[1px]"
          animate={{
            y: [-8, -12],
            opacity: [0.6, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 ml-1">
        <motion.div
          className="w-1 h-2 bg-primary/30 rounded-full blur-[1px]"
          animate={{
            y: [-8, -12],
            opacity: [0.5, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.3,
          }}
        />
      </div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 -ml-1">
        <motion.div
          className="w-1 h-2 bg-primary/30 rounded-full blur-[1px]"
          animate={{
            y: [-8, -12],
            opacity: [0.5, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.6,
          }}
        />
      </div>
    </motion.div>
  );
};

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Crafted with <AnimatedCoffee /> by <span className="font-semibold" style={{ fontFamily: 'Nexus Stroke, sans-serif' }}>Yuvraj Singh Kushwah</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} Yuvraj Singh Kushwah. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
