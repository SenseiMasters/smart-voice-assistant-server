import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ValidAudioEnum {
  WAV = 'audio/wav',
  MP3 = 'audio/mp3',
  AIFF = 'audio/aiff',
  AAC = 'audio/aac',
  OGG = 'audio/ogg',
  FLAC = 'audio/flac',
}

export enum ValidLanguagesEnum {
  EN = 'English',
  FA = 'Farsi',
}

export class SpeechToTextDto {
  @ApiProperty({ type: String, enum: ValidLanguagesEnum })
  @IsEnum(ValidLanguagesEnum)
  @IsNotEmpty()
  lang: ValidLanguagesEnum;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  audio: any;
}
