export interface IProject {
  _id?: string;
  title: string;
  video: string;
  description: string;
  slug: string;
  tags: string[];
  images: string[];
  isFeatured: boolean;
  views: number;
  authorId: number;
  liveLink?: string;
  githubLink?: string;
}