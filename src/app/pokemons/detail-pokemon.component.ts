import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonsService } from './pokemon.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {
    pokemon: Pokemon = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _pokemonsService: PokemonsService) { }

    ngOnInit(): void {
        let id = +this.route.snapshot.paramMap.get('id');
        this._pokemonsService.getPokemon(id).subscribe(x => this.pokemon = x);
    }

    goBack(): void {
        this.router.navigate(['/pokemon/all']);
    }

    goEdit(pokemon: Pokemon): void {
        let link = ['/pokemon/edit', pokemon.id];
        this.router.navigate(link);
    }

    deletePokemon(pokemon: Pokemon) : void {
        this._pokemonsService.deletePokemon(pokemon).subscribe(x => this.goBack());
    }
}