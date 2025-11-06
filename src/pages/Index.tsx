import { MeshBackground } from '@/components/MeshBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative">
      <MeshBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
