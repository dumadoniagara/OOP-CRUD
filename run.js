// file database yang digunakan : test.db

const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'silahkan pilih opsi :  '
})


class Home {
    constructor() {
        this.option = ['Mahasiswa', 'Jurusan', 'Dosen', 'Matakuliah', 'Kontrak', 'Keluar'];
        this.subOption = ['Mahasiswa', 'Jurusan', 'Dosen', 'Mata Kuliah', 'Kontrak'];
        this.list = ['daftar', 'cari', 'tambah', 'hapus'];
    }

    opsi() {
        console.log(`====================================================`);
        console.log(`silahkan pilih opsi dibawah ini`);
        for (let i = 0; i < this.option.length; i++) {
            console.log(`[${i + 1}] ${this.option[i]}`);
        }
        console.log(`====================================================`);
        // readline lagi ga disini?
    }

    subOpsi(index) {
        console.log(`====================================================`);
        console.log(`silahkan pilih opsi dibawah ini`);
        // const pilihan = ['daftar', 'cari', 'tambah', 'hapus']
        for (let i = 0; i < 4; i++) {
            console.log(`[${i + 1}] ${this.list[i]} ${this.subOption[index]}`);
        }
        console.log('[5] Kembali')
        console.log(`====================================================`);
        // readline lagi ga disini?
    }
}


class Mahasiswa {
    constructor() {
        this.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);
    }
    list() {
        this.db.serialize(() => {
            let sql = "SELECT * FROM mahasiswa";
            this.db.all(sql, (err, rows) => {
                if (err) {
                    throw err;
                } else { //cetak isi rows
                    let table = new Table({
                        head: ['Nim', 'Nama', 'Alamat', 'Kode_jurusan'],
                        colWidths: [10, 30, 20, 10]
                    });
                    // console.log(rows);
                    rows.forEach((row) => {
                        table.push([row.nim, row.nama, row.alamat, row.kode_jurusan]);
                    });
                    console.log(table.toString());
                    // console.log(`====================================================`);
                    hm.subOpsi(0);
                    rl.prompt();
                }
            });
        });
    }
    search() {
        rl.question(`Masukan nim mahasiswa yang anda cari, NIM : `, (nim) => {
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
                hm.subOpsi(0);
                rl.prompt();
            });
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
                                hm.subOpsi(0);
                                rl.prompt();
                            });
                        });
                    })
                })
            })
        })
        return this;
    }

    delete() {
        rl.question((`masukan NIM mahasiswa yang akan dihapus: `), (nim) => {
            this.db.run(`DELETE FROM mahasiswa WHERE nim = '${nim}'`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Mahasiswa dengan NIM ${nim} telah dihapus`);
                mh.list();
                hm.subOpsi(0);
                rl.prompt();
            })
        })
    }
}

class Jurusan {
    constructor() {
        this.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);
    }
    list() {
        this.db.serialize(() => {
            let sql = "SELECT * FROM jurusan";
            this.db.all(sql, (err, rows) => {
                if (err) {
                    throw err;
                } else { //cetak isi rows
                    let table = new Table({
                        head: ['Kode Jurusan', 'Nama Jurusan'],
                        colWidths: [10, 20]
                    });
                    // console.log(rows);
                    rows.forEach((row) => {
                        table.push([row.kode_jurusan, row.nama_jurusan]);
                    });
                    console.log(table.toString());
                    // console.log(`====================================================`);
                    hm.subOpsi(1);
                    rl.prompt();
                }
            });
        });
    }
    search() {
        rl.question(`Masukan kode jurusan yang anda cari, Kode : `, (kode) => {
            let sql = `SELECT * FROM jurusan WHERE kode_jurusan = ?`;
            this.db.get(sql, [kode], (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`Kode Jurusan   :${row.kode_jurusan}`);
                    console.log(`Nama Jurusan   :${row.nama_jurusan}`);
                } else {
                    console.log(`kode jurusan "$${kode_jurusan}" tidak terdaftar`);
                }
                hm.subOpsi(1);
                rl.prompt();
            });
        });
    }

    add() {
        console.log("Lengkapi data di bawah ini: ");
        rl.question("Kode Jurusan : ", (kode) => {
            rl.question("Nama Jurusan : ", (nama) => {
                this.db.serialize(() => {
                    let sql = `INSERT INTO jurusan (kode_jurusan, nama_jurusan) VALUES ("${kode}", "${nama}")`;
                    this.db.run(sql, (err) => {
                        if (err) throw err;
                        jr.list();
                        hm.subOpsi(1);
                        rl.prompt();
                    });
                });
            });
        });
    }

    delete() {
        rl.question((`masukan kode jurusan yang akan dihapus: `), (kode) => {
            this.db.run(`DELETE FROM jurusan WHERE kode_jurusan = '${kode}'`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Jurusan dengan kode ${kode} telah dihapus`);
                jr.list();
                hm.subOpsi(1);
                rl.prompt();
            })
        })
    }
}

class Dosen {
    constructor() {
        this.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);
    }
    list() {
        this.db.serialize(() => {
            let sql = "SELECT * FROM dosen";
            this.db.all(sql, (err, rows) => {
                if (err) {
                    throw err;
                } else { //cetak isi rows
                    let table = new Table({
                        head: ['NIP', 'Nama Dosen'],
                        colWidths: [10, 20]
                    });
                    // console.log(rows);
                    rows.forEach((row) => {
                        table.push([row.nip, row.nama]);
                    });
                    console.log(table.toString());
                    // console.log(`====================================================`);
                    hm.subOpsi(2);
                    rl.prompt();
                }
            });
        });
    }
    search() {
        rl.question(`Masukan NIP Dosen yang anda cari, NIP : `, (nip) => {
            let sql = `SELECT * FROM dosen WHERE nip = ?`;
            this.db.get(sql, [nip], (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`NIP            :${row.nip}`);
                    console.log(`Nama Dosen     :${row.nama}`);
                } else {
                    console.log(`Dosen dengan nomor NIP ${nip}" tidak terdaftar`);
                }
                hm.subOpsi(2);
                rl.prompt();
            });
        });
    }

    add() {
        console.log("Lengkapi data Dosen di bawah ini: ");
        rl.question("NIP : ", (nip) => {
            rl.question("Nama Dosen : ", (nama) => {
                this.db.serialize(() => {
                    let sql = `INSERT INTO dosen (nip, nama) VALUES ("${nip}", "${nama}")`;
                    this.db.run(sql, (err) => {
                        if (err) throw err;
                        ds.list();
                        hm.subOpsi(2);
                        rl.prompt();
                    });
                });
            });
        });
    }

    delete() {
        rl.question((`masukan NIP dosen yang akan dihapus: `), (nip) => {
            this.db.run(`DELETE FROM dosen WHERE nip = '${nip}'`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Dosen dengan NIP ${nip} telah dihapus`);
                ds.list();
                hm.subOpsi(2);
                rl.prompt();
            })
        })
    }
}

class Matakuliah {
    constructor() {
        this.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);
    }
    list() {
        this.db.serialize(() => {
            let sql = "SELECT * FROM matakuliah";
            this.db.all(sql, (err, rows) => {
                if (err) {
                    throw err;
                } else { //cetak isi rows
                    let table = new Table({
                        head: ['Kode', 'Nama MataKuliah', 'SKS'],
                        colWidths: [10, 20, 5]
                    });
                    // console.log(rows);
                    rows.forEach((row) => {
                        table.push([row.kode_mk, row.nama_mk, row.sks]);
                    });
                    console.log(table.toString());
                    // console.log(`====================================================`);
                    hm.subOpsi(3);
                    rl.prompt();
                }
            });
        });
    }
    search() {
        rl.question(`Masukan Kode Matakuliah yang anda cari, Kode : `, (kode) => {
            let sql = `SELECT * FROM matakuliah WHERE kode_mk = ?`;
            this.db.get(sql, [kode], (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`Kode MK     :${row.kode_mk}`);
                    console.log(`Nama MK     :${row.nama_mk}`);
                    console.log(`SKS         :${row.sks}`);
                } else {
                    console.log(`Matakuliah dengan kode ${kode}" tidak terdaftar`);
                }
                hm.subOpsi(3);
                rl.prompt();
            });
        });
    }

    add() {
        console.log("Lengkapi data Matakuliah di bawah ini: ");
        rl.question("Kode : ", (kode) => {
            rl.question("Nama MK  : ", (nama) => {
                rl.question("SKS  : ", (sks) => {
                    this.db.serialize(() => {
                        let sql = `INSERT INTO matakuliah (kode_mk, nama_mk, sks) VALUES ("${kode}", "${nama}", "${sks}")`;
                        this.db.run(sql, (err) => {
                            if (err) throw err;
                            mk.list();
                            hm.subOpsi(3);
                            rl.prompt();
                        });
                    });
                });
            });
        });
    }

    delete() {
        rl.question((`masukan kode matakuliah yang akan dihapus: `), (kode) => {
            this.db.run(`DELETE FROM matakuliah WHERE kode_mk = '${kode}'`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Matakuliah dengan kode ${kode} telah dihapus`);
                mk.list();
                hm.subOpsi(3);
                rl.prompt();
            })
        })
    }
}

class Kontrak {
    constructor() {
        this.db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);
    }
    list() {
        this.db.serialize(() => {
            let sql = "SELECT * FROM perkuliahan";
            this.db.all(sql, (err, rows) => {
                if (err) {
                    throw err;
                } else { //cetak isi rows
                    let table = new Table({
                        head: ['nim', 'nip dosen', 'mata kuliah', 'nilai'],
                        colWidths: [10, 5, 10, 10]
                    });
                    // console.log(rows);
                    rows.forEach((row) => {
                        table.push([row.nim, row.nip, row.mata_kuliah, row.nilai]);
                    });
                    console.log(table.toString());
                    // console.log(`====================================================`);
                    hm.subOpsi(4);
                    rl.prompt();
                }
            });
        });
    }

    search() {
        rl.question(`Masukan matakuliah yang ingin anda cari di Kontrak Perkuliahan, Kode : `, (kode) => {
            rl.question(`Masukan nim mahasiswa pada Kontrak kuliah ${kode}, NIM : `, (nim) => {
                let sql = `SELECT * FROM perkuliahan WHERE mata_kuliah = ? AND nim = ?`;
                this.db.get(sql, [kode, nim], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Nim Mahasiswa     :${row.nim}`);
                        console.log(`Nip Dosen         :${row.nip}`);
                        console.log(`Nama MK           :${row.mata_kuliah}`);
                        console.log(`Nilai             :${row.nilai}`);
                    } else {
                        console.log(`Matakuliah dengan kode ${kode}" tidak terdaftar`);
                    }
                    hm.subOpsi(4);
                    rl.prompt();
                });
            });
        });
    }

    add() {
        console.log("Lengkapi data Kontrak perkuliahan di bawah ini: ");
        rl.question("Nim Mahasiswa        : ", (nim) => {
            rl.question("NIP dosen        : ", (nip) => {
                rl.question("kode MK      : ", (mata_kuliah) => {
                    rl.question("Nilai    : ", (nilai) => {
                        this.db.serialize(() => {
                            let sql = `INSERT INTO perkuliahan (nim, nip, mata_kuliah, nilai) VALUES ("${nim}", "${nip}", "${mata_kuliah}","${nilai}")`;
                            this.db.run(sql, (err) => {
                                if (err) throw err;
                                kt.list();
                                hm.subOpsi(4);
                                rl.prompt();
                            });
                        });
                    });
                });
            });
        });
    }

    delete() {
        rl.question((`masukan kode matakuliah yang akan dihapus: `), (kode) => {
            rl.question((`masukan nim yang ingin dihapus pada kontrak matakuliah ${kode} : `), (nim) => {
                this.db.run(`DELETE FROM perkuliahan WHERE nim = '${nim}' AND mata_kuliah = '${kode}'`, (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`Kontrak perkuliahan pada matakuliah ${kode} milik nim ${nim} telah dihapus`);
                    kt.list();
                    hm.subOpsi(4);
                    rl.prompt();
                })
            });
        });
    }
}

function login() {
    console.log(`====================================================`);
    console.log(`Welcome to Institut Teknologi Bandung`);
    console.log(`Jl. Ganeca no. 10, Bandung`);
    console.log(`====================================================`);
    rl.question('Username : ', (input) => {
        console.log(`====================================================`);
        rl.question('Password : ', (pass) => {
            console.log(`====================================================`);
            mh.db.serialize(() => {
                let sql = `SELECT * FROM pengguna WHERE username = ? AND password = ?`;
                mh.db.get(sql, [input, pass], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Welcome ${row.username}. Your acces level is : ${row.status}`);
                        console.log(`====================================================`);
                        run();
                    }
                    else {
                        console.log(`username atau password belum terdaftar!`);
                        login();
                    }
                })
            });
        });
    });
};

let mh = new Mahasiswa();
let hm = new Home();
let jr = new Jurusan();
let ds = new Dosen();
let mk = new Matakuliah();
let kt = new Kontrak();

function run() {
    hm.opsi();
    rl.question('masukkan salah satu no. dari opsi diatas : ', (num) => {
        switch (num) {
            case '1': //mahasiswa
                hm.subOpsi(0);
                rl.prompt();
                rl.on('line', (num) => {
                    switch (num) {
                        case '1':
                            mh.list();
                            break;
                        case '2':
                            mh.search();
                            break;
                        case '3':
                            mh.add();
                            break;
                        case '4':
                            mh.delete();
                            break;
                        case '5':
                            hm.opsi();
                            run();
                            break;
                        default:
                            console.log(`pilihan yang anda masukan salah`);
                            hm.subOpsi(0);
                            break;
                    }
                });
                break;
            case '2': //Jurusan
                hm.subOpsi(1);
                rl.prompt();
                rl.on('line', (num) => {
                    switch (num) {
                        case '1':
                            jr.list();
                            break;
                        case '2':
                            jr.search();
                            break;
                        case '3':
                            jr.add();
                            break;
                        case '4':
                            jr.delete();
                            break;
                        case '5':
                            hm.opsi();
                            run();
                            break;
                        default:
                            console.log(`pilihan yang anda masukan salah`);
                            hm.subOpsi(1);
                            break;
                    }
                });
                break;

            case '3': //Dosen
                hm.subOpsi(2);
                rl.prompt();
                rl.on('line', (num) => {
                    switch (num) {
                        case '1':
                            ds.list();
                            break;
                        case '2':
                            ds.search();
                            break;
                        case '3':
                            ds.add();
                            break;
                        case '4':
                            ds.delete();
                            break;
                        case '5':
                            hm.opsi();
                            run();
                            break;
                        default:
                            console.log(`pilihan yang anda masukan salah`);
                            hm.subOpsi(2);
                            break;
                    }
                });
                break;

            case '4': //Dosen
                hm.subOpsi(3);
                rl.prompt();
                rl.on('line', (num) => {
                    switch (num) {
                        case '1':
                            mk.list();
                            break;
                        case '2':
                            mk.search();
                            break;
                        case '3':
                            mk.add();
                            break;
                        case '4':
                            mk.delete();
                            break;
                        case '5':
                            hm.opsi();
                            run();
                            break;
                        default:
                            console.log(`pilihan yang anda masukan salah`);
                            hm.subOpsi(3);
                            break;
                    }
                });
                break;

            case '5': //Kontrak
                hm.subOpsi(4);
                rl.prompt();
                rl.on('line', (num) => {
                    switch (num) {
                        case '1':
                            kt.list();
                            break;
                        case '2':
                            kt.search();
                            break;
                        case '3':
                            kt.add();
                            break;
                        case '4':
                            kt.delete();
                            break;
                        case '5':
                            hm.opsi();
                            run();
                            break;
                        default:
                            console.log(`pilihan yang anda masukan salah`);
                            hm.subOpsi(4);
                            break;
                    }
                });
                break;

            case '6':
                console.log(`Anda telah logout`)
                login();
                break;
            default:
                console.log(`Pilihan yang anda masukan salah.`)
                break;
        }
    });
}

login();
