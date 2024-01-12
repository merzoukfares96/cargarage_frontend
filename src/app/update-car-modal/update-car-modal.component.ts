import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-update-car-modal',
  templateUrl: './update-car-modal.component.html',
  styleUrls: ['./update-car-modal.component.css']
})
export class UpdateCarModalComponent {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() editCar: Car | null;
  private readonly notifier: NotifierService;
  constructor(private carService: CarService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  onCloseModal(): void {
    // ... other logic ...
    this.closeModal.emit();
  }
  public onUpdateCar(car: Car): void {
    this.carService.updateCar(car).subscribe(
      (response: Car) => {
        this.refresh.emit();
        this.onCloseModal();
        this.notifier.notify('success', 'Changed successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
