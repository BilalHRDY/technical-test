import { Test, TestingModule } from '@nestjs/testing';
import { AccountingLineController } from './accounting-line.controller';
import { AccountingLineService } from './accounting-line.service';

describe('AccountingLineController', () => {
  let controller: AccountingLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountingLineController],
      providers: [AccountingLineService],
    }).compile();

    controller = module.get<AccountingLineController>(AccountingLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
