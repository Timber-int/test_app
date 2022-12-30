import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRecipeVideo1671946636782 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS RecipeVideos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        video VARCHAR(255) NOT NULL,
        dishId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        FOREIGN KEY (dishId) REFERENCES Dishes (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        )
     `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS RecipeVideos
        `);
    }
}
