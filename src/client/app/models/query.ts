export class FormQuery {
  constructor(
    public expertise: string,
    public role: string
  ) {}
}

export interface ReturnQuery {
  name: string;
  department: string;
  info: string;
}
