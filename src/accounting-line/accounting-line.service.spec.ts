import { Test, TestingModule } from '@nestjs/testing';
import { AccountingLineService } from './accounting-line.service';

describe('AccountingLineService', () => {
  let service: AccountingLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountingLineService],
    }).compile();

    service = module.get<AccountingLineService>(AccountingLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
