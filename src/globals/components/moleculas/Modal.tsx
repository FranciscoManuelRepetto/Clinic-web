import { createPortal } from 'react-dom';
const Modal = ({ onClose, children, title }:
    {onClose(): void, children: any, title?: string}) => {

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 items-center z-10">
            <div className="w-2/5 max-h-screen">
                <div className="bg-white h-full w-full rounded-md p-6">
                    <div className="flex justify-end text-lg">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1 className="text-2xl font-bold text-accent text-center">{title}</h1>}
                    <div className="pt-3">{children}</div>
                </div>
            </div>
        </div>
    );

    return createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
};

export default Modal
