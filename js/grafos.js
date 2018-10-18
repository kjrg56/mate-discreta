$(document).ready(function() {
    $('select').formSelect();

    $('#grafoCanvas').click(function(e) {
        drawVertice(e);
    });
    
    $('#grafoCanvas').mousemove(function(e) {
        showGrado(e);
    });

    $('.tooltipped').tooltip();
});

var labelCount = 65;
var vertices = [];
var aristas = [];

function drawVertice(e) {
    var canvas = document.getElementById("grafoCanvas");
    var coords = getCoordinates(e, canvas);
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 15, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();

    ctx2.fillStyle = "white";
    ctx2.font = "20px Arial";
    ctx2.fillText(getLabel(labelCount), coords.x-7, coords.y+7);

    var vertice = {
        name: getLabel(labelCount),
        grado: 0,
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

    if (deLabel == undefined || aLabel == undefined) {
        swal('Vértices no seleccionados', 'Seleccione los vértices que desea conectar de las listas.', 'warning');
        return false;
    }
    
    var canvas = document.getElementById("grafoCanvas");
    var context = canvas.getContext('2d');

    var deVertice;
    var aVertice;

    var deA = deLabel+aLabel; // de vertice 1 a 2
    var aDe = aLabel+deLabel; // de vertice 2 a 1

    //se verifica que las arista a generar no exista y que existan vertices
    if ( (vertices.length > 0) && (!aristas.includes(deA)) && (!aristas.includes(aDe)) ) {
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

        //se incrementa el grado de ambos vertices
        deVertice.grado += 1;
        aVertice.grado += 1;

        /*
         * se añade la arista al array de aristas para que no sea tomada en cuenta si se quiere añadir una arista
         * que conecte los mismos vertices. Ej. AB y BA (de A a B y de B a A) 
         */
        aristas.push(deLabel+aLabel, aLabel+deLabel);
    } else if (vertices.length == 0) {
        swal('No existen vértices', 'Por favor, situé vertices en el área de trabajo.', 'warning');
    }
}

function showGrado(e) {
    var canvas = document.getElementById("grafoCanvas");
    var coords = getCoordinates(e, canvas);
    var ctx = canvas.getContext("2d");
    var isOnVertice = false;
    var grado = 0;

    if (vertices.length > 0) {
        for (i = 0; i < vertices.length; i++) {
            if ( ((coords.x >= vertices[i].x-15) && (coords.x <= vertices[i].x+15)) && 
                 ((coords.y >= vertices[i].y-15) && (coords.y <= vertices[i].y+15)) ) {  
                                   
                isOnVertice = true;
                grado = vertices[i].grado;
            }
        }
    }

    if (isOnVertice) {
        $('#grafoCanvas').attr('title', 'Grado = ' + grado);
        $('#grafoCanvas').css('cursor', 'pointer');
    } else {
        $('#grafoCanvas').removeAttr('title');
        $('#grafoCanvas').css('cursor', 'default');
    }
}

function clearCanvas() {
    var canvas = document.getElementById("grafoCanvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    vertices = [];
    aristas = [];
    countId = 0;
    labelCount = 65;

    var deSelect = document.getElementById('deVertice');
    var aSelect = document.getElementById('aVertice');

    while (deSelect.hasChildNodes() && aSelect.hasChildNodes()) {   
        deSelect.removeChild(deSelect.firstChild);
        aSelect.removeChild(aSelect.firstChild);
    }

    deSelect.options.add(new Option('De ', '', false, true));
    aSelect.options.add(new Option('Hacia', '', false, true));
    $('select').formSelect();
}