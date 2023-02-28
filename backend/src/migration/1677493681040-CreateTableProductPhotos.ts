import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductPhotos1677493681040 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ProductPhotos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        photo VARCHAR(255) NOT NULL,
        productId INT NOT NULL,
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
            DROP TABLE IF EXIST ProductPhotos
        `);
    }
}
