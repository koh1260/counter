import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  private readonly counters = new Map<string, number>();

  get(name: string): number {
    return this.counters.get(name) ?? 0;
  }

  increment(name: string): number {
    const next = this.get(name) + 1;
    this.counters.set(name, next);
    return next;
  }

  decrement(name: string): number {
    const next = this.get(name) - 1;
    this.counters.set(name, next);
    return next;
  }

  reset(name: string): number {
    this.counters.set(name, 0);
    return 0;
  }
}
