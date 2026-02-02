import prisma from './utils/prisma-client'


async function main () {
  console.log('start seeding')
  
  await prisma.user.createMany({
    data : [
      {
        name: "Harry",
        email: "harry@hogwarts",
      },
      {
        name: "Hermione",
        email: "hermione@hogwarts",
      },
      {
        name: "Ron",
        email: "ron@hogwarts",
      },
      {
        name: "Draco",
        email: "draco@hogwarts",
      }
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('error while seeding', e);
    await prisma.$disconnect()
    process.exit(1)
  })