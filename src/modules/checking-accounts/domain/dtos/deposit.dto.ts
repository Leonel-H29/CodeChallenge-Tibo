import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DepositDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  currentAccountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
