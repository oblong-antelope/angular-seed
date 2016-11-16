export class FormQuery {
  constructor(
    public name: string,
    public expertise: string,
    public role: string
  ) {}
}

export interface ReturnQuery {
  name: string;
  research_summary: string;
  full_profile: string;
}

export interface ReturnListQuery {
  results: ReturnQuery[];
  status: boolean;
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
