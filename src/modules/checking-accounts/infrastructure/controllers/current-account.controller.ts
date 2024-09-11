import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentAccountService } from '@src/modules/checking-accounts/application/services/current-account.service';
import { CreateCurrentAccountDto } from '@src/modules/checking-accounts/domain/dtos/create-current-account.dto';
import { DepositDto } from '@src/modules/checking-accounts/domain/dtos/deposit.dto';
import { PaymentDto } from '@src/modules/checking-accounts/domain/dtos/payment.dto';

@ApiTags('Current Account')
@Controller('current-account')
export class CurrentAccountController {
  constructor(private readonly currentAccountService: CurrentAccountService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to create a new current account' })
  async createAccount(
    @Body() createCurrentAccountDto: CreateCurrentAccountDto
  ) {
    return this.currentAccountService.createAccount(createCurrentAccountDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint to retrieve a current account by id' })
  async getAccountById(@Param('id') id: number) {
    return this.currentAccountService.getAccountById(id);
  }

  @Post('deposit')
  @ApiOperation({ summary: 'Endpoint to credit funds to a current account' })
  async deposit(@Body() depositDto: DepositDto) {
    return this.currentAccountService.deposit(depositDto);
  }

  @Post('payment')
  @ApiOperation({
    summary: 'Endpoint to make a payment from a current account ',
  })
  async payment(@Body() paymentDto: PaymentDto) {
    return this.currentAccountService.payment(paymentDto);
  }
}
