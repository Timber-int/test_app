import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableActionTokens1673267094656 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ActionToken (
        id INT PRIMARY KEY AUTO_INCREMENT,
        actionToken VARCHAR(255) NOT NULL,
        userId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES Users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS ActionToken
        `);
    }
}
