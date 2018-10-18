$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    showView('home.html');
});

function showView(viewUrl) {    
    $.get(viewUrl, function(data) {
        $(".view").html(data);
    });
}