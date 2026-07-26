import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="glass dark:bg-slate-800 rounded-card w-full max-w-lg p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;