## ini.js
__Esta libreria te permite acceder a archivos de configuración para:__
1. Leer valores almacenados en parámetros deseados.
2. Cambiar valores almacenados en parametros.
3. Agregar parametros con su respectivo valor.
4. Guardar el archivo con sus respectivos cambios hechos.
__Notas:__
1. Se cuidan los comentarios.
2. No está implementada la mecánica para establecer secciones.
3. No se puede crear un archivo ini, solo se puede trabajar sobre uno ya existente.
__Funciones principales que implementa:__
1. ```readIni("ubicación y/o nombre del archivo ini")``` esta función devuelve un objeto (debe ser almacenado en una variable) que permite el funcionamiento de las demás funciones.
2. ```parameterIni(file, parameter, value, comment)``` permite leer el valor almacenado en un parametro, cambiar el valor de un parametro y si este no existe lo agrega. Tambien puedes incluir un comentario al final.
3. ```writeIni(archivo, "ubicación y/o nombre del archivo ini")```
__Funciones secundarias:__
1. ```objIni(string)``` transforma un strin en un objeto archivo ini.
__Ejemplos:__
tenemos el siguiente archivo _config.ini_:
```ini
ip=123.456.789
nombre=Juan Gonzalez
edad=22
color=#333
saludar=si
```
### Leer un archivo ini y almacenarlo en una variable:
```javascript
var ini=require("C:/miProyecto/ini.js"); //INCLUIMOS LA LIBRERIA
var miArchivo=ini.read("config.ini"); //ALMACENAMOS NUESTRO ARCHIVO EN UNA VARIABLE
console.log(miArchivo); //MOSTRAMOS EN CONSOLA COMO ESTÁ FRAGMENTADO NUSTRO ARCHIVO
```
### Acceder al valor de un parametro, en este caso queremos saber que valor está amlacenado en el parametro "ip":
```javascript
var ini=require("C:/miProyecto/ini.js");
var miArchivo=ini.read("config.ini");
console.log(ini.parameter(miArchivo, "ip")); //consola -> 123.456.789
```
### Cambiar el valor almacenado en un parametro:
```javascript
var ini=require("C:/miProyecto/ini.js");
var miArchivo=ini.read("config.ini");
ini.parameter(miArchivo, "edad", 30); //CAMBIAMOS EL VALOR DE "edad" POR "30"
console.log(ini.parameter(miArchivo, "edad")); //consola -> 30
```
__NOTA__: Si bien cambiamos el valor almacenado en nuestro archivo, este cambio no se guarda en config.ini, para ello mire el siguiente ejemplo.
### Guardar/aplicar cambios en el archivo:
```javascript
var ini=require("C:/miProyecto/ini.js");
var miArchivo=ini.read("config.ini");
ini.parameter(miArchivo, "edad", 30);
console.log(ini.parameter(miArchivo, "edad")); //consola -> 30
ini.write(miArchivo, "config.ini"); //GUARDAMOS TODOS LOS CAMBIOS EN NUESTRO config.ini
```
### Agregar un nuevo parametro:
```javascript
var ini=require("C:/miProyecto/ini.js");
var miArchivo=ini.read("config.ini");
ini.parameter(miArchivo, "altura", "1.71m"); //altura NO EXISTE EN config.ini POR LO QUE SE AGREGARÁ AL FINAL
console.log(ini.parameter(miArchivo, "altura")); //consola -> 1.71m
ini.write(miArchivo, "config.ini"); //GUARDAMOS CAMBIOS EN config.ini
```
__NOTA__: En el momento en el que se le asigna el valor a un parametro no existente, este se crea con su respectivo valor al final del documento.
