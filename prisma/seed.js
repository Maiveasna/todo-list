const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  new Array(30).fill(0).forEach(async (_, index) => {
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
    console.log("ERROR SEED ::::", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
  
  /// use command  `yarn  prisma db seed` generate dumy data
