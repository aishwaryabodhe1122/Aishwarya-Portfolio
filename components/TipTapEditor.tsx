'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button, ButtonGroup } from 'react-bootstrap'
import { 
  FaBold, FaItalic, FaStrikethrough, FaCode, FaHeading, 
  FaListUl, FaListOl, FaQuoteLeft, FaUndo, FaRedo,
  FaImage, FaLink
} from 'react-icons/fa'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
}

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="tiptap-editor">
      <div className="editor-toolbar mb-2 p-2 bg-light border rounded">
        <ButtonGroup size="sm" className="me-2 mb-2">
          <Button
            variant={editor.isActive('bold') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <FaBold />
          </Button>
          <Button
            variant={editor.isActive('italic') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <FaItalic />
          </Button>
          <Button
            variant={editor.isActive('strike') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <FaStrikethrough />
          </Button>
          <Button
            variant={editor.isActive('code') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="Code"
          >
            <FaCode />
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" className="me-2 mb-2">
          <Button
            variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Heading 1"
          >
            H1
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 2 }) ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 3 }) ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="Heading 3"
          >
            H3
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" className="me-2 mb-2">
          <Button
            variant={editor.isActive('bulletList') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <FaListUl />
          </Button>
          <Button
            variant={editor.isActive('orderedList') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
          >
            <FaListOl />
          </Button>
          <Button
            variant={editor.isActive('blockquote') ? 'primary' : 'outline-secondary'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
          >
            <FaQuoteLeft />
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" className="me-2 mb-2">
          <Button
            variant="outline-secondary"
            onClick={addImage}
            title="Add Image"
          >
            <FaImage />
          </Button>
          <Button
            variant="outline-secondary"
            onClick={addLink}
            title="Add Link"
          >
            <FaLink />
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" className="mb-2">
          <Button
            variant="outline-secondary"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <FaUndo />
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <FaRedo />
          </Button>
        </ButtonGroup>
      </div>

      <EditorContent editor={editor} className="editor-content border rounded p-3" />

      <style jsx global>{`
        .editor-content {
          min-height: 400px;
          background: white;
        }

        .ProseMirror {
          outline: none;
          min-height: 380px;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .ProseMirror p {
          margin-bottom: 1rem;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .ProseMirror blockquote {
          border-left: 3px solid #6366f1;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #64748b;
        }

        .ProseMirror code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .ProseMirror pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .ProseMirror pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .ProseMirror a {
          color: #6366f1;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default TipTapEditor
