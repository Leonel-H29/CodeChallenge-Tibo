import { Module } from '@nestjs/common';
import { CurrentAccountController } from '@src/modules/checking-accounts/infrastructure/controllers/current-account.controller';
import { CurrentAccountService } from '@src/modules/checking-accounts/application/services/current-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentAccountEntity } from '@src/modules/checking-accounts/domain/entities/current-account.entity';
import { FlowEntity } from '@src/modules/checking-accounts/domain/entities/flow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentAccountEntity, FlowEntity])],
  controllers: [CurrentAccountController],
  providers: [CurrentAccountService],
  exports: [CurrentAccountService],
})
export class CurrentAccountModule {}
