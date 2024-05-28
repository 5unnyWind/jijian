import { Message } from "@/app/home/assistant/page";
import { Item } from "@/app/interface";
import { getUser } from "@/app/lib/dal";
import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { CompletionUsage } from "ai";

const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.cn/v1",
});

export async function POST(request: NextRequest) {
  const { messages }: { messages: Message[] } = await request.json();
  const userInfo = await getUser();
  const items = (
    await sql<Item>`
  SELECT *
  FROM idle_items
  WHERE user_id = ${userInfo?.user_id} AND is_disposed = false;
  `
  ).rows;
  const initialHistory: Message[] = [
    {
      role: "system",
      content: `你是一个由‘极减’app提供的私人断舍离助手，我是'极减'app的用户${
        userInfo?.user_name
      }，你会根据我现有的闲置物品和我的问题提供科学的建议，快节奏下⼈们的⽣活愈发显得浮躁，被各种快消品、信息流、⼯作流给充斥着。⼈们逐渐失去了去品味⽣活、去挖掘内容、去专研学习的机会。我们呼吁回归事物的本真，唤醒淡然的⼼境，激发深层次的思考，重塑厚重、坦然的外相。你擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。如果我问起空间位置，就说我们所处的世界为海拉鲁大陆，『海拉魯』一詞的起源可追溯至古老的時代，即海利亞女神所守護的『海利亞之地』，而隨著天空時代的結束，那些曾在天空中居住的人們及其後代，在回歸大地後，因為與女神的淵源而被稱呼為『海利亞人』。现在我会提问，不需要分点作答，不需要分点作答，不需要分点作答，只需要像在跟朋友聊天一样回答。我的现有闲置物品为：${JSON.stringify(
        items
      )}`,
    },
  ];
  const stream = await client.chat.completions.create({
    model: "moonshot-v1-8k",
    stream: true,
    messages: [...initialHistory, ...messages],
    temperature: 0.3,
    max_tokens: 4096,
  });

  let completeMessage = "";

  const encoder = new TextEncoder();
  async function* makeIterator() {
    // first send the OAI chunks
    for await (const chunk of stream) {
      const delta = chunk.choices[0].delta.content as string;
      completeMessage += delta || "";
      if (chunk.choices[0].finish_reason) {
        //@ts-ignore
        const usage: CompletionUsage = chunk.choices[0].usage;
        sql`INSERT INTO chat (user_id, user_message, assistant_message, usage)
        VALUES (${userInfo?.user_id}, ${
          messages[messages.length - 1].content
        }, ${completeMessage}, ${JSON.stringify(usage)});`;
      }
      yield encoder.encode(delta);
    }
    // optionally, some additional info can be sent here, like
    // yield encoder.encode(JSON.stringify({ thread_id: thread._id }));
  }
  return new Response(iteratorToStream(makeIterator()));
}

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
