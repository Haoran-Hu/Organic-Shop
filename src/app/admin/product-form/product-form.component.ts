import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})


export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product = {};
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    // tslint:disable-next-line:prefer-const
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id); undefined
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  ngOnInit(): void {
  }

  save(product: Product) {
    if (this.id) { this.productService.update(this.id, product); } else { this.productService.create(product); }
    this.router.navigate(['/admin/products']);
    // console.log(product);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
