import { FormGroup, FormControlLabel, Switch } from '@mui/material';

type Props = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  switchState: boolean;
  textCases: { trueString: string; falseString: string };
};

export const SwitchBtn: React.FC<Props> = ({
  onChangeHandler,
  switchState,
  textCases,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={switchState} onChange={(e) => onChangeHandler(e)} />
        }
        label={`Order by ${
          switchState ? textCases.trueString : textCases.falseString
        }`}
      />
    </FormGroup>
  );
};
