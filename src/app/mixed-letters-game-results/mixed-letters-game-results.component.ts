import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { GamesService } from '../services/games.service'; // Import the service

interface WordResult {
  hebrewWord: string;
  guessedWord: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-mixed-letters-game-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './mixed-letters-game-results.component.html',
  styleUrls: ['./mixed-letters-game-results.component.css']
})
export class MixedLettersGameResultsComponent implements OnInit {
  correctCount: number = 0;
  incorrectCount: number = 0;
  coins: number = 0;
  displayedColumns: string[] = ['hebrewWord', 'guessedWord', 'status'];
  dataSource: WordResult[] = [];

  constructor(private gamesService: GamesService) {} // Use the existing service

  ngOnInit(): void {
    // Retrieve game results from GamesService
    this.correctCount = this.gamesService.getCorrectAnswers();
    this.incorrectCount = this.gamesService.getIncorrectAnswers();
    this.coins = this.gamesService.getCoins();
    this.dataSource = this.gamesService.getResults();
  }
}
