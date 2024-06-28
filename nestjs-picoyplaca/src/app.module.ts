import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PicoyplacaModule } from './picoyplaca/picoyplaca.module';

@Module({
  imports: [PicoyplacaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
