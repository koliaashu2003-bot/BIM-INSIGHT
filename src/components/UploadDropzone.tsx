import { useRef, useState, type DragEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { addUpload } from '../utils/uploadsStore'
import { SCRIPT_CATEGORIES } from '../data/scripts'

export function UploadDropzone({ onUploaded }: { onUploaded?: () => void }) {
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(SCRIPT_CATEGORIES[0] as string)
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  function acceptFile(file: File) {
    if (!file.name.toLowerCase().endsWith('.dyn')) {
      setMessage('Please choose a .dyn file (Dynamo graph).')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setContent(String(reader.result || ''))
      setFileName(file.name)
      if (!title) setTitle(file.name.replace(/\.dyn$/i, ''))
      setMessage(null)
    }
    reader.readAsText(file)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) acceptFile(file)
  }

  function submit() {
    if (!user) return
    if (!content || !fileName) {
      setMessage('Drop or choose a .dyn file first.')
      return
    }
    if (!title.trim()) {
      setMessage('Give your script a title.')
      return
    }
    addUpload({
      title: title.trim(),
      description: description.trim(),
      category,
      fileName,
      content,
      authorId: user.id,
      authorName: user.name,
    })
    setFileName('')
    setContent('')
    setTitle('')
    setDescription('')
    setMessage('Uploaded! It now appears in “My scripts.”')
    onUploaded?.()
  }

  return (
    <div className="uploader">
      <div
        className={`dropzone ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".dyn"
          hidden
          onChange={(e) => e.target.files?.[0] && acceptFile(e.target.files[0])}
        />
        <div className="dropzone-ico">⬆</div>
        {fileName ? (
          <p><strong>{fileName}</strong> ready</p>
        ) : (
          <p>Drag &amp; drop a <strong>.dyn</strong> file here, or click to browse</p>
        )}
      </div>

      <label className="field">
        <span>Title</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Auto-dimension grids" />
      </label>
      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {SCRIPT_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Description</span>
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <button type="button" className="btn-primary" onClick={submit}>Upload script</button>
      {message && <p className="form-note" style={{ marginTop: 10 }}>{message}</p>}
    </div>
  )
}
