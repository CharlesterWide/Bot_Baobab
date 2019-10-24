process.env["NTBA_FIX_319"] = 1;


const TelegramBot = require('node-telegram-bot-api');
const token = 'Not a token';
const Baobab = new TelegramBot(token, { polling: true });

var P = require('pokedex-promise-v2');
var Pokedex = new P();


// Variables de consulta y movidas exta

const tipos = {
  esp : ['Acero','Agua','Bicho','Dragón','Eléctrico','Fantasma','Fuego','Hada','Hielo','Lucha','Normal','Planta','Psíquico','Roca','Siniestro','Tierra','Veneno','Volador'],
  ing : ['steel','water','bug','dragon','electric','ghost','fire','fairy','ice','fighting','normal','grass','psychic','rock','dark','ground','poison','flying']
};

console.log("Bot iniciado");

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
    //console.log(msg);
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    texto = texto.split(" ");
    var pokemon = texto[1];

    console.log("Pokemon a buscar: " + pokemon);


    Pokedex.getPokemonByName(pokemon) // with Promise
    .then(function(response) {

      mensaje = "Nombre: " + response.forms[0].name +
      "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";

      if(response.types.length > 1){
        mensaje += "Tipos: ";
        mensaje += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
        mensaje += "/";
        mensaje += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
      }else{
        mensaje += "Tipo: ";
        mensaje += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
      }
      

      
      Baobab.sendPhoto(chatId,response.sprites.front_default.toString(),{caption: mensaje});
    })
    .catch(function(error) {
      
      mensaje = "Error al buscar a "+ pokemon+ "\n Nombre mal introducido o pokemon no existente";
      Baobab.sendMessage(chatId, mensaje );
      console.log('There was an ERROR');
    });

    
});


Baobab.on("polling_error", (err) => console.log(err));
