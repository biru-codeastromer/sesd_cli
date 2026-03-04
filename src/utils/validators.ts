export class Validator {
  static required(value: string, fieldName: string): void {
    if (!value || !value.trim()) {
      throw new Error(`${fieldName} is required.`);
    }
  }

  static repoSlug(value: string): void {
    if (!/^[\w.-]+\/[\w.-]+$/.test(value)) {
      throw new Error('Repository must be in the format "owner/repo".');
    }
  }

  static oneOf<T extends string>(value: string, allowed: T[], fieldName: string): asserts value is T {
    if (!allowed.includes(value as T)) {
      throw new Error(`${fieldName} must be one of: ${allowed.join(', ')}`);
    }
  }

  static positiveInt(value: string, fieldName: string, max = 20): number {
    const num = Number(value);
    if (!Number.isInteger(num) || num < 1 || num > max) {
      throw new Error(`${fieldName} must be an integer between 1 and ${max}.`);
    }
    return num;
  }
}
