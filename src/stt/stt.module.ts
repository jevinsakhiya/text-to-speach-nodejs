import { Module } from '@nestjs/common';
import { SttController } from './stt.controller';
import { SttBindingService } from './stt-binding.service';
import { SttService } from './stt.service';

@Module({
  controllers: [SttController],
  providers: [SttService, SttBindingService],
  exports: [SttService, SttBindingService],
})
export class SttModule {}
