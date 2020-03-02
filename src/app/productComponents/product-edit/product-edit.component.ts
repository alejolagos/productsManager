import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from './../../model/product';
import { ProductsService } from './../../service/products.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class EditComponent implements OnInit {

  submitted = false;
  editForm: FormGroup;
  productData: Product[];
  ProductType: any = ['Comida Rapida', 'Bebida', 'Postre', 'Dulceria']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateProduct();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getProduct(id);
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // obtiene el valor de tipo del formulario
  updateType(e) {
    this.editForm.get('tipo').setValue(e, {
      onlySelf: true
    })
  }

  get myForm() {
    return this.editForm.controls;
  }

  //obtiene el producto por su id para mostrarlo
  getProduct(id) {
    this.productsService.getProduct(id).subscribe(data => {
      this.editForm.setValue({
        nombre: data['nombre'],
        tipo: data['tipo'],
        precio: data['precio'],
        cantidad: data['cantidad'],
      });
    });
  }

  //Actualiza los datos del producto
  updateProduct() {
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.productsService.updateProduct(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/list');
            console.log('Producto actualizado!!!')
          }, (error) => {
            console.log(error)
          })
    }
  }

}
