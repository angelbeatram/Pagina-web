import {getConnection, sql} from "../database";
import {render} from "timeago.js";
import {idin} from "../lib/passport"
const express=require('express');
const router = express.Router();
const passport= require('passport');
const helpers= require('../lib/helpers');
const {isLoggedin}= require('../lib/auths');


// Con esta función se muestra el Toast



router.get('/no',(req,res)=>{
   res.render('partials/caro')
});

router.get('/perritos',(req,res)=>{
    res.render('links/perros')
    // Con esta función se muestra el Toast

});

router.get('/signin',(req,res)=>{
    res.render('auth/signin');
});

router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});



router.get('/Persona',(req,res)=>{
    res.render('auth/Persona')
});

router.post('/signup',
    passport.authenticate('local.Persona',{
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash:true

}))




router.get('/veterinario',(req,res)=>{
    res.render('auth/veterinario')
});

router.post('/veterinario',passport.authenticate('local.veterinario',{
        successRedirect: '/',
        failureRedirect: '/veterinario',
        failureFlash:true
}))

router.get('/paseador',(req,res)=>{
    res.render('auth/paseador')
});
router.post('/paseador',passport.authenticate('local.paseador',{
        successRedirect: '/',
        failureRedirect: '/paseador',
        failureFlash:true

}));

router.get('/cuidador',(req,res)=>{
    res.render('auth/cuidador')
});
router.post('/cuidador',  passport.authenticate('local.cuidador',{
        successRedirect: '/',
        failureRedirect: '/cuidador',
        failureFlash:true

}));

router.get('/clinica',(req,res)=>{
    res.render('auth/clinica')
});
router.post('/clinica', passport.authenticate('local.clinica',{
        successRedirect: '/',
        failureRedirect: '/clinica',
        failureFlash:true

}));

router.get('/este',async (req,res)=>{
    res.render('auth/este')
    //const pool= await getConnection();
   // pool.request().query( "exec restetica 'laurita612','dsdw233','lola','asa@qdefe','33234442','coodod','sdsds','sdsd',5533 ")
});


router.post('/este', passport.authenticate('local.este', {
    successRedirect: '/',
    failureRedirect: '/este',
    failureFlash: true

}));

router.get('/signup',(req,res)=>{
    res.render('auth/signup');
});

/*
router.get('/',(req,res )=>{
    res.render('../views/links/links');
} );*/



router.get('/misdatos',async (req,res)=>{
 console.log('misdatos');
    const pool= await getConnection();

    if(idin>1000 && idin<1999)
    {
        var cli2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDclinica2 @saberid',);
        cli2=cli2.recordset
        res.render('links/misdatos',{cli2})

    }
    if(idin>2000 && idin<2999)
    {
        var cui2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDcuidador2 @saberid',);
        cui2=cui2.recordset
        res.render('links/misdatos',{cui2})

    }
    if(idin>3000 && idin<3999)
    {
        var este2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDestetica2 @saberid',);
        este2=este2.recordset
        res.render('links/misdatos',{este2})

    }
    if(idin>4000 && idin<4999)
    {
        var pasea2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDpaseador2 @saberid',);
        pasea2=pasea2.recordset
        res.render('links/misdatos',{pasea2})

    }

 if(idin>5000 && idin <5999)
 {
    var persona= await pool.request()
         .input('saberid',idin)
         .query('exec SP_IDpersona @saberid');
    persona=persona.recordset
     res.render('links/misdatos',{persona})

 }
    if(idin>6000 && idin <6999)
    {
        var vete2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDveterinario2 @saberid');
        vete2=vete2.recordset
        console.log(vete2);
        res.render('links/misdatos',{vete2})
    }
});

router.post('/misdatos', async(req,res)=> {

    console.log('eliminar datos')
    const pool= await getConnection();

    if(idin>1000 && idin<1999)
    {
       const clinica= await pool.request()
            .input('saberid',idin)
            .query('delete from clinica where ID_clinica=@saberid',);
    }
    if(idin>2000 && idin<2999)
    {
        const cuidador= await pool.request()
            .input('saberid',idin)
            .query('delete from cuidador WHERE ID_cuidador= @saberid',);
    }
    if(idin>3000 && idin<3999)
    {
        const esteica= await pool.request()
            .input('saberid',idin)
            .query('delete from estetica WHERE ID_estetica= @saberid',);
    }
    if(idin>4000 && idin<4999)
    {
        const paseador= await pool.request()
            .input('saberid',idin)
            .query('delete from paseador WHERE ID_paseador= @saberid',);
    }
    if(idin>5000 && idin<5999)
    {
        const persona= await pool.request()
            .input('saberid',idin)
            .query('delete from persona WHERE ID_persona= @saberid',);
    }
    if(idin>6000 && idin<6999)
    {
       const veterinario= await pool.request()
            .input('saberid',idin)
            .query('delete from veterinario WHERE ID_veterinario= @saberid',);
    }

})

router.get('/editarperfil',async (req,res)=>{
    console.log('editarperfil');
    const pool= await getConnection();
    if(idin>1000 && idin<1999)
    {
        var cli2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDestetica @saberid',);
        cli2=cli2.recordset
        res.render('links/editarperfil',{cli2})

    }
    if(idin>2000 && idin<2999)
    {
        var cui2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDcuidador @saberid',);
        cui2=cui2.recordset
        res.render('links/editarperfil',{cui2})

    }
    if(idin>3000 && idin<3999)
    {
        var este2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDestetica @saberid',);
        este2=este2.recordset
        res.render('links/editarperfil',{este2})

    }
    if(idin>4000 && idin<4999)
    {
        var pasea2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDpaseador @saberid',);
        pasea2=pasea2.recordset
        res.render('links/editarperfil',{pasea2})

    }

    if(idin>5000 && idin <5999)
    {
        var persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDpersona @saberid',);
        persona=persona.recordset
        res.render('links/editarperfil',{persona})

    }
    if(idin>6000 && idin <6999)
    {
        var vete2= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDveterinario @saberid',);
        vete2=vete2.recordset
        console.log(vete2);
        res.render('links/editarperfil',{vete2})
    }
});
module.exports=router;

router.post('/editarperfil', async(req,res)=> {
    console.log('editar datos');
    console.log(req.body);
    const pool= await getConnection();

    if(idin>1000 && idin<1999)
    {
        const {usuario,nombre,email,celular,permiso,calle_num,colonia,delegacion_muni,codigo_postal,servicios,contrasena }=req.body;
        const newclinica={
            usuario,
            contrasena,
            nombre,
            servicios,
            email,
            celular,
            permiso,
            calle_num,
            colonia,
            delegacion_muni,
            codigo_postal
        };
        newclinica.contrasena=await helpers.encryptPassword(contrasena);
        const pool= await getConnection();
        const result = await pool.request()
            .input('saberid',idin)
            .input('usuario1',sql.VarChar,newclinica.usuario)
            .input('contrasena1',sql.VarChar,newclinica.contrasena)
            .input('nombre1',sql.VarChar,newclinica.nombre)
            .input('servicios1',sql.VarChar,newclinica.servicios)
            .input('email1',sql.VarChar,newclinica.email)
            .input('celular1',sql.VarChar,newclinica.celular)
            .input('permiso1',sql.VarChar,newclinica.permiso)
            .input('calle1',sql.VarChar,newclinica.calle_num)
            .input('colonia1',sql.VarChar,newclinica.colonia)
            .input('delegacion1',sql.VarChar,newclinica.delegacion_muni)
            .input('codigo1',sql.VarChar,newclinica.codigo_postal)
            .query('update clinica set usuario=@usuario1, contrasena=@contrasena1, nombre_cli=@nombre1, servicios=@servicios, email=@email1, numero_contatco=@celular1, ' +
                'permiso=@permiso, calle_num=@calle1, colonia=@colonia,delegacion_muni=@delegacion1,codigo_postal=@codigo1) where ID_clinica=@saberid');
        console.log(result);
        res.redirect('/misdatos');

    }
    if(idin>2000 && idin<2999)
    {
        const {usuario, nombre,apeido,email,celular,calle_num,colonia,delegacion_muni,codigo_postal,contrasena }=req.body;
        const newCuidador={
            usuario,
            contrasena,
            nombre,
            apeido,
            email,
            celular,
            calle_num,
            colonia,
            delegacion_muni,
            codigo_postal
        };
        newCuidador.contrasena=await helpers.encryptPassword(contrasena);
        const pool= await getConnection();
        const result = await pool.request()
            .input('saberid',idin)
            .input('usuario1',sql.VarChar,newCuidador.usuario)
            .input('contrasena1',sql.VarChar,newCuidador.contrasena)
            .input('nombre1',sql.VarChar,newCuidador.nombre)
            .input('apeido1',sql.VarChar,newCuidador.apeido)
            .input('email1',sql.VarChar,newCuidador.email)
            .input('celular1',sql.VarChar,newCuidador.celular)
            .input('calle1',sql.VarChar,newCuidador.calle_num)
            .input('colonia1',sql.VarChar,newCuidador.colonia)
            .input('delegacion1',sql.VarChar,newCuidador.delegacion_muni)
            .input('codigo1',sql.VarChar,newCuidador.codigo_postal)
            .query('update cuidador set usuario=@usuario1, contraseña=@contrasena1, nombre=@nombre1, apellido=@apeido1, email=@email1, celular=@celular1, ' +
                'calle_num=@calle1, colonia=@colonia, delegacion_muni=@delegacion1,codigo_postal=@codigo1 where ID_cuidador=@saberid');
        console.log(result);
        res.redirect('/misdatos');

    }
    if(idin>3000 && idin<3999)
    {
        const {usuario,nombre,email,celular,calle_num,colonia,delegacion_muni,codigo_postal,contrasena }=req.body;
        const newEstetica={
            usuario,
            contrasena,
            nombre,
            email,
            celular,
            calle_num,
            colonia,
            delegacion_muni,
            codigo_postal
        };
        newEstetica.contrasena=await helpers.encryptPassword(contrasena);
        const pool= await getConnection();
        const result = await pool.request()
            .input('usuario1',sql.VarChar,newEstetica.usuario)
            .input('contrasena1',sql.VarChar,newEstetica.contrasena)
            .input('nombre1',sql.VarChar,newEstetica.nombre)
            .input('email1',sql.VarChar,newEstetica.email)
            .input('celular1',sql.VarChar,newEstetica.celular)
            .input('calle1',sql.VarChar,newEstetica.calle_num)
            .input('colonia1',sql.VarChar,newEstetica.colonia)
            .input('delegacion1',sql.VarChar,newEstetica.delegacion_muni)
            .input('codigo1',sql.VarChar,newEstetica.codigo_postal)
            .query('update estetica set usuario=@usuario1, contraseña=@contrasena1, nombre=@nombre1, email=@email1, celular=@celular1, ' +
                'calle_num=@calle1, colonia=@colonia,delegacion_muni=@delegacion1,codigo_postal=@codigo1 where ID_estetica=@saberid');
        console.log(result);
        res.redirect('/misdatos');
    }
    if(idin>4000 && idin<4999)
    {
        const {usuario,nombre,apeido,email,celular,zona_paseo,contrasena }=req.body;
        const newpaseador={
            usuario,
            contrasena,
            nombre,
            apeido,
            email,
            celular,
            zona_paseo
        };
        newpaseador.contrasena=await helpers.encryptPassword(contrasena);
        const pool= await getConnection();
        const result = await pool.request()
            .input('saberid',idin)
            .input('usuario1',sql.VarChar,newpaseador.usuario)
            .input('contrasena1',sql.VarChar,newpaseador.contrasena)
            .input('nombre1',sql.VarChar,newpaseador.nombre)
            .input('apeido1',sql.VarChar,newpaseador.apeido)
            .input('email1',sql.VarChar,newpaseador.email)
            .input('celular1',sql.VarChar,newpaseador.celular)
            .input('zona1',sql.VarChar,newpaseador.zona_paseo)
            .query('update paseador set usuario=@usuario1, contraseña=@contrasena1, nombre=@nombre1, apellido=@apeido1, email=@email1, celular=@celular1, zona_paseo=@zona1 where ID_paseador=@saberid');
        console.log(result);
        res.redirect('/misdatos');
    }
    if(idin>5000 && idin<5999)
    {
        const {usuario,nombre,apeido,email,contrasena }=req.body;
        const newPersona={
            usuario,
            contrasena,
            nombre,
            apeido,
            email
        };
        newPersona.contrasena=await helpers.encryptPassword(contrasena);
        console.log(newPersona);
        const pool= await getConnection();
        const result = await pool.request()
            .input('saberid',idin)
            .input('usuario1',sql.VarChar,newPersona.usuario)
            .input('contrasena1',sql.VarChar,newPersona.contrasena)
            .input('nombre1',sql.VarChar,newPersona.nombre)
            .input('apeido1',sql.VarChar,newPersona.apeido)
            .input('email1',sql.VarChar,newPersona.email)
            .query('update persona set usuario=@usuario1, contrasenas=@contrasena1, nombre=@nombre1, apellido=@apeido1, email=@email1 where ID_persona=@saberid');
        console.log(result);
        res.redirect('/misdatos');
    }
    if(idin>6000 && idin<6999)
    {
        const {usuario,nombre,email,celular,calle_num,colonia,delegacion_muni,codigo_postal,contrasena }=req.body;
        const newveterinario={
            usuario,
            contrasena,
            nombre,
            email,
            celular,
            calle_num,
            colonia,
            delegacion_muni,
            codigo_postal
        };
        newveterinario.contrasena=await helpers.encryptPassword(contrasena);
        const pool= await getConnection();
        const result = await pool.request()
            .input('saberid',idin)
            .input('usuario1',sql.VarChar,newveterinario.usuario)
            .input('contrasena1',sql.VarChar,newveterinario.contrasena)
            .input('nombre1',sql.VarChar,newveterinario.nombre)
            .input('apeido1',sql.VarChar,newveterinario.apeido)
            .input('email1',sql.VarChar,newveterinario.email)
            .input('celular1',sql.VarChar,newveterinario.celular)
            .input('calle1',sql.VarChar,newveterinario.calle_num)
            .input('colonia1',sql.VarChar,newveterinario.colonia)
            .input('delegacion1',sql.VarChar,newveterinario.delegacion_muni)
            .input('codigo1',sql.VarChar,newveterinario.codigo_postal)
            .query('update veterinaio set usuario=@usuario1, contraseña=@contrasena1, nombre=@nombre1, apellido=@apeido1, email=@email1, celular=@celular1, ' +
                'calle_num=@calle1, colonia=@colonia,delegacion_muni=@delegacion1 where ID_veterinario');
        console.log(result);
        res.redirect('/misdatos');
    }
})

router.get('/mismascotas',async (req,res) =>{
    const pool= await getConnection();
    const mascotas = await pool.request()
        .input('saberid',idin)
        .query('select * from mascota where ID_dueño=@saberid')
    const masco2=mascotas.recordset;
    console.log(masco2)
    res.render('links/mismascotas',{masco2});
})

router.get('/registrarmas',async (req,res) =>{
    if(idin>5000 && idin<5999) {
        res.render('links/registrarmas');
    }
    else{
        req.flash('message','No tienes permitido registrar mascotas aun')
        res.redirect('/');
    }
})

router.post('/registrarmas',async (req,res) =>{

    const {nombre,tipo,raza,edad,sexo}=req.body;

    const pool= await getConnection();
    const mascotas = await pool.request()
        .input('saberid',idin)
        .input('nombre1',nombre)
        .input('tipo1',tipo)
        .input('raza1',raza)
        .input('edad1',sql.Int,edad)
        .input('sexo1',sexo)
        .query('insert into mascota values (@saberid,@nombre1,@tipo1,@raza1,@edad1,@sexo1)')
    res.redirect('/mismascotas');
})


router.get('/regiadop',async (req,res) => {
    res.render('links/regiadop');
})


router.post('/regiadop',async (req,res) =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;

    const {nombre,tipo,raza,edad,sexo}=req.body;
    const pool= await getConnection();
    console.log(req.body);
    console.log(idin);
    var persona,nompersona,contacto;

    if(idin>1000 && idin<1999)
    {
        persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDsetetica @saberid',);
        persona=persona.recordset[0];
        contacto=persona.celular;
        nompersona=persona.nombre;
    }
    if(idin>2000 && idin<2999)
    {
        persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDcuidador @saberid',);
        persona=persona.recordset[0];
        contacto=persona.celular;
        nompersona=persona.nombre;

    }
    if(idin>3000 && idin<3999)
    {
        persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDestetica @saberid',);
        persona=persona.recordset[0];
        contacto=persona.celular;
        nompersona=persona.nombre;
    }
    if(idin>4000 && idin<4999)
    {
        persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDpaseador @saberid',);
        persona=persona.recordset[0];
        contacto=persona.celular;
        nompersona=persona.nombre;
    }

    if(idin>5000 && idin <5999)
    {
         persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDpersona @saberid',);
        persona=persona.recordset[0];
        contacto=persona.email;
        nompersona=persona.nombre;
    }
    if(idin>6000 && idin <6999)
    {
        persona= await pool.request()
            .input('saberid',idin)
            .query('exec SP_IDveterinario @saberid',);
        persona=persona.recordset[0];
        contacto=persona.celular;
        nompersona=persona.nombre;
    }
    const mascotas = await pool.request()
        .input('saberid',idin)
        .input('nombre1',nombre)
        .input('tipo1',tipo)
        .input('raza1',raza)
        .input('edad1',sql.Int,edad)
        .input('sexo1',sql.VarChar,sexo)
        .input('fecha1',today)
        .input('contacto1',contacto)
        .input('persona1',nompersona)
        .query('insert into adopciones (nombre,tipo,raza,edad,sexo,fecha,numer_cont,persona) ' +
            'values (@nombre1,@tipo1,@raza1,@edad1,@sexo1,@fecha1,@contacto1,@persona1)')
    res.redirect('/');
})


router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});
