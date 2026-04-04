import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SkjemaForm from '../SkjemaForm'
import SlettKnapp from './SlettKnapp'
import PubliserKnapp from './PubliserKnapp'
import FerdigKnapp from './FerdigKnapp'
import type { Bryggeskjema } from '@/lib/definitions'

export default async function SkjemaDetaljerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('bryggeskjema')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const skjema = data as Bryggeskjema

  return (
    <div className="space-y-6">
      <SkjemaForm skjema={skjema} />

      <div className="pb-8 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <FerdigKnapp id={id} finished={skjema.finished} />
          {skjema.finished && (
            <PubliserKnapp id={id} published={skjema.published} />
          )}
          {!skjema.finished && (
            <p className="text-sm text-zinc-400">
              Merk skjemaet som ferdig for å kunne publisere det.
            </p>
          )}
        </div>
        <div className="flex justify-start">
          <SlettKnapp id={id} />
        </div>
      </div>
    </div>
  )
}
