import axios from 'axios';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'AIzaSyBfDjYOl_251PfNwkaw_bl_5hDREpMgJcA';

export const getDryRunSummary = async (algorithm, array) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_ENDPOINT}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Provide a step-by-step dry run summary of the ${algorithm} algorithm for the following array: ${JSON.stringify(array)}. Please keep it concise and focus on key steps.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching dry run summary:', error);
    return 'Unable to generate dry run summary at this time.';
  }
};