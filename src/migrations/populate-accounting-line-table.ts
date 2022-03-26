import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateAccountingLineTable implements MigrationInterface {
  name = 'PopulateAccountingLineTable1637227433569';

  up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(
      `INSERT INTO "accountingLines" ("companyId", date, "accountingNumber", amount) VALUES ${PopulateAccountingLineTable.generateRandomRows()};`,
    );
  }

  down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('TRUNCATE TABLE "accountingLines"');
  }

  private static generateRandomRows() {
    const accountingNumberSize = 100;
    // const accountingNumberSize = 5;

    const startDate = new Date('2018-01-01T00:00:00');
    const endDate = new Date('2020-12-31T23:59:59');
    const tableSize = 20000;
    // const tableSize = 1;

    const formatDateToSqlFormat = (date: Date): string => {
      return `${date.getUTCFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${
        date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
      } ${
        date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
      }:${
        date.getUTCMinutes() < 10
          ? `0${date.getUTCMinutes()}`
          : date.getUTCMinutes()
      }:${
        date.getUTCSeconds() < 10
          ? `0${date.getUTCSeconds()}`
          : date.getUTCSeconds()
      }`;
    };

    const rows = [];
    for (let i = 0; i < tableSize; i++) {
      const randomCompanyId = Math.floor(Math.random() * 20) + 1;
      const randomDate = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime()),
      );
      const randomAccountingNumber = Math.floor(
        Math.random() * accountingNumberSize + 1,
      );
      const randomAmount =
        ((Math.random() < 0.5 ? -1 : 1) *
          Math.round(Math.random() * 1500 * 100)) /
        100;
      rows.push(
        `(${randomCompanyId},"${formatDateToSqlFormat(
          randomDate,
        )}", ${randomAccountingNumber}, ${randomAmount})`,
      );
    }

    return rows.join(',');
  }
}
