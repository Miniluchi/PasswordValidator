import { describe, it, expect } from 'vitest';
import PasswordValidator from '../src/passwordValidator.js';

describe('PasswordValidator', () => {
  it('should return false if password length is less than 8 and bigger than 20', () => {
    expect(PasswordValidator.isLengthInRange('pass')).toBe(false);
    expect(PasswordValidator.isLengthInRange('passwordpasswordpassword')).toBe(false);
    expect(PasswordValidator.isLengthInRange('password')).toBe(true);
  });

  it('should contain at least one uppercase char', () => {
    expect(PasswordValidator.hasUpperCase('password')).toBe(false);
    expect(PasswordValidator.hasUpperCase('Password')).toBe(true);
  });

  it('should contain at least one lowercase char', () => {
      expect(PasswordValidator.hasLowerCase('PASSWORD')).toBe(false);
      expect(PasswordValidator.hasLowerCase('password')).toBe(true);
  });

  it('should contain at least one number', () => {
      expect(PasswordValidator.hasNumber('password')).toBe(false);
      expect(PasswordValidator.hasNumber('password1')).toBe(true);
  });

  it('should contain at least one special char', () => {
      expect(PasswordValidator.hasSpecialChar('password')).toBe(false);
      expect(PasswordValidator.hasSpecialChar('password!')).toBe(true);
  });

  it('should not contain spaces', () => {
      expect(PasswordValidator.hasNoSpaces('pass word')).toBe(false);
      expect(PasswordValidator.hasNoSpaces('password')).toBe(true);
  });

  it('should not contain repeating characters', () => {
      expect(PasswordValidator.hasNoRepeatingChars('passsworrd')).toBe(false);
      expect(PasswordValidator.hasNoRepeatingChars('password')).toBe(true);
  });

  it('should have at least 3 out of 4 of the following: uppercase, lowercase, numbers, and special characters', () => {
      expect(PasswordValidator.hasRequiredCharTypes('password&')).toStrictEqual({ count: 2, valid: false });
      expect(PasswordValidator.hasRequiredCharTypes('Password')).toStrictEqual({ count: 2, valid: false });
      expect(PasswordValidator.hasRequiredCharTypes('Password1')).toStrictEqual({ count: 3, valid: true });
      expect(PasswordValidator.hasRequiredCharTypes('Password1!')).toStrictEqual({ count: 4, valid: true });
  });

  it('should not contain the username', () => {
      const user = { username: 'user' };
      expect(PasswordValidator.hasNoUsername(user, 'passworduser')).toBe(false);
      expect(PasswordValidator.hasNoUsername(user, 'password')).toBe(true);
  });

  it('should not be a common password', () => {
    expect(PasswordValidator.isNotCommonPassword('dragon')).toBe(false);
    expect(PasswordValidator.isNotCommonPassword('dhqsiudqs')).toBe(true);
  });

  it('should check all the prerequisites', () => {
    const user = { username: 'user' };
    expect(PasswordValidator.validate(user, 'password', [])).toStrictEqual({valid: false, strength: 1});
    expect(PasswordValidator.validate(user, 'Passwordaze', [])).toStrictEqual({valid: false, strength: 2});
    expect(PasswordValidator.validate(user, 'Password1', [])).toStrictEqual({valid: false, strength: 1});
    expect(PasswordValidator.validate(user, 'Abd&"lo9!', [])).toStrictEqual({valid: true, strength: 2});
    expect(PasswordValidator.validate(user, '3&GFdbB#63', [])).toStrictEqual({valid: true, strength: 3});
    expect(PasswordValidator.validate(user, 'GkT#eDAmmpCbcJN!AB?', [])).toStrictEqual({valid: false, strength: 3});
    expect(PasswordValidator.validate(user, 'Aklo5fg1&lmOd!g', [])).toStrictEqual({valid: true, strength: 4});
  });


});