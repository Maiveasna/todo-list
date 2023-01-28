const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  new Array(300).fill(0).forEach(async (_, index) => {
    await prisma.todo.create({
      data: {
        todo: "first seed - " + `(${index})`,
        isCompleted: false,
      },
    });
  });
}

main()
  .catch((error) => {
    process.exit(1);
    console.log("ERROR SEED ::::", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
