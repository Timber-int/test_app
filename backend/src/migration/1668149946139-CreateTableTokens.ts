import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTokens1668149946139 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Tokens (
        id INT PRIMARY KEY AUTO_INCREMENT,
        refreshToken VARCHAR(255) NOT NULL,
        accessToken VARCHAR(255) NOT NULL,
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
            DROP TABLE IF EXISTS Tokens
        `);
    }
}
