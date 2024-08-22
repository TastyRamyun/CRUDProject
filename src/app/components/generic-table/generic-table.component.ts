import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { header: string, field: string }[] = [];

  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  edit(row: any) {
    this.editEvent.emit(row);
  }

  delete(row: any) {
    this.deleteEvent.emit(row);
  }
}
