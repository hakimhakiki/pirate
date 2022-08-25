// import database
const koneksi = require("./config/database");

// baca data tabel crew
const crew = function() {};

crew.getcrew = (req, res) => {
    const querySql = 'SELECT * FROM crew';

    // run the query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err)
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err
            });

        // jika request berhasil
        res.status(200).json({ success: true, data: rows});
    });
};

// tambah data tabel crew
crew.addcrew = (req, res) => {
    const data = { ...req.body };
    const querySql = "INSERT INTO crew SET ?";

    //run the query
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err)
            return res.status(500).json({
                message: "Gagal insert data!",
                error: err
            });
        res.status(201).json({
            success: true,
            message: "Berhasil masukkan data"
        });
    });
};

// update data crew
crew.updatecrew = (req, res) => {
    const data = { ...req.body };
    const querySearch = "SELECT * FROM crew WHERE id=?";
    const queryUpdate = "UPDATE crew SET ? WHERE id=?";

    // run the query
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        if (err)
            return res.status(500).json({message: "Ada kesalahan", error: err});

        // if id selected is exist
        if (rows.length) {
            koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                if (err)
                    return res.status(500).json({message: 'Ada kesalahan', error: err});

                // update success
                res.status(200).json({ success: true, message: "Perubahan data Berhasil"});
            });
        } else {
            return res.status(404).json({ message: "Data tidak ditemukan!", success: false});
        }
    });
};

// delete data crew by id
crew.deletecrew = (req, res) => {
    const querySearch = "SELECT * FROM crew WHERE id=?";
    const queryDelete = "DELETE FROM crew WHERE id=?";

    // run the query
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        if (err)
            return res.status(500).json({ message: 'Ada kesalahan', error: err});

        if (rows.length){
            koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
                if (err)
                    return res.status(500).json({message: 'Ada kesalahan', error: err});

                res.status(200).json({success: true, message: 'Berhasil hapus data'});
            });
        } else {
            return res.status(404).json({message: 'Data tidak ditemukan', success: false});
        }
    });
};


module.exports = crew;
