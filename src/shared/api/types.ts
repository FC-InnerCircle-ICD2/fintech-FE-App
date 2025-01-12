export type RegisterDTO = {
  email: string;
  password: string;
  name: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

// TODO: 응답 데이터 논의 필요
export type OrderInfoDTO = {
  orderId: string;
  orderName: string;
  amount: number;
  store: string;
  url?: string;
};

// TODO: 응답 데이터 논의 필요
export type HistoryDTO = {
  id: number;
  orderId: string;
  amount: number;
};

// TODO: 응답 데이터 논의 필요
export type HistoryDetailDTO = {
  id: number;
  orderId: string;
  amount: number;
};
