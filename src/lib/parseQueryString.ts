export const parseQueryString = (queryString: string) => {
  try {
    const url = new URL(queryString);
    const params = new URLSearchParams(url.search);

    return {
      token: params.get('token') || '',
      expiredAt: Number(params.get('expiredAt')) || 0,
    };
  } catch (error) {
    console.error('Invalid URL:', error);
    return { token: '', expiredAt: 0 };
  }
};
