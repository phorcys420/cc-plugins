import { addCommand } from "@cumcord/commands";

import elrickCommand from "./commands/elrick";
import exportCommand from "./commands/export";
import initCommandPalette from "./lib/commandPalette";

export default () => {
    let commands = [ addCommand(elrickCommand), addCommand(exportCommand), ...initCommandPalette() ];

    return {
        onUnload() {
            commands.forEach(unload => unload());
        }
    }
}