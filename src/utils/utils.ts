export function isValidSku(string: string) {
  const regex = new RegExp(/^FAL-([0-9]{7,8})$/);
  if (!regex.test(string)) return false;
  return true;
}
