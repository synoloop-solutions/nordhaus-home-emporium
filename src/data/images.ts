// Curated luxury interior photography (Unsplash).
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const IMG = {
  sofa1: u("1540574163026-643ea20ade25"),
  sofa2: u("1493663284031-b7e3aefcae8e"),
  sofa3: u("1567538096630-e0c55bd6374c"),
  sofa4: u("1555041469-a586c61ea9bc"),
  chair1: u("1506439773649-6e0eb8cfb237"),
  chair2: u("1592078615290-033ee584e267"),
  chair3: u("1567016432779-094069958ea5"),
  chair4: u("1519947486511-46149fa0a254"),
  table1: u("1567538096621-38d2284b23ff"),
  table2: u("1577140917170-285929fb55b7"),
  table3: u("1530018607912-eff2daa1bac4"),
  bed1: u("1505693416388-ac5ce068fe85"),
  bed2: u("1631679706909-1844bbd07221"),
  bed3: u("1616594039964-ae9021a400a0"),
  lamp1: u("1543198126-e0e1c3d6f4d6"),
  lamp2: u("1507473885765-e6ed057f782c"),
  decor1: u("1513506003901-1e6a229e2d15"),
  decor2: u("1493666438817-866a91353ca9"),
  desk1: u("1518455027359-f3f8164ba6bd"),
  desk2: u("1593062096033-9a26b09da705"),
  outdoor1: u("1600210492493-0946911123ea"),
  outdoor2: u("1595428774223-ef52624120d2"),
  living1: u("1618221195710-dd6b41faaea6"),
  living2: u("1616486338812-3dadae4b4ace"),
  living3: u("1600585154340-be6161a56a0c"),
  bedroom1: u("1616137466211-f939a420be84"),
  dining1: u("1617104551722-3b2d51366400"),
  office1: u("1497366754035-f200968a6e72"),
  rug1: u("1600166898405-da9535204843"),
  shelf1: u("1594224457860-02f4a4c6e6b9"),
  hero: u("1600585154340-be6161a56a0c", 1920),
  heroAlt: u("1618221195710-dd6b41faaea6", 1920),
  craftsmanship: u("1611048267451-e6ed903d4a38", 1400),
  atelier: u("1604014237800-1c9102c219da", 1400),
};

export const lifestyle = (w = 1400) => ({
  living: `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=${w}&q=85`,
  bedroom: `https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=${w}&q=85`,
  dining: `https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&w=${w}&q=85`,
  office: `https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=${w}&q=85`,
  outdoor: `https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=${w}&q=85`,
  decor: `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=${w}&q=85`,
});

export const MATERIALS = [
  { id: "italian-leather", name: "Italian Leather", note: "Full-grain, vegetable-tanned in Tuscany.", image: u("1598300042247-d088f8ab3a91", 900) },
  { id: "solid-oak", name: "Solid Oak", note: "Quarter-sawn, hand-finished European oak.", image: u("1582582494705-f8ce0b0c24f0", 900) },
  { id: "walnut", name: "American Walnut", note: "FSC-certified walnut with oiled patina.", image: u("1611048267451-e6ed903d4a38", 900) },
  { id: "travertine", name: "Travertine", note: "Honed Roman travertine from Tivoli quarries.", image: u("1615873968403-89e068629265", 900) },
  { id: "marble", name: "Carrara Marble", note: "Bookmatched slabs from the Apuan Alps.", image: u("1618221118493-9cfa1a1c00da", 900) },
  { id: "brass", name: "Brushed Brass", note: "Solid brass with a hand-applied antique finish.", image: u("1604014237800-1c9102c219da", 900) },
  { id: "premium-fabric", name: "Belgian Linen & Bouclé", note: "Woven by heritage mills in Flanders.", image: u("1616627781658-902a9e8be65e", 900) },
];

export const PROJECTS = [
  { id: "p1", title: "Park Avenue Penthouse", location: "New York · Private Residence", image: u("1600585154340-be6161a56a0c", 1200) },
  { id: "p2", title: "Maison Côte d'Azur", location: "Antibes · Private Residence", image: u("1618221195710-dd6b41faaea6", 1200) },
  { id: "p3", title: "The Lanesborough Suite", location: "London · Hospitality", image: u("1631679706909-1844bbd07221", 1200) },
  { id: "p4", title: "Atelier Office", location: "Milan · Commercial", image: u("1497366754035-f200968a6e72", 1200) },
  { id: "p5", title: "Villa Travertino", location: "Tuscany · Architectural Home", image: u("1616486338812-3dadae4b4ace", 1200) },
  { id: "p6", title: "Aspen Mountain Retreat", location: "Colorado · Residential", image: u("1600210492493-0946911123ea", 1200) },
];
