import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDishes1671444858062 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Dishes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL UNIQUE,
                photo VARCHAR(255) NOT NULL,
                recipe TEXT NOT NULL,
                categoryId INT NOT NULL,
                calories INT NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP,
                FOREIGN KEY (categoryId) REFERENCES Categories (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Dishes
        `);
    }
}
