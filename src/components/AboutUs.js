import React from "react";
import aboutUsModel from "../images/aboutUsModel.webp";

function AboutUs() {
  return (
    <div className="p-4">
      <div className="my-4 bg-gray-100 p-4 rounded">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className=" min-w-280 min-h-420 max-w-380 max-h-560 md:mr-4 mb-8 ">
            <img
              src={aboutUsModel}
              alt="Haute Couture Model"
              className="w-auto h-auto max-w-380 max-h-560"
              width="280px"
              height="420px"
            />
          </div>

          <div className="w-full lg:w-4/6">
            <h1 className="h1-style-2 text-2xl lg:text-4xl pb-5">
              About Haute Couture
            </h1>
            <p className="p-style lg:text-lg text-justify mb-4 md:tracking-wide">
              Welcome to Haute Couture, where fashion meets originality and
              style embraces individuality. Established with a vision to
              revolutionize the way we see and wear clothes, Haute Couture is
              more than just a brand – it's a fashion movement. At Haute
              Couture, we believe that clothing is an expression of one's unique
              personality and style. That's why we meticulously curate our
              collections to bring you the most original and trendsetting
              designs. Our pieces are crafted for those who dare to stand out,
              for the trendsetters and the style-conscious, who never settle for
              the ordinary. We pride ourselves on our commitment to quality and
              sustainability. Each garment is created with the finest materials
              and impeccable craftsmanship, ensuring a product that is not just
              stylish but also durable and environmentally conscious. Our
              collections are a blend of contemporary aesthetics with timeless
              elegance, designed to make a statement in any wardrobe. Our
              journey began with a small team of passionate fashion enthusiasts
              who sought to bring a fresh perspective to the fashion industry.
              Today, Haute Couture has grown into a beloved brand, known for its
              unique approach to style and its dedication to uplifting and
              inspiring its community of customers. At Haute Couture, we don't
              just sell clothes; we offer a fashion experience that celebrates
              originality and personal style. We invite you to explore our
              collections and find pieces that resonate with your individual
              fashion sense. Join us in this fashion journey and embrace the art
              of standing out. Welcome to Haute Couture – where fashion is
              personal.
            </p>
          </div>
        </div>

        <div className="clear-both"></div>
      </div>
    </div>
  );
}

export default AboutUs;
