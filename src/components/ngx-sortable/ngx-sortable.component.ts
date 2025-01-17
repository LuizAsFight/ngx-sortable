import {
  Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef
} from '@angular/core';

@Component({
  selector: 'ngx-sortable',
  templateUrl: './ngx-sortable.component.html',
  styleUrls: ['./ngx-sortable.component.scss']
})
export class NgxSortableComponent {
  @Input() public items: any[];
  @Input() public name: string;
  @Input() public listStyle: any = {
    height: '250px',
    width: '300px',
    dropZoneHeight: '50px'
  };
  @Output() public listSorted: EventEmitter<any> = new EventEmitter();
  @ContentChild(TemplateRef) public itemTemplate: TemplateRef<ElementRef>;
  public selectedItem: any;
  public draggedIndex: number = -1;
  public onDragOverIndex: number = -1;
  constructor() {
    console.log('Intializing...');
  }

  public selectItem(item: any) {
    this.selectedItem = item;
  }

  public moveUp() {
    const index = this.items.indexOf(this.selectedItem);
    if (index === 0) {
      return;
    }
    this.swapElements(index, index - 1);
    this.listSorted.emit(this.items);
  }

  public moveDown() {
    const index = this.items.indexOf(this.selectedItem);
    if (index === this.items.length - 1) {
      return;
    }
    this.swapElements(index, index + 1);
    this.listSorted.emit(this.items);
  }
  public onDrop($event: any, index: number) {
    // index is of the element on which the item is dropped
    this.handleDrop(index);
  }
  public allowDrop($event: any, index: number) {
    // index is of the item on which the item is currently hovered
    this.onDragOverIndex = index;
    $event.preventDefault();
  }
  public onDragStart($event: any, index: number) {
    this.draggedIndex = index;
  }
  public handleDrop(droppedIndex: number) {
    const draggedIndex = this.draggedIndex;
    const item = this.items[this.draggedIndex];
    this.items.splice(this.draggedIndex, 1);
    this.items.splice(droppedIndex, 0, item);
    this.draggedIndex = -1;
    this.onDragOverIndex = -1;
    this.listSorted.emit({ items: this.items, droppedIndex });
  }

  public swapElements(oldIndex: number, newIndex: number) {
    const temp = this.items[oldIndex];
    this.items[oldIndex] = this.items[newIndex];
    this.items[newIndex] = temp;
  }
}
