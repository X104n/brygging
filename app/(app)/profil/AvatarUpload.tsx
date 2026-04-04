'use client'

import { useRef, useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveAvatarUrl } from '@/app/actions/profil'
import Image from 'next/image'

type Props = {
  userId: string
  currentUrl: string | null
  displayName: string | null
}

export default function AvatarUpload({ userId, currentUrl, displayName }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl)
  const [uploading, startUpload] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const initials = (displayName ?? 'B').slice(0, 2).toUpperCase()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('Filen er for stor (maks 2 MB)')
      return
    }

    setError(null)
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    startUpload(async () => {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const path = `${userId}/avatar.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (uploadError) {
        setError('Opplasting feilet')
        setPreview(currentUrl)
        return
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      // Bust cache by appending a timestamp
      const urlWithBust = `${data.publicUrl}?t=${Date.now()}`
      setPreview(urlWithBust)
      await saveAvatarUrl(data.publicUrl)
    })
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="relative group w-28 h-28 rounded-full overflow-hidden ring-4 ring-amber-200 hover:ring-amber-400 transition-all focus:outline-none"
      >
        {preview ? (
          <Image src={preview} alt="Avatar" fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full bg-amber-100 flex items-center justify-center text-3xl font-bold text-amber-700">
            {initials}
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs font-medium">
            {uploading ? 'Laster opp…' : 'Endre bilde'}
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-zinc-400">Klikk for å laste opp (maks 2 MB)</p>
    </div>
  )
}
