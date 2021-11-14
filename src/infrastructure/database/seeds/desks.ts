import { Knex } from 'knex';
import { v4 } from 'uuid';
import * as faker from 'faker';
import { TableNames } from '../table-names';

const getRandomItemFromArray = (items: string[]) => items[Math.floor(Math.random() * items.length)];

export async function seed(knex: Knex): Promise<void> {
  await knex(TableNames.Desk).del();

  const companyNames = Array.from(Array(10).keys()).map(() => faker.company.companyName());

  const locations = Array.from(Array(10).keys()).map(() => faker.address.cityName());

  const sizes = ['SMALL', 'MEDIUM', 'LARGE'];

  const spaceTypes = ['INDIVIDUAL', 'COWORKING'];

  await knex(TableNames.Desk).insert(
    Array.from(Array(100).keys()).map(() => ({
      id: v4(),
      office_name: getRandomItemFromArray(companyNames),
      location: getRandomItemFromArray(locations),
      type: getRandomItemFromArray(spaceTypes),
      size: getRandomItemFromArray(sizes),
      created_at: new Date().toISOString(),
    })),
  );
}
