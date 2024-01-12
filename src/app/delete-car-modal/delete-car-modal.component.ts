import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-delete-car-modal',
  templateUrl: './delete-car-modal.component.html',
  styleUrls: ['./delete-car-modal.component.css']
})
export class DeleteCarModalComponent {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() deleteCar: Car | null;
  private readonly notifier: NotifierService;
  constructor(private carService: CarService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  onCloseModal(): void {
    // ... other logic ...
    this.closeModal.emit();
  }
  public onDeleteCar(carId: number): void {
    this.carService.deleteCar(carId).subscribe(
      (response: void) => {
        this.refresh.emit();
        this.onCloseModal();
        this.notifier.notify('success', 'Deleted successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
