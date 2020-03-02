import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../service/products.service';
// import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ListComponent implements OnInit {

  Product:any = [];

  constructor(private productsService: ProductsService) { 
    this.readProduct();
  }

  ngOnInit() {}

  readProduct(){
    this.productsService.getProducts().subscribe((data) => {
     this.Product = data;
    })    
  }

  removeProduct(product, index) {
    if(window.confirm('¿Seguro desea ELIMINAR el producto?')) {
        this.productsService.deleteProduct(product._id).subscribe((data) => {
          this.Product.splice(index, 1);
        }
      )
      console.log('Producto eliminado!!!')    
    }
  }

}
