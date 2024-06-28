import { Module } from '@nestjs/common';
import { PicoyplacaService } from './picoyplaca.service';
import { PicoyplacaController } from './picoyplaca.controller';

@Module({
  providers: [PicoyplacaService],
  controllers: [PicoyplacaController]
})
export class PicoyplacaModule {}
