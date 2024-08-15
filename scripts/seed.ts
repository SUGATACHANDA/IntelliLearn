const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
        data: [
            { name: "Computer Science" },
            { name: "Bio-Medical" },
            { name: "Humanities" },
            { name: "Finance" },
            { name: "Engineering" },
            { name: "Ethics" }
        ]
    })
    console.log("Success")
  } catch (error) {
    console.log("Error seeding the database categories");
  } finally {
    await database.$disconnect();
  }
}
main()