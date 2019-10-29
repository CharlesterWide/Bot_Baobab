process.env["NTBA_FIX_319"] = 1;


const TelegramBot = require('node-telegram-bot-api');
const token = 'Not a token';
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

  Baobab.sendMessage(chatId, "Hola, " + username + " soy el Profesor Baobab \n Un experto en Pokemon" +
    "\n Prueba el comand /help para ver lo que soy capaz de hacer");
});

Baobab.onText(/^\/help/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;

  Baobab.sendMessage(chatId, "Ahora mismo estoy trabajando para ofrecerte más servicios"
    + "\nComandos disponibles: "
    + "\n\n/Pokemon Nombre o número del Pokemon para que te de la inforación de un Pokemon"
    + "\n\n/Random para ver un Pokemon de manera aleatoria"
    + "\n\n/Habilidad número de la habilidad o nombre en inglés para ver la información de la habilidad"
    + "\n\n/Stats Nombre o número del Pokemon para ver su información completa"
    + "\n\n/Debilidades Nombre o número del Pokemon para ver sus resistencias elementales");
});


Baobab.onText(/^\/Pokemon/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
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
      console.log(err); Random
    });
  }

});

Baobab.onText(/^\/Random/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;


  Pokedex.Random().then(function (resolve) {
    if (resolve.code == 'ok') {
      Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
    }
  }).catch(function (err) {
    console.log(err);
  });
});


Baobab.onText(/^\/Habilidad/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
  texto = texto.split(" ");
  if (texto.length < 2) {
    Baobab.sendMessage(chatId, "Hace falta meter el nombre en inglés o número de habilidad junto al comando");
  } else {
    var habilidad = texto[1];

    Pokedex.Habilidad(habilidad).then(function (resolve) {
      if (resolve.code == 'ok') {
        Baobab.sendMessage(chatId, resolve.data);
        console.log(resolve);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }

});


Baobab.onText(/^\/Stats/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
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
      console.log(err); Random
    });
  }

});


Baobab.onText(/^\/Debilidades/, function (msg) {
  console.log("Chat:" + msg.chat.id);
  console.log("Usuario: " + msg.from.username);
  console.log("Texto: " + msg.text.toString());
  var chatId = msg.chat.id;
  var texto = msg.text.toString().toLocaleLowerCase();
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
      console.log(err); Random
    });
  }

});


Baobab.on("polling_error", (err) => console.log(err));


