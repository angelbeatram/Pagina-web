$('ul .active').on('click', function () {
    $('li').removeClass('active');
    $(this).addClass('active');
    target = $(this).attr("href");
    $(target).fadeIn(1000);
    location.href="c:/Users/djzho/IdeaProjects/untitled5/html/principal.html";//MODIFICAR DIRECCION
});

//manda a mi perfil
$('ul .miperfil').on('click', function () {
    $('li').removeClass('active');
    $(this).addClass('active');
    target = $(this).attr("href");
    $(target).fadeIn(1000);
    location.href="c:/Users/djzho/IdeaProjects/untitled5/html/miPerfil.html";//MODIFICAR DIRECCION
});
