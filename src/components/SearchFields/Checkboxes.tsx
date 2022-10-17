import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  ariaLabel: string;
};
export const Checkboxes: React.FC<Props> = ({ ariaLabel }) => {
  const label = { inputProps: { 'aria-label': ariaLabel } };

  return (
    <Checkbox
      {...label}
      sx={{
        color: 'rgb(129, 198, 255)',
        '&.Mui-checked': {
          color: 'rgb(93, 181, 253);',
        },
        '& .MuiSvgIcon-root': { fontSize: 28 },
      }}
    />
  );
};
