import { useState } from "react";
import CustomPeoplePicker from "./custompeoplepicker";
import { IPersonaProps } from "@fluentui/react";

function Picker() {
  const [selectedPeople, setSelectedPeople] = useState([]);

  const people = [
    {
      displayName: 'kkkkk',
      key: 1,
      imageUrl: '',
      imageInitials: 'PV',
      text: 'Annie Lindqvist',
      secondaryText: 'Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'iiiii',
      key: 2,
      imageUrl: "",
      imageInitials: 'AR',
      text: 'Aaron Reid',
      secondaryText: 'Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'hhhhhh',
      key: 3,
      imageUrl: "",
      imageInitials: 'AL',
      text: 'Alex Lundberg',
      secondaryText: 'Software Developer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'ggggg',
      key: 4,
      imageUrl: "",
      imageInitials: 'RK',
      text: 'Roko Kolar',
      secondaryText: 'Financial Analyst',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'fffff',
      key: 5,
      imageUrl: "",
      imageInitials: 'CB',
      text: 'Christian Bergqvist',
      secondaryText: 'Sr. Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'eeee',
      key: 6,
      imageUrl: '',
      imageInitials: 'VL',
      text: 'Valentina Lovric',
      secondaryText: 'Design Developer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'dddd',
      key: 7,
      imageUrl: "",
      imageInitials: 'MS',
      text: 'Maor Sharett',
      secondaryText: 'UX Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'ccccc',
      key: 8,
      imageUrl: '',
      imageInitials: 'PV',
      text: 'Anny Lindqvist',
      secondaryText: 'Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'bbbbb',
      key: 9,
      imageUrl: "",
      imageInitials: 'AR',
      text: 'Aron Reid',
      secondaryText: 'Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    },
    {
      displayName: 'aaaa',
      key: 10,
      imageUrl: "",
      imageInitials: 'AL',
      text: 'Alix Lundberg',
      secondaryText: 'Software Developer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      isValid: true,
    }
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

    return people;
  };

  // Hàm xử lý khi có người được chọn trong custom People Picker
  const handlePeoplePickerChange = (people) => {
    setSelectedPeople(people);
  };

  return (
    <div>
      <CustomPeoplePicker
        label="example"
        selectedPeople={selectedPeople}
        fetchSuggestions={fetchSuggestions}
        onChange={handlePeoplePickerChange}
        placeholder="Search ...."
      />
      <button onClick={() => console.log(selectedPeople)} >Click</button>
    </div>
  );
}

export default Picker;
