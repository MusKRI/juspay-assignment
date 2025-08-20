import { Roboto } from "next/font/google";
import { cn } from "./classes";

const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const fontVariables = cn(fontRoboto.variable);
