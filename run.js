const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

import { Home, Mahasiswa, Jurusan } from "./classes"
let mh = new Mahasiswa();
let hm = new Home();
let jr = new Jurusan();

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
        case '1': //mahasiswa
            hm.subOpsi(0);
            // rl.question(`masukkan salah satu no. dari opsi diatas: `, (kunci) => {
                // switch (kunci) {
            //         case '1':
            //             mh.list();
            //             console.log(`====================================================`);
            //             hm.opsi(); // CHECK POINT : hm.opsi GAMAU KELUAR LAGI TAPI INTERFACE READLINE MASIH NYALA!
            //             break;
            //         case '2':
            //             mh.search();
            //             break;
            //         case '3':
            //             mh.add();
            //             break;
            //         case '4':
            //             mh.delete();
            //             break;
            //         case '5':
            //             hm.opsi();
            //             break;
            //         default:
            //             console.log(`pilihan yang anda masukan salah`);
            //             break;
            //     }
            // });
            break;
        case '2': //jurusan
            hm.subOpsi(1);
//             rl.question(`masukkan salah satu no. dari opsi diatas: `, (kunci) => {
//                 switch (kunci) {
//                     case '1':
//                         jr.list();
//                         console.log(`====================================================`);
//                         hm.opsi(); // CHECK POINT : hm.opsi GAMAU KELUAR LAGI TAPI INTERFACE READLINE MASIH NYALA!
//                         break;

//                     case '2':

//                     default:
                        break;
//                 }
//             });
//             break;
//         case '3':
//             hm.subOpsi(2);
//             break;
//         case '4':
//             hm.subOpsi(3);
            // break;
//         case '5':
//             hm.opsi();
        default:
            console.log(`no. yang anda masukan salah.`)
            break;
    }
});