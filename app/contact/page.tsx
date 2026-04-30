"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Users, Calendar, Target, Handshake, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useState, type ComponentType, type FormEvent } from "react";
import { Footer } from "@/components/Footer";
import { contactCategories, type ContactCategory } from "@/data/contacts";
import { Navbar } from "@/components/Navbar";

const iconMap: Record<string, ComponentType<Record<string, unknown>>> = {
  Users,
  Calendar,
  Target,
  Handshake,
  Mail,
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Practice Location",
    content: "Central Park Fields, Sports District, City 12345",
  },
  { icon: Phone, title: "Phone", content: "556-879-9952" },
  { icon: Mail, title: "Main Email", content: "hello@goosebumpsultimate.com" },
  { icon: Clock, title: "Practice Times", content: "Tue & Thu: 7PM-9PM" },
];



export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ContactCategory>(contactCategories[0]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      toEmail: "your@gmail.com", // change to your email
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      toast.success("Message sent successfully!");
      e.currentTarget.reset();
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar/>
      <section id="contact-hero" className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 uppercase tracking-wider">
              Contact
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              GET IN <span className="text-primary">TOUCH</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Reach out to us with your enquiries. We're here to help and answer any questions you might have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
            {contactCategories.map((category) => {
              const IconComponent = iconMap[category.icon];
              const isSelected = selectedCategory.id === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 mb-2 ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <p
                    className={`font-semibold text-sm ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {category.title.split(" ")[0]}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2" id="contact-form">
              <Card className="p-6 md:p-8 border-border">
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-muted-foreground">{selectedCategory.description}</p>
                  <p className="text-primary font-semibold mt-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {selectedCategory.email}
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        placeholder="Your first name"
                        className="bg-secondary border-border"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        placeholder="Your last name"
                        className="bg-secondary border-border"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone (Optional)</Label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input
                      placeholder="e.g. Inquiry about training sessions"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Tell us more about your enquiry..."
                      rows={5}
                      className="bg-secondary border-border resize-none"
                      required
                    />
                  </div>
                  <Button
                    className="w-full uppercase tracking-wider font-semibold"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            <div id="contact-info">
              <Card className="p-6 md:p-8 border-border sticky top-28">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const IconComp = item.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <IconComp className="w-5 h-5 text-primary mt-1" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="text-muted-foreground text-sm">{item.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
// "use client";

// import { useState, FormEvent } from "react";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default function ContactPage() {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);

//     const data = {
//       firstName: formData.get("firstName"),
//       lastName: formData.get("lastName"),
//       email: formData.get("email"),
//       phone: formData.get("phone"),
//       subject: formData.get("subject"),
//       message: formData.get("message"),
//       toEmail: "your@gmail.com", // change to your email
//     };

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();

//       if (!res.ok) throw new Error(result.error);

//       toast.success("Message sent successfully!");
//       e.currentTarget.reset();
//     } catch (err) {
//       toast.error("Failed to send message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-4"
//       >
//         <h2 className="text-2xl font-bold">Contact Us</h2>

//         <Input name="firstName" placeholder="First Name" required />
//         <Input name="lastName" placeholder="Last Name" required />
//         <Input name="email" type="email" placeholder="Email" required />
//         <Input name="phone" placeholder="Phone (optional)" />
//         <Input name="subject" placeholder="Subject" required />
//         <Textarea name="message" placeholder="Message" required />

//         <Button type="submit" disabled={loading} className="w-full">
//           {loading ? "Sending..." : "Send Message"}
//         </Button>
//       </form>
//     </main>
//   );
// }