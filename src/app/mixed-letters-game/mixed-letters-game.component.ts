import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService } from "../services/categories.service";
import { Category } from "../../shared/model/category";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { ConfirmExitDialogComponent } from "../confirm-exit-dialog/confirm-exit-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ReturnAnswerDialogComponent } from "../return-answer-dialog/return-answer-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { GamesService } from "../services/games.service";


@Component({
  selector: "app-mixed-letters-game",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    ConfirmExitDialogComponent, // Ensure these components are standalone or imported correctly.
    ReturnAnswerDialogComponent
  ],
  templateUrl: "./mixed-letters-game.component.html",
  styleUrls: ["./mixed-letters-game.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersGameComponent implements OnInit {
  @Input() id = "";
  currentCategory?: Category;
  words: { origin: string; target: string }[] = [];
  currentWordIndex = 0;
  originWord: string | null = null;
  userGuess = "";
  coins = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  readonly confirmDialog = inject(MatDialog);
  readonly answerDialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly categoriesService = inject(CategoriesService);
  readonly gamesService = inject(GamesService);
  isCorrect = false;
  
  // Track word results
  wordResults: { hebrewWord: string; guessedWord: string; isCorrect: boolean }[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        const categoryId = +id; // Ensure that id is a number
        this.currentCategory = this.categoriesService.get(categoryId);

        if (this.currentCategory) {
          this.words = this.currentCategory.words;
          this.setNextWord();
        }
      }
    });
  }

  private setNextWord(): void {
    if (this.currentWordIndex < this.words.length) {
      const currentWord = this.words[this.currentWordIndex];
      this.originWord = this.scrambleWord(currentWord.origin);
    } else {
      this.navWithResultData();
    }
  }

  private scrambleWord(word: string): string {
    const scrambled = word.split("");
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }
    return scrambled.join("");
  }

  checkGuess(): void {
    const pointsPerWord = Math.floor(100 / this.words.length);
    const currentWord = this.words[this.currentWordIndex];
    
    if (
      this.originWord &&
      this.userGuess.toLowerCase() === currentWord.origin.toLowerCase()
    ) {
      this.isCorrect = true;
      this.coins += pointsPerWord;
      this.correctGuesses++;
    } else {
      this.isCorrect = false;
      this.incorrectGuesses++;
    }

    // Track the result
    this.wordResults.push({
      hebrewWord: currentWord.target,
      guessedWord: this.userGuess,
      isCorrect: this.isCorrect,
    });

    this.openAnswerDialog(this.isCorrect);
    this.userGuess = "";
    this.currentWordIndex++;
    this.setNextWord();
  }

  resetForm(): void {
    this.userGuess = "";
  }

  openConfirmDialog(): void {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }

  openAnswerDialog(isCorrect: boolean): void {
    const dialogData = {
      feedbackMessage: isCorrect ? "Correct!" : "Incorrect!",
      isCorrect: isCorrect,
    };

    this.answerDialog.open(ReturnAnswerDialogComponent, {
      data: dialogData,
      width: "80vw",
      maxWidth: "350px",
      height: "auto",
    });
  }

  exitGame(): void {
    this.openConfirmDialog();
  }

  get progress(): number {
    return (this.currentWordIndex / this.words.length) * 100;
  }

  navWithResultData(): void {
    // Store the game results in the GamesService
    this.gamesService.setResults(
      this.wordResults,
      this.correctGuesses,
      this.incorrectGuesses,
      this.coins
    );

    // Navigate to the results page without query params
    this.router.navigate(["/mixed-letters-game-results"]);
  }
}
