import { ApiProperty } from '@nestjs/swagger';

export class CounterResponseDto {
  @ApiProperty({ example: 'visits', description: '카운터 이름' })
  name: string;

  @ApiProperty({ example: 1, description: '현재 값' })
  value: number;
}
