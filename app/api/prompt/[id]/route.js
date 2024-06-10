//GET
import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

//PATCH

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

//DELETE

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase(); // Sử dụng hàm kết nối cơ sở dữ liệu đúng

    // Kiểm tra ID có hợp lệ không
    if (!params.id || params.id.length !== 24) {
      return new Response("Invalid prompt ID", { status: 400 });
    }

    // Find the prompt by ID and remove it
    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
