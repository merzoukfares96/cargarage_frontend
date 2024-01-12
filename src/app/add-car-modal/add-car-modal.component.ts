import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarService } from '../car.service';
import { Car } from '../car'
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css']
})
export class AddCarModalComponent {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  private readonly notifier: NotifierService;
  onCloseModal(): void {
    // ... other logic ...
    this.closeModal.emit();
  }
  constructor(private carService: CarService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  public onAddCar(addForm: NgForm): void {
    this.carService.addCar(addForm.value).subscribe(
      (response: Car) => {
        this.refresh.emit();
        this.onCloseModal();
        this.notifier.notify('success', 'Added successfully');
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
