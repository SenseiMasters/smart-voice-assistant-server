import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

import { ValidLanguagesEnum } from './languages.dto';

export class PromptDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  input: string;

  @ApiProperty({ type: String, enum: ValidLanguagesEnum })
  @IsEnum(ValidLanguagesEnum)
  @IsNotEmpty()
  lang: ValidLanguagesEnum;
}
