import { motion } from 'framer-motion';
import { Code2, Database, Brain, TrendingUp, Sparkles, Target } from 'lucide-react';

export const About = () => {
  const skills = [
    { name: 'Python', level: 90, icon: Code2, color: 'primary' },
    { name: 'Machine Learning', level: 85, icon: Brain, color: 'secondary' },
    { name: 'Data Analysis', level: 88, icon: Database, color: 'primary' },
    { name: 'Deep Learning', level: 80, icon: Sparkles, color: 'secondary' },
    { name: 'Statistical Modeling', level: 85, icon: TrendingUp, color: 'primary' },
    { name: 'SQL & NoSQL', level: 82, icon: Database, color: 'secondary' },
  ];

  const highlights = [
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Driven by curiosity and a passion for solving real-world problems through data-driven insights.',
    },
    {
      icon: Brain,
      title: 'Quick Learner',
      description: 'Continuously expanding my knowledge in cutting-edge ML frameworks and data science methodologies.',
    },
    {
      icon: Sparkles,
      title: 'Innovation Focused',
      description: 'Eager to contribute fresh perspectives and innovative solutions to challenging problems.',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Gued, sans-serif' }}>
            About Me
          </h2>
          <p className="text-xl text-muted-foreground">
            Passionate Data Scientist | Aspiring ML Engineer
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-8 glow-primary">
              <h3 className="text-3xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Nexus Stroke, sans-serif' }}>
                Yuvraj Singh Kushwah
              </h3>
              
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  Hi there! I'm <span className="text-primary font-semibold" style={{ fontFamily: 'Nexus Stroke, sans-serif' }}>Yuvraj Singh Kushwah</span>, 
                  a fresher data scientist with an insatiable curiosity for turning raw data into meaningful stories. 
                  My journey into data science began with a fascination for how algorithms can predict patterns, 
                  uncover hidden insights, and solve complex problems that impact real lives.
                </p>
                
                <p>
                  As someone who's just starting their professional career, I bring fresh energy, modern skills, 
                  and a hunger to learn from every challenge. I've spent countless hours building projects, 
                  experimenting with neural networks, and diving deep into statistical models—not because I had to, 
                  but because I genuinely love the process of discovery that comes with data science.
                </p>
                
                <p>
                  What sets me apart is my ability to bridge technical complexity with clear communication. 
                  I don't just build models; I craft solutions that stakeholders can understand and trust. 
                  Whether it's predicting trends, detecting anomalies, or building recommendation systems, 
                  I approach each problem with creativity and analytical rigor.
                </p>
                
                <p>
                  I'm actively seeking opportunities where I can contribute to innovative projects, 
                  collaborate with experienced teams, and grow as a data professional. If you're looking for 
                  someone who's passionate, dedicated, and ready to make an impact from day one, let's connect!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Skills & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Skills */}
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Technical Skills</h3>
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <skill.icon className={`w-5 h-5 text-${skill.color}`} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                        className={`h-full bg-gradient-to-r ${
                          skill.color === 'primary'
                            ? 'from-primary to-primary/60'
                            : 'from-secondary to-secondary/60'
                        } rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ x: 10 }}
                  className="glass rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg glass flex items-center justify-center flex-shrink-0 glow-primary">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Tech Stack & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
              'Matplotlib', 'Seaborn', 'SQL', 'Git', 'Jupyter',
              'Flask', 'FastAPI', 'Tableau', 'Power BI', 'Oracle Cloud Infrastructure'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 glass rounded-full text-sm border border-primary/30 hover:border-primary/60 hover:glow-primary transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
