import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private current: number;
  private maxStep: number;

  constructor() { }

  setMaxStep(maxStep: number) {
    this.maxStep = maxStep;
  }

  getStep() {
    if (!this.current) {
      this.current = 1;
    }

    return this.current;
  }

  toNext() {
    if (this.current < this.maxStep) {
      this.current++;
    }
  }

  toPrev() {
    if (this.current > 1) {
      this.current--;
    }
  }
}
