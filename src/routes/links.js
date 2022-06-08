const express=require('express');
const router= express.Router();
const pool= require('../database');

/*
router.get('/links',async(req,res,next)=> {
    const este = await pool.executeQuery('SELECT nombre, email,celular, calle_num FROM estetica');
    console.log(este);
    //res.render('links/links',{este});
    /* const clin= await pool.executeQuery('select * from clinica');
     const este= await pool.executeQuery('select * from estetica');
     const pasea= await pool.executeQuery('select * from paseador');
     const cui= await pool.executeQuery('select * from cuidador');
     console.log('info aqui');
});


/*router.get('/Perfil',async (req,res)=>{
    const usuario= user.id;
    if(usuario>5000 && usuario<5999)
    {

    }

});*/

/*
router.get('/',async(req,res,next)=>{
    const vete= await pool.executeQuery('select nombre, email, celular, colonia from veterinario');

    const clin= await pool.executeQuery('select * from clinica');
    const cui= await pool.executeQuery('select * from cuidador');
    const este= await pool.executeQuery('SELECT nombre, email,celular, calle_num AS Dirección  FROM estetica');
    const pasea= await pool.executeQuery('select * from paseador');
    console.log(este);
    //res.render('links/links',{vete});
    //res.render('links/links',{clin});
    //res.render('links/links',{cui});
   // res.render('links/links',{este});
    //res.render('links/links',{pasea});
});*/


module.exports=router;