import { IPersonaProps, IPersonaStyles, Label } from '@fluentui/react';
import { IBasePickerSuggestionsProps, ListPeoplePicker, PeoplePickerItemSuggestion } from '@fluentui/react/lib/Pickers';
import './index.scss'

const personaStyles: Partial<IPersonaStyles> = {
  root: {
    height: 'auto',
  },
  secondaryText: {
    height: 'auto',
    whiteSpace: 'normal',
  },
  primaryText: {
    height: 'auto',
    whiteSpace: 'normal',
  },
};

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Kết quả',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: false,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

interface ICustomPeoplePickerProps {
  selectedPeople: any[];
  fetchSuggestions: any;
  onChange: any;
  label: string;
  placeholder?: string;
}

const CustomPeoplePicker = ({ ...props }: ICustomPeoplePickerProps) => {
  const handlePeoplePickerChange = (items) => {
    props.onChange(items);
  };

  const onRenderSuggestionItem = (personaProps: IPersonaProps, suggestionsProps: IBasePickerSuggestionsProps) => {
    return (
      <PeoplePickerItemSuggestion
        personaProps={{ ...personaProps, styles: personaStyles }}
        suggestionsProps={suggestionsProps}
      />
    );
  };

  return (
    <div className='custompeoplepicker'>
      <Label className='custompeoplepicker-label'>{props.label}</Label>
      <ListPeoplePicker
        selectedItems={props.selectedPeople}
        onResolveSuggestions={props.fetchSuggestions}
        onChange={handlePeoplePickerChange}
        onRenderSuggestionsItem={onRenderSuggestionItem}
        pickerSuggestionsProps={suggestionProps}
        disabled={false}
        inputProps={
          { placeholder: props.placeholder || "" }
      }
      />
    </div>
  );
};

export default CustomPeoplePicker;
