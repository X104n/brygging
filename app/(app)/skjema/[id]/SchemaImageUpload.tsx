'use client'

import { useRef, useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveBildeUrl } from '@/app/actions/skjema'
import Image from 'next/image'
import { ImagePlus } from 'lucide-react'

type Props = {
  skjemaId: string
  userId: string
  currentUrl: string | null
}

export default function SchemaImageUpload({ skjemaId, userId, currentUrl }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl)
  const [uploading, startUpload] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Filen er for stor (maks 5 MB)')
      return
    }

    setError(null)
    setPreview(URL.createObjectURL(file))

    startUpload(async () => {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const path = `${userId}/${skjemaId}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('schema-images')
        .upload(path, file, { upsert: true })

      if (uploadError) {
        setError('Opplasting feilet')
        setPreview(currentUrl)
        return
      }

      const { data } = supabase.storage.from('schema-images').getPublicUrl(path)
      const urlWithBust = `${data.publicUrl}?t=${Date.now()}`
      setPreview(urlWithBust)
      await saveBildeUrl(skjemaId, data.publicUrl)
    })
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="relative group w-full aspect-video rounded-xl overflow-hidden border-2 border-dashed border-zinc-200 hover:border-amber-400 transition-colors focus:outline-none bg-zinc-50"
      >
        {preview ? (
          <>
            <Image src={preview} alt="Bryggebilde" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium">Endre bilde</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-400 group-hover:text-amber-500 transition-colors py-10">
            <ImagePlus className="w-8 h-8" />
            <span className="text-sm font-medium">{uploading ? 'Laster opp…' : 'Legg til bilde'}</span>
            <span className="text-xs">Klikk for å velge (maks 5 MB)</span>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
