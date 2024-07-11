import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1100px] mx-auto bg-white dark:bg-gray-900 min-h-screen flex flex-col border-l border-r border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
}
