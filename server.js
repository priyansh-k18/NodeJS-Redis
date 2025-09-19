const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("connected to redis");

    await client.set("name", "priyansh");

    const extractValue = await client.get("name");

    console.log(extractValue);

    const deleteCount = await client.del("name");
    console.log(deleteCount);

    await client.set('count', "100")
    const incrementCount = await client.incr('count');
    console.log(incrementCount);

  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
