import bcrypt from 'bcrypt';
import UsersRepository from "@modules/session/infra/typeorm/repositories/UsersRepository";
import User from "@modules/session/infra/typeorm/entities/User";
import { createConnection } from 'typeorm';

async function run() {
  await createConnection();

  const usersRepository = new UsersRepository();

  const users = [{
    name: 'Caio Yukihiro',
    username: 'caioyukihiro@gmail.com'
  }, {
    name: 'Admin',
    username: 'admin'
  }];

  for (const user of users) {
    const obj = new User();
    obj.name = user.name;
    obj.username = user.username;
    obj.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await usersRepository.save(obj);
  }
}

run().then(() => console.log('Seed of admin completed.'));