import { Roboto, Inter } from "next/font/google";
import { cn } from "./classes";

const fontRoboto = Inter({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const fontVariables = cn(fontRoboto.variable);
