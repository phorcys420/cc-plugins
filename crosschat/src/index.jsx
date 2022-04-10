import { findByDisplayName } from "@cumcord/modules/webpack";
import { instead, injectCSS } from "@cumcord/patcher";
import ChatButton from "./components/ChatButton";
import DMButton from "./components/DMButton";

export default () => {
    const words = ["Hi", "Lea", "Bye", "Why", "How", "Wait", "Meet", "Sorry", "Thanks", "What", "Where", "Who"];
    let patches = [
        // Message bar
        instead("default", findByDisplayName("ConnectedTutorialIndicator", false), (args, originalFunction) => {
            if(args[0].tutorialId == "writing-messages") {
                return <>
                    <div style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "alignContent": "center",
                        "justifyContent": "center",
                        "gap": 10,
                        "padding": 10,
                        "backgroundColor": "var(--channeltextarea-background)",
                        "borderTopLeftRadius": "1rem",
                        "borderTopRightRadius": "1rem",
                    }}>
                        {words.map(t => ChatButton(t))}
                    </div>
                </>;
            } else {
                return originalFunction(...args);
            }
        }),

        // Replace message user textbox with button
        instead("default", findByDisplayName("QuickMessage", false), (args) => {
            return <DMButton user={args[0].user}></DMButton>;
        }),

        // Make typing indicator a bit higher so it goes over the message bar
        injectCSS(`div[class*='typing-'] {
            position: absolute;
            bottom: 50px;
        }`),
    ];

    return {
        onLoad: () => {},

        onUnload: () => {
            patches.forEach(unpatch => unpatch());
        }
    }
}