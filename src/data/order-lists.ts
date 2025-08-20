import { faker } from "@faker-js/faker";

export enum OrderStatus {
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export interface OrderUser {
  name: string;
  avatar: string;
}

export interface Order {
  id: string;
  user: OrderUser;
  project: string;
  address: string;
  createdAt: Date;
  status: OrderStatus;
}

const avatarStyles = [
  "avataaars",
  "personas",
  "lorelei",
  "notionists",
  "fun-emoji",
  "big-smile",
  "adventurer",
  "micah",
];

const projectTypes = [
  "Landing Page",
  "E-commerce Site",
  "Admin Dashboard",
  "Mobile App",
  "CRM System",
  "Blog Platform",
  "Portfolio Site",
  "Learning Platform",
  "Social Network",
  "Booking System",
  "Chat Application",
  "Analytics Tool",
  "Payment Gateway",
  "Content Management",
  "Task Manager",
  "Video Streaming",
  "Real Estate Portal",
  "Food Delivery App",
  "Fitness Tracker",
  "News Platform",
];

// Function to generate random order ID following #CM<number> pattern
const generateOrderId = (index: number): string => {
  const randomNum = faker.number.int({ min: 9600 + index, max: 9800 + index });
  return `#CM${randomNum}`;
};

const generateConciseAddress = (): string => {
  const streetNumber = faker.location.buildingNumber();
  const streetName = faker.location.street().split(" ").slice(0, 2).join(" ");
  const city = faker.location.city().split(" ")[0]; // Take first word only
  return `${streetNumber} ${streetName} ${city}`;
};

// Function to generate random avatar using DiceBear API
const getRandomAvatar = (seed?: string): string => {
  const style = faker.helpers.arrayElement(avatarStyles);
  const avatarSeed = seed || faker.string.alphanumeric(8);

  // DiceBear API URL - generates consistent avatars based on seed
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(
    avatarSeed
  )}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&size=128`;
};

const getRandomProject = (): string => {
  return faker.helpers.arrayElement(projectTypes);
};

const getRandomStatus = (): OrderStatus => {
  return faker.helpers.arrayElement(Object.values(OrderStatus));
};

const orderListData: Order[] = Array.from({ length: 50 }, (_, index) => {
  const createdAt = faker.date.recent({ days: 30 });

  const userName = faker.person.fullName();

  return {
    id: generateOrderId(index),
    user: {
      name: userName,
      avatar: getRandomAvatar(userName),
    },
    project: getRandomProject(),
    address: generateConciseAddress(),
    createdAt,
    status: getRandomStatus(),
  };
});

orderListData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export { orderListData };
