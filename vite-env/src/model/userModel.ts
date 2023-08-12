import { IDropdownOption } from "@fluentui/react";
import { Gender } from "./enum";

export const onFormatDate = (date?: Date): string => {
  return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
};

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