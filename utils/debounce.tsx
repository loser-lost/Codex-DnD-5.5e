export const debounce = (func: (...args: string[]) => void, wait: number) => {
  let timeout: number;
  return (...args: string[]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};