import React, { ChangeEvent, useState } from 'react';
import { StyledCheckbox } from './Checkbox.styles';
import { useValidators } from 'src/hooks/useValidators';

type Props = {
  children: string | JSX.Element[] | JSX.Element;
  opt: string;
  handleThrowError: (inputName: string, errorMessage: string) => void;
  className?: string;
};

const Checkbox = ({ children, opt, handleThrowError, className = ''}: Props) => {
  const [isCheckboxCheck, setIsCheckboxCheck] = useState(false);
  const { validateCheckbox } = useValidators(handleThrowError);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxCheck(e.target.checked);
    validateCheckbox(e.target);
  };

  return (
    <div className={className}>
      <StyledCheckbox
        id={opt}
        name={opt}
        checked={isCheckboxCheck}
        onChange={onCheckboxChange}
        inputProps={{ 'data-required': true }}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
      />
      <label
        className="inline text-darkBlue font-semibold cursor-pointer max-w-full"
        htmlFor={opt}
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
