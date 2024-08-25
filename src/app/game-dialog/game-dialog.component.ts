import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent implements OnInit {
  selectedCategory?: Category;
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      gameUrl: string;
      gameName: string;
    },
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.categoriesService.list();
  }

  letsPlay() {
    if (this.selectedCategory) {
      this.dialogRef.close(this.selectedCategory.id); 
    } else {
      alert('Please select a category.');
    }
  }
}
