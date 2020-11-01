process.env["NTBA_FIX_319"] = 1;


const TelegramBot = require('node-telegram-bot-api');
const token = 'Not a Token';
const Baobab = new TelegramBot(token, { polling: true });

const Pokedex = require('./Pokedex');


// Variables de consulta y movidas exta



console.log("Bot iniciado");


Baobab.onText(/^\/start/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var username = msg.from.username;
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);

    Baobab.sendMessage(chatId, "Hola, " + username + " soy el Profesor Baobab \n Un experto en Pokemon" +
        "\n Para hablar conmigo simplemente escribe \"Profesor\" o \"Baobab\"");
});


/*#############################################################################################################

                               Funciones principales de llamada

 ###############################################################################################################*/

//Pila de peticiones

var peticiones = [];

//Función principal de respuesta

var Profesor = function(msg) {
    Baobab.sendMessage(msg.chat.id, "¿En qué puedo ayudarte", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "🔍Busqueda Pókemon🔍", callback_data: "BUSCA" },
                ],
                [
                    { text: "📊Estadísticas de Pókemon📊", callback_data: "STATS" },
                ],
                [
                    { text: "🌌Random🌌", callback_data: "RANDOM" },
                ],
                [
                    { text: "🏋‍♂Describir habilidad🏋‍♂", callback_data: "HABILIDAD" },
                ],
                [
                    { text: "☠Debilidades de Pókemon☠", callback_data: "DEBILIDAD" },
                ],
                [
                    { text: "☢️Debilidades de tipo☢️", callback_data: "TIPO" },
                ],
                [
                    { text: "⚾️Poké Balls⚾️", callback_data: "POKEBALLS" },
                ],
                [
                    { text: "🛒Captura🛒", callback_data: "CAPTURA" },
                ]
            ]

        }
    });
}

//Función de lectura de cada mensaje

Baobab.on('message', function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var npet = 0;

    var texto = msg.text.toString().toLocaleLowerCase();
    texto = texto.split(" ");
    switch (texto[0]) {
        case "profesor":
        case "baobab":
        case "profe":
        case "maestro":
        case "titan":
        case "grande":
        case "pokemon":
        case "pókemon":
            Profesor(msg);
            break;
        default:
            peticiones.forEach(function(pet) {
                if (chatId == pet.id) {
                    switch (pet.peticion) {
                        case 1:
                            Busca(msg);
                            npet = peticiones.indexOf(pet);
                            peticiones.splice(npet, 1);
                            break;
                        case 2:
                            Stats(msg);
                            npet = peticiones.indexOf(pet);
                            peticiones.splice(npet, 1);
                            break;
                        case 3:
                            Habilidades(msg);
                            npet = peticiones.indexOf(pet);
                            peticiones.splice(npet, 1);
                            break;
                        case 4:
                            Debilidades(msg);
                            npet = peticiones.indexOf(pet);
                            peticiones.splice(npet, 1);
                            break;
                        case 5:
                            pet.pokemon = texto[0];
                            console.log(pet);
                            funpokeballs(msg);
                            break;
                    }
                }
            })
            break;
    }

});

/*#############################################################################################################

                               Funcion de help

 ###############################################################################################################*/

Baobab.onText(/^\/help/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);

    Baobab.sendMessage(chatId, "Ahora mismo estoy trabajando para ofrecerte más servicios" +
        "\nPrueba a escribit Profesor o Baobab directamente para la nueva interfaz" +
        "\nComandos disponibles: " +
        "\n\n/Pokemon Nombre o número del Pokemon para que te de la inforación de un Pokemon" +
        "\n\n/Random para ver un Pokemon de manera aleatoria" +
        "\n\n/Habilidad número de la habilidad o nombre en inglés para ver la información de la habilidad" +
        "\n\n/Stats Nombre o número del Pokemon para ver su información completa" +
        "\n\n/Debilidades Nombre o número del Pokemon para ver sus resistencias elementales" +
        "\n\n/Tipos y se abrirá el selector de tipos para ver sus resistencias elementales");
});



/*#############################################################################################################

                               Busqueda basica de pokemon

 ###############################################################################################################*/


Baobab.onText(/^\/Pokemon/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");
    if (texto.length < 2) {
        Baobab.sendMessage(chatId, "Hace falta meter el nombre o número del Pokemon junto al comando");
    } else {
        var pokemon = texto[1];

        console.log("Pokemon a buscar: " + pokemon);

        Pokedex.BuscaPokemon(pokemon).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
            } else {
                mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
                Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
        });
    }

});

var Busca = function(msg) {
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    texto = texto.split(" ");
    Baobab.deleteMessage(chatId, msgId);
    var pokemon = texto[0];

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.BuscaPokemon(pokemon).then(function(resolve) {
        if (resolve.code == 'ok') {
            Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
        } else {
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
            console.log('There was an ERROR');
        }
    }).catch(function(err) {
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
    });

}

/*#############################################################################################################

                               Busqueda random de pokemon

 ###############################################################################################################*/

Baobab.onText(/^\/Random/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);


    Pokedex.Random().then(function(resolve) {
        if (resolve.code == 'ok') {
            Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
        }
    }).catch(function(err) {
        console.log(err);
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
    });
});

var Random = function(msg) {
    var chatId = msg.chat.id;
    Pokedex.Random().then(function(resolve) {
        if (resolve.code == 'ok') {
            Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
        }
    }).catch(function(err) {
        console.log(err);
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
    });
}


/*#############################################################################################################

                              Descripcion de habilidades

  ###############################################################################################################*/


Baobab.onText(/^\/Habilidad/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");
    if (texto.length < 2) {
        Baobab.sendMessage(chatId, "Hace falta meter el nombre en inglés o número de habilidad junto al comando");
    } else {
        var habilidad = texto[1];

        Pokedex.Habilidad(habilidad).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendMessage(chatId, resolve.data);
                console.log(resolve);
            } else {
                mensaje = "Error al buscar la habilidad " + habilidad + "\n Nombre mal introducido o pokemon no existente";
                Baobab.sendMessage(chatId, mensaje);
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar la habilidad " + habilidad + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendMessage(chatId, mensaje);
        });
    }

});

var Habilidades = function(msg) {
        var chatId = msg.chat.id;
        var texto = msg.text.toString().toLocaleLowerCase();
        var msgId = msg.message_id;
        Baobab.deleteMessage(chatId, msgId);
        texto = texto.split(" ");
        var habilidad = texto[0];

        Pokedex.Habilidad(habilidad).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendMessage(chatId, resolve.data);
                console.log(resolve);
            } else {
                mensaje = "Error al buscar la habilidad " + habilidad + "\n Nombre mal introducido o pokemon no existente";
                Baobab.sendMessage(chatId, mensaje);
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar la habilidad " + habilidad + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendMessage(chatId, mensaje);
        });
    }
    /*#############################################################################################################

                                 Busqueda detallada de pokemon

    ###############################################################################################################*/

Baobab.onText(/^\/Stats/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");
    if (texto.length < 2) {
        Baobab.sendMessage(chatId, "Hace falta meter el nombre o número del Pokemon junto al comando");
    } else {
        var pokemon = texto[1];

        console.log("Pokemon a buscar: " + pokemon);

        Pokedex.Stats(pokemon).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
            } else {
                mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
                Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
        });
    }

});

var Stats = function(msg) {
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");

    var pokemon = texto[0];

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.Stats(pokemon).then(function(resolve) {
        if (resolve.code == 'ok') {
            Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
        } else {
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
            console.log('There was an ERROR');
        }
    }).catch(function(err) {
        console.log(err);
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
    });
}


/*#############################################################################################################

                             Debilidades del pokemon elegido

###############################################################################################################*/


Baobab.onText(/^\/Debilidades/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");
    if (texto.length < 2) {
        Baobab.sendMessage(chatId, "Hace falta meter el nombre o número del Pokemon junto al comando");
    } else {
        var pokemon = texto[1];

        console.log("Pokemon a buscar: " + pokemon);

        Pokedex.Debilidades(pokemon).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendMessage(chatId, resolve.data);
            } else {
                mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
                Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
        });
    }

});

var Debilidades = function(msg) {
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");
    var pokemon = texto[0];

    console.log("Pokemon a buscar: " + pokemon);

    Pokedex.Debilidades(pokemon).then(function(resolve) {
        if (resolve.code == 'ok') {
            Baobab.sendMessage(chatId, resolve.data);
        } else {
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
            console.log('There was an ERROR');
        }
    }).catch(function(err) {
        console.log(err);
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
    });

}


/*#############################################################################################################

                             Debilidades elementales por tipos

###############################################################################################################*/


var peticionTipos = [];


Baobab.onText(/^\/Tipos/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    var ntipos = 0;
    var tipossel = [];
    var peticion = {
        n: ntipos,
        t: tipossel,
        id: chatId
    }
    peticionTipos.push(peticion);
    Baobab.sendMessage(chatId, "¿Cuántos tipos quieres?", {
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

var funtipos = function(msg) {
    var chatId = msg.chat.id;
    var msgId = msg.message_id;
    //Baobab.deleteMessage(chatId, msgId);
    var ntipos = 0;
    var tipossel = [];
    var peticion = {
        n: ntipos,
        t: tipossel,
        id: chatId
    }
    peticionTipos.push(peticion);
    Baobab.sendMessage(chatId, "¿Cuántos tipos quieres?", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "1 tipo", callback_data: "UNTIPO" },
                    { text: "2 tipos", callback_data: "DOSTIPOS" }
                ]
            ]

        }
    });
}

var tipos = function(chatId) {
    var mensaje = "Escoge tipo";
    peticionTipos.forEach(function(peticion) {
        if (peticion.id == chatId) {
            if (peticion.n == 2) {
                if (peticion.t.length == 1) {
                    mensaje = "Escoge el segundo tipo";
                }
            }
        }
    });

    Baobab.sendMessage(chatId, mensaje, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Acero", callback_data: "ACERO" },
                    { text: "Agua", callback_data: "AGUA" },
                    { text: "Bicho", callback_data: "BICHO" },
                    { text: "Dragón", callback_data: "DRAGON" }
                ],
                [
                    { text: "Eléctrico", callback_data: "ELECTRICO" },
                    { text: "Fantasma", callback_data: "FANTASMA" },
                    { text: "Fuego", callback_data: "FUEGO" },
                    { text: "Hada", callback_data: "HADA" }
                ],
                [
                    { text: "Hielo", callback_data: "HIELO" },
                    { text: "Lucha", callback_data: "LUCHA" },
                    { text: "Normal", callback_data: "NORMAL" },
                    { text: "Planta", callback_data: "PLANTA" }
                ],
                [
                    { text: "Psíquico", callback_data: "PSIQUICO" },
                    { text: "Roca", callback_data: "ROCA" },
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

                             Pokeballs y captura

###############################################################################################################*/

var funpokeballs = function(msg) {
    var chatId = msg.chat.id;
    var msgId = msg.message_id;
    //Baobab.deleteMessage(chatId, msgId);
    Baobab.sendMessage(chatId, "¿Qué PokeBall quieres usar?", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "PokeBall", callback_data: "POKE" },
                    { text: "SuperBall", callback_data: "SUPER" },
                    { text: "UltraBall", callback_data: "ULTRA" },
                    { text: "MasterBall", callback_data: "MASTER" }
                ],
                [
                    { text: "MallaBall", callback_data: "MALLA" },
                    { text: "NidoBall", callback_data: "NIDO" },
                    { text: "BuceoBall", callback_data: "BUCEO" },
                    { text: "AcopioBall", callback_data: "ACOPIO" }
                ],
                [
                    { text: "TurnoBall", callback_data: "TURNO" },
                    { text: "VelozBall", callback_data: "VELOZ" },
                    { text: "OcasoBall", callback_data: "OCAS" },
                    { text: "RapidBall", callback_data: "RAPID" }
                ],
                [
                    { text: "NivelBall", callback_data: "NIVEL" },
                    { text: "AmorBall", callback_data: "AMOR" },
                    { text: "CeboBall", callback_data: "CEBO" },
                    { text: "LunaBall", callback_data: "LUNA" }
                ],
                [
                    { text: "HonorBall", callback_data: "HONOR" },
                    { text: "LujoBall", callback_data: "LUJO" },
                    { text: "SanaBall", callback_data: "SANA" },
                    { text: "GloriaBall", callback_data: "GLORI" }
                ],
                [
                    { text: "EnsueñoBall", callback_data: "ENSU" },
                    { text: "SafariBall", callback_data: "SAFA" },
                    { text: "PesoBall", callback_data: "PESO" },
                    { text: "EnteBall", callback_data: "ENTE" }
                ]
            ]

        }
    });
}


Baobab.onText(/^\/Captura/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    console.log(Date());
    var chatId = msg.chat.id;
    var texto = msg.text.toString().toLocaleLowerCase();
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);
    texto = texto.split(" ");

    if (texto.length < 3) {
        Baobab.sendMessage(chatId, "Hace falta introducir el nombre o número del Pokémon y el número de la Poké Ball que quieres usar");
    } else {
        Pokedex.Captura(texto[1], texto[2]).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
            } else {
                mensaje = "Error al buscar a " + texto[1] + "\n Nombre mal introducido o pokemon no existente";
                Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar a " + texto[1] + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
        });
    }


})

var funCaptura = function(msg) {

}


/*#############################################################################################################

                             CALLBACS DE LOS BOTONES

###############################################################################################################*/

Baobab.on('callback_query', function(boton) {
    var data = boton.data;
    var msg = boton.message;
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
    var chatId = msg.chat.id;
    var msgId = msg.message_id;
    Baobab.deleteMessage(chatId, msgId);

    // Botones de las funciones

    switch (data) {

        /**********
         * 
         *  Botones de llamadas principales
         * 
         **********/
        case 'BUSCA':
            var peticion = {
                id: chatId,
                peticion: 1
            };
            peticiones.push(peticion);
            Baobab.sendMessage(chatId, "¿Qué Pókemon buscas? \nPuedes usar su nombre o número nacional");
            break;
        case 'STATS':
            var peticion = {
                id: chatId,
                peticion: 2
            };
            peticiones.push(peticion);
            Baobab.sendMessage(chatId, "¿Qué Pókemon buscas? \nPuedes usar su nombre o número nacional");
            break;
        case 'RANDOM':
            Baobab.sendMessage(chatId, "Y el Pókemon random es...");
            Random(msg);
            break;
        case 'HABILIDAD':
            var peticion = {
                id: chatId,
                peticion: 3
            };
            peticiones.push(peticion);
            Baobab.sendMessage(chatId, "¿Qué habiliad buscas? \nPuedes usar su nombre o número nacional");
            break;
        case 'DEBILIDAD':
            var peticion = {
                id: chatId,
                peticion: 4
            };
            peticiones.push(peticion);
            Baobab.sendMessage(chatId, "¿De qué Pókemon quieres saber las debilidades? \nPuedes usar su nombre o número nacional");
            break;
        case 'TIPO':
            funtipos(msg);
            break;
        case 'POKEBALLS':
            funpokeballs(msg);
            break;
        case 'CAPTURA':
            var peticion = {
                id: chatId,
                peticion: 5,
                pokemon: 0
            };
            peticiones.push(peticion);
            Baobab.sendMessage(chatId, "¿Qué Pokémon quieres capturar? \nPuedes usar su nombre o número nacional");
            break;


            /*****
             * 
             *  Botones de los tipos
             * 
             ****/
        case 'UNTIPO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.n = 1;
                }
            });
            tipos(chatId);
            break;
        case 'DOSTIPOS':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.n = 2;
                }
            });
            tipos(chatId);
            break;
        case 'ACERO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Acero');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'AGUA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Agua');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'BICHO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Bicho');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'DRAGON':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Dragón');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'ELECTRICO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Eléctrico');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'FANTASMA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Fantasma');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'FUEGO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Fuego');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'HADA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Hada');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'HIELO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Hielo');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'LUCHA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Lucha');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'NORMAL':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Normal');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'PLANTA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Planta');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'PSIQUICO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Psíquico');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'ROCA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Roca');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'SINIESTRO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Siniestro');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'TIERRA':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Tierra');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'VENENO':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Veneno');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;
        case 'VOLADOR':
            peticionTipos.forEach(function(peticion) {
                if (peticion.id == chatId) {
                    peticion.t.push('Volador');
                    if (peticion.t.length != peticion.n) {
                        tipos(chatId);
                    } else {
                        Pokedex.Tipos(peticion.t).then(function(resolve) {
                            if (resolve.code == 'ok') {
                                Baobab.sendMessage(chatId, resolve.data);
                                limpiar(chatId);
                            }
                        })
                    }
                }
            });
            break;


            /******
             * 
             *  Pokeballs
             * 
             */

        case 'POKE':
        case 'SUPER':
        case 'ULTRA':
        case 'MASTER':
        case 'MALLA':
        case 'NIDO':
        case 'BUCEO':
        case 'ACOPIO':
        case 'TURNO':
        case 'VELOZ':
        case 'OCAS':
        case "RAPID":
        case "NIVEL":
        case "AMOR":
        case "CEBO":
        case "LUNA":
        case "HONOR":
        case "LUJO":
        case "SANA":
        case "GLORI":
        case "ENSU":
        case "SAFA":
        case "PESO":
        case "ENTE":
            var cap = false;
            var npet = 0;
            peticiones.forEach(function(pet) {
                if (pet.id == chatId) {
                    if (pet.peticion == 5) {
                        cap = true;
                        npet = peticiones.indexOf(pet);
                    }
                }
            })
            if (!cap) {
                Pokedex.Pokeballs(data).then(function(resolve) {
                    if (resolve.code == 'ok') {
                        Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                    }
                })
            } else {
                Pokedex.Captura(data, peticiones[npet].pokemon).then(function(resolve) {
                    if (resolve.code == 'ok') {
                        Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                        peticiones.splice(npet, 1);
                    } else {
                        mensaje = "Error al buscar a " + peticiones[npet].pokemon + "\n Nombre mal introducido o pokemon no existente";
                        Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
                        console.log('There was an ERROR');
                        peticiones.splice(npet, 1);
                    }
                }).catch(function(err) {
                    console.log(err);
                    mensaje = "Error al buscar a " + peticiones[npet].pokemon + "\n Nombre mal introducido o pokemon no existente";
                    Baobab.sendPhoto(chatId, 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg', { caption: mensaje });
                    peticiones.splice(npet, 1);
                });
            }
            break;
    }

});

/*#############################################################################################################

                             Limpieza pila tipos

###############################################################################################################*/

var limpiar = function(chatId) {
    var numeroP = 0;
    var found = false;
    peticionTipos.forEach(function(peticion) {
        if ((peticion.id != chatId) && !found) {
            numeroP++;
        }
    });
    peticionTipos.splice(numeroP, 1);
}


Baobab.on("polling_error", (err) => console.log(err));