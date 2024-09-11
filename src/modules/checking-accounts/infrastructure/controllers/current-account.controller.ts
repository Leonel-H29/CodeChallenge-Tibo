import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentAccountService } from '@src/modules/checking-accounts/application/services/current-account.service';
import { CreateCurrentAccountDto } from '@src/modules/checking-accounts/domain/dtos/create-current-account.dto';
import { DepositDto } from '@src/modules/checking-accounts/domain/dtos/deposit.dto';
import { PaymentDto } from '@src/modules/checking-accounts/domain/dtos/payment.dto';
import { CurrentAccountEntity } from '@src/modules/checking-accounts/domain/entities/current-account.entity';
import { TypesCurrentAccountEnum } from '@src/modules/checking-accounts/domain/enums/types-current-account.enum';

@ApiTags('Current Account')
@Controller('current-account')
export class CurrentAccountController {
  constructor(private readonly currentAccountService: CurrentAccountService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to create a new current account' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Owner of the account' },
        type: {
          type: 'string',
          description: 'Type of the current account',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The current account has been successfully created.',
    type: CurrentAccountEntity,
  })
  async createAccount(
    @Body('owner') owner: string,
    @Body('type') type: string
  ) {
    const createCurrentDto = new CreateCurrentAccountDto(
      owner,
      type as TypesCurrentAccountEnum
    );
    return this.currentAccountService.createAccount(createCurrentDto);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Endpoint to retrieve a current account by id' })
  async getAccountById(@Param('id') id: number) {
    return this.currentAccountService.getAccountById(id);
  }

  @Post('deposit')
  @ApiOperation({ summary: 'Endpoint to credit funds to a current account' })
  @ApiBody({
    type: DepositDto,
    description: 'Data for deposit in the current account',
  })
  @ApiResponse({ status: 201, type: CurrentAccountEntity })
  async deposit(@Body() depositDto: DepositDto) {
    return this.currentAccountService.deposit(depositDto);
  }

  @Post('payment')
  @ApiOperation({
    summary: 'Endpoint to make a payment from a current account ',
  })
  @ApiBody({
    type: PaymentDto,
    description: 'Data for payment in the current account',
  })
  @ApiResponse({ status: 201, type: CurrentAccountEntity })
  async payment(@Body() paymentDto: PaymentDto) {
    return this.currentAccountService.payment(paymentDto);
  }
}
