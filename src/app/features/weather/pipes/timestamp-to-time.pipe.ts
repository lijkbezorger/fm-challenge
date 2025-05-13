import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs';

@Pipe({ name: 'timestampToTime' })
export class TimestampToTimePipe implements PipeTransform {
  transform(timestamp: number): string {
    if (!timestamp) {
      return '';
    }
    return dayjs(timestamp * 1000).format('HH:mm');
  }
}
