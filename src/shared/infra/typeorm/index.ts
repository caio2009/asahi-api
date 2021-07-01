import { createConnection } from 'typeorm';

async function initDB() {
  await createConnection();
}

export default initDB;