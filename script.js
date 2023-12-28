
//inicializa a aplicação com o card 'escondido'
var card = document.querySelector('#card');
card.style.display = 'none';

//define o formulário como input
const query = document.getElementById("input");
const btn = document.querySelector('.btn');

//cores de cada tipo de pokemon
Typecolors = {
    normal: `rgb(158, 158, 109)`,
    fighting: "rgb(184, 42, 36)",
    flying: "rgb(158, 133, 238)",
    poison: `rgb(196, 97, 226)`,
    ground: "rgb(220, 184, 93)",
    rock: "rgb(175, 149, 49)",
    bug: "rgb(158, 175, 30)",
    ghost: "rgb(101, 78, 141)",
    steel: "rgb(175, 175, 202)",
    fire: "rgb(238, 116, 43)",
    water: "rgb(93, 133, 238)",
    grass: "rgb(32, 178, 44)",
    electric: " rgb(247, 201, 43)",
    psychic: "rgb(247, 77, 125)",
    ice: "rgb(141, 211, 211)",
    dragon: "rgb(100, 50, 247)",
    fairy: "rgb(238,173,180)",
  };

const types = Object.keys(Typecolors);
//função para fazer a requisição

//#region search funcion
function search(){
    //recuperando o valor do input e passando para a url da api (nome do pokémon/id da pokédex)
    let pokemon = query.value;
    
    let url = 'https://pokeapi.co/api/v2/pokemon/';

    let endpoint = url + pokemon;//cria uma string única que será usada na requisição
   
    //iniciando a requisição via fetch
    fetch(endpoint)
    .then(response =>{
        return response.json();
    })

    //recuperando os dados da API
    .then(data =>{
        console.log(data)
        var pokeName = data['name'];
        var UpperCase = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);

        var slugifyUpper = slugify(pokeName);
        document.querySelector('.name').innerHTML ='#' + data['id'] + ' ' + UpperCase;
        document.querySelector('.img-fluid').src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        document.querySelector('#xp').innerHTML = 'Experiência base: ' + data.base_experience;

        //#region iterar pelas habilidades do pokemon, criar novas linhas na lista e retornar os dados no front
        const movimentos = document.querySelector('#moves');
        movimentos.innerHTML = '';
        data.moves.forEach(move => {
            const listItem = document.createElement('li');
                            listItem.textContent = move.move.name;
                            movimentos.appendChild(listItem);
                            
        });
        //#endregion

        document.querySelector('#peso').innerHTML = 'Peso: ' + data.weight/10 + ' Kg';  
        document.querySelector('#altura').innerHTML = 'Altura: ' + data.height/10 + ' m';
        let pokeType = data.types.map(type => type.type.name);
        let type = types.find(type => pokeType.indexOf(type) > -1)
        let color = Typecolors[type];

        let getType = document.querySelector('.type');
        getType.innerHTML = pokeType;
        getType.style.backgroundColor = color;
        card.style.display = 'block';
    })
}

//chama a função e faz a requisição para a api
btn.onclick = search;
