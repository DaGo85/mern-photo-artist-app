import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function Stories() {
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Stories"} />
          <SubText subtext={subtexts.stories} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Stories;
