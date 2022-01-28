import { addCommand } from "@cumcord/commands";

import elrickCommand from "./commands/elrick";
import exportCommand from "./commands/export";

export default () => {
    let commands = [ addCommand(elrickCommand), addCommand(exportCommand) ];

    return {
        onUnload() {
            commands.forEach(unload => unload());
        }
    }
}