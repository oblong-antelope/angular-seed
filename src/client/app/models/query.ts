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
  research_summary: string;
  full: string;
}

export interface ReturnLinkQuery {
  success: boolean;
  results: string;
}

export interface ResearchSummary {
  papers: number;
	keywords: string[];
	recent_paper: string;
	full_profile: string;
}

export interface Profile {
  name: string;
  department: string;
  email: string;
  keywords: Object;
  papers: string[];
  awards: string[];
}
