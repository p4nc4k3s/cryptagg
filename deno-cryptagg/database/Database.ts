import { Database, PostgresConnector } from 'https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts';

import { Block } from '../entities/Block.ts'
import { Transaction } from '../entities/Transaction.ts'
// app.ts
import "https://deno.land/x/dotenv/load.ts";

const connector = new PostgresConnector({
  database: Deno.env.get("POSTGRES_DB"),
  host: Deno.env.get("POSTGRES_HOST"),
  username: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  port: Deno.env.get("POSTGRES_PORT"), 
});

const db = new Database(connector);

db.link([Block, Transaction])

export default db
