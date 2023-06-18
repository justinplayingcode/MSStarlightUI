import { useState } from "react";
import CustomPeoplePicker from "./custompeoplepicker";
import { IPersonaProps } from "@fluentui/react";

interface IPickerProps {
  label: string;
  value: IPersonaProps[];
  placeholder?: string;
  onChangeCallBack: (value) => void;
}

function Picker({...props}: IPickerProps) {

  const peoples = [
    {
      displayName: 'kkkkk',
      text: 'Annie Lindqvist',
      secondaryText: 'Designer',
    },
    {
      displayName: 'iiiii',
      text: 'Aaron Reid',
      secondaryText: 'Designer',
    },
    {
      displayName: 'hhhhhh',
      text: 'Alex Lundberg',
      secondaryText: 'Software Developer',
    },
  ];

  function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
  }

  function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
  }

  // Hàm gọi API để nhận danh sách gợi ý
  const fetchSuggestions = async (searchQuery) => {
    // const suggestions = await yourApiCall(searchQuery);

    //people is result of api
    return removeDuplicates(peoples, props.value);
  };

  // Hàm xử lý khi có người được chọn trong custom People Picker
  const handlePeoplePickerChange = (people) => {
    props.onChangeCallBack(people)
  };

  return (
    <div>
      <CustomPeoplePicker
        label={props.label}
        selectedPeople={props.value}
        fetchSuggestions={fetchSuggestions}
        onChange={handlePeoplePickerChange}
        placeholder={props.placeholder || "Search by name"}
      />
    </div>
  );
}

export default Picker;
