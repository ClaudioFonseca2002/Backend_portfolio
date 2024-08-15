const connection = require('../models/database.cjs')

//module.exports nos permite exportar una función
module.exports.ping=(req,res) =>{
    res.send('this is a ping test');
}

module.exports.connection=(req,res) =>{
    const consult = "SELECT * FROM login";
    try {
        connection.query(consult,(err,results)=>{
            console.log(results)
            console.log("Hola soy un ping");
            //res.json(results);
        });
    } catch (error) {
        console.log(error);
    }
}