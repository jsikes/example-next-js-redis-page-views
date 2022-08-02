import Redis from 'ioredis';

let redis = new Redis(process.env.REDIS_URL);

const ViewCount = async (req, res) => {
  const { slug } = req.body;

  if (!slug) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);

    return res.json({ status: 400, message: 'A valid slug is required.' });
  }

  const viewCount = await redis.scard(slug);

  return res.status(200).json({ viewCount });
};

export default ViewCount;
