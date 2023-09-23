import 'dotenv/config';

import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';
import { IsStringOrUndefined } from '../decorators/IsUndefinedOrString';

class Env {
  @IsStringOrUndefined()
  port: string;

  @IsString()
  @IsNotEmpty()
  dbURL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
