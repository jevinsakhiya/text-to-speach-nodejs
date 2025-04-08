import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TtsService } from './tts/tts.service';
import { SttService } from './stt/stt.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ttsService = app.get(TtsService);
  const sttService = app.get(SttService);

  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('To test TTS module, Please enter text...');

    // Speech to text module
    sttService.listenAndTranscribe();
    // console.log(sstString);
    await app.close();
    return;
  }

  // Text to speech module
  const text = args.join(' ');
  await ttsService.tts(text);
  await app.close();
}
void bootstrap();
