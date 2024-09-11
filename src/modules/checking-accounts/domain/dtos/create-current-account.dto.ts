import { ApiProperty } from '@nestjs/swagger';
import { TypesCurrentAccountEnum } from '@src/modules/checking-accounts/domain/enums/types-current-account.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrentAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypesCurrentAccountEnum)
  type: TypesCurrentAccountEnum;
}
