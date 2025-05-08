import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://translate.argosopentech.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const translateText = async (text, targetLang = 'zh') => {
  try {
    const response = await apiClient.post('/translate', {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text',
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
};
