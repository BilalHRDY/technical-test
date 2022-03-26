import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accountingLines')
export class AccountingLine {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('int')
  companyId!: number;

  @Column('int')
  accountingNumber!: number;

  @Column('datetime')
  date!: Date;

  @Column('float')
  amount!: number;
}
