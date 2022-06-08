var usu = 0;//identificador de quien se registra

///Funcion para animacion en formulario
$(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {

    var $this = $(this),
        label = $this.prev("label");

    if (e.type === "keyup") {
        if ($this.val() === "") {
            label.removeClass("active highlight");
        } else {
            label.addClass("active highlight");
        }
    } else if (e.type === "blur") {
        if ($this.val() === "") {
            label.removeClass("active highlight");
        } else {
            label.removeClass("highlight");
        }
    } else if (e.type === "focus") {
        if ($this.val() === "") {
            label.removeClass("highlight");
        } else if ($this.val() !== "") {
            label.addClass("highlight");
        }
    }

});

//
function registrarusuario(e) {//obtiene los datos de registro
    e.preventDefault();
    //persona=0; veterinario=1; paseador=2; cuidador=3; clinica=4; estetica=5
    if (usu == 0) {
        var nombrere = document.getElementById("nombrere").value;
        var usuariore = document.getElementById("usuariore").value;
        var apeidore = document.getElementById("apeidore").value;
        var usuariore = document.getElementById("usuariore").value;
        var emailre = document.getElementById("emailre").value;
        var contraseñare = document.getElementById("contraseñare").value;
    }
    if (usu == 1) {//veterinario=1
        var nombrevete = document.getElementById("nombrevete").value;
        var usuariovete = document.getElementById("usuariovete").value;
        var apeidovete = document.getElementById("apeidovete").value;
        var emailvete = document.getElementById("emailvete").value;
        var contravete = document.getElementById("contraseñavete").value;
        var numcelvete = document.getElementById("numcelvete").value;
        var callevete = document.getElementById("callevete").value;
        var coloniavete = document.getElementById("coloniavete").value;
        var municipiovete = document.getElementById("municipiovete").value;
        var cpvete = document.getElementById("cpvete").value;
        var cedula = document.getElementById("cedula").value;
    }
    if (usu == 2) {//paseador=2;
        var nombrepas = document.getElementById("nombrepas").value;
        var usuariopas = document.getElementById("usuariopas").value;
        var apeidopas = document.getElementById("apeidopas").value;
        var emailpas = document.getElementById("emailpas").value;
        var contrapas = document.getElementById("contraseñavete").value;
        var celpas = document.getElementById("celpas").value;
        var zonapas = document.getElementById("zonapas").value;
    }
    if (usu == 3) {//cuidador=3;
        var nombrecui = document.getElementById("nombrecui").value;
        var usuariocui = document.getElementById("usuariocui").value;
        var apeidocui = document.getElementById("apeidocui").value;
        var emailcui = document.getElementById("emailcui").value;
        var contracui = document.getElementById("contracui").value;
        var numcelcui = document.getElementById("celcui").value;
        var callecui = document.getElementById("callecui").value;
        var coloniacui = document.getElementById("coloniacui").value;
        var municipiocui = document.getElementById("municipiocui").value;
        var cpcui = document.getElementById("cpcui").value;
    }
    if (usu == 4) {//clinica=4;
        var nombrecli = document.getElementById("nombrecli").value;
        var usuariocli = document.getElementById("usuariocli").value;
        var emailcli = document.getElementById("emailcli").value;
        var contracli = document.getElementById("contracli").value;
        var celcli = document.getElementById("celcli").value;
        var callecli = document.getElementById("callecli").value;
        var coloniacli = document.getElementById("coloniacli").value;
        var municipiocli = document.getElementById("municipiocli").value;
        var cpcli = document.getElementById("cpcli").value;
        var permisocli = document.getElementById("permisocli").value;
        var servicioscli = document.getElementById("servicioscli").value;
    }
    if (usu == 5) {//estetica=5
        var nombreest = document.getElementById("nombreest").value;
        var usuarioest = document.getElementById("usuarioest").value;
        var emailest = document.getElementById("emailest").value;
        var contraest = document.getElementById("contraest").value;
        var numeest = document.getElementById("numeest").value;
        var calleest = document.getElementById("calleest").value;
        var coloniaest = document.getElementById("coloniaest").value;
        var municipioest = document.getElementById("municipioest").value;
        var cpest = document.getElementById("cpest").value;
        var permisoest = document.getElementById("permisoest").value;
        var serviciosest = document.getElementById("serviciosest").value;
    }
    location.href = "C:/Users/djzho/IdeaProjects/untitled5/Index.html";//MODIFICAR DIRECCION
}

function iniciarsesion(e) { //funcion para obtener los datos desde inicio de sesion
    e.preventDefault();
    var usuarioin = document.getElementById("usuarioin").value;
    var contraseñain = document.getElementById("contraseñain").value;
    //document.getElementById("tiutloin").innerHTML=usuario;
    location.href = "C:/Users/djzho/IdeaProjects/untitled5/html/principal.html";//MODIFICAR DIRECCION
}

$(".tab a").on("click", function (e) {//activa el formulario iniciar sesion o registro
    e.preventDefault();

    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    target = $(this).attr("href");
    $(".contenido-tab > div").not(target).hide();
    $(target).fadeIn(1000);

});


$(".vete a").on("click", function (e) {//muestra el formulario para veterinario cuando se selecciona
    usu = 1;
    e.preventDefault();
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    target = $(this).attr("href");
    $(".contenido-persona").not(target).hide();
    $(".contenido-paseador").not(target).hide();
    $(".contenido-cuidador").not(target).hide();
    $(".contenido-clinica").not(target).hide();
    $(".contenido-estetica ").not(target).hide();
    $(target).fadeIn(1000);
    $(".contenido-veterinario").not(target).show();
});

$(".rad a").on("click", function (e) {//muestra el formulario para persona cuando se selecciona
    usu = 0;
    e.preventDefault();
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    target = $(this).attr("href");
    $(".contenido-veterinario").not(target).hide();
    $(".contenido-paseador").not(target).hide();
    $(".contenido-cuidador").not(target).hide();
    $(".contenido-clinica").not(target).hide();
    $(".contenido-estetica ").not(target).hide();
    $(target).fadeIn(1000);
    $(".contenido-persona").not(target).show();
    $(target).fadeIn(1000);

});

$(".pase a").on("click", function (e) {//muestra el formulario para paseador cuando se selecciona
    usu = 2;
    e.preventDefault();
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    target = $(this).attr("href");
    $(".contenido-veterinario").not(target).hide();
    $(".contenido-persona").not(target).hide();
    $(".contenido-cuidador").not(target).hide();
    $(".contenido-clinica").not(target).hide();
    $(".contenido-estetica ").not(target).hide();
    $(target).fadeIn(1000);
    $(".contenido-paseador").not(target).show();
    $(target).fadeIn(1000);

});

$(".cui a").on("click", function (e) {//muestra el formulario para cuidador cuando se selecciona
    usu = 3;
    e.preventDefault();
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    target = $(this).attr("href");
    $(".contenido-veterinario").not(target).hide();
    $(".contenido-paseador").not(target).hide();
    $(".contenido-persona").not(target).hide();
    $(".contenido-clinica").not(target).hide();
    $(".contenido-estetica ").not(target).hide();
    $(".contenido-cuidador").not(target).show();
    $(target).fadeIn(1000);

});

$(".clin a").on("click", function (e) {//muestra el formulario para clinica cuando se selecciona
    e.preventDefault();
    usu=4;
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    target = $(this).attr("href");
    $(".contenido-veterinario").not(target).hide();
    $(".contenido-paseador").not(target).hide();
    $(".contenido-cuidador").not(target).hide();
    $(".contenido-persona").not(target).hide();
    $(".contenido-estetica ").not(target).hide();
    $(".contenido-clinica ").not(target).show();

    $(target).fadeIn(1000);
});

$(".este a").on("click", function (e) {//muestra el formulario para estetica cuando se selecciona
    usu=5;
    e.preventDefault();
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");

    target = $(this).attr("href");
    $(".contenido-veterinario").not(target).hide();
    $(".contenido-paseador").not(target).hide();
    $(".contenido-cuidador").not(target).hide();
    $(".contenido-persona").not(target).hide();
    $(".contenido-clinica ").not(target).hide();
    $(".contenido-estetica ").not(target).show();

    $(target).fadeIn(1000);
});
