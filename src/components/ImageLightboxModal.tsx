import React from 'react';
import { X, ZoomIn, ExternalLink } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  imageSrc,
  imageAlt,
  title,
  description,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-2 border-[#0fa3b1]/40 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl p-5 relative"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">{title || imageAlt}</h3>
            {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center bg-[#f9f7f3] rounded-2xl p-2 border border-slate-200 max-h-[75vh] overflow-auto">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-[70vh] w-auto object-contain rounded-xl shadow-md"
          />
        </div>

        <div className="mt-3 text-right">
          <span className="text-[11px] text-slate-400 mr-2">Klik buiten het venster of op sluiten</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0fa3b1] hover:bg-[#0fa3b1]/90 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
