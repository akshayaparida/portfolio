/**
 * @jest-environment node
 */
import { GET } from '../route';

// Mock fetch globally
global.fetch = jest.fn();

describe('Analytics API Route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    (global.fetch as jest.Mock).mockClear();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns mock data when credentials are missing', async () => {
    delete process.env.VERCEL_ANALYTICS_TOKEN;
    delete process.env.VERCEL_PROJECT_ID;

    const request = new Request('http://localhost:3000/api/analytics?range=7d');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.visitors.total).toBeDefined();
    expect(data.regions[0].country).toBe('United States');
  });

  it('returns error for invalid range parameter', async () => {
    const request = new Request('http://localhost:3000/api/analytics?range=invalid');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Invalid range parameter');
  });
});
