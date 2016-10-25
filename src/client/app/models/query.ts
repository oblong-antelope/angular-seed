export class FormQuery {
  constructor(
    public name: string,
    public expertise: string,
    public role: string
  ) {}
}

export interface ReturnQuery {
  name: string;
  department: string;
  email: string;
  info: string;
}

export interface ReturnLinkQuery {
  success: boolean;
  results: string;
}
