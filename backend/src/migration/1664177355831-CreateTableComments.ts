import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1664177355831 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Comments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productId INT NOT NULL,
        description TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (productId) REFERENCES Products (id)
           ON DELETE CASCADE
          ON UPDATE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST Comments
        `);
    }
}
