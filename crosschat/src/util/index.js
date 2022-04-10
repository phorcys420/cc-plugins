import { findByProps } from "@cumcord/modules/webpack";

const privateChannel = findByProps("openPrivateChannel");

const { getChannelId } = findByProps("getChannelId", "getVoiceChannelId");
const messageQueue = findByProps("enqueue");

export function enqueueMessage(text) {
    return messageQueue.enqueue(
        {
            "type": 0,
            "message": {
                channelId: getChannelId(),
                content: text
            }
        },
        r => {
            return;
        }
    )
}

export function openDM(id) {
    return privateChannel.openPrivateChannel(id.toString());
}