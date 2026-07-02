export type CityFacts = {
  name: string;
  province: string;
  population: string;
  climate: string;
  neighbourhoods: string[];
  landmark: string;
  pestNote: string;
};

const CITY_FACTS: Record<string, CityFacts> = {
  toronto: {
    name: "Toronto",
    province: "ON",
    population: "2.9 million residents",
    climate: "humid continental summers and freezing winters that drive rodents indoors",
    neighbourhoods: ["Scarborough", "North York", "Etobicoke", "Leslieville"],
    landmark: "the CN Tower and Lake Ontario waterfront",
    pestNote: "older brick homes near the waterfront and dense downtown condos both attract ants, mice, and bed bugs",
  },
  vancouver: {
    name: "Vancouver",
    province: "BC",
    population: "675,000 residents in the city proper",
    climate: "mild, wet winters and dry summers that keep spiders and silverfish active year-round",
    neighbourhoods: ["Kitsilano", "East Vancouver", "Mount Pleasant", "Kerrisdale"],
    landmark: "Stanley Park and the North Shore mountains",
    pestNote: "rain-soaked crawl spaces and lush gardens make rodent and ant pressure especially high",
  },
  calgary: {
    name: "Calgary",
    province: "AB",
    population: "1.3 million in the metro area",
    climate: "dry prairie climate with chinook winds that can wake hibernating pests mid-winter",
    neighbourhoods: ["Beltline", "Bridgeland", "Mahogany", "Tuscany"],
    landmark: "the Calgary Tower and Bow River pathway",
    pestNote: "new suburban builds and older inner-city homes both see seasonal mice and wasp nest spikes",
  },
  edmonton: {
    name: "Edmonton",
    province: "AB",
    population: "1 million metro residents",
    climate: "long cold winters pushing wildlife and rodents toward heated structures",
    neighbourhoods: ["Strathcona", "Windermere", "Castle Downs", "Oliver"],
    landmark: "the North Saskatchewan River valley",
    pestNote: "river valley green space brings raccoons and skunks into backyards across the city",
  },
  ottawa: {
    name: "Ottawa",
    province: "ON",
    population: "1 million in the National Capital Region",
    climate: "four distinct seasons with heavy snow driving pests into attics and basements",
    neighbourhoods: ["Kanata", "Orleans", "Westboro", "The Glebe"],
    landmark: "Parliament Hill and the Rideau Canal",
    pestNote: "government district high-rises and Kanata townhomes face different pest profiles each season",
  },
  mississauga: {
    name: "Mississauga",
    province: "ON",
    population: "720,000 residents",
    climate: "lake-effect humidity near Lake Ontario that sustains ant and mosquito populations",
    neighbourhoods: ["Port Credit", "Erin Mills", "Streetsville", "Meadowvale"],
    landmark: "Square One and the Mississauga waterfront",
    pestNote: "mixed commercial-residential corridors along Hurontario see heavy cockroach and rodent calls",
  },
  brampton: {
    name: "Brampton",
    province: "ON",
    population: "650,000 and growing fast",
    climate: "warm summers and cold winters typical of the Greater Toronto Area",
    neighbourhoods: ["Bramalea", "Heart Lake", "Mount Pleasant", "Downtown Brampton"],
    landmark: "Gage Park and the Rose Theatre",
    pestNote: "rapid new construction disturbs soil and pushes ants and mice into neighbouring homes",
  },
  hamilton: {
    name: "Hamilton",
    province: "ON",
    population: "580,000 residents",
    climate: "escarpment microclimate with wet springs ideal for carpenter ants",
    neighbourhoods: ["Westdale", "Stoney Creek", "Ancaster", "Dundas"],
    landmark: "the Niagara Escarpment and Hamilton Harbour",
    pestNote: "older Victorian homes on the mountain and valley neighbourhoods need tailored rodent plans",
  },
  london: {
    name: "London",
    province: "ON",
    population: "420,000 residents",
    climate: "southwestern Ontario humidity that fuels spider and silverfish activity indoors",
    neighbourhoods: ["Old North", "Byron", "Masonville", "Wortley Village"],
    landmark: "the Thames River and Victoria Park",
    pestNote: "student housing near Western University sees recurring bed bug and cockroach outbreaks",
  },
  kitchener: {
    name: "Kitchener",
    province: "ON",
    population: "260,000 in a tri-city metro of 575,000",
    climate: "continental climate with freeze-thaw cycles that crack foundations and invite pests",
    neighbourhoods: ["Victoria Park", "Stanley Park", "Forest Heights", "Doon"],
    landmark: "Victoria Park and the tech corridor",
    pestNote: "tech-campus offices and century homes in the core both need proactive pest programs",
  },
  windsor: {
    name: "Windsor",
    province: "ON",
    population: "230,000 residents",
    climate: "Canada's warmest city with long growing seasons that extend mosquito and ant activity",
    neighbourhoods: ["Walkerville", "Riverside", "South Windsor", "Forest Glade"],
    landmark: "the Detroit River waterfront",
    pestNote: "cross-border trade corridors bring occasional stored-product pest issues to warehouses",
  },
  markham: {
    name: "Markham",
    province: "ON",
    population: "340,000 residents",
    climate: "GTA humidity with wooded lots that harbour wildlife at property edges",
    neighbourhoods: ["Unionville", "Thornhill", "Cornell", "Markville"],
    landmark: "Main Street Unionville and Markham Centre",
    pestNote: "large-lot homes backing onto greenbelt routinely need raccoon and skunk removal",
  },
  vaughan: {
    name: "Vaughan",
    province: "ON",
    population: "320,000 residents",
    climate: "hot summers and snowy winters across sprawling subdivisions",
    neighbourhoods: ["Woodbridge", "Maple", "Kleinburg", "Concord"],
    landmark: "Canada's Wonderland and the Vaughan Metropolitan Centre",
    pestNote: "new-build communities in Maple and Concord report ant swarms in first warm weeks",
  },
  surrey: {
    name: "Surrey",
    province: "BC",
    population: "580,000 residents — BC's second-largest city",
    climate: "coastal rain shadow with wet autumns that drive silverfish and rodents inside",
    neighbourhoods: ["Whalley", "Newton", "Cloverdale", "South Surrey"],
    landmark: "Bear Creek Park and the Port Mann Bridge",
    pestNote: "rapid densification near SkyTrain lines increases shared-wall pest migration",
  },
  burnaby: {
    name: "Burnaby",
    province: "BC",
    population: "250,000 residents",
    climate: "mild Pacific Northwest weather keeping pests active most of the year",
    neighbourhoods: ["Metrotown", "Brentwood", "Deer Lake", "Edmonds"],
    landmark: "Burnaby Mountain and Metropolis at Metrotown",
    pestNote: "high-rise living near Metrotown creates vertical cockroach and bed bug spread",
  },
  richmond: {
    name: "Richmond",
    province: "BC",
    population: "210,000 residents on Lulu Island",
    climate: "low-lying delta farmland with high groundwater that attracts ants and rodents",
    neighbourhoods: ["Steveston", "Brighouse", "Terra Nova", "East Richmond"],
    landmark: "Steveston Village and the Olympic Oval",
    pestNote: "delta soil conditions and agricultural edges bring seasonal wildlife onto residential lots",
  },
  montreal: {
    name: "Montreal",
    province: "QC",
    population: "1.8 million city residents",
    climate: "heavy snowfall and humid summers that sustain carpenter ant colonies in older wood frames",
    neighbourhoods: ["Plateau Mont-Royal", "Verdun", "Rosemont", "Laval border communities"],
    landmark: "Mount Royal and Old Montreal",
    pestNote: "duplex and triplex housing with shared walls makes bed bug treatment a building-wide effort",
  },
  winnipeg: {
    name: "Winnipeg",
    province: "MB",
    population: "750,000 metro residents",
    climate: "extreme cold winters and hot summers — one of Canada's widest temperature swings",
    neighbourhoods: ["St. Boniface", "St. Vital", "Transcona", "River Heights"],
    landmark: "The Forks and the Red River",
    pestNote: "spring snowmelt floods basements and flushes rodents into ground-floor units",
  },
  regina: {
    name: "Regina",
    province: "SK",
    population: "230,000 residents",
    climate: "dry prairie conditions with gopher and mouse pressure on suburban edges",
    neighbourhoods: ["Lakeview", "Harbour Landing", "Cathedral", "Normanview"],
    landmark: "Wascana Centre and the Saskatchewan legislature",
    pestNote: "open prairie lots surrounding new developments see seasonal wildlife intrusion",
  },
  saskatoon: {
    name: "Saskatoon",
    province: "SK",
    population: "280,000 residents",
    climate: "cold winters and warm summers across the South Saskatchewan River valley",
    neighbourhoods: ["Nutana", "Stonebridge", "Evergreen", "Lawson Heights"],
    landmark: "the Broadway Bridge and Meewasin Valley",
    pestNote: "riverbank greenbelts bring skunks and raccoons into fenced yards each fall",
  },
  victoria: {
    name: "Victoria",
    province: "BC",
    population: "95,000 city residents, 400,000 metro",
    climate: "Canada's mildest winters — pests rarely go fully dormant",
    neighbourhoods: ["James Bay", "Fernwood", "Oak Bay", "Saanich border"],
    landmark: "the Inner Harbour and Butchart Gardens",
    pestNote: "heritage homes with crawl spaces need year-round spider and rodent monitoring",
  },
  kelowna: {
    name: "Kelowna",
    province: "BC",
    population: "145,000 residents",
    climate: "semi-arid Okanagan summers with orchard and vineyard pest pressure spilling into homes",
    neighbourhoods: ["Rutland", "Glenmore", "Lower Mission", "Dilworth"],
    landmark: "Okanagan Lake and Knox Mountain",
    pestNote: "fruit trees in residential yards attract wasps and ants through late summer",
  },
  abbotsford: {
    name: "Abbotsford",
    province: "BC",
    population: "155,000 residents",
    climate: "Fraser Valley humidity with agricultural land bordering subdivisions",
    neighbourhoods: ["Clearbrook", "Sumas Mountain", "McMillan", "Auguston"],
    landmark: "Abbotsford International Airport and Mill Lake Park",
    pestNote: "farm-adjacent properties see elevated rodent and fly activity during harvest season",
  },
  reddeer: {
    name: "Red Deer",
    province: "AB",
    population: "105,000 residents",
    climate: "central Alberta prairie with sharp seasonal pest shifts",
    neighbourhoods: ["Downtown", "Clearview", "Vanier Woods", "South Hill"],
    landmark: "the Red Deer River and Bower Ponds",
    pestNote: "suburban expansion into former farmland increases wildlife encounters each year",
  },
  oakville: {
    name: "Oakville",
    province: "ON",
    population: "215,000 residents",
    climate: "lakefront humidity along Lake Ontario",
    neighbourhoods: ["Bronte", "Glen Abbey", "Old Oakville", "Uptown Core"],
    landmark: "Bronte Harbour and Oakville's lakeshore trails",
    pestNote: "mature tree canopy in established neighbourhoods shelters carpenter ants and squirrels",
  },
  burlington: {
    name: "Burlington",
    province: "ON",
    population: "190,000 residents",
    climate: "moderate lake-effect weather between Hamilton and Toronto",
    neighbourhoods: ["Aldershot", "Roseland", "Millcroft", "Downtown Burlington"],
    landmark: "Spencer Smith Park and the Burlington waterfront",
    pestNote: "escarpment-adjacent properties blend urban and wildlife pest challenges",
  },
  whitby: {
    name: "Whitby",
    province: "ON",
    population: "140,000 residents",
    climate: "Durham Region seasons with spring ant swarms and fall rodent entry",
    neighbourhoods: ["Brooklin", "Port Whitby", "Pringle Creek", "Taunton North"],
    landmark: "Whitby Harbour and Lynde Shores Conservation Area",
    pestNote: "conservation lands bordering subdivisions funnel raccoons into attics each spring",
  },
  oshawa: {
    name: "Oshawa",
    province: "ON",
    population: "175,000 residents",
    climate: "Lake Ontario-influenced winters and warm summers",
    neighbourhoods: ["North Oshawa", "Downtown", "Taunton", "Cedardale"],
    landmark: "the Oshawa Valley and GM heritage district",
    pestNote: "mixed industrial-residential zones need commercial-grade rodent prevention",
  },
  ajax: {
    name: "Ajax",
    province: "ON",
    population: "125,000 residents",
    climate: "Durham lakeshore humidity sustaining indoor moisture pests",
    neighbourhoods: ["Pickering Village", "Westney Heights", "Audley", "South Ajax"],
    landmark: "Ajax Waterfront Park and Rotary Park",
    pestNote: "townhouse communities see fast spread of ants and mice through shared walls",
  },
  pickering: {
    name: "Pickering",
    province: "ON",
    population: "100,000 residents",
    climate: "lakefront microclimate with damp basements ideal for silverfish",
    neighbourhoods: ["Liverpool", "Rouge Park edge", "Amberlea", "Dunbarton"],
    landmark: "Pickering Waterfront and the nuclear plant lands",
    pestNote: "rouge valley green space pushes wildlife into north Pickering subdivisions",
  },
  barrie: {
    name: "Barrie",
    province: "ON",
    population: "155,000 residents",
    climate: "Kempenfelt Bay lake effect with heavy winter snow",
    neighbourhoods: ["Downtown", "Holly", "Letitia Heights", "Painswick"],
    landmark: "Kempenfelt Bay and Centennial Beach",
    pestNote: "cottage-country turnover brings bed bugs and mice into year-round rentals",
  },
  cambridge: {
    name: "Cambridge",
    province: "ON",
    population: "140,000 across Galt, Preston, and Hespeler",
    climate: "Grand River valley humidity with older mill-town housing stock",
    neighbourhoods: ["Galt", "Preston", "Hespeler", "Blair"],
    landmark: "the Grand River and historic Galt downtown",
    pestNote: "century homes along the river need specialized treatments for carpenter ants",
  },
  coquitlam: {
    name: "Coquitlam",
    province: "BC",
    population: "150,000 residents",
    climate: "mountain-rainforest edge with persistent moisture pests",
    neighbourhoods: ["Burke Mountain", "Maillardville", "Westwood Plateau", "Austin Heights"],
    landmark: "Coquitlam Crunch trail and Town Centre Park",
    pestNote: "forest-adjacent homes on Burke Mountain report frequent rodent and wildlife calls",
  },
  langley: {
    name: "Langley",
    province: "BC",
    population: "130,000 across Township and City",
    climate: "Fraser Valley farmland meeting suburban sprawl",
    neighbourhoods: ["Willoughby", "Walnut Grove", "Fort Langley", "Murrayville"],
    landmark: "Fort Langley National Historic Site",
    pestNote: "horse-country properties and new Willoughby builds both attract distinct pest types",
  },
  etobicoke: {
    name: "Etobicoke",
    province: "ON",
    population: "365,000 residents as a Toronto borough",
    climate: "lakefront winds and Humber River valley moisture",
    neighbourhoods: ["The Kingsway", "Rexdale", "Islington", "Long Branch"],
    landmark: "Humber Bay and Sherway Gardens",
    pestNote: "high-rise clusters near Islington and low-rise homes in The Kingsway need different approaches",
  },
  "north-york": {
    name: "North York",
    province: "ON",
    population: "670,000 residents as a Toronto borough",
    climate: "urban heat island effect extending pest seasons",
    neighbourhoods: ["Willowdale", "Don Mills", "Downsview", "York Mills"],
    landmark: "Mel Lastman Square and Earl Bales Park",
    pestNote: "dense condo corridors along Yonge Street see recurring German cockroach issues",
  },
  scarborough: {
    name: "Scarborough",
    province: "ON",
    population: "630,000 residents as a Toronto borough",
    climate: "Bluffs-adjacent humidity and ravine green space",
    neighbourhoods: ["Agincourt", "Malvern", "West Hill", "Birch Cliff"],
    landmark: "Scarborough Bluffs and Rouge National Urban Park",
    pestNote: "ravine-backed properties experience raccoon and skunk activity year-round",
  },
  milton: {
    name: "Milton",
    province: "ON",
    population: "130,000 and one of Canada's fastest-growing towns",
    climate: "Niagara Escarpment edge with new-build pest colonization",
    neighbourhoods: ["Dempsey", "Hawthorne Village", "Old Milton", "Scott"],
    landmark: "Rattlesnake Point and the Milton escarpment",
    pestNote: "brand-new subdivisions often see first-year ant and spider surges in disturbed soil",
  },
  newmarket: {
    name: "Newmarket",
    province: "ON",
    population: "90,000 residents",
    climate: "northern GTA winters with spring thaw pest awakening",
    neighbourhoods: ["Downtown", "Stonehaven", "Glenway", "Summerhill"],
    landmark: "Main Street Newmarket and Fairy Lake",
    pestNote: "heritage Main Street shops and modern Glenway homes both need seasonal pest plans",
  },
  "richmond-hill": {
    name: "Richmond Hill",
    province: "ON",
    population: "210,000 residents",
    climate: "Oak Ridges Moraine groundwater feeding damp crawl spaces",
    neighbourhoods: ["Bayview Hill", "Jefferson", "Langstaff", "Oak Ridges"],
    landmark: "David Dunlap Observatory and Lake Wilcox",
    pestNote: "moraine woodlands push squirrels and raccoons into fenced backyards",
  },
};

export function getCityKeyFromSlug(slug: string): string | null {
  const parts = slug.replace(/^\//, "").split("-");
  for (let i = parts.length - 1; i >= 0; i--) {
    const single = parts.slice(i).join("-");
    if (CITY_FACTS[single]) return single;
    if (i < parts.length - 1) {
      const pair = parts.slice(i).join("-");
      if (CITY_FACTS[pair]) return pair;
    }
  }
  return null;
}

export function getCityFacts(slug: string): CityFacts | null {
  const key = getCityKeyFromSlug(slug);
  return key ? CITY_FACTS[key] : null;
}

export function getCityFactsFromArea(targetArea: string): CityFacts | null {
  const cityKey = targetArea
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  return CITY_FACTS[cityKey] ?? null;
}

export function getAllCityKeys(): string[] {
  return Object.keys(CITY_FACTS);
}
