import { findByProps } from "@cumcord/modules/webpack";

export default () => {
    const { BUILT_IN_COMMANDS, BUILT_IN_SECTIONS } = findByProps("BUILT_IN_COMMANDS", "BUILT_IN_SECTIONS");

    let patches;

    return {
        onUnload() {
            
        }
    }
}

