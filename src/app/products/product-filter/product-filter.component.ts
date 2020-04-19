import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent implements OnInit {
  categories$: Observable<any[]>;
  // tslint:disable-next-line:no-input-rename
  @Input('category') category;
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
   }

  ngOnInit(): void {
  }
}
