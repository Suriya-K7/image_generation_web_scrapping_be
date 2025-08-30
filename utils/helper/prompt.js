/**
 *
 * @param blogTitle title of the blog post
 * @param blogOutline all outline of the blog post
 * @returns a prompt for generating keywords for intro of the blog
 */
function getIntroPrompt(blogTitle, blogOutline) {
  return `Your task is to create effective keywords that can be used to find relevant images for a given blog title and outline. These will be used to search for images on stock image websites.
  
    Guidelines:
    1. Focus on the main theme or key concepts of the blog post.
    2. Provide 3 keywords, each in 1 or 2 words that can yield relevant images when searched, offering a broader set of results. 
    3. For example, if the title is "How to make biryani," the keywords could be "ingredients, biryani, biryani rice"
    4. Ensure the keywords will help me find an image that can represent as a cover image for the blog post.
  
    Output Instructions:
    1. Do not add any additional text, introductory phrases, or quotation marks.
    2. Do not add any headings or special characters.
    3. Provide the keywords separated by comma ',' without any numbering.
    4. The keywords should always be in English.
    5. Do not provide more than 3 keywords.
  
    Parameters:
    1. Blog post title: '${blogTitle}'
    2. Blog post outline: '${blogOutline}'`;
}

/**
 *
 * @param blogTitle title of the blog post
 * @param blogOutline all outline of the blog post
 * @returns a prompt for generating keywords for outro of the blog
 */
function getOutroPrompt(blogTitle, blogOutline) {
  return `Your task is to create effective keywords that can be used to find relevant images for a given blog title and section heading. These will be used to search for images on stock image websites.
  
    Guidelines:
    1. Focus on the main theme or key concepts of the blog post.
    2. Provide 3 keywords, each in 1 or 2 words that can yield relevant images when searched, offering a broader set of results. 
    3. For example, if the title is "How to make biryani," the keywords could be "ingredients, biryani, biryani rice".
    4. Ensure the keywords will help me find an image that can represent that can represent the specific blog section.
  
    Output Instructions:
    1. Do not add any additional text, introductory phrases, or quotation marks.
    2. Do not add any headings or special characters.
    3. Provide the keywords separated by comma ',' without any numbering.
    4. The keywords should always be in English.
    5. Do not provide more than 3 keywords.

    Parameters:
    1. Blog post title: '${blogTitle}'
    2. Section Heading: '${blogOutline}'`;
}

/**
 *
 * @param blogTitle title of the blog post
 * @param sectionHeading section heading of the blog post
 * @returns a prompt for generating keywords for section of the blog
 */
function getSectionPrompt(blogTitle, sectionHeading) {
  return `Your task is to create effective keywords that can be used to find relevant images for a given blog title and section heading. These will be used to search for images on stock image websites.

    Guidelines:
    1. Focus on the main theme or key concepts of the blog post.
    2. Provide 3 keywords, where each keyword is 1 or 2 words. These keywords should yield relevant images when searched, offering a broader set of results.
    3. For example, if the title is "How to make biryani," and section heading is 'Cooking Ingredients' the keywords could be "ingredients, biryani ingredients, spices".
    4. Ensure the keywords will help me find an image that can represent that can represent the specific blog section.

    Output Instructions:
    1. Do not add any additional text, introductory phrases, or quotation marks.
    2. Do not add any headings or special characters.
    3. Provide the keywords separated by comma ',' without any numbering.
    4. The keywords should always be in English.
    5. Do not provide more than 3 keywords.

    Parameters:
    1. Blog post title: '${blogTitle}'
    2. Section Heading: '${sectionHeading}'`;
}

/**
 *
 * @param blogTitle title of the blog post
 * @returns a prompt for validating intro image in vision
 */
function getIntroVisionPrompt(blogTitle) {
  return `You are tasked with selecting the most suitable image from a collage to represent a given blog post title. You will be provided with blog post title & a collage of images, each labeled with a number.

      Here's the blog title: "${blogTitle}"

      Guidelines:
      1. Carefully analyze each image in the collage.
      2. Select one image that is most relevant and specifically represents the subject mentioned in the blog title.
      3. The chosen image must be highly accurate and directly relevant to the blog title and represents as the blog post cover image. 
      4. Do not select an image that is only partially relevant or tangentially related.
      5. If none of the images meet these criteria, you should respond with 'No'.

      Output Instructions:
      1. Respond with only the number on the image you have selected.
      2. If no image is accurate, respond with 'No'.
      3. Do not provide any explanation or justification for your choice. Also, do not add any formatting.`;
}

/**
 *
 * @param blogTitle title of the blog post
 * @returns a prompt for validating outro image in vision
 */
function getOutroVisionPrompt(blogTitle) {
  return `You are tasked with selecting the most suitable image from a collage to represent a given blog post title. You will be provided with blog post title & a collage of images, each labeled with a number.

      Here's the blog title: "${blogTitle}"

      Guidelines:
      1. Carefully analyze each image in the collage.
      2. Select one image that is most relevant and specifically represents the subject mentioned in the blog title.
      3. The chosen image must be highly accurate and directly relevant to the blog title and represents as the blog post conclusion image. 
      4. Do not select an image that is only partially relevant or tangentially related.
      5. If none of the images meet these criteria, you should respond with 'No'.

      Output Instructions:
      1. Respond with only the number on the image you have selected.
      2. If no image is accurate, respond with 'No'.
      3. Do not provide any explanation or justification for your choice. Also, do not add any formatting.`;
}

/**
 *
 * @param blogTitle title of the blog post
 * @param sectionHeading section heading of the blog post
 * @returns a prompt for validating section image in vision
 */
function getSectionVisionPrompt(blogTitle, sectionHeading) {
  return `You are tasked with selecting the most suitable image from a for a specific blog post section.

      Here's the section heading: "${sectionHeading}"
      Here's the blog title: "${blogTitle}"

      Guidelines:
      1. Carefully analyze each image in the collage.
      2. Select one image that is most relevant and specifically represents the subject mentioned in the blog section heading, particularly in relation to the overall blog title.
      3. The chosen image should not only be relevant but also 100% accurate in depicting the exact section heading in relevance to the title.
      4. Do not select an image that is only partially relevant or tangentially related.
      5. If none of the images meet these criteria, you should respond with 'No'.

      Output Instructions:
      1. Respond with only the number on the image you have selected.
      2. If no image is accurate, respond with 'No'.
      3. Do not provide any explanation or justification for your choice. Also, do not add any formatting.`;
}

module.exports = {
  getIntroPrompt,
  getOutroPrompt,
  getSectionPrompt,
  getIntroVisionPrompt,
  getOutroVisionPrompt,
  getSectionVisionPrompt,
};
