import { IsNotEmpty, IsInt } from 'class-validator';

export class QueryAccountingLineDto {
  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsInt()
  accountingNumber: number;
}
