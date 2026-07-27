import { useRef, useState, type DragEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { addUpload, validateDyn } from '../utils/uploadsStore'
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
  const [dynamoVersion, setDynamoVersion] = useState('')
  const [revitVersion, setRevitVersion] = useState('')
  const [tags, setTags] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  function acceptFile(file: File) {
    setError(null)
    setMessage(null)
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '')
      const check = validateDyn(file.name, file.size, text)
      if (!check.ok) {
        setError(check.error)
        setFileName('')
        setContent('')
        return
      }
      setContent(text)
      setFileName(file.name)
      if (!title) setTitle(file.name.replace(/\.dyn$/i, ''))
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
    setMessage(null)
    if (!content || !fileName) return setError('Drop or choose a valid .dyn file first.')
    if (!title.trim()) return setError('Give your script a title.')
    if (!description.trim()) return setError('Add a short description.')
    if (!dynamoVersion.trim()) return setError('Add the Dynamo version.')
    if (!revitVersion.trim()) return setError('Add the Revit version.')

    addUpload({
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      dynamoVersion: dynamoVersion.trim(),
      revitVersion: revitVersion.trim(),
      fileName,
      content,
      authorId: user.id,
      authorName: user.name,
    })
    setFileName(''); setContent(''); setTitle(''); setDescription('')
    setDynamoVersion(''); setRevitVersion(''); setTags(''); setError(null)
    setMessage('Uploaded! It’s now pending review before it appears in the public library.')
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
          <p><strong>{fileName}</strong> validated ✓</p>
        ) : (
          <p>Drag &amp; drop a <strong>.dyn</strong> file here, or click to browse (max 5 MB)</p>
        )}
      </div>

      <label className="field">
        <span>Title *</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Auto-dimension grids" />
      </label>
      <label className="field">
        <span>Description *</span>
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <div className="field-row">
        <label className="field">
          <span>Dynamo version *</span>
          <input value={dynamoVersion} onChange={(e) => setDynamoVersion(e.target.value)} placeholder="e.g. 2.19" />
        </label>
        <label className="field">
          <span>Revit version *</span>
          <input value={revitVersion} onChange={(e) => setRevitVersion(e.target.value)} placeholder="e.g. 2024" />
        </label>
      </div>
      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {SCRIPT_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Tags (comma-separated)</span>
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="grids, dimensioning, annotation" />
      </label>

      {error && <p className="form-error">{error}</p>}
      <button type="button" className="btn-primary" onClick={submit}>Upload script</button>
      {message && <p className="form-note" style={{ marginTop: 10 }}>{message}</p>}
    </div>
  )
}
