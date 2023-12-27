const query = document.getElementById("input");
const btn = document.querySelector('.btn');

function search(){
    let pokemon = query.value;
    console.log();
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let endpoint = url + pokemon;
    console.log(endpoint);
    fetch(endpoint)
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        console.log(data)

        let name = data.name;
        
    })
}

btn.onclick = search;










