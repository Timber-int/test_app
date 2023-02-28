import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategories1677493453960 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Categories(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL UNIQUE,
        genderCategoryId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (genderCategoryId) REFERENCES GenderCategories (id)
           ON DELETE CASCADE
           ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXIST Categories
        `);
    }
}
