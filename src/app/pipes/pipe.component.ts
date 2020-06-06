import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bigletter'
})
export class BigWordLetter implements PipeTransform {
    public transform(value: string): string {
        return value
            //.charAt(0).toUpperCase() + value.slice(1) ;
            .split(' ')
            .map( word => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(' ');
    }
}