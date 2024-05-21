"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";

export const InviteModal = () => {
    const { isOpen, type, onOpen, onClose } = useModal();

    const isModalOpen = isOpen && type === "invite";

    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="p-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Invite Friends
                        </DialogTitle>
                    </DialogHeader>
                    <div className="p-6">
                        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                            Server Invite Link
                        </Label>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
