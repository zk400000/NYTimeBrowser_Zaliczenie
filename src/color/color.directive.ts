import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[color]'
})
export class ColorDirective {

    @Input() color = 'yellow';
    
    constructor(public el: ElementRef) {
        // this.el.nativeElement.style.color = 'red';
    }

    ngOnInit() {
        //dopiero tutaj możemy skorzystać z Inputów
        this.el.nativeElement.style.color = this.color ? this.color : 'yellow';
    }
}