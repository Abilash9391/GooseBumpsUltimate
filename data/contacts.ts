export interface ContactCategory {
  id: string;
  title: string;
  description: string;
  email: string;
  icon: string;
}

export const contactCategories: ContactCategory[] = [
  {
    id: "membership",
    title: "Membership Enquiry",
    description: "Questions about joining the club, membership fees, and benefits",
    email: "membership@goosebumpsultimate.com",
    icon: "Users",
  },
  {
    id: "events",
    title: "Events & Tournaments",
    description: "Information about upcoming events, tournaments, and competitions",
    email: "events@goosebumpsultimate.com",
    icon: "Calendar",
  },
  {
    id: "training",
    title: "Training & Coaching",
    description: "Questions about training sessions, coaching, and skill development",
    email: "training@goosebumpsultimate.com",
    icon: "Target",
  },
  {
    id: "sponsorship",
    title: "Sponsorship & Partnerships",
    description: "Partnership opportunities, sponsorship, and collaborations",
    email: "sponsorship@goosebumpsultimate.com",
    icon: "Handshake",
  },
  {
    id: "general",
    title: "General Enquiry",
    description: "General questions and feedback",
    email: "hello@goosebumpsultimate.com",
    icon: "Mail",
  },
];
