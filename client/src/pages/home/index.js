import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function Home() {
  return (
    <TransitionWrapper>
      <main className="home-bg bg-setup">
        <PageHeadLine headline={"Home"} />
        <SubText subtext={subtexts.home} />
      </main>
    </TransitionWrapper>
  );
}

export default Home;
