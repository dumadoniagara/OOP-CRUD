const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const readline = require('readline');

import { Home, Mahasiswa } from "./classes"
let mh = new Mahasiswa();
let hm = new Home();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`====================================================`);
console.log(`Welcome to Institut Teknologi Bandung`);
console.log(`Jl. Ganeca no. 10, Bandung`);
console.log(`====================================================`);
hm.opsi();
rl.question(`masukkan salah satu no. dari opsi diatas: `, (key) => {
    switch (key) {
        case '1':
            hm.subOpsi(0);
            rl.question(`masukkan salah satu no. dari opsi diatas: `, (kunci) => {
                switch (kunci) {
                    case '1':
                        mh.list();
                        console.log(`====================================================`); 
                        hm.opsi(); // CHECK POINT : hm.opsi GAMAU KELUAR LAGI TAPI INTERFACE READLINE MASIH NYALA!
                        break;
                    default:
                        break;
                }
            });
            break;
        case '2':
            hm.subOpsi(1);
            break;
        case '3':
            hm.subOpsi(2);
            break;
        case '1':
            hm.subOpsi(3);
            break;
        default:
            console.log(`no. yang anda masukan salah.`)
            break;
    }
});