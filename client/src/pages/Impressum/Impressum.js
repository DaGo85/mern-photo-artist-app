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
          <section className="gap-6 pt-6 pb-40 card-setup">
            <h4>David Goergens Photography</h4>
            <span className="flex flex-col w-full gap-4 px-6">
              <h5>Gemäß zu § 5 TMG:</h5>
              <hr />
              <address>
                David Goergens
                <br />
                Lutertalstrasse 25
                <br />
                3065 Bern
              </address>
            </span>
            <span className="flex flex-col w-full gap-4 px-6">
              <h5>Kontakt:</h5>
              <hr />
              <address>
                E-Mail: davegoergens@gmail.com <br />
              </address>
              <hr />
            </span>
            <span className="flex flex-col w-full gap-4 px-6">
              <h5>Haftungsausschluss</h5>
              <hr />
              <p>
                Für den Inhalt der Webseite: www.photo.davidgo.ch ist David
                Goergens verantwortlich. Die Webseite wird rein privat betrieben
                und hat keinerlei kommerzielle Interessen.
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
