export interface ScanResult {
  token: string;
  expiredAt: number;
}

export enum QRTabKey {
  QR = 'qr',
  SCAN = 'scan',
}
