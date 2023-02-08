export const useValidators = (handleThrowError: any) => {
  const validateEmpty = (target: HTMLInputElement | HTMLTextAreaElement) => {
    const inputValue = target.value;
    // @ts-ignore
    const placeholder = target.getAttribute('placeholder').toLowerCase();
    const name = target.name;

    if (inputValue === '' || inputValue === undefined || inputValue === null) {
      target.classList.add(
        'border-red-500',
        'shadow-red-500',
        '!focus:shadow-red-500',
        'shadow-lg'
      );
      target.classList.remove('border-black', 'focus:border-darkBlue');
      handleThrowError(name, `Pole ${placeholder} jest wymagane`);
    } else {
      target.classList.add('border-black', 'focus:border-darkBlue');
      target.classList.remove(
        'border-red-500',
        'shadow-red-500',
        'focus:shadow-red-500',
        'shadow-lg'
      );
      handleThrowError(name, '');
    }
  };

  const validateEmail = (target: HTMLInputElement | HTMLTextAreaElement) => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const isInvalid = !Boolean(target.value.match(pattern));
    if (isInvalid && target.value !== '') {
      target.classList.add(
        'border-red-500',
        'shadow-red-500',
        '!focus:shadow-red-500',
        'shadow-lg'
      );
      target.classList.remove('border-black', 'focus:border-darkBlue');
      handleThrowError(target.name, 'Wprowadź poprawny email');
    } else {
      validateEmpty(target);
    }
  };

  const validatePhone = (target: HTMLInputElement | HTMLTextAreaElement) => {
    const pattern = new RegExp(/([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/);

    const isInvalid = !Boolean(target.value.replaceAll(' ', '-').match(pattern));
    if (isInvalid && target.value !== '') {
      target.classList.add(
        'border-red-500',
        'shadow-red-500',
        '!focus:shadow-red-500',
        'shadow-lg'
      );
      target.classList.remove('border-black', 'focus:border-darkBlue');
      handleThrowError(target.name, 'Wprowadź poprawny telefon');
    } else {
      validateEmpty(target);
    }
  };

  const validateCheckbox = (target: HTMLInputElement) => {
    const label = document.querySelector(`label[for=${target.name}]`)
    const svg = target.parentElement?.querySelector('svg');
    const isInvalid = !target.checked;

    if (isInvalid) {
      svg?.classList.add( 'bg-red-200');
      label?.classList.add('text-red-500');
      label?.classList.remove('text-darkBlue');
      handleThrowError('checked', 'Wymagane zaznaczenie pola');
    } else {
      svg?.classList.remove( 'bg-red-200');
      label?.classList.remove('text-red-500');
      label?.classList.add('text-darkBlue');
      handleThrowError('checked', '');
    }
  }

  return {
    validateEmpty,
    validateEmail,
    validatePhone,
    validateCheckbox
  };
};
