export interface ImpactStory {
  id: string;
  name: string;
  image: string;
  story: string;
  fullStory: string;
  type: "player" | "team";
  slug: string;
}

// Function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing whitespace
}

export const impactStories: ImpactStory[] = [
  // Player Stories
  {
    id: "1",
    name: "name 1",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
    story: "From a complete beginner to team captain in just two years, Sarah's journey embodies the transformative power of Ultimate Frisbee...",
    fullStory: "When Sarah Chen first joined Goosebumps Ultimate as a complete beginner, she could barely catch a frisbee. Two years later, she became team captain and led the team to their first regional championship. Sarah's journey began during her freshman year of college when she saw Ultimate players practicing on campus. Intrigued by the athleticism and camaraderie, she decided to give it a try. What started as a way to stay active turned into a life-changing passion. Through countless practices, tournaments, and team bonding experiences, Sarah developed not just her athletic skills but also leadership abilities that would serve her throughout her career. She learned the importance of communication, trust, and perseverance - values that Ultimate Frisbee teaches better than any classroom. Today, Sarah continues to inspire new players and serves as a mentor for the youth Ultimate program, paying forward the transformative power of the sport that changed her life.",
    type: "player",
    slug: generateSlug("name 1")
  },
  {
    id: "2",
    name: "name 2",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
    story: "After overcoming a sports injury, Marcus found healing and purpose through the welcoming community of Goosebumps Ultimate...",
    fullStory: "Marcus Rodriguez's story is one of resilience and rediscovery. After a devastating knee injury ended his college football career, Marcus fell into a deep depression. He felt lost without the structure and camaraderie of team sports. A friend suggested he try Ultimate Frisbee as a low-impact way to stay active. Initially skeptical, Marcus showed up to his first practice with Goosebumps Ultimate expecting just another workout. What he found was so much more. The welcoming community embraced him from day one, understanding his situation without judgment. As he gradually rebuilt his strength and confidence, Marcus discovered that Ultimate Frisbee offered more than just physical activity - it provided a supportive network of friends who became like family. Through the sport, Marcus learned to push through pain, trust his teammates, and celebrate small victories. Today, Marcus is not only a skilled player but also a team leader who helps other injured athletes find their way back to sports. His journey from injury to inspiration shows how Ultimate can heal both body and spirit.",
    type: "player",
    slug: generateSlug("name 2")
  },
  {
    id: "3",
    name: "name 3",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
    story: "Balancing medical school and competitive Ultimate, Priya shows how our sport can complement demanding careers...",
    fullStory: "Priya Patel's story demonstrates that it's possible to excel in both medicine and Ultimate Frisbee. As a third-year medical student, Priya's schedule is notoriously demanding - long hours in the hospital, endless studying, and research commitments. Yet she manages to be one of Goosebumps Ultimate's most dedicated players. Priya discovered Ultimate during her first year of medical school when she needed an outlet for stress relief. The sport's combination of strategy, athleticism, and social interaction provided the perfect balance to her intense academic life. Through Ultimate, Priya learned valuable lessons in teamwork and communication that directly apply to her medical career. The sport taught her how to make quick decisions under pressure, work effectively with diverse groups, and maintain composure in high-stakes situations. Her teammates became her support system during the toughest parts of medical training. Today, Priya serves as a role model for aspiring physicians who want to maintain active lifestyles. She proves that with proper time management and passion, it's possible to pursue demanding careers while staying committed to the sports we love.",
    type: "player",
    slug: generateSlug("Priya Patel")
  },

  // Team Stories
  {
    id: "4",
    name: "name 4",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
    story: "A ragtag group of newcomers who shocked the Ultimate world by reaching the regional finals in their first season...",
    fullStory: "The story of 'The Underdogs' is the ultimate tale of perseverance and unexpected triumph. When a group of complete beginners came together to form a new Goosebumps Ultimate team, no one expected much. They were a diverse group - some had never played any sport before, others were returning to athletics after years away. What they lacked in experience, they made up for with enthusiasm, dedication, and an unbreakable team spirit. Throughout their first season, 'The Underdogs' faced numerous challenges. They lost their early games badly, struggled with basic fundamentals, and dealt with injuries and scheduling conflicts. But instead of giving up, they used each setback as motivation to improve. They practiced relentlessly, studied game footage, and supported each other through the tough times. Their breakthrough came at the regional tournament when they defeated several established teams to reach the finals. Though they didn't win the championship, their journey from novices to finalists inspired the entire Ultimate community. Today, many members of 'The Underdogs' have become team leaders and coaches, proving that with hard work and heart, anyone can achieve greatness in Ultimate Frisbee.",
    type: "team",
    slug: generateSlug("name 4")
  },
  {
    id: "5",
    name: "name 5",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
    story: "How one team's commitment to the Spirit of the Game turned rivals into lifelong friends and elevated the entire league...",
    fullStory: "The 'Spirit Champions' story illustrates how Ultimate Frisbee's core values can transform not just a team, but an entire community. When the team formed, they were a group of competitive players focused solely on winning. Early in their journey, they experienced a turning point during a tournament where they received a Spirit of the Game award despite losing their semifinal match. This recognition made them reflect on what truly mattered in Ultimate. They decided to prioritize sportsmanship, respect, and community over pure competition. The transformation was remarkable. The 'Spirit Champions' began organizing community outreach events, mentoring youth players, and fostering positive relationships with rival teams. They started 'Spirit Circles' after games where teams would share feedback and build connections. Their approach elevated the entire league - other teams began adopting similar practices, leading to more respectful play and stronger community bonds. The team's success on the field improved as well, as their emphasis on trust and communication made them a more cohesive unit. Today, the 'Spirit Champions' are known not just for their athletic achievements, but for their role in making Ultimate Frisbee a more inclusive and positive sport in their region.",
    type: "team",
    slug: generateSlug("name 5")
  },
  {
    id: "6",
    name: "name 6",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
    story: "The story of how Goosebumps transformed a neighborhood through inclusive Ultimate programming and community outreach...",
    fullStory: "The 'Community Builders' team took Ultimate Frisbee beyond the field and into the heart of their neighborhood. What began as a recreational team evolved into a community movement that brought together people from all walks of life. The team's founders recognized that their diverse neighborhood lacked accessible recreational opportunities. They decided to use Ultimate Frisbee as a tool for community building. The 'Community Builders' organized free introductory clinics, partnered with local schools, and created inclusive programs for people of all ages and abilities. They established the neighborhood's first adaptive Ultimate program for players with disabilities and created scholarship opportunities for underprivileged youth. Their efforts transformed a once-disconnected community into a vibrant network of friends and neighbors. Local businesses began sponsoring their events, schools integrated Ultimate into physical education programs, and the team became a source of local pride. The 'Community Builders' proved that sports can be a powerful catalyst for social change. Their legacy lives on through the numerous community programs they established and the hundreds of lives they've touched. Today, Ultimate Frisbee is a beloved activity throughout their neighborhood, bringing people together and fostering a sense of belonging that extends far beyond the playing field.",
    type: "team",
    slug: generateSlug("name 6")
  }
];

export const getStoriesByType = (type: "player" | "team") => {
  return impactStories.filter(story => story.type === type);
};

export const getStoryBySlug = (slug: string) => {
  return impactStories.find(story => story.slug === slug);
};