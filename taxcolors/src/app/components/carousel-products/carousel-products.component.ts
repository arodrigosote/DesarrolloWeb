import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.css'
})
export class CarouselProductsComponent {

}
