import { ReactNode } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col min-h-screen">{children}</div>
}

export default Wrapper
