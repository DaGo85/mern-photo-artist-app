import React from "react";
import { write } from "../../../assets/data";

function WriteCards() {
  const newCard = ({ id, url, title, text, icon }) => {};
  return <>{write.map((w) => newCard(w))}</>;
}

export default WriteCards;
