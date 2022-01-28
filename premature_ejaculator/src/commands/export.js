import { getPlugins, loadPlugins } from "../lib/plugins"

export default {
    name: "export",
    description: "Exports your Cumcord settings",

    args: [
        {
          name: "ugly",
          description: "Exports the settings in a non-pretty format",
          type: "bool",
          required: false
        },

        {
            name: "snippet",
            description: "Exports the settings in devtools-loadable format",
            type: "bool",
            required: false
        }
    ],

    handler: async (ctx, send) => {
        let plugins = await getPlugins();

        if(ctx.args.snippet) {
            // LMAOOOOOOOOOOOOOOOOOOOOOOOOOO
            let snippet = `(${loadPlugins})(${JSON.stringify(plugins)})`;

            if(ctx.args.ugly) snippet += "\n// mean :(";

            send(`\`\`\`js\n${snippet}\`\`\``);
        } else {
            send(`\`\`\`json\n${JSON.stringify(plugins, null, ctx.args.ugly ? null : "      ")}\`\`\``);
        }
    }
}