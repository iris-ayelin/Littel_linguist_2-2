import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-mixed-letters-game-results',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: "./mixed-letters-game-results.component.html",
    styleUrl: "./mixed-letters-game-results.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersGameResultsComponent implements OnInit{
  correctCount: number = 0;
  incorrectCount: number = 0;
  coins: number = 0;
  receivedResultData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // // Get the query parameters and parse them
    // this.route.queryParams.subscribe(params => {
    //   // this.correctCount = +params['correct'] || 0;
    //   // this.incorrectCount = +params['incorrect'] || 0;
    //   // this.coins = +params['coins'] || 0;
    // });
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.receivedResultData = navigation.extras.state['resultData'];
      console.log(this.receivedResultData); // Should log the resultData object
    } else {
      console.log('No state data found.');
    }
  }
}
