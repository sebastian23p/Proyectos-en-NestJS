import { Injectable } from '@nestjs/common';

@Injectable()
export class PicoyplacaService {
  public puedeCircular(placa: string, fecha: string, hora: string): boolean {
    const getUltimoDigito = (placa: string): number => {
      return parseInt(placa.slice(-1));
    };

    const getDiaDeSemana = (fecha: Date): number => {
      const dia = fecha.getDay();
      return dia === 0 ? 7 : dia; 
    };

    const tiempoNoCircular = (hora: string): boolean => {
      const [horas, min] = hora.split(':').map(Number);
      const horaEnMin = horas * 60 + min;
      const resultado = (horaEnMin >= 360 && horaEnMin <= 570) || // 06:00 to 09:30
                        (horaEnMin >= 960 && horaEnMin <= 1260); // 16:00 to 21:00
      return resultado;
    };

    const fechaObj = new Date(fecha);
    const UltimoDigito = getUltimoDigito(placa);
    const DiaDeSemana = getDiaDeSemana(fechaObj);

    //console.log(`UltimoDigito: ${UltimoDigito}, DiaDeSemana: ${DiaDeSemana}`);

    const nocircula: { [key: number ]: number[] } = {
      0: [1, 2], // lunes
      1: [3, 4], // martes
      2: [5, 6], // miércoles
      3: [7, 8], // jueves
      4: [9, 0], // viernes
      5: [], // sábado
      6: [] // domingo
    };

    if (DiaDeSemana > 5) {
      // Domingo y Sábado, sin restricciones
      return true;
    }

    const estaRestringido = nocircula[DiaDeSemana].includes(UltimoDigito);
    const tiempoRestringido = tiempoNoCircular(hora);

    if (estaRestringido && tiempoRestringido) {
      return false;
    }

    return true;
  }
}
