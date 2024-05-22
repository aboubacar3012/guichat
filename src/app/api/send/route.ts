
const Pusher = require("pusher");

type Data = {
  chatId: string;
  message: string;
  username: string;
  timestamp: string;
}

export async function POST(
  request: Request,
) {

  const data:Data = await request.json();

  console.log(data);

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });


  await pusher.trigger(data.chatId, "incoming-message", {
    message: `${data.message}`,
    username: `${data.username}`,
    timestamp: `${data.timestamp}`
  });
 
  return Response.json({status: "success"});
}