import CustomPeoplePicker from "./custompeoplepicker";
import { IPersonaProps } from "@fluentui/react";

interface IPickerProps {
  label: string;
  value: IPersonaProps[];
  placeholder?: string;
  onChangeCallBack: (value: any) => void;
  integrateItems: (requestBody: any) => Promise<any>;
  mappingValues: (datas: any) => any[]
}

function Picker({...props}: IPickerProps) {

  function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
  }

  function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
  }

  const fetchSuggestions = async (keyWord: any) => {
    const data = await props.integrateItems({ searchKey: keyWord })
    return removeDuplicates(props.mappingValues(data.data), props.value);
  };

  const handlePeoplePickerChange = (people: any) => {
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
