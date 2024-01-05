import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import "../styles/dialogModal.css"

type DialogModal = {
    children: React.ReactNode;
    open: boolean;
}

const DialogModal: React.FC<DialogModal> = ({children, open}) => {
    return (
        <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <Dialog id="dialog" open={open} onClose={() => {}}>
                <div id="backdrop"/>
                <div className="dialog-container">
                    {children}
                </div>
            </Dialog>
        </Transition>
    );
};

export default DialogModal;