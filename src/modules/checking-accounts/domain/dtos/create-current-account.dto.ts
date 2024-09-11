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

  constructor(owner: string, type: TypesCurrentAccountEnum) {
    this.owner = this.validateOwner(owner);
    this.type = this.validateType(type);
  }

  private validateOwner(owner: string): string {
    if (!/^[a-zA-Z\s]+$/.test(owner)) {
      throw new Error('The owner must contain only letters.');
    }
    return owner;
  }

  private validateType(type: TypesCurrentAccountEnum): TypesCurrentAccountEnum {
    if (!Object.values(TypesCurrentAccountEnum).includes(type)) {
      throw new Error('The type must be one of the values defined.');
    }
    return type;
  }
}
