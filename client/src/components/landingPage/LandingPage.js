import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.background}>
      <Link className={s.link} to="/home">
        <button className={s.go}>START</button>
      </Link>
    </div>
  );
}
