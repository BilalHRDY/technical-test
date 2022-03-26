import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountingLineModule } from './accounting-line/accounting-line.module';
import { AccountingLine } from './accounting-line/entities/accounting-line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import {
  CreateAccountingLineTable,
  PopulateAccountingLineTable,
} from './migrations';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '../data/accounting-database.sqlite'),
      migrations: [CreateAccountingLineTable, PopulateAccountingLineTable],
      migrationsRun: true,
      entities: [AccountingLine],
    }),
    AccountingLineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
