export interface ReturnQuery {
  name: Name;
  link: string; // /api/people/id
  keywords: string[];
  email: string;
  faculty: string;
  department: string;
}

export interface ReturnListQuery {
  results: ReturnQuery[];
  status: boolean;
}

export interface ReturnLinkQuery {
  success: boolean;
  results: string;
}

export interface Profile {
  name: Name;
  department: string;
  campus: string;
  faculty: string;
  building: string;
  room: string;
  email: string;
  website: string;
  keywords: Object;
  publications: string[];
}

export interface Name {
  first : string;
  last : string;
  title : string;
  initials: string;
  alias: string;
}

export interface Publication {
  title: string;
  abstract: string;
  date: string;
  authors: ReturnQuery[];
}
