var P = require('pokedex-promise-v2');
var Pkd = new P();


const tipos = {
  esp: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador'],
  ing: ['steel', 'water', 'bug', 'dragon', 'electric', 'ghost', 'fire', 'fairy', 'ice', 'fighting', 'normal', 'grass', 'psychic', 'rock', 'dark', 'ground', 'poison', 'flying']
};

const danelement = [
              /* Ac   Ag   Bi   Dr   El   Fa   Fu   Ha   Hi   Lu   No   Pl   Ps   Ro   Si   Ti   Ve   Vo*/
  /*Acero*/    [ 0.5,   1, 0.5, 0.5,   1,   1,   2, 0.5, 0.5,   2, 0.5, 0.5, 0.5, 0.5,   1,   2,   0, 0.5],
  /*Agua*/     [ 0.5, 0.5,   1,   1,   2,   1, 0.5,   1, 0.5,   1,   1,   2,   1,   1,   1,   1,   1,   1],
  /*Bicho*/    [   1,   1,   1,   1,   1,   1,   2,   1,   1, 0.5,   1, 0.5,   1,   2,   1, 0.5,   1,   2],
  /*Dragon*/   [   1, 0.5,   1,   2, 0.5,   1, 0.5,   2,   2,   1,   1, 0.5,   1,   1,   1,   1,   1,   1],
  /*Electrico*/[ 0.5,   1,   1,   1, 0.5,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5],
  /*Fantasma*/ [   1,   1, 0.5,   1,   1,   2,   1,   1,   1,   0,   0,   1,   1,   1,   2,   1, 0.5,   1],
  /*Fuego*/    [ 0.5,   2, 0.5,   1,   1,   1, 0.5, 0.5, 0.5,   1,   1, 0.5,   1,   2,   0,   2,   1,   1],
  /*Hada*/     [   2,   1, 0.5,   0,   1,   1,   1,   1,   1, 0.5,   1,   1,   1,   1, 0.5,   1,   2,   1],
  /*Hielo*/    [   2,   1,   1,   1,   1,   1,   2,   1, 0.5,   2,   1,   1,   1,   2,   1,   1,   1,   1],
  /*Lucha*/    [   1,   1, 0.5,   1,   1,   1,   1,   2,   1,   1,   1,   1,   2, 0.5, 0.5,   1,   1,   2],
  /*Normal*/   [   1,   1,   1,   1,   1,   0,   1,   1,   1,   2,   1,   1,   1,   1,   1,   1,   1,   1],
  /*Planta*/   [   1, 0.5,   2,   1, 0.5,   1,   2,   1,   2,   1,   1, 0.5,   1,   1,   1, 0.5,   2,   2],
  /*Psiquico*/ [   1,   1,   2,   1,   1,   2,   1,   1,   1, 0.5,   1,   1, 0.5,   1,   2,   1,   1,   1],
  /*Roca*/     [   2,   2,   1,   1,   1,   1, 0.5,   1,   1,   2, 0.5,   2,   1,   1,   1,   2, 0.5, 0.5],
  /*Siniestro*/[   1,   1,   2,   1,   1, 0.5,   1,   2,   1,   2,   1,   1,   0,   1, 0.5,   1,   1,   1],
  /*Tierra*/   [   1,   2,   1,   1,   0,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1, 0.5,   1],
  /*Veneno*/   [   1,   1, 0.5,   1,   1,   1,   1, 0.5,   1, 0.5,   1, 0.5,   2,   1,   1,   2, 0.5,   1],
  /*Volador*/  [   1,   1, 0.5,   1,   2,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1,   0,   1,   1]
]


var Pokedex = {
  BuscaPokemon: function (pokemon) {
    var respuesta = { code: 'ko', data: '', img: 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg' };
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {

        Pkd.getPokemonByName(pokemon).then(function (response) {

          respuesta.data = "Nombre: " + response.forms[0].name +
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

          if(response.sprites.front_default != null){
            respuesta.img = response.sprites.front_default.toString();
          }
          

          respuesta.code = 'ok';
          resolve(respuesta);
          console.log(respuesta);
        })
          .catch(function (error) {
            console.log('There was an ERROR', error);
            reject(error);
          });

      }, 2000);
    });
    return promise;
  },




  Random: function () {
    var respuesta = { code: 'ko', data: '', img: 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg' };
    var pokemon = Math.round(Math.random() * (809 - 1) + 1);
    console.log("Numero : " + pokemon);
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {

        Pkd.getPokemonByName(pokemon).then(function (response) {

          respuesta.data = "Nombre: " + response.forms[0].name +
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

          if(response.sprites.front_default != null){
            respuesta.img = response.sprites.front_default.toString();
          }

          respuesta.code = 'ok';
          resolve(respuesta);
          console.log(respuesta);
        })
          .catch(function (error) {
            console.log('There was an ERROR', error);
            reject(error);
          });

      }, 2000);
    });
    return promise;
  },


  Stats: function (pokemon) {
    var respuesta = { code: 'ko', data: '', img: 'http://pm1.narvii.com/6401/61c75e3c02ebf7178cff4c6bf96168096e6ffaaf_00.jpg' };
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {

        Pkd.getPokemonByName(pokemon).then(function (response) {

          if(response.sprites.front_default != null){
            respuesta.img = response.sprites.front_default.toString();
          }
          
          respuesta.data = "Nombre: " + response.forms[0].name +
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
          var peso = response.weight / 10;
          var altura = response.height / 10;
          respuesta.data += "\nPeso: " + peso.toString() + "kg";
          respuesta.data += "\nAltura: " + altura.toString() + "m";

          respuesta.data += "\nExperiencia base: " + response.base_experience.toString() + "\n";

          respuesta.data += "\nHabilidades: \n\n";

          Pokedex.Habilidad(response.abilities[0].ability.name).then(function (res) {
            respuesta.data += res.data + "\n\n";
            if (response.abilities.length > 1) {
              Pokedex.Habilidad(response.abilities[1].ability.name).then(function (re) {
                respuesta.data += re.data + "\n\n";

                if (response.abilities.length > 2) {
                  Pokedex.Habilidad(response.abilities[2].ability.name).then(function (r) {
                    respuesta.data += r.data + "\n\n";

                    respuesta.data += "\n";

                    respuesta.data += "Estadísticas base: \n" +
                      "Hp: " + response.stats[5].base_stat + "\n" +
                      "Ataque: " + response.stats[4].base_stat + "\n" +
                      "Defensa: " + response.stats[3].base_stat + "\n" +
                      "Att. Especial: " + response.stats[2].base_stat + "\n" +
                      "Deff. Especial: " + response.stats[1].base_stat + "\n" +
                      "Velocidad: " + response.stats[0].base_stat + "\n";


                    respuesta.code = 'ok';
                    resolve(respuesta);
                    console.log(respuesta);
                  }).catch(function (error) {
                    reject(error);
                    console.log('There was an ERROR', error);
                  });
                } else {
                  respuesta.data += "\n";

                  respuesta.data += "Estadísticas base: \n" +
                    "Hp: " + response.stats[5].base_stat + "\n" +
                    "Ataque: " + response.stats[4].base_stat + "\n" +
                    "Defensa: " + response.stats[3].base_stat + "\n" +
                    "Att. Especial: " + response.stats[2].base_stat + "\n" +
                    "Deff. Especial: " + response.stats[1].base_stat + "\n" +
                    "Velocidad: " + response.stats[0].base_stat + "\n";

                  respuesta.code = 'ok';
                  resolve(respuesta);
                  console.log(respuesta);
                }
              }).catch(function (error) {
                reject(error);
                console.log('There was an ERROR', error);
              });
            } else {
              respuesta.data += "\n";

              respuesta.data += "Estadísticas base: \n" +
                "Hp: " + response.stats[5].base_stat + "\n" +
                "Ataque: " + response.stats[4].base_stat + "\n" +
                "Defensa: " + response.stats[3].base_stat + "\n" +
                "Att. Especial: " + response.stats[2].base_stat + "\n" +
                "Deff. Especial: " + response.stats[1].base_stat + "\n" +
                "Velocidad: " + response.stats[0].base_stat + "\n";


              respuesta.code = 'ok';
              resolve(respuesta);
              console.log(respuesta);
            }
          }).catch(function (error) {
            reject(error);
            console.log('There was an ERROR', error);
          });
        }).catch(function (error) {
          reject(error);
          console.log('There was an ERROR', error);
        });

      }, 2000);
    });
    return promise;
  },


  Habilidad: function (habilidad) {
    var respuesta = { code: 'ko', data: '', img: '' };
    var busca = "api/v2/ability/" + habilidad.toString();
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        Pkd.resource(busca).then(function (response) {
          respuesta.data = "Habilidad: " + response.names[4].name + "\n";
          respuesta.data += "Efecto: " + response.flavor_text_entries[4].flavor_text.replace("\n", " ") + '\n';
          respuesta.data += "Nombre inglés: " + response.name;
          respuesta.code = "ok";
          console.log(respuesta);
          resolve(respuesta);
        })
          .catch(function (error) {
            console.log('There was an ERROR', error);
            reject(error);
          });

      }, 2000);
    });
    return promise;
  },

  Cria: function (pokemon) {
    var respuesta = { code: 'ko', data: '', img: '' };
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {

      }, 2000);
    });
    return promise;
  },


  Debilidades: function (pokemon) {
    var respuesta = { code: 'ko', data: '', img: '' };
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        Pkd.getPokemonByName(pokemon).then(function (response) {
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
            for(var i = 0; i < tipos.esp.length; i++)
            {
              if((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0){
                inmune.push(tipos.esp[i]);
              }else if((danelement[tip[0]][i] * danelement[tip[1]][i]) == 2){
                debil.push(tipos.esp[i]);
              }else if((danelement[tip[0]][i] * danelement[tip[1]][i]) == 4){
                sdebil.push(tipos.esp[i]);
              }else if((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0.5){
                res.push(tipos.esp[i]);
              }else if((danelement[tip[0]][i] * danelement[tip[1]][i]) == 0.25){
                sres.push(tipos.esp[i]);
              }else{
                nor.push(tipos.esp[i]);
              }
            }
          } else {
            tip.push(tipos.ing.indexOf(response.types[0].type.name.toString()));
            for(var i = 0; i < tipos.esp.length; i++){
              if(danelement[tip[0]][i] == 0){
                inmune.push(tipos.esp[i]);
              }else if(danelement[tip[0]][i] == 2){
                debil.push(tipos.esp[i]);
              }else if(danelement[tip[0]][i] == 4){
                sdebil.push(tipos.esp[i]);
              }else if(danelement[tip[0]][i] == 0.5){
                res.push(tipos.esp[i]);
              }else if(danelement[tip[0]][i] == 0.25){
                sres.push(tipos.esp[i]);
              }else{
                nor.push(tipos.esp[i]);
              }
            }
          }

          respuesta.data = "Pokemon: " +response.forms[0].name +"\n";
          
          if (tip.length > 1) {
            respuesta.data += "Tipos: ";
            respuesta.data += tipos.esp[tip[0]];
            respuesta.data += "/";
            respuesta.data += tipos.esp[tip[1]];
          } else {
            respuesta.data += "Tipo: ";
            respuesta.data += tipos.esp[tip[0]];
          }

          respuesta.data += "\n";

          respuesta.data += "Inmune: ";
          if(inmune.length > 0){
            respuesta.data += inmune.join() + "\n";
          }else{
            respuesta.data += "\n";
          }

          respuesta.data += "Débil: ";
          if(debil.length > 0){
            respuesta.data += debil.join() + "\n";
          }else{
            respuesta.data += "\n";
          }

          respuesta.data += "Muy débil: ";
          if(sdebil.length > 0){
            respuesta.data += sdebil.join() + "\n";
          }else{
            respuesta.data += "\n";
          }

          respuesta.data += "Resistente: ";
          if(res.length > 0){
            respuesta.data += res.join() + "\n";
          }else{
            respuesta.data += "\n";
          }

          respuesta.data += "Súper resistente: ";
          if(sres.length > 0){
            respuesta.data += sres.join() + "\n";
          }else{
            respuesta.data += "\n";
          }

          respuesta.data += "Normal: ";
          if(nor.length > 0){
            respuesta.data += nor.join() + "\n";
          }else{
            respuesta.data += "\n";
          }

          respuesta.code = 'ok';
          resolve(respuesta);
          console.log(respuesta);
        })
          .catch(function (error) {
            console.log('There was an ERROR', error);
            reject(error);
          });
      }, 2000);
    });
    return promise;
  }

}

module.exports = Pokedex;