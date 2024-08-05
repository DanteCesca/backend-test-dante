import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareaModule } from './tarea/tarea.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TareaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
