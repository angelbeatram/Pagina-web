const express=require('express');
const router= express.Router();
import {getConnection} from '../database'




router.get('/',async (req,res)=>{
    const pool= await getConnection()
    const adop = await pool.request().query('exec SP_Adopciones');
    const adop2=adop.recordset
    const este = await pool.request().query('exec SP_Estetica');
    const este2=este.recordset
    const vete = await pool.request().query('exec SP_Veterinario');
    const vete2=vete.recordset
    const clin = await pool.request().query('exec SP_Clinica');
    const clin2=clin.recordset
    const cui = await pool.request().query('exec SP_Cuidador');
    const cui2=cui.recordset
    const pasea = await pool.request().query('exec SP_Paseador');
    const pasea2=pasea.recordset
    res.render('links/links',{adop2,este2,vete2,clin2,cui2,pasea2});

});

module.exports=router;