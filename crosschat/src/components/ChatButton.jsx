import { findByProps } from "@cumcord/modules/webpack";
import { enqueueMessage } from "../util";

const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default function ChatButton(text) {
    return <Button
        color={Button.Colors.BRAND}
        size={Button.Sizes.SMALL}
        look={Button.Looks.FILLED}
        onClick={() => enqueueMessage(text)}>
            {text}
    </Button>;
}