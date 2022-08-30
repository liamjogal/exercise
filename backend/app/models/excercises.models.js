const db = require("./db")




const enterdata = function(data) {
    var sql = `INSERT INTO excercises (id, date, type, sets, reps, weight) VALUES ('${data.id}', '${data.date}', '${data.type}', '${data.sets}', '${data.reps}', '${data.weight}')`;
    db.query(sql, function(err, result) {
        if(err) throw err;
        console.log("1 record inserted");
    });
}

const getdata = function(id) {
    ret = {}
    db.query(`SELECT * FROM excercise WHERE id = '${id}'`, function (err, result) {
        if (err) throw err;
        console.log(result);
        ret = result
      });
    return result;
}

module.exports = {enterdata, getdata}