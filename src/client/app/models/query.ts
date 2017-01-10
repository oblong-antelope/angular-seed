export interface PaginatedReturnQuery {
  count: number;
  this_page?: ShortProfile[];
  next_page?: string;
  previous_page?: string;
}

export interface ShortProfile {
  name: Name;
  link: string; // /api/people/id
  keywords?: string[];
  email?: string;
  faculty?: string;
  department?: string;
}

export interface Profile {
  name: Name;
  department?: string;
  campus?: string;
  faculty?: string;
  building?: string;
  room?: string;
  email?: string;
  website?: string;
  keywords: any;
  publications?: string[];
}

export interface Name {
  first : string;
  last : string;
  title? : string;
  initials? : string;
  alias? : string;
}

export interface Publication {
  title: string;
  abstract: string;
  date: string;
  authors: ShortProfile[];
}
