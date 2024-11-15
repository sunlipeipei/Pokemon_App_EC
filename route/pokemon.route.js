const { error } = require('console')
const express = require('express')
const router = express.Router()

const pokemonDB = [
    {
        id: 1,
        name: 'Pikachu',
        health: 100,
        level: 10,
    },
    {
        id: 2,
        name: 'Charizard',
        health: 200,
        level: 50,
    },
    {
        id: 3,
        name: 'Bulbasaur',
        health: 120,
        level: 20,
    },
    {
        id: 4,
        name: 'Ivysaur',
        health: 90,
        level: 8,
    }
]


router.get('/', function(req, res){
    console.log(req.query)
    // Get the name search query
    const nameSearchQuery = req.query.name;
    if(!nameSearchQuery){
        res.send(pokemonDB)
        return
    }
    const pokemonResponseList = []
    for(let i = 0; i<pokemonDB.length; i++){
        if(pokemonDB[i].name.includes(nameSearchQuery)){
            pokemonResponseList.push(pokemonDB[i])
        }
    }
    res.send(pokemonResponseList)
})

router.get('/:pokemonID', function(req, res){
    console.log(req.params);
    const pokemonResponseList = []
    for(let i = 0; i<pokemonDB.length; i++){
        if(pokemonDB[i].id.toString()===req.params.pokemonID){
            pokemonResponseList.push(pokemonDB[i])
        }
    }
    res.send(pokemonResponseList);
})

router.post('/', function(req, res){
    // const newPokemon = req.body;
    const health = req.body.health;
    const level = req.body.level;
    const name = req.body.name;
    if(!health || ! level || ! name){
        res.status(404)
        res.send("value missing")
    }

    res.send("new pokemon created")
    
    const id = pokemonDB.length +1;
    const newPokemon = {
        name: name,
        level: level,
        health: health,
        id: id
    }
    pokemonDB.push(newPokemon)
    console.log(pokemonDB)
})

router.put('/:pokemonID', function(req, res){
    console.log(req.params);
    // const health = req.body.health;
    // const level = req.body.level;
    // const name = req.body.name;
    for(let i = 0; i<pokemonDB.length; i++){
        if(pokemonDB[i].id.toString()===req.params.pokemonID){
            if(req.body.health){
                pokemonDB[i].health=req.body.health
            }
            if(req.body.level){
                pokemonDB[i].level=req.body.level
            }
            if(req.body.name){
                pokemonDB[i].name=req.body.name
            }
            updatedPokemon = pokemonDB[i]
            break
        }
    }
    console.log("updated pokemon is "+JSON.stringify(updatedPokemon))
    res.send(updatedPokemon);
})

router.delete('/:pokemonID', function(req, res){
    console.log(req.params);
    let deletedPokemon = null;
    for(let i = 0; i<pokemonDB.length; i++){
        if(pokemonDB[i].id.toString()===req.params.pokemonID){
            deletedPokemon = pokemonDB[i]
            pokemonDB.splice(i, 1)
            break
        }
    }
    if(deletedPokemon){
        console.log("deleted pokemon is "+JSON.stringify(deletedPokemon));
        console.log("current database: " + JSON.stringify(pokemonDB));
        res.send(deletedPokemon);
    } else {
        res.status(404).send({error: 'Pokemon with the id '+req.params.pokemonID+' not found'})
    }
})
// router.get('/favorate', function(req, res){
//     res.send('Insert fav pokemon here')
// })

module.exports = router;