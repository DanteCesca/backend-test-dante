import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';

@Module({
  providers: [TareaService],
  controllers: [TareaController]
})
export class TareaModule {}
