import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareaModule } from './tarea/tarea.module';

@Module({
  imports: [TareaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
