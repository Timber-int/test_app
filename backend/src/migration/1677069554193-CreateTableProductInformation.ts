import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductInformation1677069554193 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ProductInformation (
        id INT PRIMARY KEY AUTO_INCREMENT,
        collection VARCHAR(255) NOT NULL,
        season VARCHAR(255) NOT NULL,
        typeOfShoes VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        colorRange VARCHAR(255) NOT NULL,
        topMaterial VARCHAR(255) NOT NULL,
        inside VARCHAR(255) NOT NULL,
        typeOfHeels VARCHAR(255) NOT NULL,
        heels VARCHAR(255) NOT NULL,
        production VARCHAR(255) NOT NULL,
        additional VARCHAR(255) NOT NULL,
        colorOrShade VARCHAR(255) NOT NULL,
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
            DROP TABLE IF EXIST ProductInformation
        `);
    }
}
