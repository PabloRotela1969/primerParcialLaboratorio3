function $(id)
{
    return document.getElementById(id);
}
function crear(tipo)
{
    return document.createElement(tipo);
}

window.addEventListener("load",cargarGrillaYboton);

function cargarGrillaYboton()
{
    cargarGrilla();

    agregarBotonAgregar();
}

/*
var vector = [ // clientes
    {"id":1, "nombre":"Marcelo", "apellido":"Luque", "velMax":45, "ventas":15000, "sueldo":2000,"compras":0,"telefono":""},
    {"id":2,"nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000,"compras":0,"telefono":""},
    {"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000,"compras":0,"telefono":""},
    // empleados
    {"id":4, "nombre":"Fernando", "apellido":"Nieto","edad":18,"ventas": 0, "sueldo":0 ,"compras":8000, "telefono":"152111131"},
    {"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20,"ventas": 0, "sueldo":0 ,"compras":50000, "telefono":"42040077"},
    {"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23,"ventas": 0, "sueldo":0 ,"compras":7000, "telefono":"1813181563"}
    ];
*/
var vector = [
{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4,"altMax":0,"autonomia":0},
{"id":51, "modelo":"Dodge,Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4,"altMax":0,"autonomia":0},
{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302,"cantPue":0, "cantRue":0, "altMax":6, "autonomia":1200},
{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2,"altMax":0,"autonomia":0},
{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988,"cantPue":0, "cantRue":0, "altMax":13, "autonomia":13450},
{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174,"cantPue":0, "cantRue":0, "altMax":3, "autonomia":870}];


function cargarGrilla()
{
    
    
    let tablaPrincipal = $("tablaPrincipal");
    let combo = $("columnas");
    while (tablaPrincipal.firstChild) {

        tablaPrincipal.removeChild(tablaPrincipal.firstChild);
      }
    // Crear el encabezado de la tabla
    var encabezado = crear('tr');

    if(vector.length > 0)
    {
        Object.keys(vector[0]).forEach(function(clave) 
        {

            if(checkboxTildado(clave))
            {
                var th = crear('th');
                th.textContent = clave;
                
                let seleccionado = combo.options[combo.selectedIndex].text;
                if(seleccionado == clave || seleccionado == "todas")
                {
                    th.onclick = function() 
                    {
                        ordenarPorColumna(clave);
                    };

                }
                encabezado.appendChild(th);
            }
        });

    
    }

    tablaPrincipal.appendChild(encabezado);
    
    // Crear las filas de la tabla
    function crearFilas() {
        // Eliminar filas existentes
        while (tablaPrincipal.rows.length > 1) 
        {
            tablaPrincipal.deleteRow(1);
        }
        if(vector.length > 0)
        {
            let fila = 0;
            
            vector.map(function(objeto) 
            {
                var tr = crear('tr');
                
                Object.keys(objeto).map(function(clave) 
                {
                    
                    if(checkboxTildado(clave))
                    {
                        var td = crear('td');
                        td.textContent = objeto[clave];
                        td.setAttribute("fila",fila);
  
                        td.onclick = function() 
                        {
                            
                            mostrarFilaEnFormularioABM(td.getAttribute("fila"));
                            mostrarSeccionABM();
                        };

                        tr.appendChild(td);
                    }
                });
                fila = fila + 1;
                tablaPrincipal.appendChild(tr);
                
            });

        }
        
    }
    crearFilas();
    
    // Función para ordenar por columna
    function ordenarPorColumna(clave) 
    {
        if(checkboxTildado(clave))
        {

            vector.sort(function(a, b) {
                if (typeof a[clave] === 'number') {
                    return a[clave] - b[clave];
                } else {
                    return a[clave].localeCompare(b[clave]);
                }
            });
            crearFilas();
        }
    }



    
}

function agregarBotonAgregar()
{
    let seccionABM = $("botonABM");
    let botonAgregar= crear("button");
    botonAgregar.id = "btnAgregar";
    botonAgregar.className = "boton";
    let textoBoton = document.createTextNode("Agregar");
    botonAgregar.appendChild(textoBoton);
    botonAgregar.addEventListener("click",mostrarSeccionABM);
    seccionABM.appendChild(botonAgregar);
    
}


function mostrarSeccionABM()
{
    let seccionCabecera = $("cabecera");
    let seccionABM = $("seccionABM");
    let tablaPrincipal = $("tablaPrincipal");
    let botonAgregar = $("btnAgregar");
    seccionCabecera.style.display = "none";
    tablaPrincipal.style.display = "none";
    botonAgregar.style.display = "none";
    seccionABM.style.display = "block";
    $("btnAlta").disabled = false;
    $("abm.id").value = maxId();
    
}
function mostrarSeccionPrincipal()
{
    let seccionCabecera = $("cabecera");
    let seccionABM = $("seccionABM");
    let tablaPrincipal = $("tablaPrincipal");
    let botonAgregar = $("btnAgregar");
    seccionCabecera.style.display = "block";
    tablaPrincipal.style.display = "block";
    botonAgregar.style.display = "block";
    seccionABM.style.display = "none";   
    $("btnAlta").disabled = false; 
    LimpiarRegistroDeVector();
}


function checkboxTildado(clave)
{
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let respuesta = false;
    for(i=0;i<checkboxes.length;i++)
    {
        if (checkboxes[i].checked && checkboxes[i].id == clave) 
        {
            respuesta = true;
            break;
        }
    }
    return respuesta;
}


function recorrerVector()
{

    let acumulado = 0;
    let promedio = 0.0;
    let campo = $("edadPromedio");

    let suma = vector.reduce(function(acumulado, item)
    {
        return acumulado + parseInt(item.velMax);
    },0);
    if(suma > 0)
    {
        promedio = ( suma /  vector.length);
        campo.value = promedio;
    }
}

function mostrarFilaEnFormularioABM(fila)
{
    $("abm.fila").value = fila;
    $("abm.id").value = vector[fila].id;
    $("abm.id").disabled = true;
    $("abm.modelo").value = vector[fila].modelo;
    $("abm.anoFab").value = vector[fila].anoFab;
    $("abm.velMax").value = vector[fila].velMax;
    $("abm.cantPue").value = vector[fila].cantPue;
    $("abm.cantRue").value = vector[fila].cantRue;
    $("abm.altMax").value = vector[fila].altMax;
    $("abm.autonomia").value = vector[fila].autonomia;


}



class Vehiculo
{
    id = 0;
    modelo = "";
    anoFab = "";
    velMax = 0;
    constructor(id,modelo,anoFab,velMax)
    {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }
    toString()
    {
        let mostrar = "modelo :" + this.modelo + " anoFab :" + this.anoFab + " velMax : " + this.velMax;
        return mostrar;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}


class Aereo extends Vehiculo
{
    altMax = 0.0;
    autonomia = 0.0;
    constructor(id,modelo,anoFab,velMax,altMax,autonomia)
    {
        super(id,modelo,anoFab,velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }
    toString()
    {
        return super.toString() + " altMax : " + this.altMax + " autonomia : " + this.autonomia;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}

class Terrestre extends Vehiculo
{
    cantPue = 0.0;
    cantRue = "";
    constructor(id,modelo,anoFab,velMax,cantPue,cantRue)
    {
        super(id,modelo,anoFab,velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
    toString()
    {
        return super.toString() + " cantPue : " + this.cantPue + " cantRue : " + this.cantRue;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}


function maxId()
{
    let cantidadItems = vector.length;
    let maximo = 0;
    let max = vector.reduce(function(maximo, item)
    {
        if(maximo < parseInt(item.id))
        {
            maximo = parseInt(item.id) 
        }
        return maximo;
    },0);
    return ++max;
}

function AgregarRegistroAVector()
{
    if($("abm.modelo").value != "" && parseInt($("abm.anoFab").value) > 1885 && parseInt( $("abm.velMax").value ) > 0 && parseInt($("abm.cantPue").value ) > 0 && parseInt( $("abm.cantRue").value) > -1 && parseInt($("abm.altMax").value) > 0 && parseInt($("abm.autonomia").value ) > -1 )
    {
        let nuevo = vector.push({"id":$("abm.id").value, "modelo":$("abm.modelo").value, "anoFab":$("abm.anoFab").value, "velMax":$("abm.velMax").value, "cantPue":$("abm.cantPue").value, "cantRue":$("abm.cantRue").value,"altMax":$("abm.altMax").value,"autonomia":$("abm.autonomia").value});
        mostrarSeccionPrincipal();
        cargarGrilla();

    }
    else
    {
        alert("Falta alguna validacion");
    }

    
}

function ModificarRegistroDeVector()
{
    let fila = $("abm.fila").value;
    vector[fila].id = $("abm.id").value;
    $("abm.id").disabled = false;
    vector[fila].modelo = $("abm.modelo").value;
    vector[fila].anoFab = $("abm.anoFab").value;
    vector[fila].velMax = $("abm.velMax").value;
    vector[fila].cantPue = $("abm.cantPue").value;
    vector[fila].cantRue = $("abm.cantRue").value;
    vector[fila].altMax = $("abm.altMax").value;
    vector[fila].autonomia = $("abm.autonomia").value;
    LimpiarRegistroDeVector();
    mostrarSeccionPrincipal();
    cargarGrilla();
}

function BajaRegistroDeVector()
{
    let fila = $("abm.fila").value;
    $("abm.id").disabled = false;
    if(fila > -1)
    {
        vector.splice(fila,1);
        LimpiarRegistroDeVector();
        mostrarSeccionPrincipal();
        cargarGrilla();

    }
}



function LimpiarRegistroDeVector()
{
    $("abm.fila").value = 0;
    $("abm.id").value = 0;
    $("abm.id").disabled = true;
    $("abm.modelo").value = "";
    $("abm.anoFab").value = "";
    $("abm.velMax").value = 0;
    $("abm.cantPue").value = 0;
    $("abm.cantRue").value = 0;
    $("abm.altMax").value = 0;
    $("abm.autonomia").value = "";
}