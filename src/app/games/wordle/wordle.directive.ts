import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[appWordleDirective]',
  standalone: true
})
export class WordleDirective implements AfterViewInit {
  @Output() emitEnter = new EventEmitter<KeyboardEvent>();

  private rowReference: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLDivElement>);

  ngAfterViewInit() {
    (this.rowReference.nativeElement?.firstElementChild?.firstChild as HTMLInputElement).focus();
  }

  @HostListener('window:keydown.enter', ['$event'])
  private handleEnter() {
    this.emitEnter.emit();
  }

  @HostListener('window:keydown', ['$event'])
  private keyDown(event: KeyboardEvent) {
    //   const second = <HTMLInputElement>this.rowReference.nativeElement?.children.item(1)?.firstChild;
    //   if (second) {
    //     second.focus();
    //   }
    //
  }
}
