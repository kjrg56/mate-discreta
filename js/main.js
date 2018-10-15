$(document).ready(function(){
    $('.sidenav').sidenav();
    showView('home.html');
});

function showView(viewUrl) {    
    $.get(viewUrl, function( data ) {
        $(".view").html(data);
    });
}

// GRAFOS

var countId = 0;
var vertices = [];

$( "#grafoCanvas" ).click(function(e) {
    drawVertice(e);
});

function drawVertice(e) {
    var canvas = document.getElementById("grafoCanvas");
    var ctx = canvas.getContext("2d");
    
    var coords = getCoordinates(e, canvas);

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 5, 0, 2*Math.PI);
    ctx.stroke();

    var vertice = {
        id: countId++,
        x: coords.x,
        y: coords.y
    }

    vertices.push(vertice);
    console.log(vertices);
}

function getCoordinates(evt, canvas) {
    var rect = canvas.getBoundingClientRect();

    var scaleX = canvas.width / rect.width;    
    var scaleY = canvas.height / rect.height;  

    return {
        x: (evt.clientX - rect.left) * scaleX, 
        y: (evt.clientY - rect.top) * scaleY 
      }
}

function drawGrafo() {
    var canvas = document.getElementById("grafoCanvas");
    var context = canvas.getContext('2d');

    var v1 = vertices[0];
    var v2 = vertices[1];
    var v3 = vertices[2];
    var v4 = vertices[3];

    context.moveTo(v1.x, v1.y);
    context.lineTo(v2.x, v2.y);
    context.stroke();

    context.moveTo(v2.x, v2.y);
    context.lineTo(v3.x, v3.y);
    context.stroke();

    context.moveTo(v3.x, v3.y);
    context.lineTo(v4.x, v4.y);
    context.stroke();

    context.moveTo(v4.x, v4.y);
    context.lineTo(v1.x, v1.y);
    context.stroke();

}

function clearCanvas() {
    var canvas = document.getElementById("grafoCanvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    vertices = [];
}

// MCD

function calcMCD() {
    clearMCDContainer();
    var txtNum1 = $('#txtNum1').val();
    var txtNum2 = $('#txtNum2').val();

    if ( (txtNum1 === '') || (txtNum2 === '') ) {
        swal('Campos vacíos', 'Es necesario ingresar ambos números para calcular el MCD.', 'warning');
    } else {
        var dividendo = Math.max(txtNum1, txtNum2);  //Número máximo
        var divisor = Math.min(txtNum1, txtNum2);  //Número mínimo
        var cociente = 0;
        var residuo = 0;

        $('#mcdContainer').removeClass('mcd-def-height');
        
        do {
            cociente = Math.floor(dividendo / divisor);
            residuo = (dividendo % divisor);

            $('#mcdResult').append(dividendo + ' = ' + cociente + ' ('+divisor+')' + ' + ' + residuo + '<br>');
            
            dividendo = divisor;
            divisor = residuo;
        } while (residuo != 0); 

        $('#mcdTitle').html('MCD ('+txtNum1+', '+txtNum2+') = '+dividendo);
    }
}

function clearMCD() {
    $('#txtNum1').val('');
    $('#txtNum2').val('');
    $('#mcdContainer').addClass('mcd-def-height');
    clearMCDContainer();
}

function clearMCDContainer() {
    $('#mcdResult').html('');
    $('#mcdTitle').text('');
}