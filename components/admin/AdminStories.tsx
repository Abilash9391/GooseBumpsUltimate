"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  Pencil,
  Search,
  X,
  Users,
  Trophy,
  Save,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Story {
  id: string;
  name: string;
  story: string;
  fullStory: string;
  image: string;
}

const playerSeed: Story[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    story: "From beginner to national player in 2 years.",
    fullStory: "Ravi joined Goosebumps as a complete newcomer...",
    image: "",
  },
  {
    id: "2",
    name: "Priya Sharma",
    story: "Breaking barriers in women's ultimate frisbee.",
    fullStory: "Priya's journey started when she saw a flyer...",
    image: "",
  },
];

const teamSeed: Story[] = [
  {
    id: "1",
    name: "The Underdogs",
    story: "A team that proved everyone wrong.",
    fullStory: "Formed from scratch in 2022...",
    image: "",
  },
];

export default function AdminStories({
  type,
}: {
  type: "player" | "team";
}) {
  const [stories, setStories] = useState<Story[]>(
    type === "player" ? playerSeed : teamSeed
  );

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editStory, setEditStory] = useState<Story | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    story: "",
    fullStory: "",
    image: "",
  });

  const Icon = type === "player" ? Users : Trophy;
  const label = type === "player" ? "Player Stories" : "Team Stories";

  const filtered = stories.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditStory(null);
    setForm({ name: "", story: "", fullStory: "", image: "" });
    setDialogOpen(true);
  };

  const openEdit = (s: Story) => {
    setEditStory(s);
    setForm({
      name: s.name,
      story: s.story,
      fullStory: s.fullStory,
      image: s.image,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editStory) {
      setStories((prev) =>
        prev.map((s) =>
          s.id === editStory.id ? { ...s, ...form } : s
        )
      );
    } else {
      setStories((prev) => [
        { id: Date.now().toString(), ...form },
        ...prev,
      ]);
    }

    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      setStories((prev) =>
        prev.filter((s) => s.id !== deleteId)
      );
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Icon className="w-7 h-7" />
            {label} Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage {type} impact stories and testimonials
          </p>
        </div>

        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Story
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stories..."
          className="pl-9"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-5">
              {s.image && (
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
              )}

              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {s.story}
              </p>

              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(s)}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => setDeleteId(s.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">
                  {editStory ? "Edit Story" : "New Story"}
                </h2>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDialogOpen(false)}
                >
                  <X />
                </Button>
              </div>

              <Input
                placeholder={
                  type === "player"
                    ? "Player Name"
                    : "Team Name"
                }
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />

              <textarea
                className="w-full black border rounded p-2"
                rows={3}
                placeholder="Short story"
                value={form.story}
                onChange={(e) =>
                  setForm({ ...form, story: e.target.value })
                }
              />

              <textarea
                className="w-full border rounded p-2"
                rows={5}
                placeholder="Full story"
                value={form.fullStory}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullStory: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Story?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}