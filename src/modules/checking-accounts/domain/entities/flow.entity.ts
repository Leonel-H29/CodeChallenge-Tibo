import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurrentAccountEntity } from '@src/modules/checking-accounts/domain/entities/current-account.entity';

@Entity({ name: 'flows' })
export class FlowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => CurrentAccountEntity,
    (currentAccount) => currentAccount.flows
  )
  currentAccount: CurrentAccountEntity;
}
