"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
    const { isOpen, type, onOpen, onClose, data } = useModal();
    const origin = useOrigin()

    const isModalOpen = isOpen && type === "invite";

    const { server } = data

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen("invite", { server: response.data })

            // ! Enabling the Generate Button after 4 seconds
            setTimeout(() => {
                setIsLoading(false);
            }, 4000);
        } catch (e) {
            console.error(e)
        }
    }

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
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input
                                disabled={isLoading}
                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                value={inviteUrl}
                                readOnly
                            />
                            <Button disabled={isLoading} size="icon" onClick={onCopy} >
                                {copied
                                    ? <Check className="w-4 h-4" />
                                    : <Copy className="w-4 h-4" />
                                }
                            </Button>
                        </div>
                        <Button
                            onClick={onNew}
                            disabled={isLoading}
                            variant={"link"}
                            size="sm"
                            className="text-xs text-zinc-500 mt-4">
                            Generate a new Link
                            <RefreshCw className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
