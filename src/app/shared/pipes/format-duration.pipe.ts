import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(allMinutes: number): string {
    const hours: number = Math.floor(allMinutes / 60);
    const minutes: number = allMinutes % 60;
    let formattedDuration: string = '';

    if (hours) {
      formattedDuration += `${hours}h `;
    }

    if (minutes) {
      formattedDuration += `${minutes}min`;
    }

    return formattedDuration;
  }
}
