import { CSSProperties, ReactElement, useEffect } from 'react';

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  backgroundColor?: string;
  title?: string;
  bgOpacity?: number;
  height?: string;
  width?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  bgOpacity = 0.3,
  backgroundColor = 'var(--secondary-color)',
  height = '60vh',
  width = '50vw',
}: Modal) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        return;
      }
    };

    isOpen && document.addEventListener('keydown', handleKeyboardEvent);

    return () => {
      isOpen && document.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className=" fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center px-4 "
      onClick={onClose}
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}
    >
      <div
        className=" h-modal-height w-modal-width flex-col rounded-md p-5 pt-0 shadow-md "
        onClick={(e) => e.stopPropagation()}
        style={
          {
            '--modal-height': height,
            '--modal-width': width,
            backgroundColor: backgroundColor,
          } as CSSProperties
        }
      >
        {title && (
          <div className=" flex w-full flex-row items-center justify-between ">
            <h1 className=" mt-4 text-2xl font-medium ">{title}</h1>
            <button
              className=" mt-4 text-2xl font-medium text-red-500 hover:cursor-pointer focus:border-2 focus:border-black "
              onClick={onClose}
            >
              X
            </button>
          </div>
        )}
        <div className=" flex flex-col items-center justify-center ">
          {children}
        </div>
      </div>
    </div>
  );
}
