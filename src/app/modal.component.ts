import {Component} from '@angular/core';
// from this awesome Stack Overflow comment: https://stackoverflow.com/a/40144809
// then adapted to Tailwind CSS with this: https://codeburst.io/creating-a-modal-dialog-with-tailwind-css-42722c9aea4f
@Component({
  selector: 'app-modal',
  template: `
  <div (click)="onContainerClicked($event)"
    class="modal animated fadeIn fixed pin z-10000 overflow-auto bg-smoke-light flex flex-col justify-center" tabindex="-1"
      [ngStyle]="{'display': visible ? 'flex' : 'none'}">
    <div class="relative bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg border my-auto">
      <div class="modal-content">
        <div class="bg-grey-light text-lg text-blue-darkest p-3 font-medium">
          <ng-content select=".app-modal-header"></ng-content>
        </div>
        <div class="p-3 text-blue-darkest">
          <ng-content select=".app-modal-body"></ng-content>
        </div>
        <div class="px-3 pb-3">
          <ng-content select=".app-modal-footer"></ng-content>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ModalComponent {

  public visible = false;
  public visibleAnimate = false;

  constructor() {}

  public show(): void {
    this.visible = true;
  }

  public hide(): void {
    this.visible = false;
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
