import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameProfile } from '../../shared/model/games';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  allGames: GameProfile[] = [];
  selectedGame!: GameProfile;

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(game: GameProfile): void {
    this.selectedGame = game;

    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '250px',
      data: {
        gameUrl: this.selectedGame.gameUrl,
        gameName: this.selectedGame.gameName,
      },
    });

    dialogRef.afterClosed().subscribe((selectedCategoryId: number | undefined) => {
      if (selectedCategoryId !== undefined) {
        console.log('Selected Game:', this.selectedGame.gameName);
        console.log('Selected Category ID:', selectedCategoryId);
        this.router.navigate([`${this.selectedGame.gameUrl}`, selectedCategoryId]);
      }
    });
  }

  ngOnInit(): void {
    this.allGames = this.gamesService.getGames();
  }
}
