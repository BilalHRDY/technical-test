/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { AccountingLineService } from './accounting-line.service';
import { AccountingLineController } from './accounting-line.controller';
import { AccountingLine } from './entities/accounting-line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccountingLine])],
  controllers: [AccountingLineController],
  providers: [AccountingLineService],
})
export class AccountingLineModule {}
