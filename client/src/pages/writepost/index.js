import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function WritePost() {
  return (
    <TransitionWrapper>
      <main className="home-bg bg-setup">
        <PageHeadLine headline={"Writepost"} />
        <SubText subtext={subtexts.writepost} />
      </main>
    </TransitionWrapper>
  );
}

export default WritePost;
