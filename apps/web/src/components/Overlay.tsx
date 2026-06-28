import type { ReactNode } from 'react'

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function Overlay({ children, isOpen, onClose }: OverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      {isOpen &&
        <>
          <div
            className="absolute inset-0 bg-black/50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
          <div
            className={`relative z-10 transition-all duration-300 ease-out transform ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
              }`}
          >
            {children}
          </div>
        </>
      }
    </div>
  )
}
