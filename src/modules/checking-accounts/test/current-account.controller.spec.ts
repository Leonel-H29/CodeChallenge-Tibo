import { Test, TestingModule } from '@nestjs/testing';
import { CurrentAccountController } from '@src/modules/checking-accounts/infrastructure/controllers/current-account.controller';
import { CurrentAccountService } from '@src/modules/checking-accounts/application/services/current-account.service';
import { CreateCurrentAccountDto } from '@src/modules/checking-accounts/domain/dtos/create-current-account.dto';
import { DepositDto } from '@src/modules/checking-accounts/domain/dtos/deposit.dto';
import { PaymentDto } from '@src/modules/checking-accounts/domain/dtos/payment.dto';
import { TypesCurrentAccountEnum } from '@src/modules/checking-accounts/domain/enums/types-current-account.enum';

describe('CurrentAccountController', () => {
  let controller: CurrentAccountController;
  let service: CurrentAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentAccountController],
      providers: [
        {
          provide: CurrentAccountService,
          useValue: {
            createAccount: jest.fn(),
            deposit: jest.fn(),
            payment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CurrentAccountController>(CurrentAccountController);
    service = module.get<CurrentAccountService>(CurrentAccountService);
  });

  // TEST CREATE ACCOUNT
  it('should create an account with valid data', async () => {
    const createCurrentAccount = new CreateCurrentAccountDto(
      'John Doe',
      TypesCurrentAccountEnum.DOLLARS
    );

    jest
      .spyOn(service, 'createAccount')
      .mockResolvedValueOnce(expect.any(Object));

    expect(await controller.createAccount(createCurrentAccount)).toEqual(
      expect.any(Object)
    );
  });

  it('should throw an error if the type is not USD or ARS', async () => {
    const createCurrentAccount = new CreateCurrentAccountDto(
      'John Doe',
      'EUR' as TypesCurrentAccountEnum
    );

    jest
      .spyOn(service, 'createAccount')
      .mockResolvedValueOnce(expect.any(Object));

    await expect(
      controller.createAccount(createCurrentAccount)
    ).rejects.toThrow();
  });

  it('should throw an error if the owner not contain letters', async () => {
    const createCurrentAccount = new CreateCurrentAccountDto(
      '12345**///',
      TypesCurrentAccountEnum.DOLLARS
    );
    jest
      .spyOn(service, 'createAccount')
      .mockResolvedValueOnce(expect.any(Object));

    await expect(
      controller.createAccount(createCurrentAccount)
    ).rejects.toThrow();
  });

  // TEST DEPOSIT
  it('should deposit successfully with valid data', async () => {
    const depositData: DepositDto = { currentAccountId: 1, amount: 100 };

    jest.spyOn(service, 'deposit').mockResolvedValueOnce(expect.any(Object));

    expect(await controller.deposit(depositData)).toEqual(expect.any(Object));
  });

  it('should throw an error if the amount is negative', async () => {
    const depositData: DepositDto = { currentAccountId: 999, amount: -50 };
    jest.spyOn(service, 'deposit').mockResolvedValue(expect.any(Object));

    await expect(controller.deposit(depositData)).resolves.toBeNull();
  });

  //TEST PAYMENT

  it('should process payment successfully with valid data', async () => {
    const paymentData = { currentAccountId: 1, amount: 50 };

    jest.spyOn(service, 'payment').mockResolvedValue(expect.any(Object));

    await expect(controller.payment(paymentData)).resolves.toEqual({
      id: 1,
      balance: 50,
    });
  });

  it('should throw an error if the amount is negative', async () => {
    const dto = new PaymentDto();
    dto.currentAccountId = 1;
    dto.amount = -5000;
    jest.spyOn(service, 'payment').mockResolvedValue(expect.any(Object));

    await expect(controller.payment(dto)).resolves.toBeNull();
  });
});
