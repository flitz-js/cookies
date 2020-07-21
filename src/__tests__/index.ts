import request from 'supertest';

it('should return the submitted cookies as JSON string', async () => {
  const sessionToken = '19790905-19790923';
  const theme = 'dark';

  const app = global.createTestApp();

  const response = await request(app)
    .get('/echo')
    .set('Cookie', `theme=${theme}; sessionToken=${sessionToken}`)
    .parse(global.parseBody)
    .send()
    .expect(200);

  const cookies = JSON.parse(
    response.body.toString('utf8')
  );

  expect(typeof cookies).toBe('object');
  expect(Object.keys(cookies)).toHaveLength(2);
  expect(cookies.theme).toBe(theme);
  expect(cookies.sessionToken).toBe(sessionToken);
});

it('should return an empty JSON object if no cookies submitted', async () => {
  const app = global.createTestApp();

  const response = await request(app)
    .get('/echo')
    .parse(global.parseBody)
    .send()
    .expect(200);

  const cookies = JSON.parse(
    response.body.toString('utf8')
  );

  expect(typeof cookies).toBe('object');
  expect(Object.keys(cookies)).toHaveLength(0);
});

it('should return an empty JSON object if submit an empty cookie string', async () => {
  const app = global.createTestApp();

  const response = await request(app)
    .get('/echo')
    .set('Cookie', '')
    .parse(global.parseBody)
    .send()
    .expect(200);

  const cookies = JSON.parse(
    response.body.toString('utf8')
  );

  expect(typeof cookies).toBe('object');
  expect(Object.keys(cookies)).toHaveLength(0);
});
