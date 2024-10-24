import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class PromptDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  input: string;
}
