import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function getHashedString(source: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(source, salt);
}
