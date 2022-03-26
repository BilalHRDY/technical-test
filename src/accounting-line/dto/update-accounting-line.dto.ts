import { IsNumber, IsOptional, IsInt } from 'class-validator';

export class UpdateAccountingLineDto {
  @IsInt()
  @IsOptional()
  companyId: number;

  @IsInt()
  @IsOptional()
  accountingNumber: number;

  @IsNumber()
  @IsOptional()
  amount: number;
}
