import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'CodeBook: Social Network Analytics',
    description: 'Built a complete recommendation engine from scratch using pure Python—no pandas, no NumPy. Implemented friend suggestions via mutual connection analysis and content discovery through collaborative filtering, mastering data structures and graph algorithms.',
    tags: ['Pure Python', 'Graph Theory', 'Recommendation Systems', 'JSON Processing', 'Social Network Analysis'],
    image: '/projects/coders-of-the-city.svg',
    demoUrl: 'https://github.com/YUVRAJ-NOVA/Coders-of-the-city',
    githubUrl: 'https://github.com/YUVRAJ-NOVA/Coders-of-the-city',
  },
  {
    title: 'AI Image Recognition System',
    description: 'Deep learning model using CNN for real-time image classification with 95% accuracy. Deployed using TensorFlow and integrated with web interface.',
    tags: ['Python', 'TensorFlow', 'CNN', 'Computer Vision', 'Flask'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Predictive Analytics Dashboard',
    description: 'Interactive dashboard for sales forecasting using time series analysis and ARIMA models. Real-time data visualization with D3.js.',
    tags: ['Python', 'ARIMA', 'Pandas', 'D3.js', 'React'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'NLP Sentiment Analyzer',
    description: 'Natural language processing model for social media sentiment analysis using BERT and transformers. Processes 10K+ posts per minute.',
    tags: ['Python', 'BERT', 'NLP', 'Transformers', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Recommendation Engine',
    description: 'Collaborative filtering system for e-commerce product recommendations. Improved conversion rates by 35% using matrix factorization.',
    tags: ['Python', 'Scikit-learn', 'Collaborative Filtering', 'AWS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Fraud Detection System',
    description: 'Real-time fraud detection using ensemble learning and anomaly detection algorithms. Reduced false positives by 60%.',
    tags: ['Python', 'XGBoost', 'Anomaly Detection', 'Apache Kafka'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Healthcare AI Assistant',
    description: 'Machine learning model for disease prediction and patient risk assessment using electronic health records and deep learning.',
    tags: ['Python', 'Healthcare ML', 'Deep Learning', 'Privacy-Preserving AI'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
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
