import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ default: 'pending' })
  estado: string;
}
