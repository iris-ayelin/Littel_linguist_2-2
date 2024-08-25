import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-mixed-letters-game-results',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>mixed-letters-game-results works!</p>`,
    styleUrl: './mixed-letters-game-results.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersGameResultsComponent  implements OnInit{
    correctCount: number = 0;
  incorrectCount: number = 0;
  coins: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the query parameters and parse them
    this.route.queryParams.subscribe(params => {
      this.correctCount = +params['correct'] || 0;
      this.incorrectCount = +params['incorrect'] || 0;
      this.coins = +params['coins'] || 0;
    });
  }
}
