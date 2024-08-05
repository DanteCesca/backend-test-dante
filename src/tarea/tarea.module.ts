import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { Tarea } from './tarea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea])],
  providers: [TareaService],
  controllers: [TareaController]
})
export class TareaModule {}
