import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'CPU Insight Engine: Smart Performance & Price Prediction',
    description: 'Advanced ML platform analyzing 3,800+ processors with 95% prediction accuracy. Engineered predictive models for CPU performance benchmarking and intelligent price forecasting using regression algorithms and feature engineering. Real-time analytics dashboard with interactive visualizations for performance comparisons and market insights.',
    tags: ['Machine Learning', 'Regression Models', 'Feature Engineering', 'Data Analytics', 'Performance Optimization', 'React'],
    image: '/projects/cpu-insight-engine.svg',
    githubUrl: 'https://github.com/YUVRAJ-NOVA/cpu-benchmark-smart-price-prediction',
  },
  {
    title: 'QUIZ\'A - Adaptive Learning Platform',
    description: 'AI-powered adaptive quiz platform leveraging Item Response Theory and Bayesian Knowledge Tracking for personalized learning. Implements Thompson Sampling for optimal question selection, real-time difficulty adjustment, and concept mastery visualization. Features offline-first architecture with PWA capabilities and global CDN delivery.',
    tags: ['AI/ML', 'Item Response Theory', 'Bayesian Statistics', 'Thompson Sampling', 'PWA', 'React'],
    image: '/projects/quiz-a.svg',
    demoUrl: 'https://yuvraj-nova.github.io/QUIZ-A/',
    githubUrl: 'https://github.com/YUVRAJ-NOVA/QUIZ-A',
  },
  {
    title: 'Multimodal E-Commerce Price Predictor',
    description: 'Production-grade ML system combining CNN image recognition and NLP to predict prices across 75K+ products. Achieved 67.29% SMAPE with <1ms inference via GPU-optimized ensemble modeling. Engineered pack quantity feature explaining 35% of price variance.',
    tags: ['Deep Learning', 'Computer Vision', 'NLP', 'Ensemble Models', 'GPU Optimization', 'Production ML'],
    image: '/projects/multimodal-price-predictor.svg',
    githubUrl: 'https://github.com/YUVRAJ-NOVA/multimodal-ecommerce-price-predictor',
  },
  {
    title: 'CodeBook: Social Network Analytics',
    description: 'Built a complete recommendation engine from scratch using pure Python—no pandas, no NumPy. Implemented friend suggestions via mutual connection analysis and content discovery through collaborative filtering, mastering data structures and graph algorithms.',
    tags: ['Pure Python', 'Graph Theory', 'Recommendation Systems', 'JSON Processing', 'Social Network Analysis'],
    image: '/projects/coders-of-the-city.svg',
    githubUrl: 'https://github.com/YUVRAJ-NOVA/Coders-of-the-city',
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full glass border border-primary/30 mb-6"
          >
            <span className="text-primary font-semibold">Portfolio</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Gued, sans-serif' }}>
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions powered by data science and machine learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
