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
import { handleHTTPException } from '@src/common/infrastucture/handleError';

@Injectable()
export class CurrentAccountService {
  constructor(
    @InjectRepository(CurrentAccountEntity)
    private readonly currentAccountRepository: Repository<CurrentAccountEntity>,
    @InjectRepository(FlowEntity)
    private readonly flowRepository: Repository<FlowEntity>
  ) {}

  async getAccountById(id: number) {
    try {
      const account = await this.currentAccountRepository.findOne({
        where: { id },
      });
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      return account;
    } catch (error) {
      return handleHTTPException(error);
    }
  }

  async createAccount(createCurrentAccountDto: CreateCurrentAccountDto) {
    try {
      const account = this.currentAccountRepository.create(
        createCurrentAccountDto
      );
      return await this.currentAccountRepository.save(account);
    } catch (error) {
      return handleHTTPException(error);
    }
  }

  async deposit(depositDto: DepositDto) {
    try {
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

      return await this.currentAccountRepository.save(account);
    } catch (error) {
      return handleHTTPException(error);
    }
  }

  async payment(paymentDto: PaymentDto) {
    try {
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

      return await this.currentAccountRepository.save(account);
    } catch (error) {
      return handleHTTPException(error);
    }
  }
}
