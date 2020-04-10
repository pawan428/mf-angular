import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorChanger]'
})
export class ColorChangerDirective {

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    console.log(elementRef.nativeElement)
    renderer.setStyle(elementRef.nativeElement, 'color', 'red')
  }

}
