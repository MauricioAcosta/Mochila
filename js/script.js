function dibujarArticulos(filas, columnas, tabla) {
    tabla.innerHTML = "";
    for (i = 0; i < filas; i++) {
        var nuevaFila = tabla.insertRow(-1)
        for (j = 0; j < columnas; j++) {
            var celda = nuevaFila.insertCell(-1)
            var input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('data-fila', i)
            input.setAttribute('data-columna', j)
            input.setAttribute('size', '3')
            celda.appendChild(input)
        }
    }
}
function articulos() {
    var numArticulos = document.getElementById('NumArticulos').value
    var tablaValores = document.getElementById('tablaValores')
    var tablaPesos = document.getElementById('tablaPesos')
    dibujarArticulos(1, numArticulos, tablaValores)
    dibujarArticulos(1, numArticulos, tablaPesos)
}

var es = {
    vacio: function(str) {
        if (str === '' || str === null) {
            return true
        } else {
            return false
        }
    }
}

function validarVacio(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        if (typeof(parametros[i]) === "object") {
            for (var j = 0; j < parametros.length; j++) {
                if (es.vacio(parametros[i][j])) {
                    return true
                }
            }
        } else if (es.vacio(parametros[i])) {
            return true
        }
    }
    return false
}

function convertirAArreglo(filas, columnas, tabla) {
  var arreglo = new Array()
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      if (arreglo[i] === undefined) {
        arreglo[i] = new Array()
      }

      arreglo[i][j] = tabla.querySelectorAll('[data-fila="' + i + '"][data-columna="' + j + '"]')[0].value
    }
  }
  return arreglo
}

function calcular() {
    var pesoMochila = document.getElementById('PesoLimite').value
    var numArticulos = document.getElementById('NumArticulos').value

    var tablaValores = document.getElementById('tablaValores')
    tablaValores  = convertirAArreglo(1, numArticulos, tablaValores)

    var tablaPesos = document.getElementById('tablaPesos')
    tablaPesos  = convertirAArreglo(1, numArticulos, tablaPesos)

    try {
        if (validarVacio([pesoMochila,numArticulos])) {
            throw new Error('Algunos campos se encuentran vacíos')
        }
        if (validarVacio([pesoMochila,numArticulos])) {
            throw new Error('Algunos campos se encuentran vacíos')
        }
        if (validarVacio(tablaValores)) {
            throw new Error('Algunos campos de los Valores se encuentran vacíos')
        }
        if (validarVacio(tablaPesos)) {
            throw new Error('Algunos campos de los Pesos se encuentran vacíos')
        }

    } catch (e) {
        window.alert(e)
        return e
    }

    var numCombinaciones = Math.pow(2, numArticulos)
    var sumValores = new Array(numCombinaciones)
    var sumPesos = new Array(numCombinaciones)

    var objetos = new Array(numArticulos)
    for (var i=0; i<numArticulos; i++){
      objetos[i] = new Object()
      objetos[i].valor = Number(tablaValores[0][i])
      objetos[i].peso = Number(tablaPesos[0][i])
    }

    var combinatoria = calcularCombinatoria(numArticulos)

    //console.log(objetos, combinatoria)
    for (var i = 0; i < numCombinaciones; i++) {
      sumValores[i] = 0
      sumPesos[i] = 0
      for (var j = 0; j < objetos.length; j++) {
        sumValores[i] += combinatoria [j][i] * objetos[j].valor
        sumPesos[i] += combinatoria [j][i] * objetos[j].peso
        if(sumPesos[i] > pesoMochila){
          sumValores[i] = 0
        }
      }
    }
    console.log(sumValores, sumPesos)

    var objetosActivos = new Array()
    var index = indexOfMax(sumValores)
    for (var i = 0; i < combinatoria.length; i++) {
      var objetoActivo = combinatoria[i][index]
      console.log(objetoActivo)
      if (objetoActivo === 1){
        objetosActivos.push(objetos[i])
      }
    }
    console.log(objetosActivos)

    var resultado = document.getElementById('resultadoMochila')
    resultado.innerHTML = ''
    for (var i = 0; i < objetosActivos.length; i++) {
      resultado.innerHTML = resultado.innerHTML + '<br>' +
        'Artículo ' + i + '<br>' +
        'Costo:' + objetosActivos[i].valor + '<br>' +
        'Peso:' + objetosActivos[i].peso + '<br><br>'
    }

    resultado.innerHTML = resultado.innerHTML +
      'Sum Costos: ' + sumValores[index] + ', Sum Pesos:' + sumPesos[index] + '<br>'
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function calcularCombinatoria(n, rec, arreglo){
  rec = (typeof(rec)==="undefined") ? 0 : rec
  arreglo = (typeof(arreglo)==="undefined") ? new Array(n) : arreglo
  var numCombinaciones = Math.pow(2, n)
  var combinaciones = new Array(numCombinaciones)
  var i = Math.pow(2, rec)
  var h = 0
  while (h < numCombinaciones) {
    for (var j = 0; j <= 1; j++) {
      for (var k = 1; k <= i; k++) {
        combinaciones[h] = j
        h++
      }
    }
  }
  arreglo[rec] = combinaciones
  rec++
  if(rec < n){
    arreglo = calcularCombinatoria(n, rec, arreglo)
  }
  return arreglo
}
