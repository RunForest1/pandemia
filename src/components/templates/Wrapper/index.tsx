import { ReactNode } from 'react';


interface WrapperProps {
    children: ReactNode;
  }

export const Wrapper: React.FC<WrapperProps> =  ( {children} ) => {
    return (
      <div className='container mx-auto pt-6 min-h-screen'>{children}</div>
    )
  }
  