import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  index: number;
}

export const ProjectCard = ({ title, description, tags, image, demoUrl, githubUrl, index }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      className="relative"
      style={{ 
        height: '420px',
        perspective: '1500px'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-in-out',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformOrigin: 'center center'
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 glass-strong rounded-2xl overflow-hidden border border-primary/30 glow-primary"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3 gradient-text">{title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full glass border border-primary/30 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 glass-strong rounded-2xl p-6 flex flex-col justify-between border border-secondary/30 glow-secondary"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full glass border border-secondary/30 text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg glass border border-primary hover:border-primary hover:glow-primary transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            )}
            {demoUrl && (
              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg glass border border-secondary hover:border-secondary hover:glow-secondary transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
