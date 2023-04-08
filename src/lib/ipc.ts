import { BrowserWindow, dialog, ipcMain } from "electron";

import { readFileSync } from "fs";
import { csv } from "./csv";

export function ipc() {
    ipcMain.handle("open", (event) => open(BrowserWindow.fromWebContents(event.sender)!))
}


async function open(win: BrowserWindow) {
    try {

        const res = await dialog
            .showOpenDialog(win, {
                filters: [
                    { extensions: ['csv'], name: 'csv' }
                ]
            })
        if (res.canceled) return null;
        const raw = await readFileSync(res.filePaths[0], 'utf-8')
        return csv(raw)

    } catch (error) {
        console.error(error);
        return null;
    }
}