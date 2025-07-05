import {
  BedrockClient,
  ListInferenceProfilesCommand,
} from "@aws-sdk/client-bedrock";
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { Message } from "@aws-sdk/client-bedrock-runtime/dist-types/models/models_0";
import dotenv from "dotenv";

dotenv.config();

async function listInferenceProfiles() {
  const client = new BedrockClient({
    region: "ap-northeast-2",
    profile: process.env.AWS_PROFILE,
  });

  try {
    const command = new ListInferenceProfilesCommand({});
    const response = await client.send(command);

    console.log("Available inference profiles:");
    response.inferenceProfileSummaries?.forEach((profile) => {
      console.log(
        `- ${profile.inferenceProfileName} (${profile.inferenceProfileId})`
      );
      console.log(`사용가능: (${profile.inferenceProfileId})`);
    });

    console.log("profile.models안에는 modelArn이 존재합니다.");
  } catch (error) {
    console.error("Error listing inference profiles:", error);
  }
}

(async () => {
  console.log("사용 가능 LIST Start");
  await listInferenceProfiles();
  console.log("사용 가능 LIST End");

  const client = new BedrockRuntimeClient({
    region: "ap-northeast-2",
    profile: process.env.AWS_PROFILE,
  });

  const modelId = process.env.BEDROCK_MODEL_ID;

  // 여기에 유저의 프롬프트가 입력되도록 하면 됩니다.
  const userMessage = "안녕 간단한 인사 부탁해";

  const conversation: Message[] = [
    {
      role: "user",
      content: [{ text: userMessage }],
    },
  ];

  const command = new ConverseCommand({
    modelId,
    messages: conversation,
    inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
  });

  try {
    const response = await client.send(command);

    if (
      response &&
      response.output &&
      response.output.message &&
      response.output.message.content
    ) {
      const responseText = response.output.message.content
        .map((value) => value.text)
        .join("\n");
      console.log({ 질의: userMessage });
      console.log({ 응답: responseText });
    }
  } catch (err) {
    console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
    process.exit(1);
  }
})();
