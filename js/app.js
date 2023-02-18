
//variables
const yearCampo = document.querySelector("#year");
const campoMarca = document.querySelector("#marca");
const campominimo = document.querySelector("#minimo");
const campomaximo = document.querySelector("#maximo");
const campopuertas = document.querySelector("#puertas");
const campoTransmicion = document.querySelector("#Transmicion");
const campocolor = document.querySelector("#color");

// contenedor para los resultados
const result = document.querySelector("#resultado");

const max  = new Date().getFullYear();
const min = max - 10;

// generar un objeto con la busqueda
const datosBusqueda ={
    marca:"",
    year:"",
    puertas: "",
    color:"",
    transmision:"",
    minimmo: "",
    maximo:""

}


//eneventos

document.addEventListener("DOMContentLoaded",() =>{

    mostrarAutos(autos); // muestra los autos

    llenarSelectyear() // genera los años del seect años

 

});


// event listener para los select de busqueda

campoMarca.addEventListener("change", e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});


yearCampo.addEventListener("change", e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

campominimo.addEventListener("change", e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
   
})

campomaximo.addEventListener("change", e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();  
})
campopuertas.addEventListener("change", e =>{
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})
campoTransmicion.addEventListener("change", e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

campocolor.addEventListener("change", e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})







// funciones

function mostrarAutos (autos){

    limpiarHtml(); // limpi el html previo

    autos.forEach (auto =>{
        const divAuto = document.createElement("div");
        const autoHTML = document.createElement("P");

        // destructuracion 

        const { marca, modelo, year, precio, puertas, color, transmision} = auto;
        autoHTML.textContent =`
        ${marca}, ${modelo} - ${year} - ${precio} -${puertas} Puertas - ${color} -${transmision}
        `

        // insertar en el html
        divAuto.appendChild(autoHTML)
        divAuto.classList.add("muestra")
        result.appendChild(divAuto);
    })

}

// limpia el html

function limpiarHtml(){

    while(resultado.firstChild ) {
        resultado.removeChild(resultado.firstChild)
    }
}

// genera los años del seect años

function llenarSelectyear(){
    
    for (let i = max; i > min; i--){
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        yearCampo.appendChild(opcion) //  agrega cada opcion al select
    }
   
}


// funcion que filtra en base a la busqueda

function filtrarAuto(){
    const  resultado = autos.filter( filtrarMarca ).filter( filtrarYear).
    filter( filtrarTrasmicion). filter( filtrarPuertas ).filter (filtrarMinimo). filter ( filtrarMaximo).
    filter ( filtrarColor )
    
    if( resultado.length){
        console.log(resultado)
        mostrarAutos(resultado);  
    }

    else{
        noResultado();
    }
}

function noResultado(){

    limpiarHtml();
    
    const noHayResultado = document.createElement("div");
    noHayResultado.textContent ="No Hay Resultados";
    noHayResultado.classList.add("alerta", "error");
    result.appendChild(noHayResultado);
}

function filtrarMarca(auto){
 if( datosBusqueda.marca){
    return auto.marca === datosBusqueda.marca;
 }
 return auto;
}


function filtrarYear(auto){
  if(datosBusqueda.year){
    return auto.year === parseInt(datosBusqueda.year);
  }
  return auto
}

function filtrarTrasmicion(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarPuertas(auto){
    if (datosBusqueda.puertas){
      
        return auto.puertas === parseInt(datosBusqueda.puertas);
       
    }
    return auto;
}
function filtrarColor(auto){
    if (datosBusqueda.color){
        
        return auto.color === datosBusqueda.color;
       
    }
    return auto;
}

function filtrarMinimo(auto){
    
    const { minimo } = datosBusqueda;
    
    if (minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    
    const { maximo } = datosBusqueda;
    
    if (maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

