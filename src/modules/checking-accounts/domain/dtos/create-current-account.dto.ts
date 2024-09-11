import { ApiProperty } from '@nestjs/swagger';
import { TypesCurrentAccountEnum } from '@src/modules/checking-accounts/domain/enums/types-current-account.enum';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCurrentAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({
    message:
      'The owner must be a string without special or alphanumeric characters.',
  })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'The owner can only contain letters and spaces.',
  })
  owner: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypesCurrentAccountEnum)
  type: TypesCurrentAccountEnum;
}
