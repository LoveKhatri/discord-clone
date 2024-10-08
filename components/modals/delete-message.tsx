"use client";

import qs from "query-string"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios"
import { useRouter } from "next/navigation";

export const DeleteMessageModal = () => {
    const { isOpen, type, onOpen, onClose, data } = useModal();

    const isModalOpen = isOpen && type === "deleteMessage";
    const router = useRouter();
    const { apiUrl, query } = data

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query: query
            })

            await axios.delete(url)
            onClose()

            router.refresh();

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="p-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Delete Message
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Are you sure you want to delete this message?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between w-full ">
                            <Button disabled={isLoading}
                                onClick={() => onClose()}
                                variant={"ghost"}>
                                Cancel
                            </Button>
                            <Button disabled={isLoading}
                                variant={"primary"}
                                onClick={onClick}>
                                Delete
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
