// "use client"
// import ServiceForm from "../components/ServiceForm"
// const page = () => {
//   return (
//     <ServiceForm/>
//   )
// }

// export default page

"use client"
import { Suspense } from 'react'
import ServiceForm from "../components/ServiceForm"

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceForm />
    </Suspense>
  )
}

export default Page
