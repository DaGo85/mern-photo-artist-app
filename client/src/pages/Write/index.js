import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";
import WriteCards from "./components/WriteCards";

function Write() {
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Hinzufügen"} />
          <SubText subtext={subtexts.write} />
          <WriteCards />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Write;
