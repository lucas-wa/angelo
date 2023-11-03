import { Leap } from "@leap-ai/sdk";
import { saveUserImage } from "./firebase";

const leap = new Leap({
  accessToken: process.env.NEXT_PUBLIC_LEAP_API_KEY,
});

export async function generateImage(prompt) {

  const generateImageResponse = await leap.images.generate({
    modelId: "7575ea52-3d4f-400f-9ded-09f7b1b1a5b8",
    prompt,
    steps: 50,
    width: 1024,
    height: 1024,
    numberOfImages: 1,
    promptStrength: 7,
    seed: 4523184,
  });

  const inferenceId = generateImageResponse.data.id;


  return inferenceId;

}

export async function getImage(inferenceId){

  const getImageResponse = await leap.images.findOne({
    modelId: "7575ea52-3d4f-400f-9ded-09f7b1b1a5b8",
    inferenceId
  });

  if(getImageResponse.data.status !== "finished") return null;

  const uri = getImageResponse.data.images[0].uri;

  await saveUserImage(uri);

  return uri;

}