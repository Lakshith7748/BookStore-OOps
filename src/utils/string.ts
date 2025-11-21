export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const uncapitalize = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
export const reverseStr = (s: string) => s.split('').reverse().join('');
