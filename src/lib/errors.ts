export class DomainError extends Error {
  public readonly cause?: unknown;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = new.target.name;
    this.cause = options?.cause;
  }
}

export class ValidationError extends DomainError {
  public readonly details: ReadonlyArray<string>;

  constructor(message: string, details: ReadonlyArray<string>) {
    super(message);
    this.details = details;
  }
}

export class NotFoundError extends DomainError {}

export class ConflictError extends DomainError {}
