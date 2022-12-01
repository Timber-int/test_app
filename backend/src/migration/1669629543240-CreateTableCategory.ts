import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategory1669629543240 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        logo VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST Categories
        `);
    }
}
