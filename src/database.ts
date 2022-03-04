import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
  host,
  host_prod,
  database,
  database_test,
  user,
  password,
  password_prod,
  ENV,
  DB
} = process.env

const client = new Pool({
  host: DB === "external" ? host_prod : host,
  database : ENV === "test" ? database_test : database,
  user,
  password: DB === "external" ? password_prod : password
})

export default client