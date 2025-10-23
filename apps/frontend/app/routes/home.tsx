import { Route } from './+types/home'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: 'Challenge AQA' },
    { name: 'description', content: 'Challenge AQA' }
  ]
}

export default function Home () {

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h1>Home</h1>
    </div>
  )
}
