export default interface IWsMessageOrder {
  _id: string;
  name: string;
  number: number;
  status: string;
  ingredients: Array<string>;
  createdAt: string;
  updatedAt: string;
}
