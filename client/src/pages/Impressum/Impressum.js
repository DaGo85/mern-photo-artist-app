// Impressum page

import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";
import RandomImage from "../../components/elements/RandomImage/RandomImage";
import ImpressumSocialIcons from "./components/ImpressumSocialIcons";

import { subtexts } from "../../assets/data";
import useGetBackGround from "../../utility/useGetBackGround";
import TransitionWrapper from "../../utility/TransitionWrapper";

// todo: hover?

function Impressum() {
  const bg = useGetBackGround();
  return (
    <TransitionWrapper>
      <main>
        <div className={`bg-setup ${bg}`}>
          <PageHeadLine headline={"Impressum"} />
          <SubText subtext={subtexts.impressum} />

          <section className="card-setup gap-6 pt-6 pb-40">
            <h4>AGO Photography</h4>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>Gemäß zu § 5 TMG:</h5>
              <hr />
              <address>
                Achim und Anne Goergens
                <br />
                Dorstener Strasse 534
                <br />
                46119 Oberhausen
              </address>
            </span>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>Kontakt:</h5>
              <hr />
              <address>
                E-Mail: goergensjoa@gmail.com <br />
                <a
                  className="underline navsvghover"
                  href="https://www.facebook.com/an.na.988711/"
                >
                  Annes Facebook Profil
                </a>
                <br />
                <a
                  className="underline navsvghover"
                  href="https://www.facebook.com/achim.goergens"
                >
                  Achims Facebook Profil
                </a>
              </address>
              <hr />
            </span>
            <span className="flex flex-col gap-4 w-full px-6">
              <h5>Haftungsausschluss</h5>
              <hr />
              <p>
                Für den Inhalt der Webseite: www.ago-photography.com sind Anne
                und Achim Goergens verantwortlich. Die Webseite wird rein privat
                betrieben und hat keinerlei kommerzielle Interessen.
                <br />
                Die auf dieser Webseite verwendeten Bilder unterliegen dem
                Copyright. Ohne eine vorherige Anfrage und dadurch
                gegebenenfalls erteilte Erlaubnis, dürfen diese Bilder nicht
                verwendet, heruntergeladen oder verbreitet werden.
                <br />
                Für den Inhalt dieser Seite sind die Autoren zuständig. Es kann
                keine Garantie für die Richtigkeit der angegebenen Informationen
                gegeben werden. Eine dauerhafte technische Erreichbarkeit ist
                nicht vorhanden. Dazu besteht ein Haftungsausschluss für den
                Inhalt von verlinkten Webseiten, auf deren Inhalt kein Einfluss
                von unserer Seite aus genommen werden kann. Gegebenenfalls lässt
                sich der Inhalt dieser Webseite durch eine Anfrage mithilfe
                eines Hinweises auf die entsprechende Stelle ändern.
              </p>
            </span>
            <ImpressumSocialIcons />
          </section>
          <RandomImage />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Impressum;
