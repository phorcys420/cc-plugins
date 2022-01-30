import { findByProps } from "@cumcord/modules/webpack";
import { logger } from "@cumcord/utils";

export const { showToast } = findByProps("showToast");

export async function copyText(text) {
    if(DiscordNative) {
        DiscordNative.clipboard.copy(text);
    } else {
        try {
            await navigator.clipboard.writeText(text);
        } catch(e) {
            logger.error("[PrematureEjaculator]", "Could not copy text", e);
            showToast({message: "Could not copy to clipboard! :(", id: "clipboard_error", type: 2});
        }
    }
}