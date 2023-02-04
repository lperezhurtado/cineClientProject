import { Pipe, PipeTransform } from '@angular/core';
import { IFecha } from '../model/shared-interface';

@Pipe({
  name: 'FormatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(oFecha: IFecha, modo: number = 0): any {
    if (oFecha) {
      if (modo == 0) {
          return oFecha.date.day + "/" + oFecha.date.month + "/" + oFecha.date.year + " " + oFecha.time.hour + ":" + oFecha.time.minute;
      } else if (modo == 1) {
          return oFecha.date.day + "/" + oFecha.date.month + "/" + oFecha.date.year;
      } else if (modo == 2) {
          return oFecha.time.hour + ":" + oFecha.time.minute;
      } else if (modo == 3) {
          return oFecha.date.day + "-" + oFecha.date.month + "-" + oFecha.date.year + " " + oFecha.time.hour + ":" + oFecha.time.minute;
      } else {
          return "";
      }
  } else {
      return "";
  }
  }

}



