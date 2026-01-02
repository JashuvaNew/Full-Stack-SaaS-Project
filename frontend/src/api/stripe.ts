import instance from './axios';

export const createCheckoutSession = async (plan: string) => {
  const res = await instance.post('/billing/checkout', { plan });
  return res.data.checkouturl;
};
