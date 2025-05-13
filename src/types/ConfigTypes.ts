import { LinkStyleType } from "./PageTypes";

export interface ClientStylesType extends LinkStyleType {
  background: File | string;
  textColor: string;
  cardColor: string;
}
