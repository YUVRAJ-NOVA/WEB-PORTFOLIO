import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { CertificateViewer } from './CertificateViewer';

const certifications = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle',
    date: '2025',
    description: 'Specialized expertise in architecting and deploying advanced GenAI solutions. Mastery of the complete GenAI lifecycle—from fine-tuning complex models to building scalable, enterprise-grade AI applications using Oracle\'s powerful cloud infrastructure.',
    color: 'from-red-500 to-orange-500',
    badge: '/certificates/oracle-genai-badge.png',
    certificateUrl: '/certificates/oracle-genai-cert.png',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: '2025',
    description: 'Demonstrated comprehensive understanding of AI fundamentals, machine learning concepts, and Oracle Cloud AI services. Validated expertise in foundational AI principles, data preparation, model training, and deploying AI solutions on Oracle Cloud Infrastructure.',
    color: 'from-orange-500 to-yellow-500',
    badge: '/certificates/oracle-ai-foundations-badge.png',
    certificateUrl: '/certificates/oracle-ai-foundations-cert.png',
  },
  {
    title: 'JPMorgan Chase & Co. Quantitative Research Virtual Experience Program on Forage',
    issuer: 'JPMorgan Chase & Co.',
    date: 'November 2025',
    description: 'Excelled in a high-intensity simulation of the JPMC Quantitative Research environment, deploying sophisticated quantitative methodologies to solve complex financial challenges. This program honed my abilities in dissecting institutional-grade financial data, formulating algorithmic strategies, and applying rigorous computational techniques to real-world market scenarios.',
    color: 'from-blue-600 to-cyan-500',
    certificateUrl: '/certificates/jpmorgan-quant-research-cert.png',
  },
  {
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2024',
    description: 'Professional certification in building and training neural networks using TensorFlow',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'AWS Certified Machine Learning',
    issuer: 'Amazon Web Services',
    date: '2024',
    description: 'Specialty certification in designing, implementing, and maintaining ML solutions',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2023',
    description: 'Comprehensive program covering neural networks, CNNs, RNNs, and transformers',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Data Science Professional',
    issuer: 'IBM',
    date: '2023',
    description: 'Professional certificate in data analysis, visualization, and machine learning',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Advanced Statistics & Probability',
    issuer: 'Stanford Online',
    date: '2023',
    description: 'Graduate-level course in statistical inference and probability theory',
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'MLOps Specialization',
    issuer: 'Coursera',
    date: '2023',
    description: 'End-to-end ML pipeline development and deployment in production',
    color: 'from-indigo-500 to-purple-500',
  },
];

export const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <section id="certifications" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Gued, sans-serif' }}>
            Certifications
          </h2>
          <p className="text-xl text-muted-foreground">
            Continuous learning and professional development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-strong rounded-2xl p-6 h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {cert.badge ? (
                    <motion.div
                      className="w-24 h-24 mb-4 relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Blurred background glow for badge */}
                      <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl opacity-70" />
                      </div>
                      <img
                        src={cert.badge}
                        alt={`${cert.title} badge`}
                        className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                        style={{
                          mixBlendMode: 'lighten',
                          filter: 'brightness(1.1) contrast(1.1)',
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4 glow-primary"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Award className="w-8 h-8 text-primary" />
                    </motion.div>
                  )}

                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{cert.issuer}</span>
                    <span className="text-sm text-primary">{cert.date}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.description}
                  </p>

                  {cert.certificateUrl && (
                    <motion.button
                      onClick={() => setSelectedCertificate({ url: cert.certificateUrl!, title: cert.title })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewer
        isOpen={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
        certificateUrl={selectedCertificate?.url || ''}
        title={selectedCertificate?.title || ''}
      />
    </section>
  );
};
