import dbClient from '../utils/db';

describe('DB Client', () => {
  it('should return true if DB is alive', () => {
    const result = dbClient.isAlive();
    expect(result).toBe(true);
  });

  it('should return the number of users and files', async () => {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    expect(nbUsers).toBeGreaterThanOrEqual(0);
    expect(nbFiles).toBeGreaterThanOrEqual(0);
  });
});
