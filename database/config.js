const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Erros al inicializar la base de datos');
    }



} 




module.exports = {
    dbConnection
}