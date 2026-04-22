import * as fs from "fs";
import { glob } from "glob";

fs.rmSync("./src/client", { force: true, recursive: true });
fs.rmSync("./src/common", { force: true, recursive: true });

fs.cpSync("./build/src/client", "./src/client", { force: true, recursive: true });
fs.cpSync("./build/src/common", "./src/common", { force: true, recursive: true });

const files = await glob("./src/**/*.{mts,ts}", { dotRelative: true, ignore: ["./src/index.d.ts"], posix: true });

for (const file of files) {
    let data = fs.readFileSync(file, "utf-8");

    data = data.replace(/@client/gm, "#client");
    data = data.replace(/@common/gm, "#common");

    fs.writeFileSync(file, data, "utf-8");
}

fs.rmSync("./build/src", { force: true, recursive: true });
