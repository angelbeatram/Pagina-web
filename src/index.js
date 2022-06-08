const express = require('express');
const morgan =require('morgan');
const exphbs =require('express-handlebars');
const path= require ('path');
const flash=require('connect-flash');
const session =require('express-session');
const passport = require('passport');

//inicializaciones

const app=express();


//settings
app.set('port', process.env.PORT ||5000);
app.listen(5000,'0.0.0.0',function (){
    console.log('escuchadn to port: '+5000);
});
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Midlewers
app.use(session({
   secret: 'secretosesion',
    resave: 'false',
    saveUninitialized: 'false'
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req,res,next)=>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.user=req.user;
    next();
});


//Rutas

app.use(require('./routes/'))
app.use(require('./routes/autenticacion'))
app.use('/links',require('./routes/links'))

//Publicos
app.use(express.static(path.join(__dirname, 'public')))

//Iniciar servidor
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});

