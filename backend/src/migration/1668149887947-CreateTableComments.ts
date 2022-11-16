import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1668149887947 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                id INT PRIMARY KEY AUTO_INCREMENT,
                text TEXT NOT NULL,
                userId INT NOT NULL,
                postId INT NOT NULL,
                authorFirstName VARCHAR(255) NOT NULL,
                authorLastName VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES Users (id),
                FOREIGN KEY (postId) REFERENCES Posts (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
       `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Comments
        `);
    }
}
