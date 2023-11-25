import { ErrCode } from './Enum';

export interface ResponseINF<T> {
  errCode: ErrCode;
  data: T;
}
