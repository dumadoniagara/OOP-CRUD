// Fungsi OPSI dan SUB-OPSI
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export class Home {
    constructor() {
        this.option = ['Mahasiswa', 'Jurusan', 'Dosen', 'Matakuliah', 'Kontrak', 'Keluar'];
        this.subOption = ['Mahasiswa', 'Jurusan', 'Dosen', 'Mata Kuliah'];
        this.list = ['daftar', 'cari', 'tambah', 'hapus'];
    }

    opsi() {
        console.log(`====================================================`);
        console.log(`silahkan pilih opsi dibawah ini`);
        for (let i = 0; i < this.option.length; i++) {
            console.log(`[${i + 1}] ${this.option[i]}`);
        }
        console.log(`====================================================`);
    }

    subOpsi(index) {
        console.log(`silahkan pilih opsi dibawah ini`);
        // const pilihan = ['daftar', 'cari', 'tambah', 'hapus']
        for (let i = 0; i < 4; i++) {
            console.log(`[${i + 1}] ${this.list[i]} ${this.subOption[index]}`);
        }
        console.log('[5] Kembali')
    }
}



export class Mahasiswa {
    constructor() {
        this.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);
    }
    list() {
        let sql = "SELECT * FROM mahasiswa";
        this.db.all(sql, (err, rows) => {
            if (err) {
                throw err;
            } else { //cetak isi rows
                let table = new Table({
                    head: ['Nim', 'Nama', 'Alamat', 'Kode_jurusan'],
                    colWidths: [10, 30, 20, 20]
                });
                // console.log(rows);
                rows.forEach((row) => {
                    table.push([row.nim, row.nama, row.alamat, row.kode_jurusan]);
                });
                console.log(table.toString());
            }
        });
    }
    search(nim) {
        let sql = `SELECT * FROM mahasiswa WHERE nim = ?`;
        this.db.get(sql, [nim], (err, row) => {
            if (err) throw err;
            if (row) {
                console.log(`Nim            :${nim}`);
                console.log(`Nama           :${row.nama}`);
                console.log(`Alamat         :${row.alamat}`);
                console.log(`Kode Jurusan   :${row.kode_jurusan}`);
            } else {
                console.log(`mahasiswa dengan nim ${nim} tidak terdaftar`);
            }
        });
    }

    add() {
        console.log("Lengkapi data di bawah ini: ");
        rl.question("NIM:", (nim) => {
            rl.question("Nama:", (nama) => {
                rl.question("alamat:", (alamat) => {
                    rl.question("kode jurusan:", (kodeJurusan) => {
                        this.db.serialize(() => {
                            let sql = `INSERT INTO mahasiswa (nim, nama, alamat, kode_jurusan) VALUES ("${nim}", "${nama}", "${alamat}", "${kodeJurusan}")`;
                            this.db.run(sql, (err) => {
                                if (err) throw err;
                                mh.list();
                            });
                        });
                    })
                })
            })
        })
    }

    delete() {
        rl.question((`masukan NIM mahasiswa yang akan dihapus: `), (nim) => {
           this.db.run(`DELETE FROM mahasiswa WHERE nim = '${nim}'`,(err)=>{
               if (err){
                   return console.error(err.message);
               }
               console.log(`Mahasiswa dengan NIM ${nim} telah dihapus`);
               mh.list();
           })
        })
    }
}


// // let tes = new Opsi();
// let mh = new Mahasiswa();
// // mh.list();
// // mh.search(11515001)
// // tes.opsi();
// // tes.subOpsi(1);
// // mh.add();
// mh.delete();



