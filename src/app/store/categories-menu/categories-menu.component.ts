import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {
  categories$;
  @Input() category_id;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

}
