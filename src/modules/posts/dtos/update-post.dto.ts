import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'Updated Post Title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated post content.' })
  @IsString()
  @IsOptional()
  content?: string;
}
