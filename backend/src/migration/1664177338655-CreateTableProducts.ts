import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1664177338655 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        imageUrl TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        count INT NOT NULL,
        width INT NOT NULL,
        height INT NOT NULL,
        weight INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST Products
        `);
    }
}
