import { Component, Input } from '@angular/core';
import { Car } from '../car';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() cars: Car[] | null;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}