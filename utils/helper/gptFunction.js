const OpenAI = require("openai");
const { OPENAI_API_KEY } = require("../config");

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

/**
 *
 * @param prompt to generate keywords using openai
 * @returns set of keywords for fetching image from stock image sites
 */
async function generateKeyword(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.2,
    });

    console.log("gpt keywords ", response.choices[0].message.content);

    const keywords = response.choices[0].message.content
      .split(",")
      .map((e) => e.trim());

    return keywords.slice(0, 3);
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param imageUrl collage image url
 * @param prompt to generate validate image using openai
 * @param imageResults array of images fetched from stock image sites
 * @returns selected image from imageResults array & token used by vision
 */
async function visionValidation(imageUrl, prompt, imageResults) {
  try {
    const content = [
      {
        type: "text",
        text: prompt,
      },
      {
        type: "image_url",
        image_url: {
          url: imageUrl,
        },
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });

    const tokenUsed = response.usage.total_tokens;

    const imageIndex = Number(response.choices[0].message.content.trim()) - 1;

    const result = imageResults[imageIndex];

    return { result: result ? result : "No Image found", tokenUsed };
  } catch (error) {
    console.log("gpt vision error");

    console.log(error);
  }
}

module.exports = {
  generateKeyword,
  visionValidation,
};
