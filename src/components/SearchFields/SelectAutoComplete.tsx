import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type Props = {
  onChangeHandler: (e: React.SyntheticEvent, value: string | string[]) => void;
  dataArray: any[];
  textsField: { labelText: string; placeholderText: string };
};

export const SelectAutoComplete: React.FC<Props> = ({
  onChangeHandler,
  dataArray,
  textsField,
}) => {
  return (
    <Autocomplete
      size='small'
      sx={{ width: '100%' }}
      options={dataArray}
      onChange={(e, value) => onChangeHandler(e, value)}
      getOptionLabel={(color) => color}
      renderInput={(params) => (
        <TextField
          {...params}
          label={textsField.labelText}
          placeholder={textsField.placeholderText}
        />
      )}
    />
  );
};
