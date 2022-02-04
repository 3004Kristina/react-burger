import IWsMessage from '../WsMessage';

export type TWsInitialState = {
  wsConnected: boolean;
  messages: Array<IWsMessage>;
}
