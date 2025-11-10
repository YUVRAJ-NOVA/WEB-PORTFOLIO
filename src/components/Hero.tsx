import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [displayCommand, setDisplayCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  
  // 3D tilt effect for photo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  const shadowX = useTransform(mouseX, [-300, 300], [-20, 20]);
  const shadowY = useTransform(mouseY, [-300, 300], [-20, 20]);

  const commands = [
    { cmd: 'import data_science as ds', output: '✓ Libraries loaded: numpy, pandas, sklearn, tensorflow' },
    { cmd: 'model = ds.train_neural_network()', output: '✓ Model trained | Accuracy: 98.5%' },
    { cmd: 'insights = ds.analyze_patterns()', output: '✓ Patterns detected | Insights generated' },
    { cmd: 'deploy_solution()', output: '✓ Ready to transform your data into impact' },
  ];

  useEffect(() => {
    const currentCmd = commands[commandIndex]?.cmd || '';
    
    if (displayCommand.length < currentCmd.length) {
      const timeout = setTimeout(() => {
        setDisplayCommand(currentCmd.slice(0, displayCommand.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else if (displayCommand.length === currentCmd.length && commandIndex < commands.length) {
      const timeout = setTimeout(() => {
        setOutput(prev => [...prev, commands[commandIndex].output]);
        if (commandIndex < commands.length - 1) {
          setCommandIndex(commandIndex + 1);
          setDisplayCommand('');
        }
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [displayCommand, commandIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const neuralNodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  // Orbiting data points
  const orbitingElements = [
    { icon: '📊', delay: 0, duration: 8 },
    { icon: '🤖', delay: 2, duration: 10 },
    { icon: '📈', delay: 4, duration: 9 },
    { icon: '🧮', delay: 6, duration: 11 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          {neuralNodes.map((node, i) => (
            <motion.g key={node.id}>
              {neuralNodes.slice(i + 1, i + 4).map((target, j) => (
                <motion.line
                  key={`${node.id}-${target.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 2, delay: node.delay + j * 0.2, repeat: Infinity, repeatType: 'reverse' }}
                />
              ))}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="4"
                fill="hsl(var(--primary))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, delay: node.delay, repeat: Infinity }}
              />
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="glass-strong rounded-lg p-6 border border-primary/30 glow-primary">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary/20">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-primary">data_scientist.py</span>
                <div className="ml-auto flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="font-mono text-sm space-y-3 min-h-[300px]">
                {output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400"
                  >
                    {line}
                  </motion.div>
                ))}
                
                <div className="flex items-center gap-2">
                  <span className="text-primary">{'>'}</span>
                  <span className="text-foreground">{displayCommand}</span>
                  {showCursor && <span className="inline-block w-2 h-4 bg-primary animate-pulse" />}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 mt-6"
            >
              {[
                { icon: Github, href: 'https://github.com/YUVRAJ-NOVA', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/yuvraj-singh-kushwah-2b88b8366/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:yuvrajsk.bpl@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center border border-primary/20 hover:border-primary/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section - Photo & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-6"
          >
            {/* 3D Photo Frame with Orbiting Elements */}
            <div className="relative flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1, delay: 0.2 }}
                className="relative"
              >
                {/* Main Photo Frame with 3D Tilt */}
                <motion.div
                  className="relative w-72 h-72 rounded-full overflow-visible"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    mouseX.set(e.clientX - centerX);
                    mouseY.set(e.clientY - centerY);
                  }}
                  onMouseLeave={() => {
                    mouseX.set(0);
                    mouseY.set(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Rotating glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary)))',
                      padding: '4px',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-background" />
                  </motion.div>

                  {/* Photo container with glow */}
                  <motion.div 
                    className="absolute inset-2 rounded-full overflow-hidden border-2 border-primary/40 glow-primary"
                    style={{
                      boxShadow: useTransform(
                        [shadowX, shadowY],
                        ([x, y]) => `${x}px ${y}px 40px rgba(0,0,0,0.3), 0 0 20px hsl(var(--primary) / 0.5)`
                      )
                    }}
                  >
                    <img
                      src="/profile-photo.png"
                      alt="Yuvraj Singh Kushwah"
                      className="w-full h-full object-cover object-center"
                      style={{ transform: 'translateZ(50px)' }}
                    />
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                  </motion.div>

                  {/* Pulsing ambient glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-2xl -z-10"
                    style={{
                      background: 'radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>

                {/* Orbiting Data Elements */}
                {orbitingElements.map((element, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: element.duration,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: element.delay,
                    }}
                  >
                    <motion.div
                      className="absolute top-0 left-1/2 -ml-6 glass rounded-full w-12 h-12 flex items-center justify-center text-2xl glow-secondary"
                      style={{
                        transform: `translateY(-140px)`,
                      }}
                      whileHover={{ scale: 1.3 }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                    >
                      {element.icon}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Nexus Stroke, sans-serif' }}>
                Yuvraj Singh Kushwah
              </h1>
              <p className="text-2xl text-muted-foreground mb-2" style={{ fontFamily: 'Gued, sans-serif' }}>
                Aspiring Data Scientist
              </p>
              <p className="text-lg text-muted-foreground/80 mb-6">
                Transforming raw data into strategic insights through AI & Machine Learning
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.a
                href="/yuvraj_resume.pdf"
                download="Yuvraj_Singh_Kushwah_Resume.pdf"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(180 100% 50% / 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-initial px-8 py-4 rounded-xl glass-strong border-2 border-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-3 font-semibold text-lg glow-primary group"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </motion.a>
              
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-initial px-8 py-4 rounded-xl glass border border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all flex items-center justify-center gap-3 font-semibold text-lg"
              >
                <Mail className="w-5 h-5" />
                <span>Get In Touch</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, y: { duration: 2, repeat: Infinity } }}
          onClick={scrollToProjects}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hidden md:block"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Explore Work</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Data Stream Effect */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono text-primary/20 hidden md:block"
          style={{
            left: `${10 + i * 12}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '110vh'],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
        </motion.div>
      ))}
    </section>
  );
};
