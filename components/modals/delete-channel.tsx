"use client";

import qs from "query-string"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios"
import { useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
    const { isOpen, type, onOpen, onClose, data } = useModal();

    const isModalOpen = isOpen && type === "deleteChannel";
    const router = useRouter();
    const { server, channel } = data

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(url)
            onClose()

            router.refresh();
            router.push(`/servers/${server?.id}`)
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
                            Delete Channel
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Are you sure you want to delete <span className="font-semibold text-indigo-500">#{channel?.name}</span>
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
