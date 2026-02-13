import * as fs from "fs";
import { glob } from "glob";

let files = await glob(["./client/**/*.{mts,ts}", "./common/**/*.{mts,ts}"], {
    cwd: "./src",
    dotRelative: true,
    ignore: ["./client/applications/handlebars.d.mts", "./common/primitives/**", "./common/prosemirror/schema/**", "./common/utils/**"],
    posix: true,
});

files.sort((a, b) => {
    const a_parts = a.split("/");
    const b_parts = b.split("/");

    for (let index = 0; index < Math.max(a_parts.length, b_parts.length); index++) {
        const a_part = a_parts[index];
        const b_part = b_parts[index];

        if (!a_part && !b_part) break;

        if (!a_part || !b_parts) {
            if (!a_part) return -1;

            if (!b_parts) return 1;
        }

        const part_compare = a_part.localeCompare(b_part);
        if (part_compare !== 0) return part_compare;
    }

    return 0;
});

files = files.filter((value) => !value.endsWith("_module.d.mts"));

files.forEach((value, index, array) => {
    array[index] = `export type * from "${value}";`;
});

files.unshift(
    "export type {",
    "    ActorUUID,",
    "    CardsUUID,",
    "    ChatMessageUUID,",
    "    CombatUUID,",
    "    CompendiumActorUUID,",
    "    CompendiumAdventureUUID,",
    "    CompendiumCardsUUID,",
    "    CompendiumItemUUID,",
    "    CompendiumJournalEntryUUID,",
    "    CompendiumMacroUUID,",
    "    CompendiumPlaylistUUID,",
    "    CompendiumRollTableUUID,",
    "    CompendiumSceneUUID,",
    "    EmbeddedItemUUID,",
    "    FogExplorationUUID,",
    "    FolderUUID,",
    "    ItemUUID,",
    "    JournalEntryUUID,",
    "    MacroUUID,",
    "    PlaylistUUID,",
    "    RollTableUUID,",
    "    SceneUUID,",
    "    SettingUUID,",
    "    TokenDocumentUUID,",
    "    UserUUID,",
    "    WorldDocumentUUID,",
    "    WorldItemUUID,",
    '} from "./common/documents/_module.d.mts";',
    "",
);

files.push("");

fs.writeFileSync("./src/global-exports.d.ts", files.join("\n"));
