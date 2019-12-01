process.env["NTBA_FIX_319"] = 1;


const TelegramBot = require('node-telegram-bot-api');
const token = 'Not a Tokken';
const Baobab = new TelegramBot(token, { polling: true });

const Pokedex = require('./Pokedex');


// Variables de consulta y movidas exta



console.log("Bot iniciado");

Baobab.onText(/^\/start/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var username = msg.from.username;
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);

  Baobab.sendMessage(chatId, "Hola, " + username + " soy el Profesor Baobab \n Un experto en Pokemon" +
    "\n Prueba el comand /help para ver lo que soy capaz de hacer");
});


/*#############################################################################################################

                               Funcion de help

 ###############################################################################################################*/

Baobab.onText(/^\/help/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);

  Baobab.sendMessage(chatId, "Ahora mismo estoy trabajando para ofrecerte más servicios"
    + "\nComandos disponibles: "
    + "\n\n/Pokemon Nombre o número del Pokemon para que te de la inforación de un Pokemon"
    + "\n\n/Random para ver un Pokemon de manera aleatoria"
    + "\n\n/Habilidad número de la habilidad o nombre en inglés para ver la información de la habilidad"
    + "\n\n/Stats Nombre o número del Pokemon para ver su información completa"
    + "\n\n/Debilidades Nombre o número del Pokemon para ver sus resistencias elementales"
    + "\n\n/Tipos y se abrirá el selector de tipos para ver sus resistencias elementales");
});



/*#############################################################################################################

                               Busqueda basica de pokemon

 ###############################################################################################################*/


Baobab.onText(/^\/Pokemon/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);
  texto = texto.split(" ");
  if (texto.length < 2) {
    Baobab.sendMessage(chatId, "Hace falta meter el nombre o número del Pokemon junto al comando");
  } else {
    var pokemon = texto[1];

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.BuscaPokemon(pokemon).then(function (resolve) {
      if (resolve.code == 'ok') {
        Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
      } else {
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
        console.log('There was an ERROR');
      }
    }).catch(function (err) {
      console.log(err);
    });
  }

});

/*#############################################################################################################

                               Busqueda random de pokemon

 ###############################################################################################################*/

Baobab.onText(/^\/Random/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);


  Pokedex.Random().then(function (resolve) {
    if (resolve.code == 'ok') {
      Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
    }
  }).catch(function (err) {
    console.log(err);
    mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
    Baobab.sendMessage(chatId, mensaje);
  });
});


/*#############################################################################################################

                              Descripcion de habilidades

  ###############################################################################################################*/


Baobab.onText(/^\/Habilidad/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);
  texto = texto.split(" ");
  if (texto.length < 2) {
    Baobab.sendMessage(chatId, "Hace falta meter el nombre en inglés o número de habilidad junto al comando");
  } else {
    var habilidad = texto[1];

    Pokedex.Habilidad(habilidad).then(function (resolve) {
      if (resolve.code == 'ok') {
        Baobab.sendMessage(chatId, resolve.data);
        console.log(resolve);
      } else {
        mensaje = "Error al buscar la habilidad " + habilidad + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
        console.log('There was an ERROR');
      }
    }).catch(function (err) {
      console.log(err);
      mensaje = "Error al buscar la habilidad " + habilidad + "\n Nombre mal introducido o pokemon no existente";
      Baobab.sendMessage(chatId, mensaje);
    });
  }

});


/*#############################################################################################################

                             Busqueda detallada de pokemon

###############################################################################################################*/

Baobab.onText(/^\/Stats/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);
  texto = texto.split(" ");
  if (texto.length < 2) {
    Baobab.sendMessage(chatId, "Hace falta meter el nombre o número del Pokemon junto al comando");
  } else {
    var pokemon = texto[1];

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.Stats(pokemon).then(function (resolve) {
      if (resolve.code == 'ok') {
        Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
      } else {
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
        console.log('There was an ERROR');
      }
    }).catch(function (err) {
      console.log(err);
      mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
      Baobab.sendMessage(chatId, mensaje);
    });
  }

});



/*#############################################################################################################

                             Debilidades del pokemon elegido

###############################################################################################################*/


Baobab.onText(/^\/Debilidades/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId,msgId);
  texto = texto.split(" ");
  if (texto.length < 2) {
    Baobab.sendMessage(chatId, "Hace falta meter el nombre o número del Pokemon junto al comando");
  } else {
    var pokemon = texto[1];

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.Debilidades(pokemon).then(function (resolve) {
      if (resolve.code == 'ok') {
        Baobab.sendMessage(chatId, resolve.data);
      } else {
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
        console.log('There was an ERROR');
      }
    }).catch(function (err) {
      console.log(err);
      mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
      Baobab.sendMessage(chatId, mensaje);
    });
  }

});


/*#############################################################################################################

                             Debilidades elementales por tipos

###############################################################################################################*/

var ntipos = 0;
var tipossel = [];

Baobab.onText(/^\/Tipos/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var msgId = msg.message_id;
  Baobab.deleteMessage(chatId, msgId);
  ntipos = 0;
  tipossel = [];
  Baobab.sendMessage(chatId, "¿Cuántos tipos quieres?",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "1 tipo", callback_data: "UNTIPO" },
            { text: "2 tipos", callback_data: "DOSTIPOS" }
          ]
        ]

      }
    });
});

var tipos = function (chatId) {
  var mensaje = "Escoge tipo";
  if (ntipos == 2) {
    if (tipossel.length == 1) {
      mensaje = "Escoge el segundo tipo";
    }
  }
  Baobab.sendMessage(chatId, mensaje,
    {
      reply_markup: {
        inline_keyboard:[
          [
            { text: "Acero", callback_data: "ACERO" },
            { text: "Agua", callback_data: "AGUA" }
          ],
          [
            { text: "Bicho", callback_data: "BICHO" },
            { text: "Dragón", callback_data: "DRAGON" }
          ],
          [
            { text: "Eléctrico", callback_data: "ELECTRICO" },
            { text: "Fantasma", callback_data: "FANTASMA" }
          ],
          [
            { text: "Fuego", callback_data: "FUEGO" },
            { text: "Hada", callback_data: "HADA" }
          ],
          [
            { text: "Hielo", callback_data: "HIELO" },
            { text: "Lucha", callback_data: "LUCHA" }
          ],
          [
            { text: "Normal", callback_data: "NORMAL" },
            { text: "Planta", callback_data: "PLANTA" }
          ],
          [
            { text: "Psíquico", callback_data: "PSIQUICO" },
            { text: "Roca", callback_data: "ROCA" }
          ],
          [
            { text: "Siniestro", callback_data: "SINIESTRO" },
            { text: "Tierra", callback_data: "TIERRA" }
          ],
          [
            { text: "Veneno", callback_data: "VENENO" },
            { text: "Volador", callback_data: "VOLADOR" }
          ]
        ]
      }
    });
}


/*#############################################################################################################

                             CALLBACS DE LOS BOTONES

###############################################################################################################*/

Baobab.on('callback_query',function(boton){
  var data = boton.data;
  var msg = boton.message;
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var msgId = msg.message_id;

  //    Botones para la funcion de tipos


  if(data == 'UNTIPO'){
    Baobab.deleteMessage(chatId,msgId);
    ntipos = 1;
    tipos(chatId);
  };

  if(data == 'DOSTIPOS'){
    Baobab.deleteMessage(chatId,msgId);
    ntipos = 2;
    tipos(chatId);
  };

  if(data == 'ACERO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Acero');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'AGUA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Agua');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'BICHO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Bicho');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'DRAGON'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Dragón');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'ELECTRICO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Eléctrico');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'FANTASMA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Fantasma');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'FUEGO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Fuego');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'HADA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Hada');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }
  
  if(data == 'HIELO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Hielo');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'LUCHA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Lucha');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'NORMAL'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Normal');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'PLANTA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Planta');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'PSIQUICO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Psíquico');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'ROCA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Roca');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'SINIESTRO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Siniestro');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'TIERRA'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Tierra');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'VENENO'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Veneno');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }

  if(data == 'VOLADOR'){
    Baobab.deleteMessage(chatId,msgId);
    tipossel.push('Volador');
    if(tipossel.length != ntipos){
      tipos(chatId);
    }else{
      Pokedex.Tipos(tipossel).then(function(resolve){
        if(resolve.code == 'ok'){
          Baobab.sendMessage(chatId, resolve.data);
        }
      })
    }
  }
  /* 'Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador'*/

});


Baobab.on("polling_error", (err) => console.log(err));


