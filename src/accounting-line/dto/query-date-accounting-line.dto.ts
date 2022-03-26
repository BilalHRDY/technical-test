import { IsDate, IsNotEmpty, IsInt } from 'class-validator';

export class QueryDateAccountingLineDto {
  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
