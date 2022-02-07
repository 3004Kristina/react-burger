import IWsMessageOrder from './WsMessageOrder';

export default interface IWsMessage {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<IWsMessageOrder>;
  timestamp?: number;
}
