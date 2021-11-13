import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterNewAccountDTO {
  @ApiProperty({ example: 'john@doe.com', description: 'New account email address.' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'test123', description: 'Account password.' })
  password: string;
}
