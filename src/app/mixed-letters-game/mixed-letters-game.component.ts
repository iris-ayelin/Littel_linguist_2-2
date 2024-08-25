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
import { MatIconModule } from "@angular/material/icon"; // Import MatIconModule
import { FormsModule } from "@angular/forms";
import { ConfirmExitDialogComponent } from "../confirm-exit-dialog/confirm-exit-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ReturnAnswerDialogComponent } from "../return-answer-dialog/return-answer-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

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
    ConfirmExitDialogComponent,
    MatButtonModule,
    MatDividerModule
  ],

  templateUrl: "./mixed-letters-game.component.html",
  styleUrls: ["./mixed-letters-game.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersGameComponent implements OnInit {
  @Input() id = "";
  currentCategory?: Category;
  words: { origin: string; target: string }[] = [];
  currentWordIndex: number = 0;
  originWord: string | null = null;
  userGuess = "";
  feedback = "";
  feedbackClass = "";
  coins = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  readonly confirmDialog = inject(MatDialog);
  readonly answerDialog = inject(MatDialog);
  isCorrect: Boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        const categoryId = +id;
        this.currentCategory = this.categoriesService.get(categoryId);

        if (this.currentCategory) {
          this.words = this.currentCategory.words;
          this.setNextWord();
        }
      }
    });
  }

  //Sets the next scrambled word
  private setNextWord(): void {
    if (this.currentWordIndex < this.words.length) {
      const currentWord = this.words[this.currentWordIndex];
      this.originWord = this.scrambleWord(currentWord.origin);
    } else {
      
      this.feedbackClass = "correct-feedback";
      this.originWord = null;
    }
  }

  //Randomly shuffles the letters of a given word
  private scrambleWord(word: string): string {
    const scrambled = word.split("");
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }
    return scrambled.join("");
  }


  //Checks the user's guess, provides feedback, updates scores, and loads the next word
  checkGuess(): void {
    console.log('succeed')
    const pointsPerWord = Math.floor(100 / this.words.length);
    
    if (
      this.originWord &&
      this.userGuess.toLowerCase() ===
        this.words[this.currentWordIndex].origin.toLowerCase()
    ) {
      console.log('succeed')
      this.isCorrect = true
      
      this.openAnswerDialog(this.isCorrect)
      this.coins += pointsPerWord;
      this.coins++;
      this.correctGuesses++;
    } else {
      console.log('failed')
      this.isCorrect = false
      this.openAnswerDialog(this.isCorrect)
      this.incorrectGuesses++;
    }

    this.userGuess = "";
    this.currentWordIndex++;
    this.setNextWord();
  }

  //Resets the user input, feedback, and feedback style
  resetForm(): void {
    this.userGuess = "";
    this.feedback = "";
    this.feedbackClass = "";
  }

  //Opens a dialog to confirm exiting the game
  openConfirmDialog() {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }

  openAnswerDialog(isCorret: Boolean): void {
    const dialogData = {
      feedbackMessage: this.isCorrect ? "Correct! Guess the next word" : "Try again!",
      isCorrect: this.isCorrect
    };

    this.answerDialog.open(ReturnAnswerDialogComponent, {
      data: dialogData,
      width: '80vw',
      maxWidth: '350px',
      height: 'auto' 
    });
  }

  //Initiates the confirm dialog to potentially exit the game
  exitGame(): void {
    this.openConfirmDialog()
  }

  //Computes and returns the progress percentage based on words guessed
  get progress(): number {
    return (this.currentWordIndex / this.words.length) * 100;
  }
}
