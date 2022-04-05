import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function Impressum() {
  return (
    <TransitionWrapper>
      <main>
        <div className="impressum-bg bg-setup">
          <PageHeadLine headline={"Impressum"} />
          <SubText subtext={subtexts.impressum} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Impressum;
