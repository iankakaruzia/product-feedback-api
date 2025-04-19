export abstract class CryptographyService {
  abstract hash(password: string): Promise<string>;
  abstract verify(hash: string, plainText: string): Promise<boolean>;
}
