import { Link } from "react-router-dom";
import { address } from "../../../assets/data";
import { motion, AnimatePresence } from "framer-motion";

function StoriesGrid({ currentGridData }) {
  return (
    <section className="card-setup image-grid py-6 justify-center">
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
              className="h-full w-full col-span-12 lg:col-span-6 xl:col-span-4 relative"
            >
              <div className="w-full h-full block overflow-hidden aspect-square absolute">
                <div className="bg-slate-600/70 opacity-0 hover:opacity-100 flex flex-col gap-2 px-2 justify-center items-center w-full h-full  transition-all duration-300">
                  <h4 className="pb-2 md:pb-4 lg:pb-6">{item.story}</h4>
                  <h5>Author: {item.username}</h5>
                  <hr className="w-full" />
                  <h6>
                    Letztes Update: {new Date(item.updatedAt).toDateString()}
                  </h6>
                  <hr className="w-full" />
                  <pre>
                    <p className="whitespace-pre-line hidden lg:block">
                      {trimmedString}
                    </p>
                    <p className="whitespace-pre-line hidden md:block lg:hidden">
                      {trimmedStringMed}
                    </p>
                    <p className="whitespace-pre-line md:hidden">
                      {trimmedStringMin}
                    </p>
                  </pre>
                </div>
              </div>
              {item.orientation === 1 ? (
                <motion.img
                  className="w-full h-full object-cover aspect-square"
                  src={`${address[2].url}${item.photo}`}
                  alt="landscape story grid title item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              ) : (
                <motion.img
                  className="w-full h-full object-cover aspect-square"
                  src={`${address[2].url}${item.photo}`}
                  alt="portrait story grid title item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              )}
            </Link>
          </AnimatePresence>
        );
      })}
    </section>
  );
}

export default StoriesGrid;
