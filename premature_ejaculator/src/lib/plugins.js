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
            await cumcord.plugins.importPlugin(plugin.url);

            if(plugin.enabled == false) cumcord.plugins.togglePlugin(plugin.url);
        } else {
            // Reload plugin for idb changes to take effect
            cumcord.plugins.togglePlugin(plugin.url);
            cumcord.plugins.togglePlugin(plugin.url);
        }
    }

    // Reload window for idb changes to take effect
    //window.location.reload();
}