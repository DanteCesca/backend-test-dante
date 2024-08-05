import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { Tarea } from './tarea.entity';

@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Get()
  findAll(): Promise<Tarea[]> {
    return this.tareaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tarea> {
    return this.tareaService.findOne(id);
  }

  @Post()
  create(@Body() tarea: Tarea): Promise<Tarea> {
    return this.tareaService.create(tarea);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tarea: Partial<Tarea>): Promise<Tarea> {
    return this.tareaService.update(id, tarea);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tareaService.remove(id);
  }
}
