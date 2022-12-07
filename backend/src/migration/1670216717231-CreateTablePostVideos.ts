import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePostVideos1670216717231 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS PostVideos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        video VARCHAR(255) NOT NULL,
        userId INT NOT NULL,
        postId INT NOT NULL,
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
            DROP TABLE IF EXISTS PostVideos
        `);
    }
}
