import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class PokemonsService {

    private pokemonsUrl = 'api/pokemons';

    constructor(private http: HttpClient) { }

    // Retourne tous les pokémons
    getPokemons(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(this.pokemonsUrl);
    }

    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable<Pokemon> {
        const url = `${this.pokemonsUrl}/${id}`;
        return this.http.get<Pokemon>(url);
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }

        return this.http.put<Pokemon>(this.pokemonsUrl, pokemon, httpOptions);
    }

    deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const url = `${this.pokemonsUrl}/${pokemon.id}`;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return this.http.delete<Pokemon>(url, httpOptions);
    }

    searchPokemons(term: string): Observable<Pokemon[]> {
		if (!term.trim()) {
			return of([]);
		}

		return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`);
	}

    // Retourne la liste des types des Pokémons
    getPokemonTypes(): Array<string> {
        return [
            'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
            'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
        ];
    }
}