import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() visible = false;          
  @Input() itemId!: string | null;
  @Input() title!: string | null;
          

  @Output() confirmDelete = new EventEmitter<string>(); 
  @Output() cancel = new EventEmitter<void>();           

  onConfirm() {
    if(this.itemId)
    this.confirmDelete.emit(this.itemId);
  }

  onCancel() {
    this.cancel.emit();
  }
}


