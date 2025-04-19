export abstract class JwtService {
  abstract sign(payload: Record<string, string>): Promise<string>;
  abstract verify(token: string): Promise<Record<string, string>>;
}
