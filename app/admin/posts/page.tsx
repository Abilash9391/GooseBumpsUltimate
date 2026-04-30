"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft";
  createdAt: string;
}

const initialPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with GooseBumps",
    content: "Welcome to our platform...",
    status: "published",
    createdAt: "2026-04-10",
  },
  {
    id: "2",
    title: "Advanced Features Guide",
    content: "Learn about advanced features...",
    status: "published",
    createdAt: "2026-04-09",
  },
  {
    id: "3",
    title: "Upcoming Updates",
    content: "We're working on exciting new features...",
    status: "draft",
    createdAt: "2026-04-08",
  },
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "draft" as Post["status"],
  });

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditPost(null);
    setForm({ title: "", content: "", status: "draft" });
    setDialogOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditPost(post);
    setForm({
      title: post.title,
      content: post.content,
      status: post.status,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;

    if (editPost) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editPost.id ? { ...p, ...form } : p))
      );
    } else {
      setPosts((prev) => [
        {
          id: Date.now().toString(),
          ...form,
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    }

    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setPosts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Posts
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts
          </p>
        </div>

        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="pl-9"
        />
      </div>

      {/* List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <h3 className="font-medium text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        post.status === "published"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => setDeleteId(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="p-8 text-center text-muted-foreground">
                No posts found
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit Modal */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editPost ? "Edit Post" : "New Post"}
              </CardTitle>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="Post title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                placeholder="Post content..."
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                rows={5}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Post["status"],
                  })
                }
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

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

      {/* Delete dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
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


// "use client";

// import { useState } from "react";
// import { Plus, Pencil, Trash2, Search, X } from "lucide-react";

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   status: "published" | "draft";
//   createdAt: string;
// }

// const initialPosts: Post[] = [
//   { id: "1", title: "Getting Started with GooseBumps", content: "Welcome to our platform...", status: "published", createdAt: "2026-04-10" },
//   { id: "2", title: "Advanced Features Guide", content: "Learn about advanced features...", status: "published", createdAt: "2026-04-09" },
//   { id: "3", title: "Upcoming Updates", content: "We're working on exciting new features...", status: "draft", createdAt: "2026-04-08" },
// ];

// export default function AdminPostsPage() {
//   const [posts, setPosts] = useState<Post[]>(initialPosts);
//   const [search, setSearch] = useState("");
//   const [editPost, setEditPost] = useState<Post | null>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [form, setForm] = useState({ title: "", content: "", status: "draft" as Post["status"] });

//   const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

//   const openNew = () => {
//     setEditPost(null);
//     setForm({ title: "", content: "", status: "draft" });
//     setDialogOpen(true);
//   };

//   const openEdit = (post: Post) => {
//     setEditPost(post);
//     setForm({ title: post.title, content: post.content, status: post.status });
//     setDialogOpen(true);
//   };

//   const handleSave = () => {
//     if (!form.title.trim()) return;
//     if (editPost) {
//       setPosts((prev) => prev.map((p) => (p.id === editPost.id ? { ...p, ...form } : p)));
//     } else {
//       setPosts((prev) => [{ id: Date.now().toString(), ...form, createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
//     }
//     setDialogOpen(false);
//   };

//   const handleDelete = (id: string) => {
//     setPosts((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Posts</h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your blog posts</p>
//         </div>
//         <button onClick={openNew} className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-colors">
//           <Plus className="h-4 w-4 mr-2" /> New Post
//         </button>
//       </div>

//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//         <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
//       </div>

//       <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Posts ({filtered.length})</h2>
//         </div>
//         <div className="divide-y">
//           {filtered.map((post) => (
//             <div key={post.id} className="flex items-center justify-between px-6 py-4">
//               <div className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <span className="font-medium text-gray-900 dark:text-white">{post.title}</span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === "published" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
//                     {post.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{post.content}</p>
//                 <p className="text-xs text-gray-400">{post.createdAt}</p>
//               </div>
//               <div className="flex gap-1">
//                 <button onClick={() => openEdit(post)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"><Pencil className="h-4 w-4 text-gray-500" /></button>
//                 <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"><Trash2 className="h-4 w-4 text-red-500" /></button>
//               </div>
//             </div>
//           ))}
//           {filtered.length === 0 && <p className="text-gray-500 py-8 text-center">No posts found.</p>}
//         </div>
//       </div>

//       {/* Modal Dialog */}
//       {dialogOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{editPost ? "Edit Post" : "New Post"}</h2>
//               <button onClick={() => setDialogOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><X className="h-5 w-5" /></button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
//                 <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
//                 <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your post..." rows={5} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
//                 <div className="flex gap-2">
//                   <button onClick={() => setForm({ ...form, status: "draft" })} className={`px-3 py-1.5 rounded-md text-sm font-medium ${form.status === "draft" ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>Draft</button>
//                   <button onClick={() => setForm({ ...form, status: "published" })} className={`px-3 py-1.5 rounded-md text-sm font-medium ${form.status === "published" ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>Published</button>
//                 </div>
//               </div>
//               <button onClick={handleSave} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors">Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }