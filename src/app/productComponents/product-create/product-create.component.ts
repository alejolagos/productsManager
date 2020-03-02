import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './../../service/products.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class CreateComponent implements OnInit {

  submitted = false;
  productForm: FormGroup;
  ProductType:any = ['Comida Rapida', 'Bebida', 'Postre', 'Dulceria']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private productsService: ProductsService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    //formularios y validaciones
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }  
  get myForm(){
    return this.productForm.controls;
  }

  // elige el tipo de producto en el form 
  updateType(e){
    this.productForm.get('tipo').setValue(e, {
      onlySelf: true
    })
  }

  //si el formulario es valido crea el nuevo producto 
  onSubmit() {
    this.submitted = true;
    if (!this.productForm.valid)
    {
      return false;
    } else 
    {
      this.productsService.createProduct(this.productForm.value).subscribe(
        (res) => {
          console.log('Producto creado!!!')
          this.ngZone.run(() => this.router.navigateByUrl('/list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
