import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
  ) {}

  async findAll(): Promise<Tarea[]> {
    return this.tareaRepository.find();
  }

  async findOne(id: number): Promise<Tarea> {
    return this.tareaRepository.findOneBy({ id });
  }

  create(tarea: Tarea): Promise<Tarea> {
    return this.tareaRepository.save(tarea);
  }

  async update(id: number, tarea: Partial<Tarea>): Promise<Tarea> {
    await this.tareaRepository.update(id, tarea);
    return this.tareaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tareaRepository.delete(id);
  }
}