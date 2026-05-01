import React from 'react';

const DoctorSkeleton = () => {
  return (
    <div className="modern-card p-6 flex flex-col gap-6 animate-pulse">
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 rounded-full skeleton"></div>
        <div className="grow space-y-3">
          <div className="h-6 w-3/4 skeleton rounded-md"></div>
          <div className="h-4 w-1/2 skeleton rounded-md"></div>
          <div className="h-3 w-2/3 skeleton rounded-md"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full skeleton rounded-md"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 w-20 skeleton rounded-md"></div>
          <div className="h-5 w-16 skeleton rounded-md"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="h-10 skeleton rounded-xl"></div>
        <div className="h-10 skeleton rounded-xl"></div>
      </div>
    </div>
  );
};

export default DoctorSkeleton;
