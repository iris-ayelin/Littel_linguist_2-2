import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-match-words-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './match-words-game.component.html',
  styleUrl: './match-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchWordsComponent implements OnInit { 
  @Input()
  id = ""; 
  currentCategory?: Category;

  constructor(private CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.currentCategory = this.CategoriesService.get(parseInt(this.id))
}
}
