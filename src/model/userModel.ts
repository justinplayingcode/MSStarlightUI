import { IDropdownOption } from "@fluentui/react";
import { Gender } from "./enum";

export interface userModel{
    
}

export const gender: IDropdownOption[] = [
    {
      key: `${Gender.male}`,
      text: 'Nam'
    },
    {
      key: `${Gender.female}`,
      text: 'Nữ'
    }
  ]