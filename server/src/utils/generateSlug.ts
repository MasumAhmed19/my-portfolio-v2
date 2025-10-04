export const generateSlug = (title: string) => {
  return title
    .toLowerCase()             // lowercase
    .trim()                    // remove extra spaces
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-')      // replace spaces with hyphens
    .replace(/-+/g, '-');      // replace multiple hyphens with single
};
