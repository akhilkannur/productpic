"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import StyleDetail from "@/components/StyleDetail";
import { getStyleById, Style } from "@/lib/styles";

export default function StyleModal() {
  const router = useRouter();
  const { id } = useParams();
  const [style, setStyle] = useState<Style | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      getStyleById(id).then(setStyle);
    }
  }, [id]);

  if (!style) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => router.back()}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="z-10 w-full max-w-6xl"
        >
          <StyleDetail style={style} onClose={() => router.back()} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
