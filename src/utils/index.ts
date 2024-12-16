// ALL REGEX FROM THE INTERNET, PLEASE CONSIDER INTERNET FOR CLARIFICATION
// Don't blame me ^_^

export const validateEmail = (value: string) => {
  if (!value) return 'Email is required.';
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(value) ? '' : 'Please enter a valid email address.';
};

export const validatePassword = (value: string, security = 'low') => {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'At least 8 characters required.';
  if (!/[A-Z]/.test(value)) return 'Add at least one uppercase letter.';
  if (security === 'max' && !/[!@#$%^&*(),.?":{}|<>]/.test(value))
    return 'Include one symbol.';
  if (security !== 'max' && /[!@#$%^&*(),.?":{}|<>]/.test(value))
    return 'Symbols are not allowed.';
  return '';
};

export const validateDate = (value: string) => {
  if (!value) return 'Date is required.';
  return isNaN(Date.parse(value)) ? 'Please enter a valid date.' : '';
};

export const validateNumber = (value: string) => {
  if (!value) return 'Number is required.';
  return isNaN(Number(value)) ? 'Please enter a valid number.' : '';
};

export const capitalizeFirstLetter = (val: string) => {
  if (!val) return '';
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const debounce = (fn: (...args: any[]) => void, timeout: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
};
