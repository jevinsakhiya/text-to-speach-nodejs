import { Controller } from '@nestjs/common';
import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  async tts(str: string): Promise<void> {
    return this.ttsService.tts(str);
  }
}
