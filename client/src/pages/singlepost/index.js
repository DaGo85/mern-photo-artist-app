import { subtexts } from "../../assets/data";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SinglePost() {
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"SinglePost"} />
          <SubText subtext={subtexts.singlespost} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SinglePost;
