import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[appWordleRowDirective]',
  standalone: true
})
export class WordleRowDirective implements AfterViewInit {
  @Output() emitEnter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  private currentFocusedElement!: HTMLDivElement;

  private rowReference: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLDivElement>);

  // This is called once, after the container that the directive is declared on is rendered.
  public ngAfterViewInit() {
    this.currentFocusedElement = this.rowReference.nativeElement?.firstElementChild as HTMLDivElement;
    (this.currentFocusedElement?.firstChild as HTMLInputElement).focus();
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleEnter() {
    this.emitEnter.emit();
  }

  @HostListener('window:keydown.backspace', ['$event'])
  handleBackspace() {
    this.focusPreviousElement();
  }

  @HostListener('window:keydown.arrowRight', ['$event'])
  handleArrowRight() {
    this.focusNextElement();
  }

  @HostListener('window:keydown.arrowLeft', ['$event'])
  handleArrowLeft() {
    this.focusPreviousElement();
  }

  @HostListener('click', ['$event.target'])
  handleInputClick(elementClicked: HTMLInputElement) {
    this.currentFocusedElement = elementClicked.parentElement as HTMLDivElement;
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.code.startsWith('Key')) {
      this.focusNextElement();
    }
  }

  private focusNextElement() {
    // TODO: Fix this
    setTimeout(() => {
      if (this.currentFocusedElement.nextElementSibling) {
        (this.currentFocusedElement?.nextElementSibling?.firstChild as HTMLInputElement).focus();
        this.currentFocusedElement = this.currentFocusedElement?.nextElementSibling as HTMLDivElement;
        (this.currentFocusedElement.firstChild as HTMLInputElement).select();
      }
    })
  }

  private focusPreviousElement() {
    // TODO: Fix this
    setTimeout(() => {
      if (this.currentFocusedElement.previousElementSibling) {
        (this.currentFocusedElement?.previousElementSibling?.firstChild as HTMLInputElement).focus();
        this.currentFocusedElement = this.currentFocusedElement?.previousElementSibling as HTMLDivElement;
        (this.currentFocusedElement.firstChild as HTMLInputElement).select();
      }
    })
  }
}
