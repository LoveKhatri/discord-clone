import { ChatHeader } from "@/components/chat/ChatHeader";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        channelId: string;
        serverId: string;
    }
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/")
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    })

    if (!channel || !member) {
        return redirect(`/servers/${params.serverId}`)
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader type="channel"
                name={channel?.name}
                serverId={params.serverId} />
        </div>
    );
}

export default ChannelIdPage;