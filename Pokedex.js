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
            });
      
          },2000);
        });
        return promise;
      }
}

module.exports = Pokedex;