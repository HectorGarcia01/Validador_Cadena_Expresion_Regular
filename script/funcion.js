/*function EDITAR(){
    var ExpresionActual = document.getElementById('Exp_Regul').innerHTML;
    var NuevaExpresion = document.getElementById('ExpresionRegular').value;
}*/
var divLista = document.querySelector("#list");
console.log(divLista);
var arreglo = ["A"];
var arreglos = [];
let estadoActual = "A";
var contadorEstadoF = 0;
var EstadoFinal = "";
var cadenaValida = true;

function VALIDAR(){
    var Cadenas = document.getElementById("CadenaW");
    var Cadena = Cadenas.value;
    var ExpresionRegular = new RegExp("^abc");
    
    if(ExpresionRegular.test(Cadena)){
       
        ReinicioAFND();
        for (let index = 0; index < Cadena.length; index++) {
            var cadenaValida = true;
            switch (estadoActual) {
                case "A":
                    var val = estadoA(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break;
                case "B":
                    var val = estadoB(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break;
                case "C":
                    var val = estadoC(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break;
                case "D":
                    var val = estado(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break;
                case "E":
                    var val = estadoE(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break;
                case "F":
                    var val = estado(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break; 
                case "G":
                    var val = estado(Cadena.charAt(index));
                    if(val == false){
                        cadenaValida = false;
                    }
                    break;
                default:
                    break;
            } 
            if(cadenaValida == false){
                break;
            }
        }
     
            var arr = {estados: arreglo, text: Cadena, validacion: EstadoFinal};
            arreglos.push(arr);
            console.log(arreglos);
            console.log(arreglo.toString());
            listDiv();
            Cadenas.value = Cadenas.defaultValue;
            estadoActual = "A";
            arreglo  = ["A"];
        
    }else{
        alert("La cadena que ingresó no coincide con los parámetros de la expresión regular! (abc)");  
        limpiar();
    }
}

function limpiar(){
    document.getElementById('TODO').reset();
}

function ReinicioAFND(){
    document.querySelector("#EstadoE").checked = false;
    document.querySelector("#EstadoF").checked = false;
    document.querySelector("#EstadoG").checked = false;
    contadorEstadoF = 0;
}

function MostrarTablaT(){
    document.querySelector(".contenedorTablaTransiciones").style.display = "block";
}

function OcultarTabla(){
    document.querySelector(".contenedorTablaTransiciones").style.display = "none";
}

function estadoA(val){
    if(val == "a"){
        estadoActual = "B";
        arreglo.push("B");
        document.querySelector("#EstadoA").checked = true;
        document.querySelector("#EstadoB").checked = true;
        return true;
    }else{
        alert("Valor ingresado incorrecto");
        arreglo.push("Estado Nulo");
        EstadoFinal = "Cadena Inválida";
        return false;
    }
}

function estadoB(val){
    if(val == "b"){
        estadoActual = "C";
        arreglo.push("C");
        document.querySelector("#EstadoC").checked = true;
        return true;
    }else{
        alert("Valor ingresado incorrecto");
        arreglo.push("Estado Nulo");
        EstadoFinal = "Cadena Inválida";
        return false;
    }
    
}
function estadoC(val){
    if(val == "c"){
        estadoActual = "D";
        arreglo.push("D");
        document.querySelector("#EstadoD").checked = true;
        EstadoFinal = "Cadena Válida";
        return true;
    }else{
        alert("Valor ingresado incorrecto");
        arreglo.push("Estado Nulo");
        EstadoFinal = "Cadena Inválida";
        return false;
    }
}
function estado(val){
    if(val == "a"){
        estadoActual = "E";
        arreglo.push("E");
        document.querySelector("#EstadoE").checked = true;
        EstadoFinal = "Cadena Inválida";
        return true;
    }else if(val == "b"){
        contadorEstadoF ++;
        estadoActual = "F";
        arreglo.push("F");
        document.querySelector("#EstadoF").checked = true;
        EstadoFinal = "Cadena Válida";
        if(contadorEstadoF == 1){
            document.querySelector("#espacioContador").innerHTML = "";
        }
        else if(contadorEstadoF == 2){
            document.querySelector("#espacioContador").innerHTML = " = " + (contadorEstadoF-1) + " vez";
        }
        else{
            document.querySelector("#espacioContador").innerHTML = " = " + (contadorEstadoF-1) + " veces";
        }
        return true;
    } else {
        alert("Valor ingresado incorrecto");
        arreglo.push("Estado Nulo");
        EstadoFinal = "Cadena Inválida";
        return false;
    }
}
function estadoE(val){
    if(val == "c"){
        estadoActual = "G";
        arreglo.push("G");
        document.querySelector("#EstadoG").checked = true;
        EstadoFinal = "Cadena Válida";
        return true;
    }else {
        alert("Valor ingresado incorrecto");
        arreglo.push("Estado Nulo");
        EstadoFinal = "Cadena Inválida";
        return false;
    }
}
 
function listDiv(){
    while(divLista.firstChild){
        divLista.removeChild(divLista.firstChild);
    }
    var ContadorCadena = 0;
    var table = document.createElement("table");
    table.classList.add('table', 'table-striped', 'table-hover');
    table.innerHTML= `
                    <tr>
                        <td align=center>#</td>
                        <td align=center>CADENA INGRESADA</td>
                        <td align=center>ESTADOS RECORRIDOS</td>
                        <td align=center>VALIDACIÓN</td>
                    </tr>`;

    arreglos.forEach(element => {
        ContadorCadena ++;
        var tr = document.createElement("tr");
        tr.innerHTML=  ` 
                    <td align=center>${ContadorCadena}</td>
                    <td align=center>${element.text}</td>
                    <td align=center>${element.estados.join('=>')}</td>
                    <td align=center>${element.validacion.toString()}</td>`;
        table.appendChild(tr);
    });
    divLista.appendChild(table);
}


