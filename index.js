
const TelegramBot = require('node-telegram-bot-api');
const token = 'Not a Token';
const Baobab = new TelegramBot(token, { polling: true });

var P = require('pokedex-promise-v2');
var Pokedex = new P();



Baobab.onText(/^\/start/, function (msg) {
    console.log(msg);
    var chatId = msg.chat.id;
    var username = msg.from.username;

    Baobab.sendMessage(chatId, "Hola, " + username + " soy el Profesor Baobab \n Un experto en Pokemon"+
    "\n Prueba el comand /help para ver lo que soy capaz de hacer");
});

Baobab.onText(/^\/help/, function(msg){
    console.log(msg);
    var chatId = msg.chat.id;

    Baobab.sendMessage(chatId, "Ahora mismo estoy trabajando para ofrecerte más servicios"
    + "\n Comandos disponibles: "
    +"/Pokemon Nombre del Pokemon para que te de la inforación de un Pokemon");
});


Baobab.onText(/^\/Pokemon/, function (msg) {
    console.log(msg);
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    texto = texto.split(" ");
    var pokemon = texto[1];

    var mensaje = "";

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.getPokemonByName(pokemon) // with Promise
    .then(function(response) {
      //console.log(response);
      mensaje = "Nombre: " + response.forms[0].name +
      "\n" + "Índice en la Pokedex: " + response.id.toString();
      
      Baobab.sendPhoto(chatId,response.sprites.front_default.toString(),{caption: mensaje});
    })
    .catch(function(error) {
      
      mensaje = "Error al buscar a "+ pokemon+ "\n Nombre mal introducido o pokemon no existente";
      Baobab.sendMessage(chatId, mensaje );
      console.log('There was an ERROR: ', error);
    });

    
});