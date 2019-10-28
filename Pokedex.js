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