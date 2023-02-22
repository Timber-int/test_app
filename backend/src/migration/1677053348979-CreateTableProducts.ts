import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1677053348979 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title  VARCHAR(255) NOT NULL UNIQUE,
        photo VARCHAR(255) NOT NULL,
        price INT CHECK (price >= 0),
        count INT CHECK (count >= 0),
        hasDiscount BOOLEAN DEFAULT(false),
        discount INT CHECK (discount >= 0) DEFAULT(0),
        categoryId INT NOT NULL,
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
            DROP TABLE IF EXIST Products
        `);
    }
}
