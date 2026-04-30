"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  X,
  Image as ImageIcon,
  Search,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title: string;
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      alt: "Ultimate Frisbee action shot",
      title: "Team Practice",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      alt: "Frisbee throw",
      title: "Perfect Throw",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      alt: "Team celebration",
      title: "Victory Moment",
    },
  ]);

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return images;
    const q = search.toLowerCase();
    return images.filter(
      (img) =>
        img.title.toLowerCase().includes(q) ||
        img.alt.toLowerCase().includes(q)
    );
  }, [images, search]);

  const addImageUrl = () => {
    if (!newImageUrl.trim() || !newImageTitle.trim()) return;

    setImages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || newImageTitle.trim(),
        title: newImageTitle.trim(),
      },
    ]);

    setNewImageUrl("");
    setNewImageTitle("");
    setNewImageAlt("");

    toast.success("Image added to gallery!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    setTimeout(() => {
      setImages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          url: URL.createObjectURL(file),
          alt: file.name,
          title: file.name.split(".")[0],
        },
      ]);

      setUploading(false);
      toast.success("Image uploaded successfully!");
    }, 1500);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image removed!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ImageIcon className="w-7 h-7" />
          Image Gallery Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage image galleries and photo collections
        </p>
      </div>

      {/* Carousel Preview */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Gallery Preview</CardTitle>
          </CardHeader>

          <CardContent>
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-48 object-cover rounded-lg"
                      />

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
                        <div className="text-center text-white">
                          <h3 className="font-semibold">
                            {image.title}
                          </h3>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="mt-2"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search images..."
          className="pl-9"
        />
      </div>

      {/* Add Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* URL Add */}
        <Card>
          <CardHeader>
            <CardTitle>Add Image from URL</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <Label>Image URL *</Label>
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label>Title *</Label>
              <Input
                value={newImageTitle}
                onChange={(e) =>
                  setNewImageTitle(e.target.value)
                }
                placeholder="Image title"
              />
            </div>

            <div>
              <Label>Alt Text</Label>
              <Input
                value={newImageAlt}
                onChange={(e) =>
                  setNewImageAlt(e.target.value)
                }
                placeholder="Describe image"
              />
            </div>

            <Button onClick={addImageUrl} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Add to Gallery
            </Button>
          </CardContent>
        </Card>

        {/* Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Image File</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />

            {uploading && (
              <p className="text-sm text-muted-foreground">
                Uploading...
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              JPG, PNG, GIF, WebP • Max 5MB
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-40 object-cover"
            />

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-2">
              <div className="flex justify-between w-full">
                <span className="text-white text-xs truncate">
                  {img.title}
                </span>

                <Button
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  onClick={() => removeImage(img.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}