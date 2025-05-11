import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length === 0) {
      return '';
    }

    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }
}
