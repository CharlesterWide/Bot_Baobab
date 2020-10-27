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
                    { text: "⚾️Pokeballs⚾️", callback_data: "POKEBALLS" },
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
                            break;
                        case 2:
                            Stats(msg);
                            npet = peticiones.indexOf(pet);
                            break;
                        case 3:
                            Habilidades(msg);
                            npet = peticiones.indexOf(pet);
                            break;
                        case 4:
                            Debilidades(msg);
                            npet = peticiones.indexOf(pet);
                            break;
                    }
                }
            })
            peticiones.splice(npet, 1);
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
                Baobab.sendMessage(chatId, mensaje);
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
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
            Baobab.sendMessage(chatId, mensaje);
            console.log('There was an ERROR');
        }
    }).catch(function(err) {
        console.log(err);
    });

}

/*#############################################################################################################

                               Busqueda random de pokemon

 ###############################################################################################################*/

Baobab.onText(/^\/Random/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
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
                Baobab.sendMessage(chatId, mensaje);
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendMessage(chatId, mensaje);
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
            Baobab.sendMessage(chatId, mensaje);
            console.log('There was an ERROR');
        }
    }).catch(function(err) {
        console.log(err);
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
    });
}


/*#############################################################################################################

                             Debilidades del pokemon elegido

###############################################################################################################*/


Baobab.onText(/^\/Debilidades/, function(msg) {
    console.log("Chat:" + msg.chat.id);
    console.log("Usuario: " + msg.from.username);
    console.log("Texto: " + msg.text.toString());
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
                Baobab.sendMessage(chatId, mensaje);
                console.log('There was an ERROR');
            }
        }).catch(function(err) {
            console.log(err);
            mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
            Baobab.sendMessage(chatId, mensaje);
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
            Baobab.sendMessage(chatId, mensaje);
            console.log('There was an ERROR');
        }
    }).catch(function(err) {
        console.log(err);
        mensaje = "Error al buscar a " + pokemon + "\n Nombre mal introducido o pokemon no existente";
        Baobab.sendMessage(chatId, mensaje);
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

    if (data == 'BUSCA') {
        var peticion = {
            id: chatId,
            peticion: 1
        };
        peticiones.push(peticion);
        Baobab.sendMessage(chatId, "¿Qué Pókemon buscas? \nPuedes usar su nombre o número nacional");
    }

    if (data == 'STATS') {
        var peticion = {
            id: chatId,
            peticion: 2
        };
        peticiones.push(peticion);
        Baobab.sendMessage(chatId, "¿Qué Pókemon buscas? \nPuedes usar su nombre o número nacional");
    }


    if (data == 'RANDOM') {
        Baobab.sendMessage(chatId, "Y el Pókemon random es...");
        Random(msg);
    }

    if (data == 'HABILIDAD') {
        var peticion = {
            id: chatId,
            peticion: 3
        };
        peticiones.push(peticion);
        Baobab.sendMessage(chatId, "¿Qué habiliad buscas? \nPuedes usar su nombre o número nacional");
    }

    if (data == 'DEBILIDAD') {
        var peticion = {
            id: chatId,
            peticion: 4
        };
        peticiones.push(peticion);
        Baobab.sendMessage(chatId, "¿De qué Pókemon quieres saber las debilidades? \nPuedes usar su nombre o número nacional");
    }

    if (data == 'TIPO') {
        funtipos(msg);
    }

    if (data == 'POKEBALLS') {
        funpokeballs(msg);
    }

    console.log(peticiones);
    /*BUSCA,STATS,RANDOM,HABILIDAD,DEBILIDAD,TIPO*/

    //    Botones para la funcion de tipos


    if (data == 'UNTIPO') {
        peticionTipos.forEach(function(peticion) {
            if (peticion.id == chatId) {
                peticion.n = 1;
            }
        });
        tipos(chatId);
    };

    if (data == 'DOSTIPOS') {
        peticionTipos.forEach(function(peticion) {
            if (peticion.id == chatId) {
                peticion.n = 2;
            }
        });
        tipos(chatId);
    };

    if (data == 'ACERO') {
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
    }

    if (data == 'AGUA') {
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
    }

    if (data == 'BICHO') {
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
    }

    if (data == 'DRAGON') {
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
    }

    if (data == 'ELECTRICO') {
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
    }

    if (data == 'FANTASMA') {
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
    }

    if (data == 'FUEGO') {
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
    }

    if (data == 'HADA') {
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
    }

    if (data == 'HIELO') {
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
    }

    if (data == 'LUCHA') {
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
    }

    if (data == 'NORMAL') {
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
    }

    if (data == 'PLANTA') {
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
    }

    if (data == 'PSIQUICO') {
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
    }

    if (data == 'ROCA') {
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
    }

    if (data == 'SINIESTRO') {
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
    }

    if (data == 'TIERRA') {
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
    }

    if (data == 'VENENO') {
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
    }

    if (data == 'VOLADOR') {
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
    }
    /* 'Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador'*/


    if (data == "POKE") {
        Pokedex.Pokeballs(0).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "SUPER") {
        Pokedex.Pokeballs(1).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "ULTRA") {
        Pokedex.Pokeballs(2).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "MASTER") {
        Pokedex.Pokeballs(3).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "MALLA") {
        Pokedex.Pokeballs(4).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "NIDO") {
        Pokedex.Pokeballs(5).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "BUCEO") {
        Pokedex.Pokeballs(6).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "ACOPIO") {
        Pokedex.Pokeballs(7).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "TURNO") {
        Pokedex.Pokeballs(8).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "VELOZ") {
        Pokedex.Pokeballs(9).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "OCAS") {
        Pokedex.Pokeballs(10).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "RAPID") {
        Pokedex.Pokeballs(11).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "NIVEL") {
        Pokedex.Pokeballs(12).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "AMOR") {
        Pokedex.Pokeballs(13).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "CEBO") {
        Pokedex.Pokeballs(14).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "LUNA") {
        Pokedex.Pokeballs(15).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "HONOR") {
        Pokedex.Pokeballs(16).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "LUJO") {
        Pokedex.Pokeballs(17).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "SANA") {
        Pokedex.Pokeballs(18).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }
    if (data == "GLORI") {
        Pokedex.Pokeballs(19).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }

    if (data == "ENSU") {
        Pokedex.Pokeballs(20).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }

    if (data == "SAFA") {
        Pokedex.Pokeballs(21).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }

    if (data == "PESO") {
        Pokedex.Pokeballs(22).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
    }

    if (data == "ENTE") {
        Pokedex.Pokeballs(23).then(function(resolve) {
            if (resolve.code == 'ok') {
                Baobab.sendPhoto(chatId, resolve.img, { caption: resolve.data });
                limpiar(chatId);
            }
        })
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