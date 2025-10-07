export interface IProject {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  isFeatured: boolean;
  views: number;
  authorId: number;
  liveLink?: string;
  githubLink?: string;
}