import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
  title: string;
}

export const CertificateViewer = ({ isOpen, onClose, certificateUrl, title }: CertificateViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  useEffect(() => {
    if (isOpen) {
      // Disable right-click
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };

      // Disable keyboard shortcuts for screenshots and downloads
      const handleKeyDown = (e: KeyboardEvent) => {
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

      // Disable drag
      const handleDragStart = (e: DragEvent) => {
        e.preventDefault();
        return false;
      };

      // Blur on visibility change (screenshot detection)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const viewer = document.getElementById('pdf-viewer-container');
          if (viewer) {
            viewer.style.filter = 'blur(20px)';
          }
        } else {
          const viewer = document.getElementById('pdf-viewer-container');
          if (viewer) {
            viewer.style.filter = 'blur(0px)';
          }
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('dragstart', handleDragStart);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [isOpen]);
  }, [isOpen, certificateUrl, onClose]);

  if (!isOpen) return null;

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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-[90vw] h-[90vh] max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 via-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-xs text-gray-400">Protected Content • View Only • No Download</p>
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

          {/* Protected PDF Viewer */}
          <div
            id="pdf-viewer-container"
            ref={containerRef}
            className="relative w-full h-full rounded-2xl overflow-hidden glass-strong border border-primary/30"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          >
            {/* Watermark Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-primary/5 text-xl font-bold transform -rotate-45 whitespace-nowrap select-none"
                  style={{
                    top: `${(i * 7) % 100}%`,
                    left: `${(i * 13) % 100}%`,
                    pointerEvents: 'none',
                  }}
                >
                  YUVRAJ NOVA PROTECTED
                </div>
              ))}
            </div>

            {/* PDF Document */}
            <div className="w-full h-full flex items-center justify-center overflow-auto p-4">
              {isLoading && (
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                  <p>Loading Certificate...</p>
                </div>
              )}
              
              <Document
                file={certificateUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={null}
                className="max-w-full"
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-2xl"
                  width={Math.min(containerRef.current?.clientWidth ? containerRef.current.clientWidth - 100 : 800, 800)}
                  canvasRef={canvasRef}
                />
              </Document>
            </div>

            {/* Page Navigation */}
            {numPages > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber <= 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </motion.button>
                  
                  <span className="text-white font-medium">
                    Page {pageNumber} of {numPages}
                  </span>
                  
                  <motion.button
                    onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                    disabled={pageNumber >= numPages}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Protection Notice */}
            <div className="absolute top-20 left-0 right-0 z-10 p-2 pointer-events-none">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 mx-auto w-fit">
                <Shield className="w-3 h-3" />
                <span>Screenshots and downloads are disabled</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
