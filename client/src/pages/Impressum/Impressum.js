// Impressum page

import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";
import RandomImage from "../../components/elements/RandomImage/RandomImage";
import ImpressumSocialIcons from "./components/ImpressumSocialIcons";

import { subtexts } from "../../assets/data";
import useGetBackGround from "../../utility/useGetBackGround";
import TransitionWrapper from "../../utility/TransitionWrapper";

function Impressum() {
  const bg = useGetBackGround();
  return (
    <TransitionWrapper>
      <main>
        <div className={`bg-setup ${bg}`}>
          <PageHeadLine headline={"Impressum"} />
          <SubText subtext={subtexts.impressum} />
          <RandomImage />
          <section className="card-setup gap-6 pt-6 pb-40">
            <h4>AGO Photography</h4>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>Gemäß zu § 5 TMG:</h5>
              <hr />
              <p>
                Achim und Anne Goergens
                <br />
                Dorstener Strasse 534
                <br />
                46119 Oberhausen
              </p>
            </span>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>Kontakt:</h5>
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
