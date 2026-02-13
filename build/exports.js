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

    const a_folders = a_parts.slice(1, -1);
    const a_file = a_parts.at(-1) ?? "";

    const b_folders = b_parts.slice(1, -1);
    const b_file = b_parts.at(-1) ?? "";

    for (let index = 0; index < Math.max(a_folders.length, b_folders.length); index++) {
        const a_folder = a_folders[index];
        const b_folder = b_folders[index];

        if (!a_folder && !b_folder) break;

        if (!a_folder || !b_folder) {
            if (!a_folder) return -1;

            if (!b_folder) return 1;
        }

        const folder_compare = a_folder.localeCompare(b_folder);
        if (folder_compare !== 0) return folder_compare;
    }

    return a_file.localeCompare(b_file);
});

files = files.filter((value) => !value.endsWith("_module.d.mts"));

files.forEach((value, index, array) => {
    array[index] = `export type * from "${value}";`;
});

files.push("");

fs.writeFileSync("./src/global-exports.d.ts", files.join("\n"));
