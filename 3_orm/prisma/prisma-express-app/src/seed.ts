import prisma from './utils/prisma-client'


async function main () {
  console.log('start seeding')
  
  await prisma.user.createMany({
    data : [
      {
        name: "Harry",
        email: "harry@hogwarts",
        age: 12,
        isMarried: false,
        nationality: "British"
      },
      {
        name: "Hermione",
        email: "hermione@hogwarts",
        age: 11,
        isMarried: false,
        nationality: "British"
      },
      {
        name: "Ron",
        email: "ron@hogwarts",
        age: 11,
        isMarried: false,
        nationality: "British"
      },
      {
        name: "Draco",
        email: "draco@hogwarts",
        age: 11,
        isMarried: false,
        nationality: "British"
      },
      {
        name: "Neville",
        email: "neville@hogwarts",
        age: 11,
        isMarried: false,
        nationality: "British"
      }, 
      {
        name: "Mrs. Weasley",
        email: "mrsweasley@hogwarts",
        age: 40,
        isMarried: true,
        nationality: "British"
      },
      {
        name: "Minerva",
        email: "minerva@hogwarts",
        age: 40,
        isMarried: true,
        nationality: "British"
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