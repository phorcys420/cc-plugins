import { logger } from "@cumcord/utils";

import { getPlugins, makeSnippet } from "./plugins";
import { copyText } from "./util";

function addEntry(label, callback) {
    let id = `PREMATURE_EJACULATOR_${label.replaceAll(" ", "_").toUpperCase()}`;

    commandPalette.registerEntry({
        id: id,

        label: label,
        source: "Premature Ejaculator",
        icon: "📜",

        action: callback
    });

    return () => commandPalette.unregisterEntry(id);
}

async function copyPlugins(snippet = false) {
    let plugins = await getPlugins();

    return copyText(snippet ? makeSnippet(plugins) : JSON.stringify(plugins, null, "      "));
}

export default function initCommandPalette() {
    if(commandPalette) {
        logger.log("[PrematureEjaculator]", "Loading command palette entries...");
        return [ addEntry("Export as snippet", () => copyPlugins(true)), addEntry("Export as JSON", copyPlugins) ];
    } else {
        logger.log("[PrematureEjaculator]", "Command palette plugin not found, will not add entries.");
        return [];
    }
}