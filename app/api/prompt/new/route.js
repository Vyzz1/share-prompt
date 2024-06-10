import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      tag: tag,
      prompt: prompt,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
