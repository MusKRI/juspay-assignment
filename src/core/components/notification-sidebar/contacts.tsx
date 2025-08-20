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
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold px-1 py-2">Contacts</h3>

      <ul className="flex flex-col gap-2">
        {contacts.map((contact) => {
          return (
            <li key={contact.id} className="relative p-1">
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
