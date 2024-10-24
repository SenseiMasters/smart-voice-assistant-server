import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Get,
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { PromptDto, SpeechToTextDto } from 'libs/common/dto';
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
  @ApiBody({ type: SpeechToTextDto })
  @UseInterceptors(FileInterceptor('audio'))
  speechToText(
    @Body() body: SpeechToTextDto,
    @UploadedFile(AudioFileValidation) file: Express.Multer.File,
  ) {
    return this.appService.stt(
      file.buffer.toString('base64'),
      file.mimetype,
      body.lang,
    );
  }
}
