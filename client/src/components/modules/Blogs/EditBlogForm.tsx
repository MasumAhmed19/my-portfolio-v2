"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";
import RichTextEditor from "@/components/modules/Editor/RichTextEditor";
import TagInput from "@/components/modules/Editor/TagInput";
import { toast } from "sonner";
import { updateBlog } from "@/services/blogService";
import { IBlog } from "@/types";

interface EditBlogFormProps {
  blog: IBlog;
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(blog.title || "");
  const [description, setDescription] = useState(blog.description || "");
  const [tags, setTags] = useState<string[]>(blog.tags || []);
  const [images, setImages] = useState<string[]>(blog.images || []);
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState<JSON | null>(null);
  const [isFeatured, setIsFeatured] = useState(blog.isFeatured || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Load content after component mounts to avoid hydration issues
  useEffect(() => {
    if (blog.content && !isContentLoaded) {
      setContent(blog.content);
      setIsContentLoaded(true);
    }
  }, [blog.content, isContentLoaded]);

  const handleAddImage = () => {
    const trimmedUrl = imageUrl.trim();
    if (trimmedUrl && !images.includes(trimmedUrl)) {
      setImages([...images, trimmedUrl]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((img) => img !== imageToRemove));
  };

  const handleImageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!content) {
      toast.error("Content is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        tags,
        content,
        images,
        isFeatured,
      };

      const response = await updateBlog(blog.slug, payload);

      if (response) {
        toast.success("Blog post updated successfully!");
        router.push("/dashboard/all-blogs");
        router.refresh();
      }
    } catch (error: unknown) {
      console.error("Failed to update post:", error);
      toast.error(
        (error as Error)?.message || "Failed to update blog post. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-5">
      <Card className="border-none shadow-none">
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging blog title..."
              className="text-lg"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description or summary of your blog post..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              This will be shown in blog previews and search results
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Tags</Label>
            <TagInput
              tags={tags}
              onChange={setTags}
              placeholder="e.g. nextjs, typescript, webdev"
            />
          </div>

          {/* Cover Images */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Cover Images</Label>
            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={handleImageKeyDown}
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddImage}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((image, idx) => (
                  <div key={idx} className="relative group">
                    <div className="aspect-video relative overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={image}
                        alt={`Cover ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x300?text=Invalid+Image";
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="mt-1 text-xs text-muted-foreground truncate">
                      {image}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              Content <span className="text-red-500">*</span>
            </Label>
            {isContentLoaded ? (
              <RichTextEditor
                content={content ? JSON.stringify(content) : undefined}
                onChange={(value) => setContent(value as JSON | null)}
                placeholder="Start writing your amazing blog post..."
              />
            ) : (
              <div className="w-full h-[400px] border rounded-md flex items-center justify-center bg-muted/50">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label htmlFor="featured" className="text-base font-semibold">
                Featured Post
              </Label>
              <p className="text-sm text-muted-foreground">
                Mark this post as featured to highlight it on your homepage
              </p>
            </div>
            <Switch
              id="featured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !description || !content}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Blog"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}