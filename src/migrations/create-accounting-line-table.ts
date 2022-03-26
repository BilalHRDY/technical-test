import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountingLineTable implements MigrationInterface {
  name = 'CreateAccountingLineTable1637070631151';

  up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(
      'CREATE TABLE "accountingLines" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "companyId" INT NOT NULL, "accountingNumber" INT NOT NULL, date DATE NOT NULL, amount REAL NOT NULL );',
    );
  }

  down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('DROP TABLE "accountingLines";');
  }
}
