import { BtnType } from "./enum";

export interface IFooterPanel  {
  text: string;
  onClick: () => void;
  type: BtnType;
  disabled: boolean;
}
