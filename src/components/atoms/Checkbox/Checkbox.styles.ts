// @ts-ignore
import styled from 'styled-components';
import { Checkbox } from '@mui/material';

export const StyledCheckbox = styled(Checkbox)`
  color: ${({ checked }: { checked: boolean }) => (checked ? '#00DEFF !important' : '')};

  & .MuiSvgIcon-root {
    border: ${({ checked }: { checked: boolean }) => (checked ? 'solid 1px #001E54' : 'none')};
    border-radius: 5px;
    transition: border 300ms ease;
  }
`;
