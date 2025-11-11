import { MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    onClose(): void;
    children: ReactNode;
    title?: string;
}

const Modal = ({ onClose, children, title }: ModalProps) => {
    const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };

    const modalRoot = typeof document !== 'undefined' ? document.getElementById("modal-root") : null;

    if (!modalRoot) {
        return null;
    }

    const modalContent = (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-10">
            <div className="w-2/5 max-h-screen">
                <div className="bg-white h-full w-full rounded-md p-6">
                    <div className="flex justify-end text-lg">
                        <button
                            type="button"
                            onClick={handleCloseClick}
                            className="text-lg font-bold text-gris-oscuro"
                            aria-label="Cerrar modal"
                        >
                            ×
                        </button>
                    </div>
                    {title && <h1 className="text-2xl font-bold text-accent text-center">{title}</h1>}
                    <div className="pt-3">{children}</div>
                </div>
            </div>
        </div>
    );

    return createPortal(
        modalContent,
        modalRoot
    );
};

export default Modal;
