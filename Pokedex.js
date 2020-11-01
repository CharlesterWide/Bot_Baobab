var P = require('pokedex-promise-v2');
var Pkd = new P();


const tipos = {
    esp: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador'],
    ing: ['steel', 'water', 'bug', 'dragon', 'electric', 'ghost', 'fire', 'fairy', 'ice', 'fighting', 'normal', 'grass', 'psychic', 'rock', 'dark', 'ground', 'poison', 'flying']
};


/* Nombre  Ratio  Imagen ValorExtra RatioEX */
const pokeballs = [
    ['PokeBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Poké-Ball.png', 'N', 1],
    ['SuperBall', 1.5, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Super-Ball.png', 'N', 1],
    ['UltraBall', 2, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Ultra-Ball.png', 'N', 1],
    ['MasterBall', 100, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Master-Ball.png', 'N', 1],
    ['MallaBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Malla-Ball.png', 'Si el Pokémon es agua o bicho', 3.5],
    ['NidoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Nido-Ball.png', 'Si el nivel del Pókemon es menor de 30 la captura es máx de', 4],
    ['BuceoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Buceo-Ball.png', 'Si el Pókemon está sobre o bajo el agua', 3.5],
    ['AcopioBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Acopio-Ball.png', 'Si el Pókemon está registrado como capturado en la Pokédex', 3.5],
    ['TurnoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Turno-Ball.png', 'Si el combate supera el turno 29', 4],
    ['VelozBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Veloz-Ball.png', 'Si es el primer turno de combate', 5],
    ['OcasoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Ocaso-Ball.png', 'Si el Pókemon está en una cueva o es de noche', 3],
    ['RapidBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Rapid-Ball.png', 'Si la velocidad base del Pókemon es 100 o más', 4],
    ['NivelBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Nivel-Ball.png', 'Si el nivel del Pókemon es 4 veces menor al del propio Pókemon', 8],
    ['AmorBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Amor-Ball.png', 'Si el Pókemon es de género opuesto y misma especie que el tuyo', 8],
    ['CeboBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Cebo-Ball.png', 'Pescando', 5],
    ['LunaBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Luna-Ball-1.png', 'Si el Pókemon pertenece a la familia de Pókemon a una que evoluciona con piedra lunar', 4],
    ['HonorBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Honor-Ball.png', 'N', 1],
    ['LujoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Lujo-Ball.png', 'N', 1],
    ['SanaBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Sana-Ball.png', 'N', 1],
    ['GloriaBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Gloria-Ball.png', 'N', 1],
    ['EnsueñoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Ensueño-Ball.png', 'N', 1],
    ['SafariBall', 1.5, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Safari-Ball.png', 'N', 1],
    ['PesoBall', 1, 'https://pokemonalpha.xyz/wp-content/uploads/2016/06/Peso-Ball.png', 'Si el Pókemon pesa más de 300 kg', 5],
    ['EnteBall', 0.1, 'https://pokemonalpha.xyz/wp-content/uploads/Ente-Ball.png', 'Si se trata de un Ultraente', 5]
]

const danelement = [
    /* Ac   Ag   Bi   Dr   El   Fa   Fu   Ha   Hi   Lu   No   Pl   Ps   Ro   Si   Ti   Ve   Vo*/
    /*Acero*/
    [0.5, 1, 0.5, 0.5, 1, 1, 2, 0.5, 0.5, 2, 0.5, 0.5, 0.5, 0.5, 1, 2, 0, 0.5],
    /*Agua*/
    [0.5, 0.5, 1, 1, 2, 1, 0.5, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    /*Bicho*/
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1, 0.5, 1, 2, 1, 0.5, 1, 2],
    /*Dragon*/
    [1, 0.5, 1, 2, 0.5, 1, 0.5, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 1, 1],
    /*Electrico*/
    [0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5],
    /*Fantasma*/
    [1, 1, 0.5, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 0.5, 1],
    /*Fuego*/
    [0.5, 2, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 1, 0.5, 1, 2, 1, 2, 1, 1],
    /*Hada*/
    [2, 1, 0.5, 0, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1],
    /*Hielo*/
    [2, 1, 1, 1, 1, 1, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 1, 1, 1],
    /*Lucha*/
    [1, 1, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 2],
    /*Normal*/
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    /*Planta*/
    [1, 0.5, 2, 1, 0.5, 1, 2, 1, 2, 1, 1, 0.5, 1, 1, 1, 0.5, 2, 2],
    /*Psiquico*/
    [1, 1, 2, 1, 1, 2, 1, 1, 1, 0.5, 1, 1, 0.5, 1, 2, 1, 1, 1],
    /*Roca*/
    [2, 2, 1, 1, 1, 1, 0.5, 1, 1, 2, 0.5, 2, 1, 1, 1, 2, 0.5, 0.5],
    /*Siniestro*/
    [1, 1, 2, 1, 1, 0.5, 1, 2, 1, 2, 1, 1, 0, 1, 0.5, 1, 1, 1],
    /*Tierra*/
    [1, 2, 1, 1, 0, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1, 0.5, 1],
    /*Veneno*/
    [1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 0.5, 1, 0.5, 2, 1, 1, 2, 0.5, 1],
    /*Volador*/
    [1, 1, 0.5, 1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1, 0, 1, 1]
]

/*#############################################################################################################

                                Funciones de la pokedex

###############################################################################################################*/

var Pokedex = {


    /*#############################################################################################################

                                  Busqueda basica de pokemon

    ###############################################################################################################*/



    BuscaPokemon: function(pokemon) {
        var respuesta = { code: 'ko', data: '', img: 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg' };
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {

                Pkd.getPokemonByName(pokemon).then(function(response) {
                        console.log(response)

                        respuesta.data = "Nombre: " + response.name +
                            "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";

                        if (response.types.length > 1) {
                            respuesta.data += "Tipos: ";
                            respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                            respuesta.data += "/";
                            respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
                        } else {
                            respuesta.data += "Tipo: ";
                            respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                        }

                        respuesta.data += "\nPara ver sus estadísticas escribe /Stats " + response.name;
                        if (response.sprites.front_default != null) {
                            respuesta.img = response.sprites.front_default.toString();
                        }


                        respuesta.code = 'ok';
                        resolve(respuesta);
                        console.log(respuesta);
                    })
                    .catch(function(error) {
                        console.log('There was an ERROR', error);
                        reject(respuesta);
                    });

            }, 2000);
        });
        return promise;
    },


    /*#############################################################################################################

                               Busqueda random

 ###############################################################################################################*/


    Random: function() {
        var respuesta = { code: 'ko', data: '', img: 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg' };
        var pokemon = Math.round(Math.random() * (890 - 1) + 1);
        console.log("Numero : " + pokemon);
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {

                Pkd.getPokemonByName(pokemon).then(function(response) {

                        respuesta.data = "Nombre: " + response.name +
                            "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";

                        if (response.types.length > 1) {
                            respuesta.data += "Tipos: ";
                            respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                            respuesta.data += "/";
                            respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
                        } else {
                            respuesta.data += "Tipo: ";
                            respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                        }

                        if (response.sprites.front_default != null) {
                            respuesta.img = response.sprites.front_default.toString();
                        }

                        respuesta.data += "\nPara ver sus estadísticas escribe /Stats " + response.name;

                        respuesta.code = 'ok';
                        resolve(respuesta);
                        console.log(respuesta);
                    })
                    .catch(function(error) {
                        console.log('There was an ERROR', error);
                        reject(respuesta);
                    });

            }, 2000);
        });
        return promise;
    },


    /*#############################################################################################################

                               Busqueda detallada de pokemon

 ###############################################################################################################*/


    Stats: function(pokemon) {
        var respuesta = { code: 'ko', data: '', img: 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg' };
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {

                Pkd.getPokemonByName(pokemon).then(function(response) {

                    if (response.sprites.front_default != null) {
                        respuesta.img = response.sprites.front_default.toString();
                    }

                    respuesta.data = "Nombre: " + response.name +
                        "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";

                    if (response.types.length > 1) {
                        respuesta.data += "Tipos: ";
                        respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                        respuesta.data += "/";
                        respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
                    } else {
                        respuesta.data += "Tipo: ";
                        respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                    }
                    respuesta.data += "\nPara ver sus debilidades escribe /Debilidades " + response.name;
                    var peso = response.weight / 10;
                    var altura = response.height / 10;
                    respuesta.data += "\nPeso: " + peso.toString() + "kg";
                    respuesta.data += "\nAltura: " + altura.toString() + "m";

                    if (response.base_experience != null) {
                        respuesta.data += "\nExperiencia base: " + response.base_experience.toString() + "\n";
                    }


                    respuesta.data += "\nHabilidades: \n\n";
                    var hp, attack, defense, special_a, special_d, speed;
                    for (i = 0; i < response.stats.length; i++) {
                        switch (response.stats[i].stat.name) {
                            case "hp":
                                hp = response.stats[i].base_stat;
                                break;
                            case "attack":
                                attack = response.stats[i].base_stat;
                                break;
                            case "defense":
                                defense = response.stats[i].base_stat;
                                break;
                            case "special-attack":
                                special_a = response.stats[i].base_stat;
                                break;
                            case "special-defense":
                                special_d = response.stats[i].base_stat;
                                break;
                            case "speed":
                                speed = response.stats[i].base_stat;
                                break;
                        }
                    }
                    var stat = "Estadísticas base: \n" +
                        "Hp: " + hp + "\n" +
                        "Ataque: " + attack + "\n" +
                        "Defensa: " + defense + "\n" +
                        "Att. Especial: " + special_a + "\n" +
                        "Deff. Especial: " + special_d + "\n" +
                        "Velocidad: " + speed + "\n";
                    console.log(stat);
                    if (response.abilities.length > 0) {

                        Pokedex.Habilidad(response.abilities[0].ability.name).then(function(res) {
                            respuesta.data += res.data + "\n\n";
                            if (response.abilities.length > 1) {
                                Pokedex.Habilidad(response.abilities[1].ability.name).then(function(re) {
                                    respuesta.data += re.data + "\n\n";

                                    if (response.abilities.length > 2) {
                                        Pokedex.Habilidad(response.abilities[2].ability.name).then(function(r) {
                                            respuesta.data += r.data + "\n\n";

                                            respuesta.data += "\n";

                                            respuesta.data += stat;


                                            respuesta.code = 'ok';
                                            resolve(respuesta);
                                            console.log(respuesta);
                                        }).catch(function(error) {
                                            reject(error);
                                            console.log('There was an ERROR', error);
                                        });
                                    } else {
                                        respuesta.data += "\n";

                                        respuesta.data += stat;

                                        respuesta.code = 'ok';
                                        resolve(respuesta);
                                        console.log(respuesta);
                                    }
                                }).catch(function(error) {
                                    reject(error);
                                    console.log('There was an ERROR', error);
                                });
                            } else {
                                respuesta.data += "\n";

                                respuesta.data += stat;


                                respuesta.code = 'ok';
                                resolve(respuesta);
                                console.log(respuesta);
                            }
                        }).catch(function(error) {
                            reject(error);
                            console.log('There was an ERROR', error);
                        });

                    } else {
                        respuesta.data += "Puede que las habilidades de este pokemon no estén en la base de datos toadvía, ten paciencia\n\n";

                        respuesta.data += stat;


                        respuesta.code = 'ok';
                        resolve(respuesta);
                        console.log(respuesta);
                    }


                }).catch(function(error) {
                    reject(respuesta);
                    console.log('There was an ERROR', error);
                });

            }, 2000);
        });
        return promise;
    },

    /*#############################################################################################################

                                 Descripcion de habilidades

     ###############################################################################################################*/


    Habilidad: function(habilidad) {
        var respuesta = { code: 'ko', data: '', img: '' };
        var busca = "api/v2/ability/" + habilidad.toString();
        var ok = false;
        var i = 0;
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                Pkd.resource(busca).then(function(response) {
                        respuesta.data = "Habilidad: " + response.names[5].name + "\n";
                        while (!ok && i < response.flavor_text_entries.length) {
                            if (response.flavor_text_entries[i].language.name == "es") {
                                respuesta.data += "Efecto: " + response.flavor_text_entries[i].flavor_text.replace("\n", " ") + '\n';
                                ok = true;
                            } else {
                                i++;
                            }
                        }

                        respuesta.data += "Nombre inglés: " + response.name;
                        respuesta.code = "ok";
                        console.log(respuesta);
                        resolve(respuesta);
                    })
                    .catch(function(error) {
                        console.log('There was an ERROR', error);
                        reject(respuesta);
                    });

            }, 2000);
        });
        return promise;
    },

    /*#############################################################################################################

                               Funcion de cria
                               NO IMPLEMENTADA

 ###############################################################################################################*/

    Cria: function(pokemon) {
        var respuesta = { code: 'ko', data: '', img: '' };
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {

            }, 2000);
        });
        return promise;
    },


    /*#############################################################################################################

                               Debilidades del pokemon elegido

 ###############################################################################################################*/


    Debilidades: function(pokemon) {
        var respuesta = { code: 'ko', data: '', img: '' };
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                Pkd.getPokemonByName(pokemon).then(function(response) {
                        var tip = [];
                        var inmune = [];
                        var debil = [];
                        var sdebil = [];
                        var res = [];
                        var sres = [];
                        var nor = [];
                        if (response.types.length > 1) {
                            tip.push(tipos.ing.indexOf(response.types[0].type.name.toString()));
                            tip.push(tipos.ing.indexOf(response.types[1].type.name.toString()));
                            for (var i = 0; i < tipos.esp.length; i++) {
                                if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0) {
                                    inmune.push(tipos.esp[i]);
                                } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 2) {
                                    debil.push(tipos.esp[i]);
                                } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 4) {
                                    sdebil.push(tipos.esp[i]);
                                } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0.5) {
                                    res.push(tipos.esp[i]);
                                } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0.25) {
                                    sres.push(tipos.esp[i]);
                                } else {
                                    nor.push(tipos.esp[i]);
                                }
                            }
                        } else {
                            tip.push(tipos.ing.indexOf(response.types[0].type.name.toString()));
                            for (var i = 0; i < tipos.esp.length; i++) {
                                if (danelement[tip[0]][i] == 0) {
                                    inmune.push(tipos.esp[i]);
                                } else if (danelement[tip[0]][i] == 2) {
                                    debil.push(tipos.esp[i]);
                                } else if (danelement[tip[0]][i] == 4) {
                                    sdebil.push(tipos.esp[i]);
                                } else if (danelement[tip[0]][i] == 0.5) {
                                    res.push(tipos.esp[i]);
                                } else if (danelement[tip[0]][i] == 0.25) {
                                    sres.push(tipos.esp[i]);
                                } else {
                                    nor.push(tipos.esp[i]);
                                }
                            }
                        }

                        respuesta.data = "Pokemon: " + response.name + "\n";

                        if (tip.length > 1) {
                            respuesta.data += "Tipos: ";
                            respuesta.data += tipos.esp[tip[0]];
                            respuesta.data += "/";
                            respuesta.data += tipos.esp[tip[1]];
                        } else {
                            respuesta.data += "Tipo: ";
                            respuesta.data += tipos.esp[tip[0]];
                        }

                        respuesta.data += "\n\n";

                        respuesta.data += "Inmune: ";
                        if (inmune.length > 0) {
                            respuesta.data += inmune.join() + "\n";
                        } else {
                            respuesta.data += "\n";
                        }

                        respuesta.data += "\n";

                        respuesta.data += "Débil: ";
                        if (debil.length > 0) {
                            respuesta.data += debil.join() + "\n";
                        } else {
                            respuesta.data += "\n";
                        }

                        respuesta.data += "Muy débil: ";
                        if (sdebil.length > 0) {
                            respuesta.data += sdebil.join() + "\n";
                        } else {
                            respuesta.data += "\n";
                        }

                        respuesta.data += "\n";

                        respuesta.data += "Resistente: ";
                        if (res.length > 0) {
                            respuesta.data += res.join() + "\n";
                        } else {
                            respuesta.data += "\n";
                        }

                        respuesta.data += "\n";

                        respuesta.data += "Súper resistente: ";
                        if (sres.length > 0) {
                            respuesta.data += sres.join() + "\n";
                        } else {
                            respuesta.data += "\n";
                        }

                        respuesta.data += "\n";

                        respuesta.data += "Normal: ";
                        if (nor.length > 0) {
                            respuesta.data += nor.join() + "\n";
                        } else {
                            respuesta.data += "\n";
                        }

                        respuesta.code = 'ok';
                        resolve(respuesta);
                        console.log(respuesta);
                    })
                    .catch(function(error) {
                        console.log('There was an ERROR', error);
                        reject(respuesta);
                    });
            }, 2000);
        });
        return promise;
    },

    /*#############################################################################################################

                               Debilidades elementales por tipos

 ###############################################################################################################*/

    Tipos: function(tipossel) {
        var respuesta = { code: 'ko', data: '', img: '' };
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                var tip = [];
                var inmune = [];
                var debil = [];
                var sdebil = [];
                var res = [];
                var sres = [];
                var nor = [];
                if (tipossel.length > 1) {
                    tip.push(tipos.esp.indexOf(tipossel[0]));
                    tip.push(tipos.esp.indexOf(tipossel[1]));
                    for (var i = 0; i < tipos.esp.length; i++) {
                        if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0) {
                            inmune.push(tipos.esp[i]);
                        } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 2) {
                            debil.push(tipos.esp[i]);
                        } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 4) {
                            sdebil.push(tipos.esp[i]);
                        } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0.5) {
                            res.push(tipos.esp[i]);
                        } else if ((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0.25) {
                            sres.push(tipos.esp[i]);
                        } else {
                            nor.push(tipos.esp[i]);
                        }
                    }
                } else {
                    tip.push(tipos.esp.indexOf(tipossel[0]));
                    for (var i = 0; i < tipos.esp.length; i++) {
                        if (danelement[tip[0]][i] == 0) {
                            inmune.push(tipos.esp[i]);
                        } else if (danelement[tip[0]][i] == 2) {
                            debil.push(tipos.esp[i]);
                        } else if (danelement[tip[0]][i] == 4) {
                            sdebil.push(tipos.esp[i]);
                        } else if (danelement[tip[0]][i] == 0.5) {
                            res.push(tipos.esp[i]);
                        } else if (danelement[tip[0]][i] == 0.25) {
                            sres.push(tipos.esp[i]);
                        } else {
                            nor.push(tipos.esp[i]);
                        }
                    }
                }
                if (tip.length > 1) {
                    respuesta.data += "Tipos: ";
                    respuesta.data += tipos.esp[tip[0]];
                    respuesta.data += "/";
                    respuesta.data += tipos.esp[tip[1]];
                } else {
                    respuesta.data += "Tipo: ";
                    respuesta.data += tipos.esp[tip[0]];
                }

                respuesta.data += "\n\n";

                respuesta.data += "Inmune: ";
                if (inmune.length > 0) {
                    respuesta.data += inmune.join() + "\n";
                } else {
                    respuesta.data += "\n";
                }

                respuesta.data += "\n";

                respuesta.data += "Débil: ";
                if (debil.length > 0) {
                    respuesta.data += debil.join() + "\n";
                } else {
                    respuesta.data += "\n";
                }

                respuesta.data += "Muy débil: ";
                if (sdebil.length > 0) {
                    respuesta.data += sdebil.join() + "\n";
                } else {
                    respuesta.data += "\n";
                }

                respuesta.data += "\n";

                respuesta.data += "Resistente: ";
                if (res.length > 0) {
                    respuesta.data += res.join() + "\n";
                } else {
                    respuesta.data += "\n";
                }

                respuesta.data += "\n";

                respuesta.data += "Súper resistente: ";
                if (sres.length > 0) {
                    respuesta.data += sres.join() + "\n";
                } else {
                    respuesta.data += "\n";
                }

                respuesta.data += "\n";

                respuesta.data += "Normal: ";
                if (nor.length > 0) {
                    respuesta.data += nor.join() + "\n";
                } else {
                    respuesta.data += "\n";
                }

                respuesta.code = 'ok';
                resolve(respuesta);
                console.log(respuesta);


            }, 2000);
        });
        return promise;
    },

    /*#############################################################################################################

                               Ratios de captura

 ###############################################################################################################*/
    Pokeballs: function(numero) {
        var respuesta = { code: 'ko', data: '', img: '' };
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                respuesta.code = 'ok';
                respuesta.data += "Pokeball escogida: ";
                respuesta.data += pokeballs[numero][0];
                respuesta.data += "\n";
                respuesta.data += "Ratio de captura estandar: " + pokeballs[numero][1] + "\n";
                if (pokeballs[numero][3] != 'N') {
                    respuesta.data += "Efecto especial: " + pokeballs[numero][3] + " con ratio " + pokeballs[numero][4] + "\n";
                }
                respuesta.img = pokeballs[numero][2];
                resolve(respuesta);
                console.log(respuesta);
            }, 2000)
        });
        return promise;
    }


}

module.exports = Pokedex;