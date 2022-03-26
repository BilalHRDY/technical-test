import { IsNotEmpty, IsNumber, IsInt, IsDate } from 'class-validator';

export class CreateAccountingLineDto {
  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsInt()
  accountingNumber: number;

  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
