import {getConnection,sql} from "../database";
const passport=require('passport')
const LocalStrategy= require('passport-local').Strategy;
//const pool=require('../database');
const helpers= require('../lib/helpers');
 var idin;

passport.use('local.signin', new LocalStrategy({
    usernameField: 'inusuario',
    passwordField: 'incontrasena',
    passReqToCallback:true
}, async (req,inusuario,incontrasena,done)=>{
    console.log(inusuario,incontrasena);
    const pool= await getConnection();

    const persona= await pool.request()
        .input('per',sql.VarChar,inusuario)
        .query('select * from persona WHERE usuario= @per');
    const clinica= await pool.request()
        .input('cli',sql.VarChar,inusuario)
        .query('select * from clinica WHERE usuario= @cli');
    const cuidador= await pool.request()
        .input('cui',sql.VarChar,inusuario)
        .query('select * from cuidador WHERE usuario= @cui');
    const estetica= await pool.request()
        .input('est',sql.VarChar,inusuario)
        .query('select * from estetica WHERE usuario= @est');
    const paseador= await pool.request()
        .input('pase',sql.VarChar,inusuario)
        .query('select * from paseador WHERE usuario= @pase');
    const veterinario= await pool.request()
        .input('vete',sql.VarChar,inusuario)
        .query('select * from veterinario WHERE usuario= @vete');

    if (persona.recordset.length>0){
        const user =persona.recordset[0];
        console.log(user);
        const validPassword =await helpers.matchPassword(incontrasena, user.contrasenas);
        if(validPassword){
            console.log('bien')
            user.id= user.ID_persona;
            console.log(user.id);
            done(null,user,req.flash('succes','Welcome'));
    }else{
            console.log('mal');
        done(null, false, req.flash('message','contraseña incorrecta'));
    }

    }
    if (clinica.recordset.length>0){
        const user =clinica.recordset;
        console.log(user);

        const validPassword =await helpers.matchPassword(incontrasena, user.contrasena);
        if(validPassword){
            user.id= user.ID_clinica;
            console.log(user.id);
            done(null,user,req.flash('succes','Welcome'));
        }else{
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    }
    else if (cuidador.recordset.length>0){
        const user =cuidador.recordset[0];
        const validPassword =await helpers.matchPassword(incontrasena, user.contraseña);
        if(validPassword){
            user.id= user.ID_cuidador;
            console.log(user.id);
            done(null,user,req.flash('succes','Welcome'));
        }else{
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    }
    else if (estetica.recordset.length>0){
        const user =estetica.recordset[0];
        const validPassword =await helpers.matchPassword(incontrasena, user.contraseña);
        if(validPassword){
            user.id= user.ID_estetica;
            console.log(user.id);
            done(null,user,req.flash('succes','Welcome'));
        }else{
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    }
    else if (paseador.recordset.length>0){
        const user =paseador.recordset[0];
        const validPassword =await helpers.matchPassword(incontrasena, user.contraseña);
        if(validPassword){
            user.id= user.ID_paseador;
            console.log(user.id);
            done(null,user,req.flash('succes','Welcome'));
        }else{
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    }
    else if (veterinario.recordset.length>0){

        const user =veterinario.recordset[0];
        const validPassword =await helpers.matchPassword(incontrasena, user.contraseña);
        if(validPassword){
            user.id= user.ID_veterinario;
            console.log('entro');
            console.log(user.id);
            done(null,user,req.flash('succes','Welcome'));
        }else{
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    }
    else{
        console.log('no existe');
        return done(null,false, req.flash('message','el usuario no existe'));
    }
}));


passport.use('local.Persona', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,usuario,contrasena,done)=>{

    const {nombre,apeido,email }=req.body;
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
       .input('usuario1',sql.VarChar,newPersona.usuario)
       .input('contrasena1',sql.VarChar,newPersona.contrasena)
       .input('nombre1',sql.VarChar,newPersona.nombre)
       .input('apeido1',sql.VarChar,newPersona.apeido)
       .input('email1',sql.VarChar,newPersona.email)
       .query('exec rpersona1 @usuario1, @contrasena1, @nombre1, @apeido1, @email1');
    console.log(result.recordset);
    const reid2=result.recordset[0];
    newPersona.id= reid2.ID_persona;
    console.log(newPersona.id);
    return done(null,newPersona);
}));

passport.use('local.este', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,usuario,contrasena,done)=>{
    console.log(req.body);
    const {nombre,email,celular,calle_num,colonia,delegacion_muni,codigo_postal }=req.body;
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
        .input('codigo1',sql.Int,newEstetica.codigo_postal)
        .query('exec restetica @usuario1, @contrasena1, @nombre1, @email1, @celular1, ' +
            '@calle1, @colonia1,@delegacion1,@codigo1');
    console.log(result.recordset);
    const reid2=result.recordset[0];
    newEstetica.id= reid2.ID_estetica;
    return done(null,newEstetica)
}));

passport.use('local.clinica', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,usuario,contrasena,done)=>{
    console.log(req.body);
    const {nombre,email,celular,permiso,calle_num,colonia,delegacion_muni,codigo_postal,servicios }=req.body;
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
        .input('codigo1',sql.Int,newclinica.codigo_postal)
        .query('exec rclinica @usuario1, @contrasena1, @nombre1, @servicios1, @email1, @celular1, ' +
            '@permiso1,@calle1, @colonia1,@delegacion1,@codigo1');
    console.log(result.recordset);
    const reid2=result.recordset[0];
    newclinica.id= reid2.ID_clinica;
    return done(null,newclinica)
}));

passport.use('local.cuidador', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,usuario,contrasena,done)=>{
    console.log(req.body);
    const {nombre,apeido,email,celular,calle_num,colonia,delegacion_muni,codigo_postal }=req.body;
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
        .input('usuario1',sql.VarChar,newCuidador.usuario)
        .input('contrasena1',sql.VarChar,newCuidador.contrasena)
        .input('nombre1',sql.VarChar,newCuidador.nombre)
        .input('apeido1',sql.VarChar,newCuidador.apeido)
        .input('email1',sql.VarChar,newCuidador.email)
        .input('celular1',sql.VarChar,newCuidador.celular)
        .input('calle1',sql.VarChar,newCuidador.calle_num)
        .input('colonia1',sql.VarChar,newCuidador.colonia)
        .input('delegacion1',sql.VarChar,newCuidador.delegacion_muni)
        .input('codigo1',sql.Int,newCuidador.codigo_postal)
        .query('exec rcuidador @usuario1, @contrasena1, @nombre1, @apeido1, @email1, @celular1, ' +
            '@calle1, @colonia1, @delegacion1, @codigo1');
    console.log(result.recordset);
    const reid2=result.recordset[0];
    newCuidador.id= reid2.ID_cuidador;
    return done(null,newCuidador)
}));

passport.use('local.paseador', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,usuario,contrasena,done)=>{
    console.log(req.body);
    const {nombre,apeido,email,celular,zona_paseo }=req.body;
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
        .input('usuario1',sql.VarChar,newpaseador.usuario)
        .input('contrasena1',sql.VarChar,newpaseador.contrasena)
        .input('nombre1',sql.VarChar,newpaseador.nombre)
        .input('apeido1',sql.VarChar,newpaseador.apeido)
        .input('email1',sql.VarChar,newpaseador.email)
        .input('celular1',sql.VarChar,newpaseador.celular)
        .input('zona1',sql.VarChar,newpaseador.zona_paseo)
        .query('exec rpaseador @usuario1, @contrasena1, @nombre1, @apeido1, @email1, @celular1, @zona1');
    console.log(result.recordset);
    const reid2=result.recordset[0];
    newpaseador.id= reid2.ID_paseador;
    console.log(newpaseador.id);
    return done(null,newpaseador);
}));

passport.use('local.veterinario', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,usuario,contrasena,done)=>{
    console.log(req.body);
    const {nombre,apeido,email,celular,calle_numero,colonia,delegacion_muni,codigo_postal }=req.body;
    const newveterinario={
        usuario,
        contrasena,
        nombre,
        apeido,
        email,
        celular,
        calle_numero,
        colonia,
        delegacion_muni,
    };
    newveterinario.contrasena=await helpers.encryptPassword(contrasena);
    const pool= await getConnection();
    const result = await pool.request()
        .input('usuario1',sql.VarChar,newveterinario.usuario)
        .input('contrasena1',sql.VarChar,newveterinario.contrasena)
        .input('nombre1',sql.VarChar,newveterinario.nombre)
        .input('apeido1',sql.VarChar,newveterinario.apeido)
        .input('email1',sql.VarChar,newveterinario.email)
        .input('celular1',sql.VarChar,newveterinario.celular)
        .input('calle1',sql.VarChar,newveterinario.calle_numero)
        .input('colonia1',sql.VarChar,newveterinario.colonia)
        .input('delegacion1',sql.VarChar,newveterinario.delegacion_muni)
        .query('exec rveterinario @usuario1, @contrasena1, @nombre1, @apeido1, @email1, @celular1, ' +
            '@calle1, @colonia1,@delegacion1');
    console.log(result.recordset);
    const reid2=result.recordset[0];
    newveterinario.id= reid2.ID_veterinario;
    return done(null,newveterinario)
}));




passport.serializeUser((user,done)=>{
    done(null,user.id);
    console.log(user.id);
})

passport.deserializeUser(async (id,done)=>{
    const pool= await getConnection();
    var rows;
    console.log(id);
    if(id>1000 && id<1999)
    {
        rows= await pool.request()
            .input('saberid',id)
            .query('exec SP_IDclinica @saberid',);
    }
    if(id>2000 && id<2999)
    {
        rows= await pool.request()
            .input('saberid',id)
            .query('exec SP_IDcuidador @saberid',);
    }
    if(id>3000 && id<3999)
    {
        rows= await pool.request()
            .input('saberid',id)
            .query('exec SP_IDestetica @saberid',);
    }
    if(id>4000 && id<4999)
    {
        rows= await pool.request()
            .input('saberid',id)
            .query('exec SP_IDpaseador @saberid',);
    }
    if(id>5000 && id<5999)
    {
        rows= await pool.request()
            .input('saberid',id)
            .query('exec SP_IDpersona @saberid',);
    }
    if(id>6000 && id<6999)
    {
        console.log('llego');

        rows= await pool.request()
            .input('saberid',id)
            .query('exec SP_IDveterinario @saberid',);
    }
    idin=id;

   done(null,rows.recordset);

})

export {idin}