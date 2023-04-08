import { BrowserWindow, dialog, ipcMain } from "electron";

import { readFile } from "fs/promises";
import { csv } from "./csv";


export function ipc(){
    ipcMain.handle("open", (event)=>open(BrowserWindow.fromWebContents(event.sender)!))
}


async function open(win: BrowserWindow) {
   const res = await dialog
    .showOpenDialog(win, {
        filters: [
            {extensions: ['csv'], name: 'csv'}
        ]
    })
    if(res.canceled) return null;
    const raw = await readFile(res.filePaths[0], 'utf-8')
    return csv(raw)
}