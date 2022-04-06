import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";
import RandomImage from "../../components/elements/RandomImage";
import ImpressumSocialIcons from "./components/ImpressumSocialIcons";

function Impressum() {
  return (
    <TransitionWrapper>
      <main>
        <div className="impressum-bg bg-setup">
          <PageHeadLine headline={"Impressum"} />
          <SubText subtext={subtexts.impressum} />
          <RandomImage />
          <section className="card-setup gap-6 py-6">
            <h4>AGO Photography</h4>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>According to § 5 TMG:</h5>
              <hr />
              <p>
                D. Goergens
                <br />
                Dorstener Strasse 534
                <br />
                46119 Oberhausen
              </p>
            </span>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>Contact:</h5>
              <hr />
              <p>
                Tel. Nr.: +49 (0) 177 1234567
                <br />
                E-Mail: d.goergens@gmail.com
              </p>
              <hr />
            </span>
            <ImpressumSocialIcons />
          </section>
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Impressum;
