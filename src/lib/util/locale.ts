export const convertCurrencyFormat = (amount: number) => {
  return amount.toLocaleString('ko');
};

export const converDateFormat = (date: string) => {
  return new Date(date).toLocaleDateString('ko');
};
