export class DuplicateError extends Error {
  resource: string;
  field: string;

  constructor(resource: string, field: string) {
    super();
    this.resource = resource;
    this.field = field;
    this.name = 'DuplicateError';
  }
}
