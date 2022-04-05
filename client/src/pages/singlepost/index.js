import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function SinglePost() {
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"SinglePost"} />
          <SubText subtext={subtexts.Singlepost} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SinglePost;
