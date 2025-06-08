/*  ===[ DOCUMENTACION ]===
**  Descripcion: La funcion 'servidor' permite comunicar facilmente con un servidor web y en español.
**
**  Parametros:
**    Obj: Este parametro recive el objeto con los datos a ser enviados.
**  
**    Config: Objeto de configuracion con las siguientes keys.
**      dominio: string
**      carpeta: string
**      metodo: 'POST'|'GET'
**      protocolo: 'http'|'https'
**      puerto: si no se espesifica, es automatico basandose en el protocolo.
*/

const http = require('http');
const https = require('https');

function servidor(Obj, Config = {}) {
  Config = Object.asset

  const params = Object.entries(Obj).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  const path = `/key/activador.php?${params}`;

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'gio.servegame.com',
      port: puerto,
      path: path,
      method: 'GET',
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject('Respuesta del servidor no válida.');
        }
      });
    });

    req.on('error', () => {
      reject('No se pudo conectar con el servidor.');
    });

    req.end();
  });
}
