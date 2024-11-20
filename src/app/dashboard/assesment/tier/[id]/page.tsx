"use client"
import TierAssesment from '@/page/TierAssesment/TierAssesment'

type Props = {
  params: any
}

function page(props: Props) {
  return (

    <TierAssesment params={props.params.id} />

  )
}

export default page