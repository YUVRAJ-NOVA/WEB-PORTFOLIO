import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
  title: string;
}

export const CertificateViewer = ({ isOpen, onClose, certificateUrl, title }: CertificateViewerProps) => {
  const [zoom, setZoom] = useState(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `${title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-[95vw] h-[95vh] max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent rounded-t-2xl">
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-sm text-gray-400">Official Certificate</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleZoomOut}
                className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </motion.button>
              
              <span className="text-white text-sm font-medium px-2">
                {Math.round(zoom * 100)}%
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleZoomIn}
                className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="p-2 rounded-lg glass-strong hover:bg-secondary/20 transition-colors"
                title="Download Certificate"
              >
                <Download className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg glass-strong hover:bg-red-500/20 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Certificate Image Viewer */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden glass-strong border border-primary/30">
            <div className="w-full h-full overflow-auto p-4 flex items-center justify-center bg-gradient-to-br from-black/50 to-black/70">
              <motion.img
                src={certificateUrl}
                alt={title}
                className="max-w-full h-auto rounded-lg shadow-2xl"
                style={{
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.3s ease-in-out',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                draggable={false}
              />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
            <p className="text-center text-sm text-gray-400">
              Use zoom controls to view details • Download to save a copy
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
