using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagement.Migrations
{
    /// <inheritdoc />
    public partial class updateoneTomany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "assigneeId",
                table: "Tasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_assigneeId",
                table: "Tasks",
                column: "assigneeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_assigneeId",
                table: "Tasks",
                column: "assigneeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Users_assigneeId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_assigneeId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "assigneeId",
                table: "Tasks");
        }
    }
}
