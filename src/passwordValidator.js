const {join} = require("node:path");
const {readFileSync} = require("node:fs");

class PasswordValidator {

  static hasNoSpaces(password) {
    return !password.includes(' ');
  }

  static hasNoRepeatingChars(password) {
    return !/(.)\1{2,}/.test(password);
  }

  static isLengthInRange(password) {
    return password.length >= 6 && password.length <= 20;
  }

  static hasNoUsername(user, password) {
    return !user.username || !password.includes(user.username);
  }

  static hasUpperCase(password) {
    return /[A-Z]/.test(password);
  }

  static hasLowerCase(password) {
    return /[a-z]/.test(password);
  }

  static hasNumber(password) {
    return /[0-9]/.test(password);
  }

  static hasSpecialChar(password) {
    return /[^A-Za-z0-9]/.test(password);
  }

  static hasRequiredCharTypes(password) {
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const numbers = /[0-9]/;
    const specialChars = /[^A-Za-z0-9]/;

    let count = 0;
    if (upperCase.test(password)) count++;
    if (lowerCase.test(password)) count++;
    if (numbers.test(password)) count++;
    if (specialChars.test(password)) count++;

    return { count, valid: count >= 3 };
  }

  static isNotCommonPassword(password) {
    // Use 10k most common passwords file to check
    const commonPasswordsPath = join(__dirname, '10k-most-common.txt');
    const commonPasswords = readFileSync(commonPasswordsPath, 'utf-8').split('\n');

    return !commonPasswords.includes(password);
  }

  static validate(user, password) {
      const requiredCharTypes = this.hasRequiredCharTypes(password);
      const valid = this.hasNoSpaces(password) &&
                      this.hasNoRepeatingChars(password) &&
                      this.isLengthInRange(password) &&
                      this.hasNoUsername(user, password) &&
                      this.hasUpperCase(password) &&
                      this.hasLowerCase(password) &&
                      this.hasNumber(password) &&
                      this.hasSpecialChar(password) &&
                      requiredCharTypes.valid &&
                      this.isNotCommonPassword(password);

        // Streng : 0-4
        // 0: Very Weak
        // 1: Weak
        // 2: Medium
        // 3: Strong
        // 4: Very Strong

        let strength = 0;
        if (password.length >= 10) {
            strength++;
        }
        if (password.length >= 15) {
            strength++;
        }
        if (this.hasNoRepeatingChars(password)) {
            strength++;
        }
        if(requiredCharTypes.count === 4) {
            strength++;
        }

    return { valid, strength };
  }
}

module.exports = PasswordValidator;