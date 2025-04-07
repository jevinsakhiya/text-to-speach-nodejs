import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appController = app.get(AppController);

  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('To test TTS module, Please enter text...');
    await app.close();
    return;
  }

  const text = args.join(' ');
  await appController.RunTTS(text);
  await app.close();
}
void bootstrap();
