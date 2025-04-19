import { CryptographyService } from '@modules/user/domain/abstractions/cryptography.service';
import * as argon2 from 'argon2';

export class ArgonCryptographyService implements CryptographyService {
  hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  verify(hash: string, plainText: string): Promise<boolean> {
    return argon2.verify(hash, plainText);
  }
}
