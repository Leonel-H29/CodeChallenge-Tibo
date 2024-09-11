import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlowEntity } from '@src/modules/checking-accounts/domain/entities/flow.entity';
import { TypesCurrentAccountEnum } from '@src/modules/checking-accounts/domain/enums/types-current-account.enum';

@Entity({ name: 'current_accounts' })
export class CurrentAccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  owner: string;

  @Column({ type: 'enum', enum: TypesCurrentAccountEnum })
  type: string;

  @Column({ type: 'int', default: 0 })
  balance: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => FlowEntity, (flow) => flow.currentAccount)
  flows: FlowEntity[];
}
