// Write page

import WriteCards from "./components/WriteCards";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";

import { subtexts } from "../../assets/data";
import TransitionWrapper from "../../utility/TransitionWrapper";

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
