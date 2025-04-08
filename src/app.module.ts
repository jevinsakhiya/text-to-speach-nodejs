import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SttModule } from './stt/stt.module';
import { TtsModule } from './tts/tts.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [SttModule, TtsModule],
})
export class AppModule {}
