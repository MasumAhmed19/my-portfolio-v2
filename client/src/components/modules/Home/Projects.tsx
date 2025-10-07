import { IProject } from '@/types'
import React from 'react'

const FeaturedProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/`,{
        next:{
            revalidate:60,
        }
    })

    const data = await res.json()
    console.log(data.data)
    const projects: IProject[] = data?.data?.filter((p: IProject) => p.isFeatured) || [];


  return (
    <div>
        <div className="max-w-4xl mx-auto flex items-center justify-between text-md px-5 md:px-0">
          <h2 className="font-medium text-gray-600 uppercase ">Recent Projects</h2>
          <h2 className="flex items-center justify-center uppercase">My Works</h2>
        </div>

        {
            projects.map((el, idx)=>(
                
            ))
        }



    </div>
  )
}

export default FeaturedProjects