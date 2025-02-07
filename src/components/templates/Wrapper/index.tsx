import { ReactNode } from 'react';


interface WrapperProps {
    children: ReactNode;
  }

export const Wrapper: React.FC<WrapperProps> =  ( {children} ) => {
    return (
      <div className='pt-6 min-h-screen'>{children}</div>
    )
  }
  