"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus, X, Link2, Github, Video } from "lucide-react";
import { toast } from "sonner";
import { createProject } from "@/services/projectService";
import TagInput from "@/components/modules/Editor/TagInput";


export default function CreateProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    images: [] as string[],
    video: "",
    liveLink: "",
    githubLink: "",
    isFeatured: false,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddImage = () => {
    const trimmedUrl = imageUrl.trim();
    if (trimmedUrl && !formData.images.includes(trimmedUrl)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, trimmedUrl],
      }));
      setImageUrl("");
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imageToRemove),
    }));
  };

  const handleImageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags: formData.tags,
        images: formData.images,
        video: formData.video.trim() || null,
        liveLink: formData.liveLink.trim() || null,
        githubLink: formData.githubLink.trim() || null,
        isFeatured: formData.isFeatured,
      };

      console.log("Payload:", payload);

      const response = await createProject(payload);

      if (response) {
        toast.success("Project created successfully!");
        router.push("/dashboard/all-projects");
      }
    } catch (error: any) {
      console.error("Failed to create project:", error);
      toast.error(
        error?.message || "Failed to create project. Please try again."
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
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter project title..."
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
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe your project, its features, and technologies used..."
              rows={5}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              Technologies & Tags
            </Label>
            <TagInput
              tags={formData.tags}
              onChange={(tags) => setFormData((prev) => ({ ...prev, tags }))}
              placeholder="e.g. react, typescript, nodejs"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              Project Images <span className="text-red-500">*</span>
            </Label>
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
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, idx) => (
                  <div key={idx} className="relative group">
                    <div className="aspect-video relative overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={image}
                        alt={`Project ${idx + 1}`}
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
                      Image {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Links Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Live Link */}
            <div className="space-y-2">
              <Label htmlFor="liveLink" className="text-base font-semibold">
                Live Demo Link
              </Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="liveLink"
                  value={formData.liveLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      liveLink: e.target.value,
                    }))
                  }
                  placeholder="https://your-project.com"
                  className="pl-10"
                />
              </div>
            </div>

            {/* GitHub Link */}
            <div className="space-y-2">
              <Label htmlFor="githubLink" className="text-base font-semibold">
                GitHub Repository
              </Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="githubLink"
                  value={formData.githubLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      githubLink: e.target.value,
                    }))
                  }
                  placeholder="https://github.com/username/repo"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Video URL */}
          <div className="space-y-2">
            <Label htmlFor="video" className="text-base font-semibold">
              Demo Video URL
            </Label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="video"
                value={formData.video}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, video: e.target.value }))
                }
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label htmlFor="featured" className="text-base font-semibold">
                Featured Project
              </Label>
              <p className="text-sm text-muted-foreground">
                Display this project prominently on your homepage
              </p>
            </div>
            <Switch
              id="featured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isFeatured: checked }))
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.title ||
                !formData.description ||
                formData.images.length === 0
              }
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
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