"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Loader2,
  Eye,
  Star,
  Calendar,
  Github,
  ExternalLink,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { IProject } from "@/types";
import { deleteProject, getProjects } from "@/services/projectService";


const AllProjectsPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects({ page: currentPage, limit });
      if (response) {
        setProjects(response.data);
        setTotalPages(response.meta.totalPages);
        setTotal(response.meta.total);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const handleDelete = async () => {
    if (!deleteSlug) return;

    setIsDeleting(true);
    try {
      await deleteProject(deleteSlug);
      toast.success("Project deleted successfully");
      setDeleteSlug(null);
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/dashboard/edit-project/${slug}`);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="px-5">
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">All Projects</CardTitle>
              <CardDescription>
                Manage and organize your projects ({total} total)
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/dashboard/create-project")}>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? "No projects found matching your search" : "No projects yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[2%]">No.</TableHead>
                      <TableHead className="w-[35%]">Project</TableHead>
                      <TableHead className="w-[15%]">Status</TableHead>
                      <TableHead className="w-[15%]">Links</TableHead>
                      <TableHead className="w-[15%]">Date</TableHead>
                      <TableHead className="text-right w-[10%]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project, index) => (
                      <TableRow key={project.id} className="hover:bg-muted/30">
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium line-clamp-1">{project.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1 max-w-md">
                              {project.description}
                            </div>
                            {project.tags.length > 0 && (
                              <div className="flex gap-1 flex-wrap">
                                {project.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{project.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {project.isFeatured && (
                              <Badge variant="default" className="gap-1 w-fit">
                                <Star className="h-3 w-3" />
                                Featured
                              </Badge>
                            )}
                            {project.video && (
                              <Badge variant="outline" className="gap-1 w-fit">
                                <Video className="h-3 w-3" />
                                Video
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-gray-900"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(project.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(project.slug)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteSlug(project.slug)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteSlug} onOpenChange={() => setDeleteSlug(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AllProjectsPage;