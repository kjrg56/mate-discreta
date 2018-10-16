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

// GRAFOS

var labelCount = 65;
var vertices = [];

function drawVertice(e) {
    var canvas = document.getElementById("grafoCanvas");
    var coords = getCoordinates(e, canvas);
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.font = "15px Arial";
    ctx.fillText(getLabel(labelCount), coords.x-5, coords.y+5);

    var vertice = {
        name: getLabel(labelCount),
        x: coords.x,
        y: coords.y
    }

    var deSelect = document.getElementById('deVertice');
    var aSelect = document.getElementById('aVertice');
    deSelect.options.add(new Option(vertice.name, vertice.name));
    aSelect.options.add(new Option(vertice.name, vertice.name));
    $('select').formSelect();

    vertices.push(vertice);
    labelCount++;
    console.log(vertice);
}

function getLabel(unicode) {
    return String.fromCharCode(unicode);
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

function drawArista() {
    var deLabel = $('#deVertice').val();
    var aLabel = $('#aVertice').val();

    var canvas = document.getElementById("grafoCanvas");
    var context = canvas.getContext('2d');

    var deVertice;
    var aVertice;

    if (vertices.length > 0) {
        for (i = 0; i < vertices.length; i++) {
            if (vertices[i].name === deLabel) {
                deVertice = vertices[i];
            } else if (vertices[i].name === aLabel) {
                aVertice = vertices[i];
            } 
        }
        context.moveTo(deVertice.x, deVertice.y);
        context.lineTo(aVertice.x, aVertice.y);
        context.stroke();    
    } else {
        swal('No existen vértices', 'Por favor, situé vertices en el área de trabajo.', 'warning');
    }
}

function clearCanvas() {
    var canvas = document.getElementById("grafoCanvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    vertices = [];
    countId = 0;
    labelCount = 65;

    var deSelect = document.getElementById('deVertice');
    var aSelect = document.getElementById('aVertice');

    while (deSelect.hasChildNodes() && aSelect.hasChildNodes()) {   
        deSelect.removeChild(deSelect.firstChild);
        aSelect.removeChild(aSelect.firstChild);
    }

    deSelect.options.add(new Option('DE: ', '', false, true));
    aSelect.options.add(new Option('A:', '', false, true));
    $('select').formSelect();
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