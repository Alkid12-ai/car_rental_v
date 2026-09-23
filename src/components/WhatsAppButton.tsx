"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/data/site";
import { useDict } from "@/i18n/client";

/**
 * Floating WhatsApp call-to-action, pinned bottom-right on every page.
 */
export default function WhatsAppButton() {
  const reduceMotion = useReducedMotion();
  const t = useDict();

  return (
    <motion.a
      href={whatsappLink(t.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="group fixed bottom-5 right-4 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-soft-lg outline-none transition-transform hover:scale-[1.03] focus-visible:ring-[3px] focus-visible:ring-[#25D366]/40 sm:bottom-6 sm:right-6"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative grid size-7 shrink-0 place-items-center">
        {!reduceMotion && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/50" />
        )}
        <MessageCircle className="relative size-6" strokeWidth={2.2} />
      </span>
      <span className="text-sm font-semibold leading-none">{t.whatsapp.label}</span>
    </motion.a>
  );
}
