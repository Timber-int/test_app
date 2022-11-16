import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePosts1668149840780 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL UNIQUE,
                text TEXT NOT NULL,
                photo VARCHAR(255) NOT NULL,
                userId INT NOT NULL,
                authorFirstName VARCHAR(255) NOT NULL,
                authorLastName VARCHAR(255) NOT NULL,
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
            DROP TABLE IF EXISTS Posts
        `);
    }
}
