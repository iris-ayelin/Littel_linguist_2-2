import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/games';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private games: GameProfile[] = [
    new GameProfile(
      '1',
      'Mixed letters',
      'Create a word from the preview mixed letters',
      '/mixed-letters-game'
    ),
    new GameProfile(
      '2',
      'Match words',
      'Compare and match between the preview words',
      '/match-words-game'
    ),

    new GameProfile(
      '3',
      'Sorted words',
      'Arrange the jumbled words in the correct order to make',
      '/sorted-words-game'
    ),


  ];

  constructor() {}

  public getGames(): GameProfile[] {
    return this.games;
  }
}
