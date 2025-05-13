import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs';

@Pipe({ name: 'timestampToDate' })
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: number): string {
    if (!timestamp) {
      return '';
    }
    return dayjs(timestamp * 1000).format('DD MMM, YYYY');
  }
}
