import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const SmallCard = ({ imgSrc, text, link }) => {
  const controls = useAnimation();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Trigger visibility immediately if the card is already in the viewport
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true);
        controls.start("visible");
      }
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const CardContent = () => (
    <motion.div
      ref={cardRef}
      initial={isVisible ? "visible" : "hidden"}
      animate={controls}
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative pb-[75%]">
        <img
          src={imgSrc}
          alt={text}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-center text-lg font-semibold text-gray-800">{text}</p>
      </div>
    </motion.div>
  );

  return link ? (
    <Link
      to={link}
      className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
    >
      <CardContent />
    </Link>
  ) : (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <CardContent />
    </div>
  );
};

export default SmallCard;

