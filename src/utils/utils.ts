export function isValidSku(string: string) {
  const regex = /^FL-([0-9]{7,8})$/g;
  if (!regex.test(string)) return false;
  return true;
}
