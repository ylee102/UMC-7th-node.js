import { prisma } from "../src/db.config.js";

async function main() {
  // 1. Insert Regions
  const region = await prisma.region.create({
    data: { name: 'Suwon' },
  });

  // 2. Insert Stores
  const store = await prisma.store.create({
    data: {
      name: 'Best Kungpao',
      address: '1002 Hoegi',
      score: 3.9,
      regionId: region.id, // Foreign key to Region
    },
  });

  // 3. Insert Food
  const food1 = await prisma.food.create({ data: { name: 'JaJang' } });
  const food2 = await prisma.food.create({ data: { name: 'Myeon' } });

  // 4. Insert Member
  const member = await prisma.member.create({
    data: {
      email: 'female@example.com',
      name: '맥스',
      gender: 'FEMALE',
      phone_number: '010-0909-5522',
    },
  });

  // 5. Insert MemberFood
  await prisma.memberFood.createMany({
    data: [
      { memberId: member.id, foodId: food1.id },
      { memberId: member.id, foodId: food2.id },
    ],
  });

  // 6. Insert Missions
  const mission = await prisma.mission.create({
    data: {
      money: 300,
      score: 10,
      storeId: store.id, // Foreign key to Store
    },
  });

  // 7. Insert Reviews
  await prisma.review.create({
    data: {
      content: '요리가 맛없어요!',
      star: 3.0,
      memberId: member.id, // Foreign key to Member
      storeId: store.id,   // Foreign key to Store
    },
  });

  // 8. Insert MemberMission
  await prisma.memberMission.create({
    data: {
      status: 'Challenging',
      memberId: member.id,   // Foreign key to Member
      missionId: mission.id, // Foreign key to Mission
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
