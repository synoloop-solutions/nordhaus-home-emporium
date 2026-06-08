// Curated furniture / interior stock photography (Unsplash).
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  sofa1: u("1555041469-a586c61ea9bc"),
  sofa2: u("1493663284031-b7e3aefcae8e"),
  sofa3: u("1567538096630-e0c55bd6374c"),
  sofa4: u("1617806118233-18e1de247200"),
  chair1: u("1506439773649-6e0eb8cfb237"),
  chair2: u("1592078615290-033ee584e267"),
  chair3: u("1567538096630-e0c55bd6374c"),
  chair4: u("1503602642458-232111445657"),
  table1: u("1538688525198-9b88f6f53126"),
  table2: u("1577140917170-285929fb55b7"),
  table3: u("1530018607912-eff2daa1bac4"),
  bed1: u("1505693416388-ac5ce068fe85"),
  bed2: u("1522771739844-6a9f6d5f14af"),
  bed3: u("1616594039964-ae9021a400a0"),
  lamp1: u("1611967164521-abae8fba4668"),
  lamp2: u("1507473885765-e6ed057f782c"),
  decor1: u("1513506003901-1e6a229e2d15"),
  decor2: u("1493666438817-866a91353ca9"),
  desk1: u("1518455027359-f3f8164ba6bd"),
  desk2: u("1593062096033-9a26b09da705"),
  outdoor1: u("1600210492493-0946911123ea"),
  outdoor2: u("1595428774223-ef52624120d2"),
  living1: u("1524758631624-e2822e304c36"),
  living2: u("1586023492125-27b2c045efd7"),
  living3: u("1616486338812-3dadae4b4ace"),
  bedroom1: u("1616137466211-f939a420be84"),
  dining1: u("1617104551722-3b2d51366400"),
  office1: u("1497366754035-f200968a6e72"),
  rug1: u("1600166898405-da9535204843"),
  shelf1: u("1594224457860-02f4a4c6e6b9"),
  hero: u("1618220179428-22790b461013", 1600),
};

export const lifestyle = (w = 1200) => ({
  living: `https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=${w}&q=80`,
  bedroom: `https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=${w}&q=80`,
  dining: `https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&w=${w}&q=80`,
  office: `https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=${w}&q=80`,
  outdoor: `https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=${w}&q=80`,
  decor: `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=${w}&q=80`,
});