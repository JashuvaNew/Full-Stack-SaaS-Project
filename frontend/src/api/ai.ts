import instance from './axios';

export const askAI = async (prompt: string) => {
  const res = await instance.post('/ai/chat', { prompt });
  return res.data.answer;
};
