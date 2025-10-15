export interface IProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  images: string[];
  video?: string | null;
  isFeatured: boolean;
  views: number;
  liveLink?: string | null;
  githubLink?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Skill {
  name: string;
  icon: string;
}

export interface IExperiece {
  id?: number;
  title: string;
  companyName: string;
  jobType: string; //intern remote
  description: string;
  tags: string[];
  images: string[];
  weblink: string;
  linkedIn: string;
  startDate: string;
  EndDate: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface IBlog {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: JSON;
  tags: string[];
  images: string[];
  isFeatured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}