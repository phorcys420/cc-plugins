import { logger } from "@cumcord/utils";
import { depend } from "cumcord-tools";

import { getPlugins, makeSnippet } from "./plugins";
import { copyText } from "./util";

const commandPalettePluginIds = [
    "https://yellowsink.github.io/discord-command-palette/",
    "https://cumcordplugins.github.io/Condom/yellowsink.github.io/discord-command-palette/",
];

const source = "Premature Ejaculator";

function addEntry(label, callback) {
    let id = `PREMATURE_EJACULATOR_${label.replaceAll(" ", "_").toUpperCase()}`;

    commandPalette.registerEntry({
        id: id,

        label: label,
        source: source,
        icon: "📜",

        action: callback
    });

    return () => commandPalette.unregisterEntry(id);
}

async function copyPlugins(snippet = false) {
    let plugins = await getPlugins();

    return copyText(snippet ? makeSnippet(plugins) : JSON.stringify(plugins, null, "      "));
}

function patch() {
    logger.log("[PrematureEjaculator]", "Adding command palette entries");

    addEntry("Export as snippet", () => copyPlugins(true));
    addEntry("Export as JSON", copyPlugins);
    

    return () => window.commandPalette?.unregisterSource(source);
}

export default () => depend(commandPalettePluginIds, patch);