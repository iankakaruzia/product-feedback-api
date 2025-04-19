import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  timestamp: string;
}
