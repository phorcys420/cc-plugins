import { findByProps } from "@cumcord/modules/webpack";
import { openDM } from "../util";

const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default function DMButton({user}) {
    return <Button
        color={Button.Colors.BRAND}
        size={Button.Sizes.SMALL}
        look={Button.Looks.FILLED}
        style={{
            width: "100%"
        }}
        onClick={() => openDM(user.id)}>
            Message @{user.username}
    </Button>;
}