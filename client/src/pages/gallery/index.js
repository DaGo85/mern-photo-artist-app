import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function Gallery() {
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Gallery"} />
          <SubText subtext={subtexts.gallery} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Gallery;
