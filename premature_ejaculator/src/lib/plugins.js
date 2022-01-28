import { logger } from "@cumcord/utils";
import { showToast } from "./util";

export async function getPlugins() {
    let plugins = [];

    for (const [url, data] of Object.entries(cumcord.plugins.installed.store || {})) {
        let plugin = {
            url,
            enabled: data.enabled
        }
        
        let keyval = await cumcord.modules.internal.idbKeyval.get(`${url}_CUMCORD_STORE`);
        if(keyval) plugin.settings = keyval;

        plugins.push(plugin);
    }

    return plugins;
}

export async function loadPlugins(plugins) {
    for(let plugin of plugins) {
        if(plugin.settings) {
            await cumcord.modules.internal.idbKeyval.set(`${plugin.url}_CUMCORD_STORE`, plugin.settings);
        }

        if(!cumcord.plugins.installed.ghost[plugin.url]) {
            try {
                await cumcord.plugins.importPlugin(plugin.url);
            } catch(e) {
                logger.error("[PrematureEjaculator]", "Could not load plugin", plugin.url, e);
                showToast({message: `Could not load ${plugin.url}, check the console.`, id: plugin.url, type: 2});
            }

            if(plugin.enabled == false) cumcord.plugins.togglePlugin(plugin.url);
        } else {
            // Reload plugin for idb changes to take effect
            try {
                cumcord.plugins.togglePlugin(plugin.url);
                cumcord.plugins.togglePlugin(plugin.url);
            } catch(e) {
                logger.error("[PrematureEjaculator]", "Could not reload plugin", plugin.url, e);
                showToast({message: `Could not reload ${plugin.url}, check the console.`, id: plugin.url, type: 2});
            }
        }
    }

    // Reload window for idb changes to take effect
    //window.location.reload();
}

export function makeSnippet(plugins) {
    return `(${loadPlugins})(${JSON.stringify(plugins)})`;
}