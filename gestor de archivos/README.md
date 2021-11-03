# ini.js
## Esta libreria te permite acceder a archivos de configuración para:
1. Leer valores almacenados en parámetros deseados dentro o no de secciones.
2. Cambiar valores almacenados en parametros.
3. Agregar parametros con su respectivo valor.
4. Crear secciones y/o parametros en caso de no existir.
5. Guardar el archivo con todos los cambios hechos.

__Notas:__
1. Se cuidan los comentarios en lineas únicas y las lineas vacias.
2. Si un comentario se encuentra en la misma linea donde hay un parametro y valor, se considerará parte del valor.
3. No se puede crear un archivo ini, solo se puede trabajar sobre uno ya existente.
4. No se puede agregar un comentario en la misma linea donde se establece una seccion, esto puede generar problemas.

## Para incluir la librería:
```javascript
const Ini = require("C:/Users/giova/Desktop/SistemaDeArchivos/ini.js");
```

## Forma en la que se generan objetos archivo ini:
```javascript
var miArchivo = new Ini("C:/miProyecto/miArchivo.ini");

var miArchivo2 = new Ini("C:/miProyecto/miArchivo2.ini", true); //DE ESTA FORMA, NO SERÁ NECESARIO LLAMAR LA FUNCION .open()
```

## Funciones principales:
1. ```.open()``` esta función lee el archivo espesificado posteriormente.
2. ```.parameter(parameter, value)``` permite leer el valor almacenado en un parametro o cambiar el valor de un parametro y si este no existe lo agrega.
3. ```.parameter([section, parameter], value)``` permite leer el valor almacenado en un parametro dentro de una seccion o cambiar el valor de un parametro que pertenezca a la seccion mencionada y si este no existe lo agrega, al igual que la seccion, si no existe se agrega.
4. ```.write()``` guarda el archivo con todos los cambios, si este no existe será creado.

## Funciones secundarias:
1. ```.parameters(parametro, positions)``` devuelve un array con todos los valores almacenados en todos los parametros llamados igual.

## Ejemplos:
Tenemos el siguiente archivo _config.ini_:
```ini
ip=123.456.789
nombre=Juan Gonzalez
edad=22
color=#333
saludar=si
```

### Leer un archivo ini y almacenarlo en una variable:
```javascript
const Ini = require("C:/miProyecto/ini.js"); //INCLUIMOS LA LIBRERIA
var miArchivo = new Ini("config.ini"); //ALMACENAMOS NUESTRO ARCHIVO EN UNA VARIABLE

miArchivo.open(); //ABRIMOS EL ARCHIVO, SI NO EXISTE, LUEGO SERÁ CREADO CUANDO SE EJECUTE .write()
```

### Acceder al valor de un parametro:
En este caso queremos saber que valor está amlacenado en el parametro "ip":
```javascript
const Ini = require("C:/miProyecto/ini.js");
var miArchivo = new Ini("config.ini", true);

console.log(miArchivo.parameter("ip")); //consola -> 123.456.789
```

### Cambiar el valor almacenado en un parametro:
```javascript
const Ini = require("C:/miProyecto/ini.js");
var miArchivo = new Ini("config.ini", true);

miArchivo.parameter("edad", 30); //CAMBIAMOS EL VALOR DE "edad" POR "30"
console.log(miArchivo.parameter("edad")); //consola -> 30
```
__NOTA__: Si bien cambiamos el valor almacenado en nuestro archivo, este cambio no se guarda en _config.ini_, para ello mire el siguiente ejemplo.

### Guardar/aplicar cambios en el archivo:
```javascript
const Ini = require("C:/miProyecto/ini.js");
var miArchivo = new Ini("config.ini", true);

miArchivo.parameter("edad", 30);
console.log(miArchivo.parameter("edad")); //consola -> 30

miArchivo.write(); //GUARDAMOS TODOS LOS CAMBIOS EN NUESTRO config.ini
```

__NOTA__: Si no existe el archivo _config.ini_, será creado.
### Agregar un nuevo parametro:
```javascript
const Ini = require("C:/miProyecto/ini.js");
var miArchivo = new Ini("config.ini", true);

miArchivo.parameter("altura", "1.71m"); //altura NO EXISTE EN config.ini POR LO QUE SE AGREGARÁ AL FINAL
console.log(ini.parameter(miArchivo, "altura")); //consola -> 1.71m

miArchivo.write(); //GUARDAMOS CAMBIOS EN config.ini
```
__NOTA__: En el momento en el que se le asigna el valor a un parametro no existente, este se crea con su respectivo valor al final del documento.

<hr>

## Uso de sections (secciones):
Supongamos que tenemos el siguiente archivo _consig.ini_:
```ini
descripcion=Concurso intelectual, el mejor proyecto gana.
fecha=5/11/2021 16:00

[Grupo A]
id=125
integrantes=Giovanni, Valentino
tema=Programacion

[Grupo B]
id=210
integrantes=Jose, Carlos
tema=Arquitectura

[Grupo C]
id=154
integrantes=Pedro, Federico, Facundo
tema=Química
```
__Sintaxis para trabajar con secciones__: ```miArchivo.parameter(['Seleccion', 'parametro'], 'valor');```
### Buscar un parametro dentro de una seleccion:
Supongamos que queremos saber la ID del Grupo B.
```javascript
const Ini = require("C:/miProyecto/ini.js");
var miArchivo = new Ini("config.ini", true);

console.log(miArchivo.parameter(['Grupo B', 'id'])); //consola -> 210
```
### Cambiar el valor de un parametro dentro de una seleccion:
Supongamos que queremos cambiar la ID del Grupo C por 230.
```javascript
const Ini = require("C:/miProyecto/ini.js");
var miArchivo = new Ini("config.ini", true);

miArchivo.parameter(['Grupo C', 'id'], 230); //Ahora la ID del grupo C es 230

miArchivo.write(); //Guardamos los cambios
```
__NOTA__:
