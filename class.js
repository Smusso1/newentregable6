const fs = require("fs");

class Contenedor {
    constructor() {
      
    }

// Guardar mensaje

    async save(message) {
      try{
          const msj = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
          await fs.promises.appendFile(`./chatguardado.txt`, msj);
          console.log("Vamo arriba se pasa")
      } catch(error) {
          console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
      }
  }


//Obtener mensajes

  async getAll () {
    //leo el archivo y lo guardo en una variable que luego retorno
    let listadoMsg = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
    console.log("Conjunto de mensajes: ", listadoMsg);
    return listadoMsg;
}
}

  module.exports = Contenedor