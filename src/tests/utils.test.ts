import { isValidSku } from '../utils/utils';

describe('Valid SKU Test', () => {
  it('should test that FAL-1000000 is valid', () => {
    const isValid = isValidSku('FAL-1000000');
    expect(isValid).toBe(true);
  });

  it('should test that abc_9999 is invalid', () => {
    const isValid = isValidSku('abc_9999');
    expect(isValid).toBe(false);
  });
});
