import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarModalComponent } from './delete-car-modal.component';

describe('DeleteCarModalComponent', () => {
  let component: DeleteCarModalComponent;
  let fixture: ComponentFixture<DeleteCarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCarModalComponent]
    });
    fixture = TestBed.createComponent(DeleteCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
