import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
  title: string;
}

export const CertificateViewer = ({ isOpen, onClose, certificateUrl, title }: CertificateViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Disable right-click
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };

      // Disable keyboard shortcuts for screenshots and downloads
      const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent Print Screen, Ctrl+S, Ctrl+P, F12, etc.
        if (
          e.key === 'PrintScreen' ||
          (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
          (e.ctrlKey && (e.key === 'p' || e.key === 'P')) ||
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
          (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
          (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))
        ) {
          e.preventDefault();
          return false;
        }
      };

      // Disable drag and drop
      const handleDragStart = (e: DragEvent) => {
        e.preventDefault();
        return false;
      };

      // Add watermark overlay to discourage screenshots
      setIsProtected(true);

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('dragstart', handleDragStart);

      // Blur background when screenshot detected (via visibility change)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // User might be taking a screenshot, blur content
          const viewer = document.getElementById('certificate-viewer');
          if (viewer) {
            viewer.style.filter = 'blur(20px)';
          }
        } else {
          const viewer = document.getElementById('certificate-viewer');
          if (viewer) {
            viewer.style.filter = 'blur(0px)';
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative w-[95vw] h-[95vh] max-w-7xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-xs text-gray-400">Protected Content - No Download or Screenshots</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full glass-strong hover:bg-red-500/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Protected Certificate Viewer */}
          <div
            id="certificate-viewer"
            className="relative w-full h-full rounded-2xl overflow-hidden glass-strong border border-primary/30"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          >
            {/* Watermark Overlay - Prevents clean screenshots */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  className="absolute text-primary text-2xl font-bold transform rotate-[-45deg] whitespace-nowrap"
                  style={{
                    top: `${(i * 5) % 100}%`,
                    left: `${(i * 17) % 100}%`,
                  }}
                >
                  YUVRAJ NOVA • PROTECTED CONTENT
                </motion.div>
              ))}
            </div>

            {/* PDF Viewer with protections */}
            <iframe
              ref={iframeRef}
              src={`${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full h-full"
              style={{
                pointerEvents: 'auto',
                border: 'none',
              }}
              sandbox="allow-same-origin"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />

            {/* Invisible overlay to prevent PDF controls interaction */}
            <div 
              className="absolute inset-0 z-5"
              style={{
                background: 'transparent',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Bottom Protection Notice */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-4 h-4" />
              <span>This certificate is protected. Downloading and screenshots are disabled.</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
