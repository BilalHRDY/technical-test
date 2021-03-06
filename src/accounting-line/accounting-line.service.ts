import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, Between } from 'typeorm';
import { CreateAccountingLineDto } from './dto/create-accounting-line.dto';
import { QueryDateAccountingLineDto } from './dto/query-date-accounting-line.dto';
import { UpdateAccountingLineDto } from './dto/update-accounting-line.dto';
import { AccountingLine } from './entities/accounting-line.entity';

@Injectable()
export class AccountingLineService {
  constructor(
    @InjectRepository(AccountingLine)
    private accountingLineRepository: Repository<AccountingLine>,
  ) {}

  createOne(
    createAccountingLineDto: Partial<CreateAccountingLineDto>,
  ): Promise<AccountingLine> {
    const newAccountingLine = this.accountingLineRepository.create(
      createAccountingLineDto,
    );

    return this.accountingLineRepository.save(newAccountingLine);
  }

  findAll(): Promise<AccountingLine[]> {
    return this.accountingLineRepository.find({ order: { date: 'DESC' } });
  }

  findOne(
    accountingNumber: number,
    companyId: number,
  ): Promise<AccountingLine> {
    return this.accountingLineRepository.findOne({
      where: {
        companyId: companyId,
        accountingNumber: accountingNumber,
      },
    });
  }

  update(
    accountingNumber: number,
    companyId: number,
    updateAccountingLineDto: Partial<UpdateAccountingLineDto>,
  ): Promise<UpdateResult> {
    return this.accountingLineRepository
      .createQueryBuilder('accountingLine')
      .update<AccountingLine>(AccountingLine, updateAccountingLineDto)
      .where('companyId = :companyId', {
        companyId: companyId,
      })
      .andWhere('accountingNumber = :accountingNumber', {
        accountingNumber: accountingNumber,
      })
      .execute();
  }

  remove(accountingNumber: number, companyId: number): Promise<DeleteResult> {
    return this.accountingLineRepository
      .createQueryBuilder('accountingLine')
      .delete()
      .where('companyId = :companyId', {
        companyId: companyId,
      })
      .andWhere('accountingNumber = :accountingNumber', {
        accountingNumber: accountingNumber,
      })
      .execute();
  }

  getBetweenDatesByCompanyId(
    queryDateAccountingLine: QueryDateAccountingLineDto,
  ): Promise<AccountingLine[]> {
    return this.accountingLineRepository.find({
      where: {
        companyId: queryDateAccountingLine.companyId,
        date: Between(
          queryDateAccountingLine.startDate.toISOString(),
          queryDateAccountingLine.endDate.toISOString(),
        ),
      },
      order: { date: 'DESC' },
    });
  }

  getSumBetweenDatesByCompanyId(
    queryDateAccountingLine: QueryDateAccountingLineDto,
  ): Promise<{ key: number }> {
    return this.accountingLineRepository
      .createQueryBuilder('accountingLine')
      .select('SUM(accountingLine.amount)', 'sum')
      .where('companyId = :companyId', {
        companyId: queryDateAccountingLine.companyId,
      })
      .andWhere(
        `"accountingLine"."date"
   BETWEEN :begin
      AND :end`,
        {
          begin: queryDateAccountingLine.startDate.toISOString(),
          end: queryDateAccountingLine.endDate.toISOString(),
        },
      )
      .getRawOne();
  }
}
