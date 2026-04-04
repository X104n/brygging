import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SkjemaForm from '../SkjemaForm'
import SlettKnapp from './SlettKnapp'
import PubliserKnapp from './PubliserKnapp'
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
      <div className="pb-8 flex items-center justify-between">
        <PubliserKnapp id={id} published={skjema.published} />
        <SlettKnapp id={id} />
      </div>
    </div>
  )
}
