import redisClient from '../utils/redis';

describe('Redis Client', () => {
  it('should return true if Redis is alive', () => {
    const result = redisClient.isAlive();
    expect(result).toBe(true);
  });

  it('should be able to set and get a value', async () => {
    await redisClient.set('test_key', 'test_value', 10);
    const value = await redisClient.getValue('test_key');
    expect(value).toBe('test_value');
  });

  it('should be able to delete a value', async () => {
    await redisClient.set('test_key', 'test_value', 10);
    await redisClient.del('test_key');
    const value = await redisClient.getValue('test_key');
    expect(value).toBe(null);
  });
});
