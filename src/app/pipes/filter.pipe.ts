import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {

    transform(value: any, input: string) {
        if (input) {
            input = input.toString().toLowerCase();
            return value.filter(function (product: any) {
              //console.log('Obj_Producto:', product);
                return product.tipo.toString().toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
}