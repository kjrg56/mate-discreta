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