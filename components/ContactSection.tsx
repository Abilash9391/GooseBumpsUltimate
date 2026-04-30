"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const contactInfo = [
  { icon: MapPin, title: "Practice Location", content: "Central Park Fields, Sports District, City 12345" },
  { icon: Phone, title: "Phone", content: "+1 (555) 987-6543" },
  { icon: Mail, title: "Email", content: "hello@goosebumpsultimate.com" },
  { icon: Clock, title: "Practice Times", content: "Tue & Thu: 6PM-8PM | Sat: 9AM-12PM" },
];

export function ContactSection() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 uppercase tracking-wider">Contact</Badge>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            GET IN <span className="text-primary">TOUCH</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Want to join the club? Have questions about Ultimate Frisbee? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">Send us a message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="Your first name" className="bg-secondary border-border" required />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Your last name" className="bg-secondary border-border" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" className="bg-secondary border-border" required />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="e.g. Want to join the club" className="bg-secondary border-border" required />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Tell us about yourself and your interest in Ultimate..." rows={5} className="bg-secondary border-border resize-none" required />
              </div>
              <Button className="w-full uppercase tracking-wider font-semibold" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-muted-foreground text-sm mt-1">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-semibold">Central Park Fields</p>
                  <p className="text-muted-foreground text-sm">Sports District</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
