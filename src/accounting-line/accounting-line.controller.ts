import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  Param,
  ParseIntPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { NotEmptyBodyPipe } from 'src/accounting-line/pipes/not-empty-body-pipe';
import { NotFoundInterceptor } from 'src/interceptors/not-found-interceptor';
import { DeleteResult } from 'typeorm';
import { AccountingLineService } from './accounting-line.service';
import { CreateAccountingLineDto } from './dto/create-accounting-line.dto';
import { QueryDateAccountingLineDto } from './dto/query-date-accounting-line.dto';
import { UpdateAccountingLineDto } from './dto/update-accounting-line.dto';
import { AccountingLine } from './entities/accounting-line.entity';

@UseInterceptors()
@Controller('accounting-lines')
@UseInterceptors(NotFoundInterceptor, ClassSerializerInterceptor)
export class AccountingLineController {
  constructor(private readonly accountingLineService: AccountingLineService) {}

  @Post()
  create(
    @Body() createAccountingLineDto: CreateAccountingLineDto,
  ): Promise<AccountingLine> {
    return this.accountingLineService.createOne(createAccountingLineDto);
  }

  @Get()
  findAll(): Promise<AccountingLine[]> {
    return this.accountingLineService.findAll();
  }

  @Get(':companyId/:accountingNumber')
  findOne(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('accountingNumber', ParseIntPipe) accountingNumber: number,
  ): Promise<AccountingLine> {
    return this.accountingLineService.findOne(companyId, accountingNumber);
  }

  @Patch(':companyId/:accountingNumber')
  update(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('accountingNumber', ParseIntPipe) accountingNumber: number,
    @Body(NotEmptyBodyPipe) updateAccountingLineDto: UpdateAccountingLineDto,
  ) {
    return this.accountingLineService.update(
      companyId,
      accountingNumber,
      updateAccountingLineDto,
    );
  }

  @Delete(':companyId/:accountingNumber')
  remove(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('accountingNumber', ParseIntPipe) accountingNumber: number,
  ): Promise<DeleteResult> {
    return this.accountingLineService.remove(companyId, accountingNumber);
  }

  @Get('filter')
  getBetweenDatesByCompanyId(
    @Query()
    queryDateAccountingLine: QueryDateAccountingLineDto,
  ): Promise<AccountingLine[]> {
    return this.accountingLineService.getBetweenDatesByCompanyId(
      queryDateAccountingLine,
    );
  }

  @Get('sum')
  getSumBetweenDatesByCompanyId(
    @Query()
    queryDateAccountingLine: QueryDateAccountingLineDto,
  ): Promise<{ key: number }> {
    return this.accountingLineService.getSumBetweenDatesByCompanyId(
      queryDateAccountingLine,
    );
  }
}
