import { NextResponse } from "next/server";

const leapImageWebhookUrl = `https://9608-200-137-192-48.ngrok-free.app/image-webhook`;
const leapWebhookSecret = `ILEFZUqiQBnhmp2qvhFypoEgCDn9KjOF`;

async function generateImage(prompt) {

  const modelId = "7575ea52-3d4f-400f-9ded-09f7b1b1a5b8";

    const generateImageResponse = await leap.images.generate({
        modelId,
        prompt,
        steps: 50,
        width: 1024,
        height: 1024,
        numberOfImages: 1,
        promptStrength: 7,
        seed: 4523184,
        webhookUrl: `${leapImageWebhookUrl}?&model_id=${modelId}&webhook_secret=${leapWebhookSecret}`
      });
    
      const inferenceId = generateImageResponse.data.id;
    
      const getImageResponse = await leap.images.findOne({
        modelId: "7575ea52-3d4f-400f-9ded-09f7b1b1a5b8",
        inferenceId
      });
    
      console.log(getImageResponse);
    
      return getImageResponse;

}

export async function POST(request) {

    const prompt = request.body.prompt;

    if (!prompt) {
        NextResponse.json(
            { error: "No prompt found in request" },
            { status: 400 }
        );
    }

    let imageId;

    try {
        imageId = await generateImage(prompt);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            "Error while making request to external API:",
            error.message
          );
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }
     
      return NextResponse.json({ imageId });
}