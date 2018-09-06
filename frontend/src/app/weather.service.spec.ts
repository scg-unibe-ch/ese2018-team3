import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {AppModule} from './app.module';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
