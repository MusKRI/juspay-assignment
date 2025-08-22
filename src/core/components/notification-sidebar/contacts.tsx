"use client";

import { useRef } from "react";
import { useInView, motion } from "motion/react";

import ContactAv1 from "@/assets/avatars/contact1.png";
import ContactAv2 from "@/assets/avatars/contact2.png";
import ContactAv3 from "@/assets/avatars/contact3.png";
import ContactAv4 from "@/assets/avatars/contact4.png";
import ContactAv5 from "@/assets/avatars/contact5.png";
import ContactAv6 from "@/assets/avatars/contact6.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Contact = {
  id: number;
  avatar: string;
  name: string;
};

const contacts = [
  {
    id: 1,
    avatar: ContactAv1.src,
    name: "Natali Craig",
  },
  {
    id: 2,
    avatar: ContactAv2.src,
    name: "Drew Cano",
  },
  {
    id: 3,
    avatar: ContactAv3.src,
    name: "Orlando Diggs",
  },
  {
    id: 4,
    avatar: ContactAv4.src,
    name: "Andi Lane",
  },
  {
    id: 5,
    avatar: ContactAv5.src,
    name: "Kate Morrison",
  },
  {
    id: 6,
    avatar: ContactAv6.src,
    name: "Koray Okumus",
  },
] satisfies Contact[];

export function Contacts() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      <motion.h3
        className="text-sm font-semibold px-1 py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
      >
        Contacts
      </motion.h3>

      <motion.ul
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
          delay: 0.2,
          delayChildren: 0.3,
        }}
      >
        {contacts.map((contact) => {
          return (
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.2,
              }}
              key={contact.id}
              className="relative p-1 [transition:background-color_0.2s_ease-out] hover:bg-accent/50 rounded-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <p className="text-sm font-normal truncate max-w-[25ch]">
                    {contact.name}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
