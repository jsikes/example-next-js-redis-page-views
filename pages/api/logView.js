import Redis from 'ioredis';

let redis = new Redis(process.env.REDIS_URL);

const LogView = async (req, res) => {
  const { slug } = req.body;
  let ip;

  if (!slug) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);

    return res.json({ status: 400, message: 'A valid slug is required.' });
  }

  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  if (!ip) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);

    return res.json({ status: 400, message: 'A valid IP is required.' });
  }

  const recordView = await redis.sadd(slug, ip);

  return res.status(200).json({ recordView, ip });
};

export default LogView;
