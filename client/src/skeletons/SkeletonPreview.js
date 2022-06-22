// SkeletonPreview component

import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

function SkeletonPreview() {
  return (
    <div className="card-setup gap-form py-form w-full max-w-7xl">
      <div className="flex w-5/6 flex-col md:flex-row items-center">
        <SkeletonImage />
        <div className="hidden w-full md:flex flex-col gap-10 pl-6">
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
      <div className="flex flex-col w-5/6 gap-10 items-center pt-4">
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </div>
    </div>
  );
}

export default SkeletonPreview;
