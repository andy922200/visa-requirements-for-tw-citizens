'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Continents',
      [
        {
          name: `亞洲`,
          nameEn: `Asia`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `歐洲`,
          nameEn: `Europe`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `非洲`,
          nameEn: `Africa`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `大洋洲`,
          nameEn: `Oceania`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `北美洲`,
          nameEn: `North America`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `南美洲`,
          nameEn: `South America`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `南極洲`,
          nameEn: `Antarctica`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )

    queryInterface.bulkInsert('Regions',
      [
        {
          name: `東北亞`,
          nameEn: `Northeast Asia`,
          ContinentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `東亞`,
          nameEn: `East Asia`,
          ContinentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `東南亞`,
          nameEn: `Southeast Asia`,
          ContinentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `印度次大陸`,
          nameEn: `Subcontinent`,
          ContinentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `中東`,
          nameEn: `Middle East`,
          ContinentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `東歐`,
          nameEn: `East Europe`,
          ContinentId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `西歐`,
          nameEn: `West Europe`,
          ContinentId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `北歐`,
          nameEn: `North Europe`,
          ContinentId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `南歐`,
          nameEn: `South Europe`,
          ContinentId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `北非`,
          nameEn: `North Africa`,
          ContinentId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `中非(非洲中部)`,
          nameEn: `Central Africa`,
          ContinentId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `南非(非洲南部)`,
          nameEn: `Southern Africa`,
          ContinentId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `紐澳`,
          nameEn: `Australia & New Zealand`,
          ContinentId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `美拉尼西亞`,
          nameEn: `Melanesia`,
          ContinentId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `密克羅尼西亞`,
          nameEn: `Micronesia`,
          ContinentId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `玻里尼西亞`,
          nameEn: `Polynesia`,
          ContinentId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `北美`,
          nameEn: `Northern America`,
          ContinentId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `中美`,
          nameEn: `Central America`,
          ContinentId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `南美`,
          nameEn: `Southern America`,
          ContinentId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `南極`,
          nameEn: `South Pole`,
          ContinentId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `中亞`,
          nameEn: `Central Asia`,
          ContinentId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )

    queryInterface.bulkInsert('Categories',
      [
        {
          name: `免簽`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `落地簽`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: `電子簽證`,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )

    return queryInterface.bulkInsert('Countries',
      [
        {
          name: `日本`,
          nameEn: `Japan`,
          ContinentId: 1,
          RegionId: 1,
          CategoryId: 1,
          days: faker.random.number({ min: 7, max: 180 }),
          remark: faker.lorem.word(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ].concat(
        Array.from({ length: 99 }).map((d, index) => ({
          name: `國家${index + 1}`,
          nameEn: `country${index + 1}`,
          ContinentId: faker.random.number({ min: 1, max: 7 }),
          RegionId: faker.random.number({ min: 1, max: 20 }),
          CategoryId: faker.random.number({ min: 1, max: 3 }),
          days: faker.random.number({ min: 7, max: 180 }),
          remark: faker.lorem.word(),
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      ),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Categories', null, {})
    queryInterface.bulkDelete('Continents', null, {})
    queryInterface.bulkDelete('Countries', null, {})
    return queryInterface.bulkDelete('Regions', null, {})
  }
};
