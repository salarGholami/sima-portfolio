"use client";

import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import { carts } from "@/data/cart";
import ModalContent from "@/components/modalContent";
import { motion, AnimatePresence } from "framer-motion";

const CardsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedCart, setSelectedCart] = useState<(typeof carts)[0] | null>(
    null
  );

  const updateCardsPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setCardsPerPage(2);
    else if (width < 1024) setCardsPerPage(4);
    else setCardsPerPage(8);
  }, []);

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, [updateCardsPerPage]);

  const safeCarts = carts || [];
  const totalPages = Math.ceil(safeCarts.length / cardsPerPage);

  const paginatedCards = safeCarts.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const triggerPageChange = (page: number) => {
    if (page === currentPage || isExiting) return;
    setIsExiting(true);
    setPendingPage(page);
    setTimeout(() => {
      setCurrentPage(page);
      setIsExiting(false);
    }, 20);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentPage < totalPages) {
        triggerPageChange(currentPage + 1);
      } else if (e.key === "ArrowLeft" && currentPage > 1) {
        triggerPageChange(currentPage - 1);
      }
    },
    [currentPage, totalPages]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      tabIndex={0}
      className="h-screen overflow-y-auto flex flex-col justify--center-safe md:justify-center items-center px-4 sm:px-6 py-8 relative"
      style={{ scrollBehavior: "smooth" }}
    >
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        <AnimatePresence mode="wait">
          {paginatedCards.map((cart, index) => (
            <motion.li
              key={cart.id}
              className="flex justify-center w-full"
              layout
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{}} 
            >
              <Card
                cart={cart}
                onClick={() => setSelectedCart(cart)}
                index={index}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="absolute bottom-2 hidden md:flex gap-3">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`w-4 h-4 rounded-full border transition-colors duration-300 ${
                page === currentPage
                  ? "bg-yellow-500 border-yellow-500"
                  : "bg-gray-300 border-gray-400 hover:bg-yellow-300"
              }`}
              onClick={() => triggerPageChange(page)}
              aria-label={`Page ${page}`}
            />
          );
        })}
      </div>

      <div className="absolute top-70 -right-20 flex gap-3 rotate-90 md:hidden">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`w-4 h-4 rounded-full border transition-colors duration-300 ${
                page === currentPage
                  ? "bg-yellow-500 border-yellow-500"
                  : "bg-gray-300 border-gray-400 hover:bg-yellow-300"
              }`}
              onClick={() => triggerPageChange(page)}
              aria-label={`Page ${page}`}
            />
          );
        })}
      </div>

      {selectedCart && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center"
          onClick={() => setSelectedCart(null)}
        >
          <ModalContent
            cart={selectedCart}
            onClose={() => setSelectedCart(null)}
          />
        </div>
      )}
    </div>
  );
};

export default CardsSection;
