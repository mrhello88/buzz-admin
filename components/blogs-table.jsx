"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Edit2, Trash2, Plus, FileText, Eye, Calendar, User } from "lucide-react"
import Modal from "./modal"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"

export default function BlogsTable({ darkMode }) {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with Social Media Marketing",
      content: "Social media marketing is essential for businesses today. Learn how to create engaging content that resonates with your audience and drives results.",
      author: "John Doe",
      date: "2024-01-15",
      status: "Published",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Best Practices for Instagram Growth",
      content: "Discover proven strategies to grow your Instagram following organically. From content creation to engagement tactics, we cover everything you need to know.",
      author: "Jane Smith",
      date: "2024-02-20",
      status: "Published",
      category: "Social Media",
    },
    {
      id: 3,
      title: "Understanding Analytics and Metrics",
      content: "Learn how to interpret your social media analytics to make data-driven decisions and improve your marketing performance.",
      author: "Mike Johnson",
      date: "2024-01-10",
      status: "Draft",
      category: "Analytics",
    },
    {
      id: 4,
      title: "Content Calendar Planning",
      content: "A well-planned content calendar is key to consistent social media presence. Here's how to create and maintain one effectively.",
      author: "Sarah Williams",
      date: "2024-03-05",
      status: "Published",
      category: "Strategy",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingBlog, setViewingBlog] = useState(null)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    status: "Draft",
  })
  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }))
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] ${
          darkMode ? "prose-invert" : ""
        }`,
      },
    },
  })

  // Update editor content when formData changes (for editing)
  useEffect(() => {
    if (editor && showModal && formData.content) {
      const currentContent = editor.getHTML()
      if (currentContent !== formData.content) {
        editor.commands.setContent(formData.content)
      }
    }
  }, [editor, showModal, formData.content])

  // Handle image upload
  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !editor) return

      // Convert file to base64
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result
        editor.chain().focus().setImage({ src: base64 }).run()
      }
      reader.readAsDataURL(file)
    }
  }, [editor])

  const handleAdd = () => {
    setEditingBlog(null)
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      status: "Draft",
    })
    if (editor) {
      editor.commands.clearContent()
    }
    setShowModal(true)
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData(blog)
    if (editor) {
      editor.commands.setContent(blog.content || "")
    }
    setShowModal(true)
  }

  const handleView = (blog) => {
    setViewingBlog(blog)
    setShowViewModal(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const handleSave = () => {
    if (!formData.title || !formData.content || !formData.author) {
      alert("Please fill in all required fields")
      return
    }

    if (editingBlog) {
      setBlogs(
        blogs.map((b) =>
          b.id === editingBlog.id
            ? {
                ...formData,
                id: b.id,
                date: b.date,
              }
            : b
        )
      )
    } else {
      setBlogs([
        ...blogs,
        {
          ...formData,
          id: Math.max(...blogs.map((b) => b.id), 0) + 1,
          date: new Date().toISOString().split("T")[0],
        },
      ])
    }
    setShowModal(false)
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      status: "Draft",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Blog Management</h2>
          <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            Create, edit, and manage your blog posts
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          Add New Blog
        </button>
      </div>

      {/* Blogs Table */}
      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg overflow-hidden overflow-x-auto`}
      >
        <table className="w-full min-w-[800px]">
          <thead className={`${darkMode ? "bg-slate-800" : "bg-gray-50"}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                  Title
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                  Author
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                  Category
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                  Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? "divide-slate-700" : "divide-gray-200"}`}>
              {blogs.map((blog) => (
                <tr key={blog.id} className={`${darkMode ? "hover:bg-slate-800" : "hover:bg-gray-50"} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className={darkMode ? "text-slate-400" : "text-gray-400"} />
                      <span className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>{blog.title}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                    {blog.author}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                    {blog.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                    {blog.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        blog.status === "Published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(blog)}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? "text-red-400 hover:bg-slate-800 hover:text-red-300" : "text-red-500 hover:bg-gray-100 hover:text-red-700"}`}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setFormData({
            title: "",
            content: "",
            author: "",
            category: "",
            status: "Draft",
          })
        }}
        title={editingBlog ? "Edit Blog" : "Add New Blog"}
        darkMode={darkMode}
        size="xl"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Content <span className="text-red-500">*</span>
            </label>
            <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-lg border ${darkMode ? "border-slate-700" : "border-gray-300"}`}>
              {/* Toolbar */}
              <div className={`flex flex-wrap gap-1 p-2 border-b ${darkMode ? "border-slate-700" : "border-gray-300"}`}>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-2 rounded ${editor?.isActive("bold") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Bold"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded ${editor?.isActive("italic") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Italic"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded ${editor?.isActive("underline") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Underline"
                >
                  <u>U</u>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={`p-2 rounded ${editor?.isActive("strike") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Strike"
                >
                  <s>S</s>
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`p-2 rounded ${editor?.isActive("heading", { level: 1 }) ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`p-2 rounded ${editor?.isActive("heading", { level: 2 }) ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`p-2 rounded ${editor?.isActive("heading", { level: 3 }) ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Heading 3"
                >
                  H3
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded ${editor?.isActive("bulletList") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Bullet List"
                >
                  •
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={`p-2 rounded ${editor?.isActive("orderedList") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Numbered List"
                >
                  1.
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                  className={`p-2 rounded ${editor?.isActive("blockquote") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Quote"
                >
                  "
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1" />
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className={`p-2 rounded ${darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Insert Image"
                >
                  🖼️
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = window.prompt("Enter URL:")
                    if (url) {
                      editor?.chain().focus().setLink({ href: url }).run()
                    }
                  }}
                  className={`p-2 rounded ${editor?.isActive("link") ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Insert Link"
                >
                  🔗
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setTextAlign("left").run()}
                  className={`p-2 rounded ${editor?.isActive({ textAlign: "left" }) ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Align Left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setTextAlign("center").run()}
                  className={`p-2 rounded ${editor?.isActive({ textAlign: "center" }) ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Align Center"
                >
                  ↔
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setTextAlign("right").run()}
                  className={`p-2 rounded ${editor?.isActive({ textAlign: "right" }) ? "bg-blue-600 text-white" : darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Align Right"
                >
                  →
                </button>
              </div>
              {/* Editor Content */}
              <div className={`p-4 min-h-[300px] ${darkMode ? "text-white" : "text-black"}`}>
                <EditorContent editor={editor} />
              </div>
            </div>
            <style jsx global>{`
              .ProseMirror {
                outline: none;
                min-height: 300px;
              }
              .ProseMirror p {
                margin: 0.5em 0;
              }
              .ProseMirror h1 {
                font-size: 2em;
                font-weight: bold;
                margin: 0.5em 0;
              }
              .ProseMirror h2 {
                font-size: 1.5em;
                font-weight: bold;
                margin: 0.5em 0;
              }
              .ProseMirror h3 {
                font-size: 1.25em;
                font-weight: bold;
                margin: 0.5em 0;
              }
              .ProseMirror ul,
              .ProseMirror ol {
                padding-left: 1.5em;
                margin: 0.5em 0;
              }
              .ProseMirror blockquote {
                border-left: 3px solid #ccc;
                padding-left: 1em;
                margin: 0.5em 0;
                font-style: italic;
              }
              .ProseMirror img {
                max-width: 100%;
                height: auto;
                margin: 1em 0;
              }
              .ProseMirror a {
                color: #3b82f6;
                text-decoration: underline;
              }
            `}</style>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Author name"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Category"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                setShowModal(false)
                setFormData({
                  title: "",
                  content: "",
                  author: "",
                  category: "",
                  status: "Draft",
                })
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingBlog ? "Update" : "Create"} Blog
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false)
          setViewingBlog(null)
        }}
        title={viewingBlog?.title || "Blog Details"}
        darkMode={darkMode}
        size="lg"
      >
        {viewingBlog && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className={darkMode ? "text-slate-400" : "text-gray-500"} />
                <span className={darkMode ? "text-slate-300" : "text-gray-700"}>{viewingBlog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className={darkMode ? "text-slate-400" : "text-gray-500"} />
                <span className={darkMode ? "text-slate-300" : "text-gray-700"}>{viewingBlog.date}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  viewingBlog.status === "Published"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {viewingBlog.status}
              </span>
              {viewingBlog.category && (
                <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-700"}`}>
                  {viewingBlog.category}
                </span>
              )}
            </div>
            <div className={`pt-4 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
              <div
                className={`prose prose-invert max-w-none ${darkMode ? "prose-invert" : ""}`}
                dangerouslySetInnerHTML={{ __html: viewingBlog.content }}
                style={{
                  color: darkMode ? "rgb(203 213 225)" : "rgb(55 65 81)",
                }}
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  setShowViewModal(false)
                  setViewingBlog(null)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

