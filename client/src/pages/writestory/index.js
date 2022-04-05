import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function WriteStory() {
  return (
    <TransitionWrapper>
      <main className="home-bg bg-setup">
        <PageHeadLine headline={"Writestory"} />
        <SubText subtext={subtexts.writestory} />
      </main>
    </TransitionWrapper>
  );
}

export default WriteStory;
