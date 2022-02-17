import React from "react";
import IphoneMockUp from "../../components/IphoneMockUp";
import LanguageBadge from "../../components/LanguageBadge";
import StandardButton from "../../components/StandardButton";
import { mailTo } from "../../services/Contact";
import "./Landing.scss";

const Landing: React.FC = () => {
  return (
    <div className="landing">
      <div className="head">
        <h6>Apprendre :</h6>
        <LanguageBadge
          lang="fr"
          onClick={() =>
            alert(
              "Ce sont les 3 langues qui seront omplémentées sur la version de base !"
            )
          }
        />
        <LanguageBadge
          lang="jp"
          onClick={() =>
            alert(
              "Ce sont les 3 langues qui seront omplémentées sur la version de base !"
            )
          }
        />
        <LanguageBadge
          lang="en"
          onClick={() =>
            alert(
              "Ce sont les 3 langues qui seront omplémentées sur la version de base !"
            )
          }
        />
      </div>
      <div className="hero">
        <IphoneMockUp width={524}>
          <img src="/img/chat-preview-en.png" alt="chat with an ai" />
          <img src="/img/chat-preview-jp.png" alt="chat with an ai" />
        </IphoneMockUp>
        <div className="hero-content">
          <img src="/img/logo.svg" alt="" />
          <h4>
            Apprenez une langue et entrainez-vous à parler avec votre{" "}
            <strong>IA</strong> personalisée
          </h4>
          <StandardButton
            text="Essayer maintenant"
            onClick={() => alert("Rien par ici pour l'instant")}
          />
        </div>
      </div>
      <div className="block-2">
        <p>
          Apprenez la théorie avec des lessons dans de noumbreux domaines et
          gagnez en vocabulaire grace à des jeux.
        </p>
        <IphoneMockUp width={524}>
          <img
            src="/img/Mobile_FlashCard_Game.png"
            alt="mobile flashcard game"
          />
        </IphoneMockUp>
      </div>
      <div className="block-3">
        <img src="/img/ai.png" alt="ai" />
        <p>
          Boostez votre apprentissage en conversant avec votre{" "}
          <strong>IA</strong> sur le sujet de votre choix.
          <br />
          Entrainée avec des <strong>natifs</strong> et mise à jour constamment.
        </p>
      </div>
      <div className="team">
        <img src="/img/team.svg" alt="team" />
        <h2>
          La <strong>team</strong> foraigner
        </h2>
        <div className="posts">
          <div>
            <div>
              <h4>Ingénieur en Intelligence Artificielle</h4>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='high'
              />
            </div>
            <p>
              La pièce maîtresse, sans toi ce projet n’est rien ! Tu rejoindras
              la team en charge de créer l’IA de conversation et tu t’essaieras
              à différentes modèles d’apprentissage pour entrainer au mieux tes
              agents. Tu es à l’aise avec des languages tels que python, c ou
              cpp (au choix (lol 🤡)) et tu n’as pas peur du challenge ? Tu sais
              quoi faire 🤖 *Présentez un Captcha de moins de 24h pour postuler
            </p>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='low'
              />
          </div>
          <div>
            <div>
              <h4>Data Engineer</h4>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='high'
              />
            </div>
            <p>
              Pas de fumée sans 🔥 ! Pas de tech sans data ! Tu seras le point
              d’entrée des éléments nécessaires à nos IA pour leurs
              entrainements (et plus si affinités). Sourcing, évaluation de la
              qualité, labellisation, stockage, tu pars en éclaireur 🕯️ à la
              recherche de nouveaux gisements pétroliers pour alimenter notre
              belle machine. Alors, prêt à partir ?
            </p>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='low'
              />
          </div>
          <div>
            <div>
              <h4>Ingénieur Cloud</h4>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='high'
              />
            </div>
            <p>
              Tu sais pourquoi on t’appelles. TU SAIS que nous, comme beaucoup
              d’autres, avons besoin de gens comme toi. Sais-tu que les
              fondations de la Burj Khalifa 🗼 contiennent 330 000 m3 de bétons
              et 39 000 tonnes de bétons ? On a besoin d’une archi aussi solide
              pour notre projet, t’es chaud 💪 ?
            </p>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='low'
              />
          </div>
          <div>
            <div>
              <h4>Développeur Web Full-Stack</h4>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='high'
              />
            </div>
            <p>
              Heureux qui comme Ulyscss à fait une landing page... ou pas. Fini
              de jouer, on montre les crocs 🦷. Habitué(e) de Figma, XD ou
              Sketch, ton 2e prénom est JS et ton 3e est Node (tes parents
              t’aimaient peut-être pas mais nous oui). Dans ta liste d’amis tu
              as REST-sama, WebSocket-kun et React-chan. Une PWA et une API tu
              coderas avec la team. Les indécis passez votre chemin 🧙‍♂️ !
            </p>
              <StandardButton
                text="Postuler"
                onClick={() => window.open(mailTo)}
                className='low'
              />
          </div>
          <div>
            <div>
              <h4>
                <strong>Emilie Baud,</strong>
                <br />
                Chief Technical Officer
              </h4>
            </div>
          </div>
          <div>
            <div>
              <h4>
                <strong>Emmanuel Nuiro,</strong>
                <br />
                Chief Executive Officer
              </h4>
            </div>
          </div>
        </div>
        <span>
          * Les places disponibles seront mises à jour quotidiennement
          <br />
          durant la phase de recrutement.
        </span>
      </div>
      <footer>
        <h2>Ce n'est que le début !</h2>
        <h4>
          En votant pour ce projet, vous vous donnez l’opportunité de participer
          et donner naissance à un produit innovant
        </h4>
        <h6>et directement commercialisable 💲.</h6>
        <h4>
          Plus d’informations arriveront sur cette page.
          <br />
          N’hésitez pas à nous contacter sur Teams ou{" "}
          <a href={mailTo}>par&nbsp;mail</a>
        </h4>
      </footer>
    </div>
  );
};

export default Landing;
