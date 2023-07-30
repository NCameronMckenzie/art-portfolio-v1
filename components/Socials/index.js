import React from "react";
import Button from "../Button";

import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  return (
    <div align='center'>
        <div className={`${className} flex link`}>
          {yourData.socials.map((social, index) => (
            <Button key={index} onClick={() => window.open(social.link)}>
              {social.title}
            </Button>
          ))}
        </div>
    </div>
    );
};

export default Socials;
