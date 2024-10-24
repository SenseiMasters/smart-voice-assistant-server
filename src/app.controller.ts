import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { PromptDto } from 'libs/common/dto';
import { AudioFileValidation } from 'libs/common/validations';

@Controller()
@ApiTags('assistant')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  ping(): { message: string } {
    return { message: 'pong' };
  }

  @Post('prompt')
  prompt(@Body() body: PromptDto) {
    return this.appService.prompt(body.input);
  }

  @Post('speech-to-text')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('audio'))
  speechToText(@UploadedFile(AudioFileValidation) file: Express.Multer.File) {
    return this.appService.stt(file.buffer.toString('base64'), file.mimetype);
  }
}
