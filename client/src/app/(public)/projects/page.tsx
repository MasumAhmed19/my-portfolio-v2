import AllProjects from '@/components/modules/Projects/AllProjects'
import ProjectLoadingSkeleton from '@/components/modules/Projects/ProjectLoadingSkeleton'
import React, { Suspense } from 'react'

const ProjectPage = () => {
  return (
    <section className=''>
      <div className='max-w-7xl mx-auto'>
          <Suspense fallback={<ProjectLoadingSkeleton />}>
          <AllProjects />
        </Suspense>
      </div>
    </section>
  )
}

export default ProjectPage