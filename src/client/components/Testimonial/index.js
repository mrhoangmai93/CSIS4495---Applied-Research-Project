import React from "react";
import "./index.scss";
import Logo from "../Logo";

const Testimonial = props => (
  <section className="section-testimonials">
    <h2 className="text-center">Our customers can't live without us</h2>
    <div className="row mt-5">
      <div className="col ">
        <blockquote>
          FoodByMe Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation
          <cite>
            <img src="images/avatar/customer-1.jpg" alt="Alberto Duncan" />
            Alberto Duncan
          </cite>
        </blockquote>
      </div>
      <div className="col ">
        <blockquote>
          Inexpensive, healthy and great-tasting meals, delivered right to my
          home. We have lots of food delivery here in Vancouver, but no one
          comes even close to FoodByMe. Me and my family are so in love!
          <cite>
            <img src="images/avatar/customer-2.jpg" alt="Joana Silva" /> Joana
            Silva
          </cite>
        </blockquote>
      </div>
      <div className="col ">
        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
          <cite>
            <img src="images/avatar/customer-3.jpg" alt="Milton Chapman" />
            Milton Chapman
          </cite>
        </blockquote>
      </div>
    </div>
  </section>
);

export default Testimonial;
