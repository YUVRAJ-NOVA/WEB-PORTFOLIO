import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ExternalLink } from 'lucide-react';

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
  title: string;
}

export const CertificateViewer = ({ isOpen, onClose, certificateUrl, title }: CertificateViewerProps) => {

  useEffect(() => {
    if (isOpen && certificateUrl) {
      // Open certificate in new window with restrictions
      const newWindow = window.open(
        certificateUrl,
        '_blank',
        'noopener,noreferrer,toolbar=0,location=0,menubar=0'
      );
      
      // Close modal after opening
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [isOpen, certificateUrl, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative glass-strong rounded-2xl p-8 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
              >
                <Shield className="w-10 h-10 text-primary" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-3 gradient-text">{title}</h3>
              <p className="text-muted-foreground mb-6">
                Your certificate is opening in a new tab. Please check your browser for the protected certificate viewer.
              </p>
              
              <div className="flex flex-col gap-3">
                <motion.a
                  href={certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg glass border border-primary hover:border-primary hover:glow-primary transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Certificate Again</span>
                </motion.a>
                
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg glass border border-muted hover:border-muted-foreground transition-all"
                >
                  Close
                </motion.button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Protected Content • View Only</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
