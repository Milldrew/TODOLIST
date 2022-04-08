import { TypeormConnection } from './typeorm-connection';

describe('TypeormConnection', () => {
  it('should be defined', () => {
    expect(new TypeormConnection()).toBeDefined();
  });
});
