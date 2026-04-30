"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Plus,
  Trash2,
  Pencil,
  Search,
  X,
  Calendar,
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

import { events as initialEventsData } from "@/data/events";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  status?: string;
  result?: string;
}

const initialEvents: EventItem[] = initialEventsData.map((e, i) => ({
  id: String(i + 1),
  title: e.title,
  date: e.date,
  time: e.time || "",
  location: e.location,
  description: e.description || "",
  type: e.type || "upcoming",
  status: e.status,
  result: e.result,
}));

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<EventItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    type: "upcoming",
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return events;
    const q = search.toLowerCase();

    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
    );
  }, [events, search]);

  const openNew = () => {
    setEditEvent(null);
    setForm({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      type: "upcoming",
    });
    setDialogOpen(true);
  };

  const openEdit = (ev: EventItem) => {
    setEditEvent(ev);
    setForm({
      title: ev.title,
      date: ev.date,
      time: ev.time,
      location: ev.location,
      description: ev.description,
      type: ev.type,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;

    if (editEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editEvent.id ? { ...e, ...form } : e
        )
      );
    } else {
      setEvents((prev) => [
        {
          id: Date.now().toString(),
          ...form,
        },
        ...prev,
      ]);
    }

    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setEvents((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Calendar className="w-7 h-7" />
            Events Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage events, tournaments, and competitions
          </p>
        </div>

        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="pl-9"
        />
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ev) => (
          <Card key={ev.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">
                  {ev.title}
                </h3>
                <Badge variant={ev.type === "upcoming" ? "default" : "secondary"}>
                  {ev.type}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-1">
                {ev.date} {ev.time && `• ${ev.time}`}
              </p>

              <p className="text-sm text-muted-foreground mb-3">
                {ev.location}
              </p>

              {ev.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {ev.description}
                </p>
              )}

              {ev.result && (
                <p className="text-sm font-medium text-primary mb-3">
                  {ev.result}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(ev)}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => setDeleteId(ev.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center py-8 text-muted-foreground">
            No events found
          </p>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {editEvent ? "Edit Event" : "New Event"}
                </h2>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                />

                <Input
                  placeholder="Time"
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                />
              </div>

              <Input
                placeholder="Location"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button onClick={handleSave}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DELETE DIALOG */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}