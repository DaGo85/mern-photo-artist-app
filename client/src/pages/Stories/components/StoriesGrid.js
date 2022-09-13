// StoriesGrid component for Stories

import { motion, AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";

function StoriesGrid({ currentGridData }) {
  return (
    <section className="justify-center py-6 card-setup image-grid">
      {currentGridData.map((item) => {
        // Trimmed strings for stories
        // Maximum number of characters to extract

        const maxLength = 330;
        const medLength = 230;
        const minLength = 100;

        // Trim the string to the maximum length
        let trimmedString = item.desc.substr(0, maxLength);
        let trimmedStringMed = item.desc.substr(0, medLength);
        let trimmedStringMin = item.desc.substr(0, minLength);
        // Re-trim if it ended in the middle of a word
        trimmedString = trimmedString.substr(
          0,
          Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
        );

        trimmedStringMed = trimmedStringMed.substr(
          0,
          Math.min(trimmedStringMed.length, trimmedStringMed.lastIndexOf(" "))
        );

        trimmedStringMin = trimmedStringMin.substr(
          0,
          Math.min(trimmedStringMin.length, trimmedStringMin.lastIndexOf(" "))
        );

        return (
          <AnimatePresence key={item.photo}>
            <Link
              to={`/story${item._id}`}
              className="relative w-full h-full col-span-12 lg:col-span-6 xl:col-span-4"
            >
              <article className="absolute block w-full h-full overflow-hidden aspect-square">
                <div className="flex flex-col items-center justify-center w-full h-full gap-2 px-2 transition-all duration-300 opacity-0 bg-slate-600/70 hover:opacity-100">
                  <h4 className="pb-2 md:pb-4 lg:pb-6">{item.story}</h4>
                  <h5>Autor: {item.username}</h5>
                  <hr className="w-full" />
                  <h6>
                    Letztes Update:{" "}
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </h6>
                  <hr className="w-full" />
                  <pre>
                    <p className="hidden whitespace-pre-line lg:block">
                      {trimmedString}
                    </p>
                    <p className="hidden whitespace-pre-line md:block lg:hidden">
                      {trimmedStringMed}
                    </p>
                    <p className="whitespace-pre-line md:hidden">
                      {trimmedStringMin}
                    </p>
                  </pre>
                </div>
              </article>
              <motion.img
                className="object-cover w-full h-full aspect-square"
                src={item.photo}
                alt="Story Bilderraster Titel Bild"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </Link>
          </AnimatePresence>
        );
      })}
    </section>
  );
}

export default StoriesGrid;
