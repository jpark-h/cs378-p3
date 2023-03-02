export async function fetchGenData(generation) {
    const pokemonList = []
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
      const json = await response.json();
      const pokemonSpecies = json.pokemon_species
  
      for(const pokemon in pokemonSpecies) {
        const newPoke = {}
        const pokeTypes = []
        const pokeAbilities = []
  
        var name = pokemonSpecies[pokemon].name
        newPoke['name'] = name
  
        if(name === "deoxys") {
          name = "deoxys-normal"
        }
        const pokemonData = await fetchPokemonData(name)
  
        for(const typeNum in pokemonData.types) {
          const type = pokemonData.types[typeNum]
          pokeTypes.push(type.type.name)
        }
        newPoke['types'] = pokeTypes
  
        for(const abilityNum in pokemonData.abilities) {
          const ability = pokemonData.abilities[abilityNum]
          pokeAbilities.push(ability.ability.name)
        }
        newPoke['abilities'] = pokeAbilities
  
        newPoke['sprite'] = pokemonData.sprites.front_default
        
        pokemonList.push(newPoke)
  
      }
    } catch (err) {
      console.log("error")
    } finally {
        console.log("finished completely")
        return pokemonList 
    }
  }
  
  export async function fetchPokemonData(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const json = await response.json();
      return json

    } catch (err) {
      console.log("error")
    }
  }