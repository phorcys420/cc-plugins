(function(n,p,l,m){"use strict";var y={name:"elrick",description:"el ricko",handler:()=>`https://${(Math.random()+1).toString(36).substring(7)}.elrick.fans`};const{showToast:a}=p.findByProps("showToast");async function f(t){if(DiscordNative)DiscordNative.clipboard.copy(t);else try{await navigator.clipboard.writeText(t)}catch(o){l.logger.error("[PrematureEjaculator]","Could not copy text",o),a({message:"Could not copy to clipboard! :(",id:"clipboard_error",type:2})}}async function i(){let t=[];for(const[o,e]of Object.entries(cumcord.plugins.installed.store||{})){let r={url:o,enabled:e.enabled},g=await cumcord.modules.internal.idbKeyval.get(`${o}_CUMCORD_STORE`);g&&(r.settings=g),t.push(r)}return t}async function h(t,o=a){for(let e of t)if(e.settings&&await cumcord.modules.internal.idbKeyval.set(`${e.url}_CUMCORD_STORE`,e.settings),cumcord.plugins.installed.ghost[e.url])try{cumcord.plugins.togglePlugin(e.url),cumcord.plugins.togglePlugin(e.url)}catch(r){cumcord.utils.logger.error("[PrematureEjaculator]","Could not reload plugin",e.url,r),o({message:`Could not reload ${e.url}, check the console.`,id:e.url,type:2})}else{try{await cumcord.plugins.importPlugin(e.url)}catch(r){cumcord.utils.logger.error("[PrematureEjaculator]","Could not load plugin",e.url,r),o({message:`Could not load ${e.url}, check the console.`,id:e.url,type:2})}e.enabled==!1&&cumcord.plugins.togglePlugin(e.url)}}function s(t){return`(${h})(${JSON.stringify(t)}, cumcord.modules.webpack.findByProps("showToast").showToast)`}var P={name:"export",description:"Exports your Cumcord settings",args:[{name:"ugly",description:"Exports the settings in a non-pretty format",type:"bool",required:!1},{name:"snippet",description:"Exports the settings in devtools-loadable format",type:"bool",required:!1}],handler:async(t,o)=>{let e=await i();if(t.args.snippet){let r=s(e);t.args.ugly&&(r+=`
// mean :(`),o(`\`\`\`js
${r}\`\`\``)}else o(`\`\`\`json
${JSON.stringify(e,null,t.args.ugly?null:"      ")}\`\`\``)}};const C=["https://yellowsink.github.io/discord-command-palette/","https://cumcordplugins.github.io/Condom/yellowsink.github.io/discord-command-palette/"],u="Premature Ejaculator";function c(t,o){let e=`PREMATURE_EJACULATOR_${t.replaceAll(" ","_").toUpperCase()}`;return commandPalette.registerEntry({id:e,label:t,source:u,icon:"\u{1F4DC}",action:o}),()=>commandPalette.unregisterEntry(e)}async function d(t=!1){let o=await i();return f(t?s(o):JSON.stringify(o,null,"      "))}function E(){return l.logger.log("[PrematureEjaculator]","Adding command palette entries"),c("Export as snippet",()=>d(!0)),c("Export as JSON",d),()=>window.commandPalette?.unregisterSource(u)}var b=()=>m.depend(C,E),w=()=>{let t=[n.addCommand(y),n.addCommand(P),b()];return{onUnload(){t.forEach(o=>o())}}};return w})(cumcord.commands,cumcord.modules.webpack,cumcord.utils,cumcordTools);
