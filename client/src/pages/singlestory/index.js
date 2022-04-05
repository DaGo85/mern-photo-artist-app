import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function SingleStory() {
  return (
    <TransitionWrapper>
      <main className="home-bg bg-setup">
        <PageHeadLine headline={"Singlestory"} />
        <SubText subtext={subtexts.singlestory} />
      </main>
    </TransitionWrapper>
  );
}

export default SingleStory;
