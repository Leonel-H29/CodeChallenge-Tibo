import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentAccountEntity } from '@src/modules/checking-accounts/domain/entities/current-account.entity';
import { FlowEntity } from '@src/modules/checking-accounts/domain/entities/flow.entity';
import { CreateCurrentAccountDto } from '@src/modules/checking-accounts/domain/dtos/create-current-account.dto';
import { DepositDto } from '@src/modules/checking-accounts/domain/dtos/deposit.dto';
import { PaymentDto } from '@src/modules/checking-accounts/domain/dtos/payment.dto';

@Injectable()
export class CurrentAccountService {
  constructor(
    @InjectRepository(CurrentAccountEntity)
    private readonly currentAccountRepository: Repository<CurrentAccountEntity>,
    @InjectRepository(FlowEntity)
    private readonly flowRepository: Repository<FlowEntity>
  ) {}

  async getAccountById(id: number) {
    const account = await this.currentAccountRepository.findOne({
      where: { id },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async createAccount(createCurrentAccountDto: CreateCurrentAccountDto) {
    const account = this.currentAccountRepository.create(
      createCurrentAccountDto
    );
    return this.currentAccountRepository.save(account);
  }

  async deposit(depositDto: DepositDto) {
    const account = await this.currentAccountRepository.findOne({
      where: { id: depositDto.currentAccountId },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    account.balance += depositDto.amount;

    const flow = this.flowRepository.create({
      amount: depositDto.amount,
      currentAccount: account,
    });
    await this.flowRepository.save(flow);

    return this.currentAccountRepository.save(account);
  }

  async payment(paymentDto: PaymentDto) {
    const account = await this.currentAccountRepository.findOne({
      where: { id: paymentDto.currentAccountId },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    if (account.balance < paymentDto.amount) {
      throw new BadRequestException('Insufficient funds');
    }
    account.balance -= paymentDto.amount;

    const flow = this.flowRepository.create({
      amount: -paymentDto.amount,
      currentAccount: account,
    });
    await this.flowRepository.save(flow);

    return this.currentAccountRepository.save(account);
  }
}
