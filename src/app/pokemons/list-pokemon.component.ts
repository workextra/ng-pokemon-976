import { Component, OnInit } from '@angular/core';
import { Pokemon } from "./pokemon";
import { Router } from '@angular/router';
import { PokemonsService } from './pokemon.service';

@Component({
    selector: 'app-list-pokemon',
    templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent implements OnInit {
    pokemons: Pokemon[];

    constructor(private router: Router, private _pokemonsService: PokemonsService) { }

    ngOnInit(): void {
        this._pokemonsService.getPokemons().subscribe(x => this.pokemons = x);
    }

    selectPokemon(pokemon: Pokemon): void {
        console.log('Vous avez selectionné ' + pokemon.name);
        let link = ['/pokemon', pokemon.id];
        this.router.navigate(link);
    }
}
