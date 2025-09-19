const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);


async function redisDataStructures(){
     try{
        await client.connect();
        //Strings -> SET,GET,MSET(multiple key value),MGET
        await client.set("user:name","Priyansh Keer");
        const name = await client.get("user:name");
        // console.log(name);

        await client.mSet(["user:email","priyansh@gmail.com","user:age","21","user:country","India"]);
        const [email,age,country] = await client.mGet(["user:email","user:age","user:country"]);
        // console.log(email,age,country)


        // lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP
        // await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
        // const extractAllNotes = await client.lRange('notes',0,-1);

        // console.log(extractAllNotes);
        // const firstNote = await client.lPop('notes');
        // console.log(firstNote);
        // const remainingNotes = await client.lRange('notes',0,-1);
        // console.log(remainingNotes);


        //sets -> SADD, SMEMBERS, SISMEMBER, SREM
        await client.sAdd('user:nickName', ["john","varun","xyz"]);
        const extractUserNicknames = await client.sMembers("user:nickName");
        console.log(extractUserNicknames);

        const isVarunValidNickName = await client.sIsMember(
            "user:nickName",
            "varun"
        );
        console.log(isVarunValidNickName);

        await client.sRem("user:nickName","xyz");
        const getUpdatedUserNickNames = await client.sMembers('user:nickName')
        console.log(getUpdatedUserNickNames)

     }catch(e){
        console.log(e);
     }finally{
        client.quit()
     }
}

redisDataStructures();