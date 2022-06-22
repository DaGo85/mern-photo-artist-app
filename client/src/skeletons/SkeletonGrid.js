// SkeletonGrid component for GalleryGrid, StoriesGrid and SingleStoryGrid

import SkeletonImage from "./SkeletonImage";

function SkeletonGrid() {
  return (
    <section className="card-setup image-grid py-6 justify-center w-full">
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
    </section>
  );
}
export default SkeletonGrid;
