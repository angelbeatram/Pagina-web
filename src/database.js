//const sql=require('mssql');
import sql from 'mssql'
//const rest = require('rest-mssql-nodejs')
const {promisify} =require('util');
//const {database}=require ('./keys');
//const pool=new sql.ConnectionPool(database);

const dbSettings={
    user: 'proyecto',
    password: 'proyecto',
    server: 'localhost',
    database:'proyecto',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
}

export async function getConnection(){
    const pool=await sql.connect(dbSettings)
    return pool;
}

export {sql};

