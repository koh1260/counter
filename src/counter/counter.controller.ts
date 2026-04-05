import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CounterService } from './counter.service';
import { CounterResponseDto } from './dto/counter.dto';

@ApiTags('counter')
@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get(':name')
  @ApiOperation({ summary: '카운터 값 조회' })
  @ApiParam({ name: 'name', description: '카운터 이름' })
  @ApiResponse({ status: 200, type: CounterResponseDto })
  get(@Param('name') name: string): CounterResponseDto {
    return { name, value: this.counterService.get(name) };
  }

  @Post(':name/increment')
  @ApiOperation({ summary: '카운터 값 1 증가' })
  @ApiParam({ name: 'name', description: '카운터 이름' })
  @ApiResponse({ status: 201, type: CounterResponseDto })
  increment(@Param('name') name: string): CounterResponseDto {
    return { name, value: this.counterService.increment(name) };
  }

  @Post(':name/decrement')
  @ApiOperation({ summary: '카운터 값 1 감소' })
  @ApiParam({ name: 'name', description: '카운터 이름' })
  @ApiResponse({ status: 201, type: CounterResponseDto })
  decrement(@Param('name') name: string): CounterResponseDto {
    return { name, value: this.counterService.decrement(name) };
  }

  @Post(':name/reset')
  @ApiOperation({ summary: '카운터 값 초기화' })
  @ApiParam({ name: 'name', description: '카운터 이름' })
  @ApiResponse({ status: 201, type: CounterResponseDto })
  reset(@Param('name') name: string): CounterResponseDto {
    return { name, value: this.counterService.reset(name) };
  }
}
