import { createPortal } from 'react-dom';
const Modal = ({ onClose, children, title }:
    {onClose(): void, children: any, title?: string}) => {

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 items-center z-10">
            <div className="w-2/5 h-4/5">
                <div className="bg-white max-h-full w-full rounded-md p-6 flex flex-col">
                    <div className="flex justify-between text-lg pb-4">
                        {title && <h1 className="text-2xl font-bold text-accent text-center justify-self-center self-center">{title}</h1>}
                        <a href="#" className="justify-self-end self-center" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className="pt-3 overflow-y-auto">{children}</div>
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