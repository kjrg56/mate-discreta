function calcMCD() {
    var txtNum1 = $('#txtNum1').val();
    var txtNum2 = $('#txtNum2').val();

    if ( (txtNum1 === '') || (txtNum2 === '') ) {
        console.log('fill data');
    } else {
        var dividendo = Math.max(txtNum1, txtNum2);  //Número máximo
        var divisor = Math.min(txtNum1, txtNum2);  //Número mínimo
        var cociente = 0;
        var residuo = 0;

        $('#mcdContainer').html('<h3>MCD('+txtNum1+', '+txtNum2+')</h3>');

        do {
            cociente = Math.floor(dividendo / divisor);
            residuo = (dividendo % divisor);

            $('#mcdContainer').append(dividendo + ' = ' + cociente + ' ('+divisor+')' + ' + ' + residuo + '<br>');
            
            dividendo = divisor;
            divisor = residuo;
        } while (residuo != 0);  
    }
    $('#txtNum1').val('');
    $('#txtNum2').val('');
}