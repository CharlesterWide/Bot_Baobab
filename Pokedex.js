var P = require('pokedex-promise-v2');
var Pkd = new P();


const tipos = {
    esp : ['Acero','Agua','Bicho','Dragón','Eléctrico','Fantasma','Fuego','Hada','Hielo','Lucha','Normal','Planta','Psíquico','Roca','Siniestro','Tierra','Veneno','Volador'],
    ing : ['steel','water','bug','dragon','electric','ghost','fire','fairy','ice','fighting','normal','grass','psychic','rock','dark','ground','poison','flying']
  };

var Pokedex = {
     BuscaPokemon : function(pokemon){
        var respuesta = {code : 'ko',data : '', img : ''};
        var promise = new Promise(function(resolve,reject){
          setTimeout(function(){
            
            Pkd.getPokemonByName(pokemon).then(function(response) {
      
              respuesta.data = "Nombre: " + response.forms[0].name +
              "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";
        
              if(response.types.length > 1){
                respuesta.data += "Tipos: ";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                respuesta.data += "/";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
              }else{
                respuesta.data += "Tipo: ";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
              }
              
              respuesta.img = response.sprites.front_default.toString();
      
              respuesta.code = 'ok';
              resolve(respuesta);
              console.log(respuesta);
            })
            .catch(function(error) { 
              console.log('There was an ERROR',error);
              reject(error);
            });
      
          },2000);
        });
        return promise;
      },
      
      
      
      
      Random : function(){
        var respuesta = {code : 'ko',data : '', img : ''};
        var pokemon =Math.round(Math.random()*(809 - 1)+1);
        console.log("Numero : " + pokemon);
        var promise = new Promise(function(resolve,reject){
          setTimeout(function(){
            
            Pkd.getPokemonByName(pokemon).then(function(response) {
      
              respuesta.data = "Nombre: " + response.forms[0].name +
              "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";
        
              if(response.types.length > 1){
                respuesta.data += "Tipos: ";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                respuesta.data += "/";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
              }else{
                respuesta.data += "Tipo: ";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
              }
              
              respuesta.img = response.sprites.front_default.toString();
      
              respuesta.code = 'ok';
              resolve(respuesta);
              console.log(respuesta);
            })
            .catch(function(error) { 
              console.log('There was an ERROR',error);
              reject(error);
            });
      
          },2000);
        });
        return promise;
      },


      Stats : function(pokemon){
        var respuesta = {code : 'ko',data : '', img : ''};
        var promise = new Promise(function(resolve,reject){
          setTimeout(function(){
            
            Pkd.getPokemonByName(pokemon).then(function(response) {
      
              respuesta.data = "Nombre: " + response.forms[0].name +
              "\n" + "Índice en la Pokedex: " + response.id.toString() + "\n";
        
              if(response.types.length > 1){
                respuesta.data += "Tipos: ";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
                respuesta.data += "/";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[1].type.name.toString())];
              }else{
                respuesta.data += "Tipo: ";
                respuesta.data += tipos.esp[tipos.ing.indexOf(response.types[0].type.name.toString())];
              }
              var peso = response.weight/10;
              var altura = response.height/10;
              respuesta.data += "\nPeso: " + peso.toString() + "kg";
              respuesta.data += "\nAltura: " + altura.toString() + "m";

              respuesta.data += "\nExperiencia base: " + response.base_experience.toString() + "\n";
              
              
              respuesta.data += "\nHabilidades: \n";
              for(var i =0;i < response.abilities.length; i++){
                respuesta.data += response.abilities[i].ability.name + "\n";
              }
              respuesta.data += "Los nombres de las habilidades están en ingles, puedes ver su efecto y nombre en español con el comando /Habilidad y el nombre en inglés o su número\n";

              respuesta.data += "\n";

              respuesta.data += "Estadísticas base: \n" +
              "Hp: " + response.stats[5].base_stat.toString() + "\n" +
              "Ataque: " + response.stats[4].base_stat.toString() + "\n" +
              "Defensa: " + response.stats[3].base_stat.toString() + "\n" +
              "Att. Especial: " + response.stats[2].base_stat.toString() + "\n" +
              "Deff. Especial: " + response.stats[1].base_stat.toString() + "\n" +
              "Velocidad: " + response.stats[0].base_stat.toString() + "\n";
              
              respuesta.img = response.sprites.front_default.toString();
      
              respuesta.code = 'ok';
              resolve(respuesta);
              console.log(respuesta);
            })
            .catch(function(error) {
              reject(error); 
              console.log('There was an ERROR',error);
            });
      
          },2000);
        });
        return promise;
      },


      Habilidad : function(habilidad){
        var respuesta = {code : 'ko',data : '', img : ''};
        var busca = "api/v2/ability/" + habilidad.toString();
        var promise = new Promise(function(resolve,reject){
          setTimeout(function(){
            Pkd.resource(busca).then(function(response) {
              respuesta.data = "Habilidad: " + response.names[4].name +"\n";
              respuesta.data += "Efecto: " + response.flavor_text_entries[4].flavor_text + '\n';
              respuesta.data += "Nombre inglés: " + response.name;
              respuesta.code = "ok";
              resolve(respuesta);
            })
            .catch(function(error) { 
              console.log('There was an ERROR',error);
              reject(error);
            });
      
          },2000);
        });
        return promise;
      }

}

module.exports = Pokedex;