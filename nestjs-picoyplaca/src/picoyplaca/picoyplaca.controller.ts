import { Controller, Get, Query } from '@nestjs/common';
import { PicoyplacaService } from './picoyplaca.service';

@Controller('picoyplaca')
export class PicoyplacaController {
  constructor(private readonly picoyplacaService: PicoyplacaService) {}

  @Get('puedeCircular')
  puedeCircular(
    @Query('placa') placa: string,
    @Query('fecha') fecha: string,
    @Query('hora') hora: string,
  ): { mensaje: string } {
    const puedeCircular = this.picoyplacaService.puedeCircular(placa, fecha, hora);
    const mensaje = puedeCircular ? 'El vehículo puede circular' : 'El vehículo no puede circular.';
    return { mensaje };
  }
}
