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
      const resultado = (horaEnMin >= 360 && horaEnMin <= 570) ||
                        (horaEnMin >= 960 && horaEnMin <= 1260); 
      return resultado;
    };

    const fechaObj = new Date(fecha);
    const UltimoDigito = getUltimoDigito(placa);
    const DiaDeSemana = getDiaDeSemana(fechaObj);

    const nocircula: { [key: number ]: number[] } = {
      0: [1, 2], 
      1: [3, 4], 
      2: [5, 6], 
      3: [7, 8], 
      4: [9, 0], 
      5: [], 
      6: [] 
    };

    if (DiaDeSemana > 5) {
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
