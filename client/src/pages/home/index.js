import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";

function Home() {
  console.log("home");
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Home"} />
          <SubText subtext={subtexts.home} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Home;
