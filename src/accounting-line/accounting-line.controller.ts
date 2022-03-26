import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { NotEmptyBodyPipe } from 'src/accounting-line/pipes/not-empty-body-interceptor';
import { NotFoundInterceptor } from 'src/interceptors/not-found-interceptor';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountingLineService } from './accounting-line.service';
import { CreateAccountingLineDto } from './dto/create-accounting-line.dto';
import { QueryAccountingLineDto } from './dto/query-accounting-line.dto';
import { QueryDateAccountingLineDto } from './dto/query-date-accounting-line.dto';
import { UpdateAccountingLineDto } from './dto/update-accounting-line.dto';
import { AccountingLine } from './entities/accounting-line.entity';

@Controller('accounting-lines')
// Interceptor if queries results from database are null
@UseInterceptors(NotFoundInterceptor)
export class AccountingLineController {
  constructor(private readonly accountingLineService: AccountingLineService) {}

  @Post('add')
  create(
    @Body() createAccountingLineDto: CreateAccountingLineDto,
  ): Promise<AccountingLine> {
    return this.accountingLineService.createOne(createAccountingLineDto);
  }

  @Get('find/all')
  findAll(): Promise<AccountingLine[]> {
    return this.accountingLineService.findAll();
  }

  @Get('find')
  findOne(
    @Query()
    queryAccountingLine: QueryAccountingLineDto,
  ): Promise<AccountingLine> {
    return this.accountingLineService.findOne(queryAccountingLine);
  }

  @Patch('update')
  // Pipe to check if the body of the request is not empty
  @UsePipes(NotEmptyBodyPipe)
  updateOne(
    @Query()
    queryAccountingLine: QueryAccountingLineDto,
    @Body() updateAccountingLineDto: UpdateAccountingLineDto,
  ): Promise<UpdateResult> {
    return this.accountingLineService.update(
      queryAccountingLine,
      updateAccountingLineDto,
    );
  }

  @Delete('delete')
  removeOne(
    @Query()
    queryAccountingLine: QueryAccountingLineDto,
  ): Promise<DeleteResult> {
    return this.accountingLineService.removeOne(queryAccountingLine);
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
