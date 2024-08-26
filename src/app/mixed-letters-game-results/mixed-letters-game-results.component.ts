import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mixed-letters-game-results',
  templateUrl: './mixed-letters-game-results.component.html',
  styleUrls: ['./mixed-letters-game-results.component.css']
})
export class MixedLettersGameResultsComponent implements OnInit {
  correctCount: number = 0;
  incorrectCount: number = 0;
  coins: number = 0;
  displayedColumns: string[] = ['hebrewWord', 'guessedWord', 'status'];
  dataSource: [] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.correctCount = +params['correctAnswers'];
      this.incorrectCount = +params['incorrectAnswers'];
      this.coins = +params['coins'];
    });
  }
}
