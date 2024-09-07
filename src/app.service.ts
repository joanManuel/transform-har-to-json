import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Har } from './interfaces/har.interface';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async readHar(file: Express.Multer.File) {
    try {
      // Leer el contenido del archivo desde el buffer
      const content = file.buffer.toString('utf8'); 

      // Verificar que el contenido no esté vacío
      if (!content) {
        throw new Error('El archivo está vacío');
      }

      const harJson = JSON.parse(content) as Har;
      const entries = harJson.log.entries.map(entry => {

        let bodyResponse = '';
        if(entry.response?.content?.mimeType === 'application/json') {
          if(entry.response.content.text?.replace(/\\"/g, '"').replace(/\\n/g, '\n')) {
            bodyResponse = JSON.parse(entry.response.content.text);
          }
        }

        return {
          request: {
            method: entry.request.method,
            url: entry.request.url,
            bodySize: entry.request.bodySize,
            body: (entry.request?.postData?.mimeType === 'application/json') ? JSON.parse(entry.request.postData?.text) : '',
          },
          response: {
            status: entry.response.status,
            statusText: entry.response.statusText,
            bodySize: entry.response.bodySize,
            body: bodyResponse,
          },
        };
      })

      // Filtrar las entradas que tienen operationName antes de aplicar el map
      const filteredEntries = entries.filter(entry => entry.request.body.operationName);

      const transformed = filteredEntries.map(entry => ({
        operationName: entry.request.body.operationName,
        query: entry.request.body.query,
        variables: entry.request.body.variables,
        response: entry.response.body,
      }));

      // Crear la carpeta de destino si no existe
      const outputDir = './output';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
       // limpiar la carpeta de destino
      fs.readdirSync(outputDir).forEach(file => {
        fs.unlinkSync(`${outputDir}/${file}`);
      });
  
      // Guardar el objeto en un archivo JSON
      transformed.forEach((element, index) => {
        fs.writeFileSync(`${outputDir}/${element.operationName}.json`, JSON.stringify(element.response, null, 2));

      })
    } catch (error) {
      console.log('Error reading file:', error);
    }
  }
}