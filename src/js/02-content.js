
/* ============ CONTENT ============ */
const RANKS=["Novice","Apprentice","Scholar","Sage","Master","Grandmaster","Legend"];
const AVATARS=[
  {l:1,f:"🥚",n:"Rookie",h:"Answer questions to earn XP and climb the ranks."},
  {l:3,f:"🥉",n:"Bronze",h:"Good start. Keep your streak going to reach Silver."},
  {l:5,f:"🥈",n:"Silver",h:"Solid progress. Reach level 7 for Gold."},
  {l:7,f:"🥇",n:"Gold",h:"Strong work. Platinum unlocks at level 10."},
  {l:10,f:"💎",n:"Platinum",h:"Top tier learner. Elite unlocks at level 14."},
  {l:14,f:"🏆",n:"Elite",h:"The highest rank. Keep defending it."},
];
const BOSSES=[
  {f:"⏳",n:"Procrastination"},{f:"📝",n:"The Exam"},
  {f:"📱",n:"Distraction"},{f:"⚡",n:"The Glitch"},
  {f:"🌀",n:"Self-Doubt"},{f:"🌙",n:"Night Before Cram"},
];
const ACHIEVEMENTS=[
  {id:"first",ico:"🎓",name:"First Steps",desc:"Answer your first question"},
  {id:"ten",ico:"🔟",name:"Getting Warm",desc:"Answer 10 questions"},
  {id:"hund",ico:"💯",name:"Centurion",desc:"Answer 100 questions"},
  {id:"combo5",ico:"🔥",name:"On Fire",desc:"Reach a x5 combo"},
  {id:"combo10",ico:"⚡",name:"Unstoppable",desc:"Reach a x10 combo"},
  {id:"perfect",ico:"🌟",name:"Flawless",desc:"Finish a deck with no mistakes"},
  {id:"boss1",ico:"🗡️",name:"Boss Slayer",desc:"Defeat your first boss"},
  {id:"bossClean",ico:"🛡️",name:"Untouchable",desc:"Beat a boss losing no lives"},
  {id:"streak3",ico:"📅",name:"Consistent",desc:"Keep a 3-day streak"},
  {id:"streak7",ico:"🗓️",name:"Dedicated",desc:"Keep a 7-day streak"},
  {id:"lvl5",ico:"⭐",name:"Rising Star",desc:"Reach Level 5"},
  {id:"lvl10",ico:"👑",name:"Brainiac",desc:"Reach Level 10"},
  {id:"dragon",ico:"🏆",name:"Elite Rank",desc:"Reach Level 14"},
  {id:"master1",ico:"📗",name:"Topic Master",desc:"Fully master any deck"},
  {id:"money",ico:"💵",name:"Money Smart",desc:"Master the Money Management deck"},
  {id:"ai",ico:"🤖",name:"Future Ready",desc:"Master the AI in School deck"},
  {id:"create",ico:"🛠️",name:"Architect",desc:"Create your own deck"},
  {id:"refer",ico:"🤝",name:"Connector",desc:"Refer your first friend"},
  {id:"social",ico:"🎉",name:"Social Butterfly",desc:"Refer 5 friends"},
  {id:"q250",ico:"📚",name:"Bookworm",desc:"Answer 250 questions"},
  {id:"q500",ico:"🎓",name:"Scholar",desc:"Answer 500 questions"},
  {id:"q1000",ico:"🧠",name:"Genius",desc:"Answer 1,000 questions"},
  {id:"combo20",ico:"🌀",name:"In the Zone",desc:"Reach a x20 combo"},
  {id:"streak30",ico:"🗓️",name:"Monthly Master",desc:"Keep a 30-day streak"},
  {id:"lvl20",ico:"🌟",name:"Superstar",desc:"Reach Level 20"},
  {id:"mock1",ico:"⏱️",name:"Mock Ready",desc:"Complete a JAMB mock"},
  {id:"mockAce",ico:"🎯",name:"Mock Ace",desc:"Score 70%+ in a mock"},
  {id:"polyglot",ico:"🗣️",name:"Polyglot",desc:"Try a Nigerian language quest"},
  {id:"tradey",ico:"🛠️",name:"Hands-On",desc:"Answer a vocational question"},
  {id:"jrmaster",ico:"🎒",name:"Junior Champion",desc:"Master a JSS subject"},
  {id:"rich1k",ico:"💎",name:"Coin Tycoon",desc:"Reach 1,000 coins"},
  {id:"shopper",ico:"🛍️",name:"Shopaholic",desc:"Buy something in the Shop"},
  {id:"aimaker",ico:"🤖",name:"AI Creator",desc:"Make a deck with AI"},
  {id:"inviter",ico:"📣",name:"Recruiter",desc:"Invite a friend"},
  {id:"backup",ico:"💾",name:"Safe Keeper",desc:"Back up your data"},
];
// card fields: t(type mc|tf|type), q, a, w[], accepts[], e(explanation)
const CATS=[
  {name:"📘 Core Subjects (WAEC/NECO)", decks:[
    {id:"math",name:"Mathematics",emoji:"🔢",cards:[
      {t:"type",q:"Solve for x: 2x + 5 = 15",a:"5",accepts:["x=5"],e:"Subtract 5 from both sides to get 2x = 10, then divide by 2."},
      {t:"mc",q:"Area of a circle, radius 7 cm (π = 22/7)",a:"154 cm²",w:["44 cm²","49 cm²","22 cm²"],e:"Area = πr² = 22/7 × 7 × 7 = 154 cm²."},
      {t:"mc",q:"Simplify: 3² × 3³",a:"243",w:["729","81","216"],e:"Multiplying powers of the same base adds the indices: 3²⁺³ = 3⁵ = 243."},
      {t:"mc",q:"The angles inside a triangle add up to…",a:"180°",w:["360°","90°","270°"],e:"The three interior angles of any triangle always sum to 180°."},
      {t:"type",q:"Find the mean (average) of 2, 4, 6, 8, 10.",a:"6",e:"Add them (30) and divide by how many there are (5): 30 ÷ 5 = 6."},
      {t:"tf",q:"A number written using only 0s and 1s is in base 2 (binary).",a:"True",e:"Binary uses just two digits, 0 and 1."},
      {t:"mc",q:"What is 15% of 200?",a:"30",w:["20","45","25"],e:"15% = 0.15, and 0.15 × 200 = 30."},
      {t:"mc",q:"Simplify: 5x + 3x",a:"8x",w:["15x","2x","8"],e:"Add the coefficients of like terms: 5 + 3 = 8, so 8x."},
      {t:"type",q:"What is the square root of 81?",a:"9",e:"9 × 9 = 81, so √81 = 9."},
      {t:"mc",q:"Which of these is a prime number?",a:"11",w:["9","15","21"],e:"11 has only two factors, 1 and 11. The others can be divided further."},
      {t:"mc",q:"Solve the quadratic equation x² − 5x + 6 = 0.",a:"x = 2 or 3",w:["x = 1 or 6","x = −2 or −3","x = 0 or 5"],e:"Factorise: (x−2)(x−3)=0, so x = 2 or 3.",band:"senior"},
      {t:"type",q:"If log₁₀ 100 = x, find x.",a:"2",e:"100 = 10², so log₁₀100 = 2.",band:"senior"},
      {t:"mc",q:"Differentiate y = x³ with respect to x.",a:"3x²",w:["x²","3x","x⁴"],e:"Using d/dx(xⁿ)=n·xⁿ⁻¹, the derivative is 3x².",band:"senior"},
      {t:"mc",q:"What is the value of sin 30°?",a:"0.5",w:["1","0.866","0"],e:"sin 30° = 1/2 = 0.5.",band:"senior"},
      {t:"mc",q:"Simplify (2/3) ÷ (4/9).",a:"3/2",w:["2/3","8/27","1/2"],e:"Dividing means multiplying by the reciprocal: 2/3 × 9/4 = 3/2.",band:"senior"},
      {t:"type",q:"If 2ˣ = 32, find x.",a:"5",e:"32 = 2⁵, so x = 5.",band:"senior"},
      {t:"mc",q:"The roots of x² − 7x + 12 = 0 are…",a:"3 and 4",w:["−3 and −4","2 and 6","1 and 12"],e:"(x−3)(x−4)=0, so x = 3 or 4.",band:"senior"},
      {t:"mc",q:"Find the gradient (slope) of the line 2y = 4x + 6.",a:"2",w:["4","3","½"],e:"Make y the subject: y = 2x + 3, so the gradient is 2.",band:"senior"},
      {t:"mc",q:"A fair coin is tossed once. The probability of getting a head is…",a:"½",w:["1","0","¼"],e:"One favourable outcome out of two equally likely ones.",band:"senior"},
    ]},
    {id:"eng",name:"English Language",emoji:"📝",cards:[
      {t:"mc",q:"Choose the antonym of “ancient”.",a:"Modern",w:["Old","Aged","Historic"],e:"An antonym is an opposite; “ancient” (very old) is the opposite of “modern”."},
      {t:"mc",q:"In “She sings beautifully”, the word “beautifully” is a(n)…",a:"Adverb",w:["Adjective","Noun","Verb"],e:"It describes HOW she sings (a verb), which is the job of an adverb."},
      {t:"type",q:"Give the plural of “child”.",a:"children",e:"“Child” is an irregular noun — its plural is “children”, not “childs”."},
      {t:"mc",q:"A word that joins sentences (and, but, because) is a…",a:"Conjunction",w:["Pronoun","Preposition","Article"],e:"Conjunctions connect words, phrases or clauses."},
      {t:"mc",q:"“Break a leg!” is an example of a(n)…",a:"Idiom",w:["Simile","Pun","Proverb"],e:"An idiom is a phrase whose meaning isn't literal — here it means “good luck”."},
      {t:"tf",q:"“Their”, “there” and “they're” all mean the same thing.",a:"False",e:"They sound alike (homophones) but have different meanings and spellings."},
      {t:"mc",q:"An adjective is a word that describes a…",a:"Noun",w:["Verb","Adverb","Sentence"],e:"Adjectives describe nouns, e.g. a “tall” boy."},
      {t:"type",q:"What is the past tense of “go”?",a:"went",e:"“Go” is an irregular verb; its past tense is “went”."},
      {t:"mc",q:"In “The cat sat on the mat”, the word “on” is a…",a:"Preposition",w:["Pronoun","Adverb","Noun"],e:"Prepositions show position or relationship, like on, in, under."},
      {t:"mc",q:"Choose the opposite of “generous”.",a:"Stingy",w:["Kind","Wealthy","Cheerful"],e:"Generous means giving freely; “stingy” means unwilling to give."},
      {t:"mc",q:"In “He spoke as though he knew everything”, the underlined group is a(n)…",a:"Adverbial clause",w:["Noun clause","Adjective clause","Phrase"],e:"It describes the manner of speaking, modifying the verb.",band:"senior"},
      {t:"mc",q:"“The pen is mightier than the sword” mainly uses…",a:"Metonymy",w:["Simile","Onomatopoeia","Pun"],e:"“Pen” stands for writing and “sword” for force — naming by association.",band:"senior"},
      {t:"type",q:"Give the abstract noun formed from “happy”.",a:"happiness",e:"Abstract nouns name feelings or ideas, e.g. happiness.",band:"senior"},
      {t:"mc",q:"Choose the correctly punctuated sentence.",a:"It's raining, so take an umbrella.",w:["Its raining so take an umbrella.","It's raining so, take an umbrella.","Its' raining, so take an umbrella."],e:"“It's” = it is, and a comma comes before the joining word “so”.",band:"senior"},
      {t:"mc",q:"Choose the word nearest in meaning to “candid”.",a:"Frank",w:["Rude","Shy","Secretive"],e:"Candid means open and honest — frank.",band:"senior"},
      {t:"mc",q:"Choose the opposite of “scarce”.",a:"Abundant",w:["Rare","Few","Empty"],e:"Scarce means few; abundant means plentiful.",band:"senior"},
      {t:"mc",q:"“Neither the boys nor their teacher ___ present.” Choose the correct verb.",a:"was",w:["were","are","have"],e:"With neither…nor, the verb agrees with the nearer subject (teacher, singular).",band:"senior"},
      {t:"mc",q:"“He has lived here ___ 2010.” Choose the correct word.",a:"since",w:["for","from","at"],e:"Use “since” with a point in time; “for” with a length of time.",band:"senior"},
    ]},
    {id:"bio",name:"Biology",emoji:"🧬",cards:[
      {t:"mc",q:"The powerhouse of the cell is the…",a:"Mitochondria",w:["Nucleus","Ribosome","Vacuole"],e:"Mitochondria release energy (as ATP) that powers the cell."},
      {t:"type",q:"The process plants use to make their own food is called ______.",a:"photosynthesis",e:"Plants use sunlight, water and carbon dioxide to make food."},
      {t:"mc",q:"Which blood cells fight infection?",a:"White blood cells",w:["Red blood cells","Platelets","Plasma"],e:"White blood cells are part of the body's immune defence."},
      {t:"tf",q:"An adult human has 206 bones.",a:"True",e:"Babies are born with more, but some fuse together by adulthood."},
      {t:"type",q:"The basic structural unit of all living things is the ____.",a:"cell",e:"Every living thing is made of one or more cells."},
      {t:"mc",q:"Which gas do plants release during photosynthesis?",a:"Oxygen",w:["Carbon dioxide","Nitrogen","Hydrogen"],e:"Plants take in carbon dioxide and give out oxygen."},
      {t:"type",q:"The green pigment in leaves that traps sunlight is ______.",a:"chlorophyll",e:"Chlorophyll absorbs light energy for photosynthesis."},
      {t:"mc",q:"Which part of a plant mainly absorbs water and minerals?",a:"Roots",w:["Leaf","Stem","Flower"],e:"Root hairs take up water and minerals from the soil."},
      {t:"mc",q:"Which organ pumps blood around the body?",a:"Heart",w:["Liver","Lungs","Kidney"],e:"The heart is a muscular pump that circulates blood."},
      {t:"tf",q:"The lungs are the main organs used for breathing.",a:"True",e:"In the lungs, oxygen enters the blood and carbon dioxide leaves."},
      {t:"mc",q:"The type of cell division that produces gametes (sex cells) is…",a:"Meiosis",w:["Mitosis","Osmosis","Diffusion"],e:"Meiosis halves the chromosome number to form gametes.",band:"senior"},
      {t:"mc",q:"The molecule that carries hereditary (genetic) information is…",a:"DNA",w:["ATP","Glucose","Haemoglobin"],e:"DNA stores the genetic code passed on to offspring.",band:"senior"},
      {t:"type",q:"The movement of water across a semi-permeable membrane is called ______.",a:"osmosis",e:"Water moves from a dilute to a more concentrated solution.",band:"senior"},
      {t:"mc",q:"In humans, the sex chromosomes of a male are…",a:"XY",w:["XX","YY","XO"],e:"Females are XX; males are XY.",band:"senior"},
      {t:"mc",q:"The micro-organism that causes malaria is…",a:"Plasmodium",w:["Anopheles","A virus","A bacterium"],e:"Plasmodium is the parasite; the Anopheles mosquito only carries it.",band:"senior"},
      {t:"mc",q:"The part of the eye that controls the amount of light entering is the…",a:"Iris",w:["Lens","Retina","Cornea"],e:"The iris adjusts the size of the pupil.",band:"senior"},
      {t:"mc",q:"Which food class provides the most energy per gram?",a:"Fats",w:["Carbohydrates","Proteins","Vitamins"],e:"Fats give about twice the energy per gram of carbohydrates.",band:"senior"},
      {t:"mc",q:"Excess amino acids are broken down (deaminated) in the…",a:"Liver",w:["Kidney","Lungs","Heart"],e:"The liver converts excess amino acids into urea.",band:"senior"},
    ]},
    {id:"chem",name:"Chemistry",emoji:"⚗️",cards:[
      {t:"type",q:"What is the chemical symbol for Gold?",a:"Au",e:"It comes from the Latin word for gold, “aurum”."},
      {t:"mc",q:"The pH of a neutral solution is…",a:"7",w:["0","14","1"],e:"Below 7 is acidic, above 7 is basic, exactly 7 is neutral (like pure water)."},
      {t:"mc",q:"Which gas makes up about 78% of the air?",a:"Nitrogen",w:["Oxygen","Carbon dioxide","Hydrogen"],e:"Nitrogen is ~78%; oxygen is only about 21%."},
      {t:"tf",q:"An acid turns blue litmus paper red.",a:"True",e:"Acids turn blue litmus red; bases turn red litmus blue."},
      {t:"type",q:"The smallest particle of an element is an ____.",a:"atom",e:"An atom cannot be broken down by ordinary chemical means."},
      {t:"mc",q:"H₂O is the chemical formula for…",a:"Water",w:["Hydrogen","Salt","Acid"],e:"Two hydrogen atoms joined to one oxygen atom make water."},
      {t:"type",q:"What is the chemical symbol for Oxygen?",a:"O",e:"Oxygen is represented by a single capital letter, O."},
      {t:"mc",q:"The common name for sodium chloride (NaCl) is…",a:"Table salt",w:["Sugar","Baking soda","Chalk"],e:"Sodium chloride is everyday table salt."},
      {t:"mc",q:"Changing a liquid into a gas by heating is called…",a:"Evaporation",w:["Condensation","Freezing","Melting"],e:"Heat gives particles enough energy to escape as vapour."},
      {t:"tf",q:"Diamond and graphite are both made of carbon.",a:"True",e:"They are the same element arranged differently (allotropes of carbon)."},
      {t:"mc",q:"The number of protons in an atom is called its…",a:"Atomic number",w:["Mass number","Valency","Isotope"],e:"The atomic number equals the number of protons.",band:"senior"},
      {t:"type",q:"In a reaction, a substance that LOSES electrons is said to be ______.",a:"oxidised",accepts:["oxidized"],e:"Remember OIL RIG: Oxidation Is Loss of electrons.",band:"senior"},
      {t:"mc",q:"A chemical bond formed by sharing electrons is a…",a:"Covalent bond",w:["Ionic bond","Metallic bond","Hydrogen bond"],e:"In covalent bonds, atoms share pairs of electrons.",band:"senior"},
      {t:"mc",q:"At s.t.p, one mole of any gas occupies about…",a:"22.4 dm³",w:["1 dm³","18 dm³","44.8 dm³"],e:"The molar gas volume at s.t.p is 22.4 dm³.",band:"senior"},
      {t:"mc",q:"The most electronegative element is…",a:"Fluorine",w:["Oxygen","Chlorine","Nitrogen"],e:"Fluorine has the highest electronegativity of all elements.",band:"senior"},
      {t:"mc",q:"A substance that speeds up a reaction without being used up is a…",a:"Catalyst",w:["Reactant","Product","Solvent"],e:"Catalysts lower the activation energy of a reaction.",band:"senior"},
      {t:"mc",q:"The gas that turns lime water milky is…",a:"Carbon dioxide",w:["Oxygen","Hydrogen","Nitrogen"],e:"CO₂ forms insoluble calcium carbonate, making lime water cloudy.",band:"senior"},
      {t:"type",q:"The combining power (number of bonds) of carbon is…",a:"4",e:"Carbon is tetravalent — it forms four bonds.",band:"senior"},
    ]},
    {id:"phy",name:"Physics",emoji:"⚙️",cards:[
      {t:"mc",q:"The SI unit of force is the…",a:"Newton",w:["Joule","Watt","Pascal"],e:"One newton accelerates a 1 kg mass at 1 m/s²."},
      {t:"type",q:"Speed = distance ÷ ______.",a:"time",e:"Speed tells you distance covered per unit of time."},
      {t:"mc",q:"Energy due to motion is called…",a:"Kinetic energy",w:["Potential energy","Heat energy","Sound energy"],e:"Moving objects have kinetic energy; stored/position energy is potential."},
      {t:"tf",q:"Light travels faster than sound.",a:"True",e:"That's why you see lightning before you hear the thunder."},
      {t:"type",q:"The SI unit of electric current is the ______.",a:"ampere",accepts:["amp","amps","amperes"],e:"Current is measured in amperes (amps) using an ammeter."},
      {t:"mc",q:"Which instrument measures temperature?",a:"Thermometer",w:["Barometer","Ammeter","Voltmeter"],e:"A barometer measures pressure; an ammeter measures current."},
      {t:"mc",q:"The SI unit of energy is the…",a:"Joule",w:["Watt","Newton","Volt"],e:"Energy is measured in joules; the watt is power (joules per second)."},
      {t:"type",q:"The force that pulls objects toward the Earth is ______.",a:"gravity",e:"Gravity gives objects their weight."},
      {t:"mc",q:"A push or a pull acting on an object is called a…",a:"Force",w:["Mass","Energy","Speed"],e:"Forces are measured in newtons and can change motion."},
      {t:"tf",q:"Metals are generally good conductors of electricity.",a:"True",e:"Metals have free electrons that carry electric current easily."},
      {t:"mc",q:"The acceleration due to gravity (g) near the Earth is about…",a:"9.8 m/s²",w:["1.0 m/s²","98 m/s²","0.98 m/s²"],e:"g ≈ 9.8 m/s² close to the Earth's surface.",band:"senior"},
      {t:"type",q:"Work done = force × ______.",a:"distance",e:"W = F × d, the distance moved in the direction of the force.",band:"senior"},
      {t:"mc",q:"Ohm's law is written as V = I × …",a:"R (resistance)",w:["t (time)","P (power)","m (mass)"],e:"Voltage = current × resistance.",band:"senior"},
      {t:"mc",q:"The SI unit of electrical power is the…",a:"Watt",w:["Joule","Ohm","Coulomb"],e:"Power is energy used per second, measured in watts.",band:"senior"},
      {t:"mc",q:"The SI unit of electrical resistance is the…",a:"Ohm",w:["Volt","Ampere","Watt"],e:"Resistance is measured in ohms (Ω).",band:"senior"},
      {t:"mc",q:"A device that converts electrical energy into mechanical energy is a…",a:"Motor",w:["Generator","Transformer","Battery"],e:"A generator does the reverse — mechanical to electrical.",band:"senior"},
      {t:"mc",q:"The bending of light as it passes from one medium to another is…",a:"Refraction",w:["Reflection","Diffraction","Dispersion"],e:"Light changes speed and direction at the boundary.",band:"senior"},
      {t:"mc",q:"Power = work done ÷ …",a:"time",w:["distance","force","mass"],e:"Power is the rate of doing work (work ÷ time).",band:"senior"},
    ]},
  ]},
  {name:"🏛️ Arts & Social Sciences", decks:[
    {id:"gov",name:"Government",emoji:"🏛️",cards:[
      {t:"type",q:"What is the capital city of Nigeria?",a:"Abuja",e:"Abuja became the capital in 1991, replacing Lagos."},
      {t:"mc",q:"How many arms does the government have?",a:"Three",w:["Two","Four","Five"],e:"The Executive, the Legislature and the Judiciary."},
      {t:"mc",q:"The Nigerian constitution currently in use was made in…",a:"1999",w:["1960","1979","1989"],e:"The 1999 Constitution is the current supreme law of Nigeria."},
      {t:"mc",q:"A system where citizens elect their leaders is…",a:"Democracy",w:["Monarchy","Dictatorship","Anarchy"],e:"Democracy means “government by the people”, through elections."},
      {t:"tf",q:"Nigeria has 36 states plus the Federal Capital Territory.",a:"True",e:"36 states plus the FCT, Abuja."},
      {t:"mc",q:"Which arm of government makes the laws?",a:"The Legislature",w:["The Executive","The Judiciary","The Police"],e:"In Nigeria this is the National Assembly."},
      {t:"mc",q:"Which arm interprets the laws?",a:"The Judiciary",w:["The Executive","The Legislature","The Army"],e:"The courts (judiciary) interpret and apply the law."},
      {t:"type",q:"In which year did Nigeria gain independence?",a:"1960",e:"Nigeria became independent on 1 October 1960."},
      {t:"mc",q:"At the federal level, who heads the Executive arm?",a:"The President",w:["The Speaker","The Chief Justice","The Senate President"],e:"The President carries out and enforces the laws."},
      {t:"mc",q:"Nigeria's National Assembly is made up of the Senate and the…",a:"House of Representatives",w:["House of Lords","State Council","Cabinet"],e:"Together the two houses make federal laws."},
      {t:"mc",q:"A system that shares power between central and state governments is…",a:"Federalism",w:["Unitary system","Confederacy","Monarchy"],e:"Nigeria operates a federal system of government.",band:"senior"},
      {t:"mc",q:"The principle that no one is above the law is the…",a:"Rule of law",w:["Separation of powers","Federalism","Sovereignty"],e:"Everyone, including leaders, is subject to the law.",band:"senior"},
      {t:"mc",q:"Keeping the Executive, Legislature and Judiciary independent is called…",a:"Separation of powers",w:["Rule of law","Federalism","Devolution"],e:"It stops any single arm from misusing power.",band:"senior"},
      {t:"tf",q:"“Checks and balances” allow each arm of government to limit the others.",a:"True",e:"They keep all three arms accountable to one another.",band:"senior"},
      {t:"mc",q:"The right of citizens to vote is known as…",a:"Suffrage",w:["Censorship","Sovereignty","Lobbying"],e:"Universal adult suffrage means all qualified adults may vote.",band:"senior"},
      {t:"mc",q:"The head of the judiciary in Nigeria is the…",a:"Chief Justice of Nigeria",w:["Attorney-General","Senate President","Inspector-General of Police"],e:"The CJN heads the Supreme Court.",band:"senior"},
      {t:"mc",q:"A one-party state is one in which…",a:"only one political party is allowed",w:["two parties share power","there is no government","many parties compete"],e:"Only a single legal party is permitted.",band:"senior"},
      {t:"mc",q:"Pressure groups mainly aim to…",a:"influence government policy",w:["win elections","make laws","judge cases"],e:"Unlike parties, they influence rather than contest for power.",band:"senior"},
    ]},
    {id:"eco",name:"Economics",emoji:"💹",cards:[
      {t:"type",q:"What is the official currency of Nigeria?",a:"Naira",e:"The naira (₦) is Nigeria's currency."},
      {t:"mc",q:"If demand rises and supply stays fixed, price tends to…",a:"Rise",w:["Fall","Stay the same","Disappear"],e:"More buyers chasing the same goods pushes the price up."},
      {t:"mc",q:"Land, labour, capital and ______ are the factors of production.",a:"Entrepreneur",w:["Money","Profit","Demand"],e:"The entrepreneur organises the other factors and takes the risk."},
      {t:"mc",q:"A market with only one seller is a…",a:"Monopoly",w:["Monopsony","Oligopoly","Free market"],e:"“Mono” means one — a single seller controls the market."},
      {t:"tf",q:"Inflation means a general FALL in prices.",a:"False",e:"Inflation is a general RISE in prices over time."},
      {t:"mc",q:"Human wants are unlimited but resources are…",a:"Scarce",w:["Free","Unlimited","Useless"],e:"Scarcity — limited resources versus unlimited wants — is the basic economic problem."},
      {t:"type",q:"The buying and selling of goods and services is called ______.",a:"trade",accepts:["commerce"],e:"Trade moves goods and services between people."},
      {t:"mc",q:"A tax charged on goods brought into a country is a…",a:"Customs duty",w:["Income tax","Rent","School fee"],e:"Import duties (tariffs) are collected at the border."},
      {t:"mc",q:"Income that you keep instead of spending is called…",a:"Savings",w:["Profit","Debt","Loan"],e:"Savings is the part of income not spent on consumption."},
      {t:"tf",q:"Banks usually pay interest on money kept in a savings account.",a:"True",e:"Interest is a reward the bank pays you for saving."},
      {t:"mc",q:"When government spending is greater than its revenue, the result is a…",a:"Budget deficit",w:["Budget surplus","Balanced budget","Profit"],e:"A deficit means spending exceeds income.",band:"senior"},
      {t:"mc",q:"The body that controls Nigeria's money supply and interest rates is the…",a:"Central Bank",w:["Stock Exchange","Customs Service","World Bank"],e:"The Central Bank of Nigeria runs monetary policy.",band:"senior"},
      {t:"type",q:"The study of the economy as a whole is called ______.",a:"macroeconomics",e:"Macroeconomics studies the whole economy; microeconomics studies individual units.",band:"senior"},
      {t:"mc",q:"By the law of demand, when price rises, quantity demanded usually…",a:"Falls",w:["Rises","Doubles","Stays the same"],e:"Higher prices normally reduce the quantity people buy.",band:"senior"},
      {t:"mc",q:"The reward for capital as a factor of production is…",a:"Interest",w:["Wages","Rent","Profit"],e:"Land→rent, labour→wages, capital→interest, entrepreneur→profit.",band:"senior"},
      {t:"mc",q:"Goods used to produce other goods (e.g. machines) are…",a:"Capital goods",w:["Consumer goods","Free goods","Final goods"],e:"They are used to make other goods, not consumed directly.",band:"senior"},
      {t:"mc",q:"A market with very many sellers of identical products is…",a:"Perfect competition",w:["Monopoly","Oligopoly","Duopoly"],e:"Many sellers and identical products define perfect competition.",band:"senior"},
      {t:"mc",q:"A continuous fall in the value of money is…",a:"Inflation",w:["Deflation","Appreciation","Surplus"],e:"As prices rise, each naira buys less — that's inflation.",band:"senior"},
    ]},
    {id:"geo",name:"Geography",emoji:"🗺️",cards:[
      {t:"mc",q:"The world's largest continent is…",a:"Asia",w:["Africa","Europe","Antarctica"],e:"Asia is the biggest by both land area and population."},
      {t:"type",q:"Rivers Niger and Benue meet (confluence) at which town?",a:"Lokoja",e:"The confluence is at Lokoja in Kogi State."},
      {t:"mc",q:"The longest river in Africa is the…",a:"Nile",w:["Niger","Congo","Volta"],e:"The Nile is the longest river in Africa."},
      {t:"type",q:"The imaginary line at 0° latitude is the ______.",a:"equator",e:"The equator divides Earth into the northern and southern hemispheres."},
      {t:"mc",q:"The Sahara, the world's largest hot desert, is in…",a:"North Africa",w:["South America","Central Asia","Australia"],e:"The Sahara stretches across northern Africa."},
      {t:"tf",q:"Nigeria is located in West Africa.",a:"True",e:"Nigeria lies in West Africa, on the Gulf of Guinea."},
      {t:"mc",q:"The imaginary line at 0° longitude is the…",a:"Prime Meridian",w:["Equator","Tropic of Cancer","Date Line"],e:"The Prime Meridian passes through Greenwich, England."},
      {t:"mc",q:"The largest ocean on Earth is the…",a:"Pacific",w:["Atlantic","Indian","Arctic"],e:"The Pacific is the largest and deepest ocean."},
      {t:"type",q:"Rocks formed when molten material cools and hardens are called ______ rocks.",a:"igneous",e:"Examples include granite and basalt."},
      {t:"tf",q:"The rotation of the Earth causes day and night.",a:"True",e:"Earth spins once about every 24 hours, giving us day and night."},
      {t:"mc",q:"Lines on a map joining places of equal height are called…",a:"Contour lines",w:["Latitudes","Isobars","Longitudes"],e:"Contour lines show relief — the height of the land.",band:"senior"},
      {t:"mc",q:"Which instrument measures atmospheric pressure?",a:"Barometer",w:["Thermometer","Anemometer","Rain gauge"],e:"A barometer measures pressure; an anemometer measures wind speed.",band:"senior"},
      {t:"mc",q:"Rocks formed from compressed layers of sediment are…",a:"Sedimentary rocks",w:["Igneous rocks","Metamorphic rocks","Molten rocks"],e:"Examples include limestone and sandstone.",band:"senior"},
      {t:"mc",q:"The savanna belt is mainly made up of…",a:"Grassland with scattered trees",w:["Dense rainforest","Desert sand","Mangrove swamp"],e:"Savanna is tropical grassland with only a few trees.",band:"senior"},
      {t:"mc",q:"The shape of the Earth is best described as…",a:"An oblate spheroid",w:["A perfect sphere","Completely flat","A cube"],e:"It is slightly flattened at the poles and bulges at the equator.",band:"senior"},
      {t:"mc",q:"Lines of longitude are also called…",a:"Meridians",w:["Parallels","Contours","Isobars"],e:"Meridians run north–south; parallels (latitudes) run east–west.",band:"senior"},
      {t:"mc",q:"The largest planet in the solar system is…",a:"Jupiter",w:["Saturn","Earth","Mars"],e:"Jupiter is the largest planet in our solar system.",band:"senior"},
      {t:"mc",q:"Mining of solid minerals is an example of which type of production?",a:"Primary production",w:["Secondary production","Tertiary production","Quaternary production"],e:"Extracting raw materials directly from nature is primary production.",band:"senior"},
    ]},
    {id:"civic",name:"Civic Education",emoji:"🤝",cards:[
      {t:"mc",q:"The rights to life, education and dignity are called…",a:"Human rights",w:["Privileges","Duties","Favours"],e:"Human rights belong to every person simply for being human."},
      {t:"mc",q:"A responsible citizen regularly pays…",a:"Taxes",w:["Bribes","Nothing","Fines only"],e:"Taxes fund public services like roads, schools and hospitals."},
      {t:"type",q:"Love and loyal devotion to one's country is called ______.",a:"patriotism",e:"Patriotism is pride in and loyalty to your country."},
      {t:"tf",q:"Voting in elections is a civic responsibility.",a:"True",e:"Voting lets citizens choose their leaders in a democracy."},
      {t:"mc",q:"The best peaceful way to resolve conflict is…",a:"Dialogue",w:["Fighting","Ignoring it","Revenge"],e:"Dialogue means talking through differences to reach agreement."},
      {t:"mc",q:"The document that states citizens' rights is the…",a:"Constitution",w:["Anthem","Pledge","Timetable"],e:"The constitution is the supreme law of the land."},
      {t:"mc",q:"The right to attend school is the right to…",a:"Education",w:["Movement","Vote","Privacy"],e:"Education is a basic human right for every child."},
      {t:"tf",q:"Obeying the law is a duty of every citizen.",a:"True",e:"Following the law keeps society peaceful and orderly."},
      {t:"mc",q:"Which body mainly maintains law and order in the community?",a:"The Police",w:["The Court","The Bank","The Market"],e:"The police are the civil agency that keeps order."},
      {t:"type",q:"Honesty, respect and discipline are examples of good ______.",a:"values",e:"Values are the moral standards that guide good behaviour."},
      {t:"mc",q:"Freely sharing your opinions is protected as freedom of…",a:"Expression",w:["Movement","Worship","Association"],e:"Freedom of expression is a fundamental human right.",band:"senior"},
      {t:"mc",q:"The body that conducts elections in Nigeria is the…",a:"INEC",w:["EFCC","NAFDAC","FRSC"],e:"INEC is the Independent National Electoral Commission.",band:"senior"},
      {t:"mc",q:"The agency that fights financial crimes and corruption in Nigeria is the…",a:"EFCC",w:["INEC","NYSC","NNPC"],e:"EFCC = Economic and Financial Crimes Commission.",band:"senior"},
      {t:"mc",q:"Tolerance and respect for others' views mainly promote…",a:"Peaceful coexistence",w:["Conflict","Discrimination","Cheating"],e:"They help a diverse society live together in peace.",band:"senior"},
    ]},
    {id:"lit",name:"Literature in English",emoji:"📖",cards:[
      {t:"mc",q:"A comparison using “like” or “as” is a…",a:"Simile",w:["Metaphor","Hyperbole","Pun"],e:"E.g. “brave as a lion.” A metaphor compares without “like/as”."},
      {t:"type",q:"Giving human qualities to non-human things is called ______.",a:"personification",e:"E.g. “the wind whispered” — wind can't really whisper."},
      {t:"mc",q:"A long poem about heroic deeds is a(n)…",a:"Epic",w:["Sonnet","Ode","Limerick"],e:"Epics tell grand stories of heroes and their adventures."},
      {t:"mc",q:"The turning point of a story is the…",a:"Climax",w:["Prologue","Setting","Theme"],e:"The climax is the moment of highest tension in the plot."},
      {t:"tf",q:"The author of a novel is called a novelist.",a:"True",e:"A poet writes poems, a dramatist writes plays, a novelist writes novels."},
      {t:"mc",q:"The time and place in which a story happens is the…",a:"Setting",w:["Plot","Mood","Genre"],e:"Setting tells you where and when events take place."},
      {t:"mc",q:"Deliberate exaggeration for effect is called…",a:"Hyperbole",w:["Simile","Irony","Rhyme"],e:"E.g. “I've told you a million times.”"},
      {t:"mc",q:"Repetition of the same beginning sound in nearby words is…",a:"Alliteration",w:["Rhyme","Pun","Simile"],e:"E.g. “Peter Piper picked…”."},
      {t:"mc",q:"The main character of a story is the…",a:"Protagonist",w:["Antagonist","Narrator","Author"],e:"The antagonist is the one who opposes the protagonist."},
      {t:"type",q:"A story performed by actors on a stage is called a ______.",a:"play",accepts:["drama"],e:"Plays (drama) are written to be acted out, not just read."},
      {t:"mc",q:"A poem of fourteen lines is called a…",a:"Sonnet",w:["Ode","Ballad","Haiku"],e:"A sonnet has 14 lines, often about love.",band:"senior"},
      {t:"mc",q:"Words that imitate sounds (bang, hiss, buzz) are examples of…",a:"Onomatopoeia",w:["Assonance","Irony","Metaphor"],e:"The word sounds like the thing it names.",band:"senior"},
      {t:"mc",q:"The struggle between opposing forces in a story is the…",a:"Conflict",w:["Setting","Mood","Rhyme"],e:"Conflict (e.g. man vs man) drives the plot.",band:"senior"},
      {t:"type",q:"The major divisions of a play are called ______.",a:"acts",e:"Acts are further divided into scenes.",band:"senior"},
    ]},
    {id:"agric",name:"Agricultural Science",emoji:"🌾",cards:[
      {t:"mc",q:"A crop grown mainly to be sold is a…",a:"Cash crop",w:["Cover crop","Weed","Food crop"],e:"Cash crops (e.g. cocoa, cotton) are grown for income; food crops are eaten."},
      {t:"mc",q:"Cassava, yam and cocoyam are examples of…",a:"Tuber/root crops",w:["Cereals","Legumes","Fruits"],e:"They store food in swollen underground parts."},
      {t:"type",q:"The rearing of fish for food is called ______.",a:"fishery",accepts:["aquaculture","fish farming"],e:"Fish farming (aquaculture) raises fish in ponds or tanks."},
      {t:"tf",q:"Legumes such as beans help add nitrogen to the soil.",a:"True",e:"Bacteria in their root nodules “fix” nitrogen, enriching the soil."},
      {t:"type",q:"The top, most fertile layer of soil is the ______.",a:"topsoil",e:"Topsoil holds most of the nutrients and organic matter."},
      {t:"mc",q:"The keeping of bees for honey is called…",a:"Apiculture",w:["Poultry","Piggery","Horticulture"],e:"Apiculture is bee-keeping, mainly for honey and wax."},
      {t:"mc",q:"Rearing of domestic birds like chickens is called…",a:"Poultry",w:["Piggery","Fishery","Apiculture"],e:"Poultry farming raises birds for meat and eggs."},
      {t:"tf",q:"Growing different crops on the same land in turns (crop rotation) helps keep soil fertile.",a:"True",e:"Different crops use and replace different nutrients."},
      {t:"mc",q:"Which simple hand tool is commonly used for weeding?",a:"Hoe",w:["Tractor","Sprayer","Wheelbarrow"],e:"The hoe (and cutlass) are basic farm hand tools."},
      {t:"type",q:"Decayed plant and animal matter used to enrich soil is called ______.",a:"manure",accepts:["compost"],e:"Manure/compost is a natural fertiliser."},
      {t:"mc",q:"Cattle, sheep and goats that chew the cud are called…",a:"Ruminants",w:["Monogastrics","Poultry","Reptiles"],e:"Ruminants have a multi-chambered stomach.",band:"senior"},
      {t:"mc",q:"Growing only one type of crop on the same land repeatedly is…",a:"Monoculture",w:["Mixed cropping","Crop rotation","Fallowing"],e:"Monoculture can drain the soil of specific nutrients.",band:"senior"},
      {t:"mc",q:"Lime is added to soil mainly to…",a:"Reduce soil acidity",w:["Increase acidity","Add nitrogen","Kill all crops"],e:"Liming raises soil pH, making it less acidic.",band:"senior"},
      {t:"mc",q:"The female reproductive part of a flower is the…",a:"Pistil",w:["Stamen","Petal","Sepal"],e:"The pistil contains the stigma, style and ovary.",band:"senior"},
    ]},
    {id:"commerce",name:"Commerce",emoji:"🛍️",cards:[
      {t:"mc",q:"A trader who sells goods in small quantities directly to consumers is a…",a:"Retailer",w:["Wholesaler","Manufacturer","Producer"],e:"Retailers sell directly to the final consumer."},
      {t:"mc",q:"A trader who buys in bulk from producers and sells to retailers is a…",a:"Wholesaler",w:["Retailer","Consumer","Hawker"],e:"The wholesaler links the producer and the retailer."},
      {t:"tf",q:"Trade by barter is the exchange of goods for goods without using money.",a:"True",e:"Barter is the direct exchange of goods and services."},
      {t:"type",q:"Services that support trade — banking, insurance, transport, advertising — are called aids to ______.",a:"trade",e:"They make buying and selling easier and faster."},
      {t:"mc",q:"The document a seller sends to demand payment for goods supplied is a(n)…",a:"Invoice",w:["Receipt","Order","Catalogue"],e:"An invoice states how much the buyer owes."},
      {t:"mc",q:"Insurance works mainly on the principle of…",a:"Pooling of risks",w:["Gambling","Charity","Profit-sharing"],e:"Many contribute so the unlucky few can be compensated.",band:"senior"},
      {t:"mc",q:"The receipt and document of title for goods carried by sea is the…",a:"Bill of lading",w:["Air waybill","Consignment note","Invoice"],e:"It is used in shipping goods by sea.",band:"senior"},
      {t:"mc",q:"Trade carried out between different countries is…",a:"Foreign trade",w:["Home trade","Retail trade","Wholesale trade"],e:"Foreign (international) trade crosses national borders.",band:"senior"},
      {t:"mc",q:"The insurance principle requiring full disclosure of all material facts is…",a:"Utmost good faith",w:["Indemnity","Subrogation","Contribution"],e:"Both parties must disclose all relevant information.",band:"senior"},
      {t:"mc",q:"A written order instructing a bank to pay a stated sum of money is a…",a:"Cheque",w:["Invoice","Receipt","Voucher"],e:"A cheque is a common instrument of payment.",band:"senior"},
    ]},
    {id:"acct",name:"Financial Accounting",emoji:"🧾",cards:[
      {t:"mc",q:"Anything of value owned by a business is a(n)…",a:"Asset",w:["Liability","Expense","Loss"],e:"Examples: cash, buildings and stock."},
      {t:"mc",q:"Money a business owes to others (creditors, loans) is a(n)…",a:"Liability",w:["Asset","Capital","Profit"],e:"Liabilities are debts owed by the business."},
      {t:"mc",q:"The accounting equation is: Assets = Capital + …",a:"Liabilities",w:["Expenses","Drawings","Income"],e:"Assets are financed by capital plus liabilities."},
      {t:"tf",q:"In double-entry book-keeping, every debit has a matching credit.",a:"True",e:"This is the dual-aspect principle."},
      {t:"type",q:"The book in which transactions are first recorded before the ledger is the ______.",a:"journal",accepts:["day book","daybook"],e:"Journals (day books) are the books of original entry."},
      {t:"mc",q:"A statement that lists all ledger balances to check accuracy is the…",a:"Trial balance",w:["Balance sheet","Journal","Invoice"],e:"Total debits should equal total credits.",band:"senior"},
      {t:"mc",q:"The statement showing assets, liabilities and capital on a given date is the…",a:"Balance sheet",w:["Trial balance","Trading account","Cash book"],e:"It shows the financial position at a point in time.",band:"senior"},
      {t:"mc",q:"Gross profit = Sales − …",a:"Cost of goods sold",w:["Total expenses","Capital","Drawings"],e:"This is worked out in the trading account.",band:"senior"},
      {t:"mc",q:"Cash or goods the owner takes from the business for personal use are…",a:"Drawings",w:["Capital","Wages","Assets"],e:"Drawings reduce the owner's capital.",band:"senior"},
      {t:"mc",q:"The fall in the value of a fixed asset over time is called…",a:"Depreciation",w:["Appreciation","Discount","Bad debt"],e:"For example, using the straight-line method.",band:"senior"},
    ]},
  ]},
  {name:"💡 Money & Life Skills", decks:[
    {id:"money",name:"Money Management",emoji:"💰",cards:[
      {t:"mc",q:"You receive ₦5,000 pocket money. The smartest FIRST move is to…",a:"Save part before you spend",w:["Spend it all at once","Lend it to a friend","Buy snacks for everyone"],e:"“Pay yourself first” — save a little before spending the rest."},
      {t:"type",q:"Setting money aside for the future is called ______.",a:"saving",e:"Saving means keeping money instead of spending it all now."},
      {t:"mc",q:"A written plan for your income and spending is a…",a:"Budget",w:["Receipt","Loan","Wishlist"],e:"A budget tells your money where to go before you spend it."},
      {t:"tf",q:"“Buy now, pay later” with high interest can trap you in debt.",a:"True",e:"High interest makes what you owe grow quickly."},
      {t:"mc",q:"Money kept aside for unexpected problems is your…",a:"Emergency fund",w:["Allowance","Profit","Change"],e:"An emergency fund covers surprises without new debt."},
      {t:"mc",q:"The habit that builds wealth over time is…",a:"Spending less than you earn",w:["Borrowing often","Buying on impulse","Hiding money"],e:"Spending less than you earn leaves money to save and grow."},
      {t:"mc",q:"Food and shelter are examples of a…",a:"Need",w:["Want","Luxury","Treat"],e:"Needs are essential to live; wants are nice-to-have extras."},
      {t:"tf",q:"Saving small amounts regularly still adds up over time.",a:"True",e:"Consistency matters more than the size of each deposit."},
      {t:"mc",q:"The extra money a bank pays you for saving is called…",a:"Interest",w:["Tax","Fee","Fine"],e:"Interest is your reward for letting the bank hold your savings."},
      {t:"mc",q:"The main reason to track your spending is to…",a:"See where your money goes",w:["Impress friends","Spend faster","Forget your balance"],e:"Awareness of spending is the first step to controlling it."},
    ]},
    {id:"entr",name:"Entrepreneurship",emoji:"🥚",cards:[
      {t:"type",q:"A person who starts and runs a business is an ______.",a:"entrepreneur",e:"An entrepreneur takes a risk to create value for customers."},
      {t:"mc",q:"The money left after a business pays its costs is…",a:"Profit",w:["Capital","Tax","Debt"],e:"Profit = total money earned (revenue) minus expenses."},
      {t:"mc",q:"Before selling, you should first understand your…",a:"Customers",w:["Competitors only","Hobbies","Friends"],e:"A good business solves a real need for real customers."},
      {t:"tf",q:"Every strong business solves a real problem for people.",a:"True",e:"No problem solved usually means no paying customers."},
      {t:"type",q:"The money used to START a business is called ______.",a:"capital",accepts:["start-up capital","startup capital","seed capital"],e:"Capital pays for the first stock, tools or space."},
      {t:"mc",q:"A simple, cheap first version made to test an idea is a…",a:"Prototype",w:["Franchise","Monopoly","Receipt"],e:"A prototype lets you test before spending a lot of money."},
      {t:"mc",q:"The total money a business takes in from sales is called…",a:"Revenue",w:["Profit","Capital","Loss"],e:"Revenue is income before costs; profit is what's left after costs."},
      {t:"tf",q:"Customer feedback helps you improve your product.",a:"True",e:"Listening to customers shows you what to fix or add."},
      {t:"mc",q:"What makes customers choose you over others is your…",a:"Selling point",w:["Slogan","Logo","Receipt"],e:"A unique selling point is the special benefit only you offer."},
      {t:"mc",q:"The best FIRST step before starting a business is to…",a:"Research the market",w:["Print business cards","Rent an office","Hire staff"],e:"Confirm people actually want it before spending money."},
    ]},
    {id:"study",name:"Study Mastery",emoji:"🎯",cards:[
      {t:"mc",q:"The most effective way to remember for exams is to…",a:"Test yourself actively",w:["Re-read silently for hours","Highlight everything","Study while tired"],e:"Actively recalling answers strengthens memory far more than re-reading."},
      {t:"type",q:"Studying in focused 25-minute blocks with short breaks is the ______ technique.",a:"pomodoro",e:"The Pomodoro technique balances focused work with short rests."},
      {t:"tf",q:"Cramming all night usually beats steady daily study.",a:"False",e:"Spaced, regular study remembers far better than last-minute cramming."},
      {t:"mc",q:"Teaching a topic to someone else helps you…",a:"Understand it more deeply",w:["Forget it faster","Waste time","Confuse yourself"],e:"Explaining forces you to organise and truly understand the idea."},
      {t:"mc",q:"Reviewing your notes within 24 hours mainly improves…",a:"Memory retention",w:["Your handwriting","Internet speed","Your mood only"],e:"Early review fights the natural “forgetting curve”."},
      {t:"tf",q:"A tidy, quiet study space improves your focus.",a:"True",e:"Fewer distractions means more attention on your work."},
      {t:"mc",q:"The best way to handle a huge syllabus is to…",a:"Break it into small daily goals",w:["Do it all in one night","Skip the hard parts","Panic"],e:"Small daily chunks add up and feel far less overwhelming."},
      {t:"type",q:"Reviewing the same topic across spaced days is called spaced ______.",a:"repetition",e:"Spaced repetition reviews material at increasing intervals to lock it in."},
      {t:"mc",q:"During focused study, your phone should be…",a:"Put away or silenced",w:["Beside you","Used often","On your lap"],e:"Notifications break concentration and waste study time."},
      {t:"tf",q:"Getting enough sleep helps your brain remember what you studied.",a:"True",e:"Memories are strengthened (consolidated) while you sleep."},
    ]},
  ]},
  {name:"🤖 Future-Ready Skills", decks:[
    {id:"ai",name:"AI in School",emoji:"🤖",cards:[
      {t:"mc",q:"The BEST way to use an AI tool for schoolwork is to…",a:"Learn from it and check your work",w:["Copy its answers as your own","Skip studying entirely","Let it write your exam"],e:"Use AI as a tutor that explains — not a ghost-writer that replaces you."},
      {t:"tf",q:"Submitting an AI's answer as your own work is a form of cheating.",a:"True",e:"Passing off others' (or AI's) work as yours is plagiarism."},
      {t:"type",q:"A program that chats with you in human-like text is called a ______.",a:"chatbot",e:"A chatbot answers questions in natural language."},
      {t:"mc",q:"When an AI gives you a fact, you should always…",a:"Verify it from a trusted source",w:["Believe it instantly","Share it everywhere","Ignore it"],e:"AI can sound confident but still be wrong, so check important facts."},
      {t:"tf",q:"AI can sometimes give confident answers that are actually wrong (“hallucinations”).",a:"True",e:"That's exactly why you double-check what AI tells you."},
      {t:"mc",q:"A great way AI can help you study is by…",a:"Explaining hard topics in simpler words",w:["Doing the thinking for you","Replacing your teacher","Writing your name"],e:"Ask AI to simplify or give examples until a topic clicks."},
      {t:"mc",q:"A smart AI study habit is to…",a:"Ask it to quiz you on a topic",w:["Ask it to sit your exam","Copy whole essays","Submit its work"],e:"Use AI to practise and test yourself, not to do the work for you."},
      {t:"tf",q:"You should still learn the material even if AI can answer it.",a:"True",e:"Exams test what YOU know, not what the AI knows."},
      {t:"type",q:"The clear instruction you type to an AI is called a ______.",a:"prompt",e:"Clearer prompts usually get you more helpful answers."},
      {t:"mc",q:"If an AI explains something you don't understand, you should…",a:"Ask follow-up questions",w:["Give up","Accept it blindly","Ignore it"],e:"Keep asking it to explain differently until it makes sense."},
    ]},
    {id:"safe",name:"Digital Safety",emoji:"🛡️",cards:[
      {t:"mc",q:"A strong password should be…",a:"Long and hard to guess",w:["Your name","“12345”","Your birthday"],e:"Mix upper/lowercase letters, numbers and symbols, and keep it long."},
      {t:"tf",q:"It's fine to share your password with close friends.",a:"False",e:"Keep passwords private — sharing them risks your accounts."},
      {t:"type",q:"A fake message that tricks you into giving personal info is called ______.",a:"phishing",e:"Phishing often uses fake emails or links pretending to be real."},
      {t:"mc",q:"Before clicking a strange link you should…",a:"Stop and verify the source",w:["Click quickly","Forward it to all","Enter your password"],e:"Unknown links can install malware or steal your details."},
      {t:"tf",q:"Things you post online can stay there forever.",a:"True",e:"Once shared, content can be copied and saved — think before posting."},
      {t:"mc",q:"Keeping your apps updated mainly protects you from…",a:"Hackers and viruses",w:["Slow friends","Bad weather","Low battery"],e:"Updates fix security holes that attackers try to use."},
      {t:"mc",q:"If someone you only know online asks to meet you alone, you should…",a:"Tell a trusted adult",w:["Go alone","Keep it secret","Share your address"],e:"Always involve a trusted adult — your safety comes first."},
      {t:"tf",q:"Using the same password for every account is risky.",a:"True",e:"If one site is hacked, all your accounts become exposed."},
      {t:"mc",q:"If you are being cyberbullied, the best response is to…",a:"Report it, don't ignore it",w:["Reply with insults","Hide it forever","Encourage it"],e:"Save the evidence and tell a trusted adult or report it."},
      {t:"type",q:"Details like your home address and phone number are called ______ information.",a:"private",accepts:["personal"],e:"Keep private/personal information off public posts."},
    ]},
  ]},
];

/* ============ EXAM LIBRARY (tracks + subscription) ============ */
const TRACKS=[
  {id:'waec',name:'WAEC / NECO',emoji:'📘',tier:'free'},
  {id:'jamb',name:'JAMB / UTME',emoji:'🎯',tier:'free'},
  {id:'voc',name:'Vocational & Trades',emoji:'🛠️',tier:'free'},
  {id:'lang',name:'Nigerian Languages',emoji:'🗣️',tier:'free'},
  {id:'uni',name:'University',emoji:'🎓',tier:'premium'},
  {id:'va',name:'Virtual Assistant',emoji:'🗂️',tier:'premium'},
  {id:'pm',name:'Product Management',emoji:'📐',tier:'premium'},
  {id:'cc',name:'Content Creation',emoji:'🎬',tier:'premium'},
  {id:'ican',name:'ICAN',emoji:'🧮',tier:'ultra'},
  {id:'cibn',name:'CIBN',emoji:'🏦',tier:'ultra'}
];
const TRACK_DECKS={ jamb:['eng','math','bio','chem','phy','gov','eco','geo','commerce','acct','lit'] };
const PRO_DECKS={
  ican:[
    {id:'ican_fa',name:'Financial Accounting (Pro)',emoji:'🧮',cards:[
      {t:"mc",q:"The concept that recognises revenue when earned (not when cash is received) is the…",a:"Accrual concept",w:["Cash basis","Prudence concept","Going concern"],e:"Accruals match income and expenses to the period they relate to."},
      {t:"mc",q:"Nigerian companies prepare financial statements mainly using…",a:"IFRS",w:["US GAAP","Cash accounting","Tax rules only"],e:"Nigeria adopted International Financial Reporting Standards."},
      {t:"mc",q:"Under IAS 2, inventory is valued at the lower of cost and…",a:"Net realisable value",w:["Selling price","Replacement cost","Market value"],e:"Lower of cost and NRV."},
      {t:"mc",q:"An account used to check the accuracy of the debtors or creditors ledger is a…",a:"Control account",w:["Suspense account","Nominal account","Real account"],e:"Its balance is cross-checked against the ledger total."},
      {t:"mc",q:"The depreciation method that charges a fixed % on the reducing balance is the…",a:"Reducing balance method",w:["Straight-line method","Revaluation method","Units-of-output method"],e:"The yearly charge falls over time."},
      {t:"mc",q:"Current ratio = current assets ÷ …",a:"Current liabilities",w:["Total assets","Capital","Sales"],e:"It measures short-term liquidity."}
    ]},
    {id:'ican_tax',name:'Taxation & Law',emoji:'⚖️',cards:[
      {t:"mc",q:"Tax deducted from employees' salaries at source is…",a:"PAYE",w:["VAT","Companies Income Tax","Capital Gains Tax"],e:"Pay As You Earn."},
      {t:"mc",q:"The standard VAT rate in Nigeria is…",a:"7.5%",w:["5%","10%","15%"],e:"VAT was raised to 7.5% in 2020."},
      {t:"mc",q:"Companies Income Tax in Nigeria is administered by the…",a:"FIRS",w:["CBN","SEC","NDIC"],e:"The Federal Inland Revenue Service."},
      {t:"mc",q:"A valid simple contract needs offer, acceptance, consideration and…",a:"Intention to create legal relations",w:["A witness","A lawyer","A stamp"],e:"Plus capacity to contract."},
      {t:"mc",q:"A person who acts on behalf of another in dealings with third parties is a(n)…",a:"Agent",w:["Trustee","Donor","Bailee"],e:"Governed by the law of agency."},
      {t:"mc",q:"An accountant who falsifies records breaches the ethical principle of…",a:"Integrity",w:["Confidentiality","Marketing","Liquidity"],e:"Integrity means being honest and straightforward."}
    ]}
  ],
  cibn:[
    {id:'cibn_ops',name:'Banking Operations',emoji:'🏦',cards:[
      {t:"mc",q:"The apex bank that regulates banks in Nigeria is the…",a:"Central Bank of Nigeria",w:["NDIC","SEC","Nigerian Exchange"],e:"The CBN is the regulator and apex bank."},
      {t:"mc",q:"The body that insures bank deposits in Nigeria is the…",a:"NDIC",w:["CBN","FIRS","EFCC"],e:"Nigeria Deposit Insurance Corporation."},
      {t:"mc",q:"In banking, “KYC” stands for…",a:"Know Your Customer",w:["Keep Your Cash","Know Your Cheque","Key Yearly Customer"],e:"Customer due-diligence checks."},
      {t:"mc",q:"A short-term debt instrument issued by the Federal Government is a…",a:"Treasury bill",w:["Share","Debenture","Mortgage"],e:"A money-market instrument."},
      {t:"mc",q:"The rate at which the CBN signals its monetary policy stance is the…",a:"Monetary Policy Rate",w:["Prime rate","Coupon rate","Exchange rate"],e:"The MPR guides interest rates."},
      {t:"mc",q:"An account designed mainly for businesses, with cheque facilities, is a…",a:"Current account",w:["Savings account","Fixed deposit","Domiciliary account"],e:"A current (cheque) account."}
    ]},
    {id:'cibn_lend',name:'Lending & Ethics',emoji:'💳',cards:[
      {t:"mc",q:"Security pledged by a borrower for a loan is called…",a:"Collateral",w:["Interest","Premium","Dividend"],e:"It reduces the lender's risk of loss."},
      {t:"mc",q:"The “5 Cs of credit” are Character, Capacity, Capital, Collateral and…",a:"Conditions",w:["Cash","Currency","Cost"],e:"Conditions = the economic environment."},
      {t:"mc",q:"The risk that a borrower fails to repay a loan is…",a:"Credit risk",w:["Market risk","Liquidity risk","Foreign-exchange risk"],e:"Also called default risk."},
      {t:"mc",q:"Keeping a customer's account information secret is the banker's duty of…",a:"Confidentiality",w:["Disclosure","Marketing","Auditing"],e:"Bank secrecy/confidentiality."},
      {t:"mc",q:"A facility letting a current-account holder overdraw up to a limit is an…",a:"Overdraft",w:["Mortgage","Lease","Bond"],e:"A form of short-term lending."},
      {t:"mc",q:"The professional body for bankers in Nigeria is the…",a:"CIBN",w:["ICAN","NBA","SEC"],e:"Chartered Institute of Bankers of Nigeria."}
    ]}
  ],
  uni:[
    {id:'uni_eng',name:'Use of English (GST)',emoji:'📝',cards:[
      {t:"mc",q:"Choose the word nearest in meaning to “ubiquitous”.",a:"Widespread",w:["Rare","Hidden","Temporary"],e:"Ubiquitous means present everywhere."},
      {t:"mc",q:"The language register used in a courtroom is best described as…",a:"Formal / legal",w:["Casual","Slang","Intimate"],e:"Courtrooms use a formal, legal register."},
      {t:"mc",q:"A short summary capturing the main ideas of a passage is a…",a:"Précis",w:["Preface","Index","Glossary"],e:"Précis (summary) writing."},
      {t:"mc",q:"“He speaks ___ than his brother.” Choose the correct form.",a:"more fluently",w:["fluentlier","most fluently","fluent"],e:"Comparative of the adverb “fluently”."},
      {t:"mc",q:"Choose the correctly spelt word.",a:"Maintenance",w:["Maintainance","Maintenence","Maintanance"],e:"It is spelt m-a-i-n-t-e-n-a-n-c-e."},
      {t:"mc",q:"Reading quickly to get the general idea of a text is called…",a:"Skimming",w:["Scanning","Drafting","Editing"],e:"Skim for the gist; scan for specific details."}
    ]},
    {id:'uni_gst',name:'General Studies (GST)',emoji:'🎓',cards:[
      {t:"mc",q:"The branch of philosophy concerned with right and wrong conduct is…",a:"Ethics",w:["Logic","Aesthetics","Metaphysics"],e:"Ethics is moral philosophy."},
      {t:"mc",q:"Reasoning from a general rule to a specific case is…",a:"Deductive reasoning",w:["Inductive reasoning","Analogical reasoning","Guessing"],e:"General → specific is deduction."},
      {t:"mc",q:"The first university in Nigeria is the University of…",a:"Ibadan",w:["Lagos","Nigeria, Nsukka","Ife"],e:"The University of Ibadan was founded in 1948."},
      {t:"mc",q:"In logic, a statement that is either true or false is a…",a:"Proposition",w:["Question","Command","Greeting"],e:"Only propositions have truth value."},
      {t:"mc",q:"Communication through gestures and facial expressions is…",a:"Non-verbal communication",w:["Verbal communication","Written communication","Formal communication"],e:"Body language is non-verbal."},
      {t:"mc",q:"Reading a text quickly to find a specific piece of information is…",a:"Scanning",w:["Skimming","Summarising","Paraphrasing"],e:"Scan for specifics; skim for the gist."}
    ]}
  ]
};
function tierRank(s){return s==='ultra'?2:(s==='premium'?1:0);}
function trackNeed(track){return track.tier==='ultra'?2:(track.tier==='premium'?1:0);}
function trackLocked(track){return trackNeed(track)>tierRank(S.subscription||'free');}
function isPremium(){return (S.subscription||'free')!=='free';}
/* State must exist before the deck-merge below calls deckById() (which reads S). */
const KEY="studyquest_v2";
let S=load();
function deckById(id){let r=null;CATS.forEach(c=>c.decks.forEach(d=>{if(d.id===id)r=d;}));(S.customDecks||[]).forEach(d=>{if(d.id===id)r=d;});Object.keys(PRO_DECKS).forEach(k=>PRO_DECKS[k].forEach(d=>{if(d.id===id)r=d;}));if(window.EXTRA)Object.keys(EXTRA).forEach(k=>{if(Array.isArray(EXTRA[k]))EXTRA[k].forEach(d=>{if(d.id===id)r=d;});});return r;}
function trackDeckList(t){if(t==='jamb'){const base=(TRACK_DECKS.jamb||[]).map(id=>deckById(id)).filter(Boolean);return base.concat((window.EXTRA&&EXTRA.jamb)||[]);}if(PRO_DECKS[t])return PRO_DECKS[t];return [];}
(function mergeExtra(){if(!window.EXTRA)return;
  if(EXTRA.waec&&EXTRA.waec.length)CATS.push({name:'📝 WAEC Past Questions',decks:EXTRA.waec});
  if(EXTRA.jss&&EXTRA.jss.length)CATS.push({name:'🎒 Junior School (JSS)',decks:EXTRA.jss});
  ['ican','cibn','uni','voc','va','pm','cc','lang'].forEach(k=>{if(EXTRA[k]&&EXTRA[k].length)PRO_DECKS[k]=(PRO_DECKS[k]||[]).concat(EXTRA[k]);});
  [['ican2','ican'],['cibn2','cibn'],['uni2','uni'],['lang2','lang'],['voc2','voc']].forEach(p=>{if(EXTRA[p[0]]&&EXTRA[p[0]].length)PRO_DECKS[p[1]]=(PRO_DECKS[p[1]]||[]).concat(EXTRA[p[0]]);});
  ['topupSci','topupSoc','topupJr'].forEach(tk=>{if(EXTRA[tk])Object.keys(EXTRA[tk]).forEach(id=>{const d=deckById(id);if(d&&Array.isArray(EXTRA[tk][id]))d.cards=d.cards.concat(EXTRA[tk][id]);});});})();
function renderTrackBar(){const b=document.getElementById('trackBar');if(!b)return;b.innerHTML='';
  TRACKS.forEach(t=>{const cur=(S.track||'waec')===t.id;const locked=trackLocked(t);
    const el=document.createElement('button');el.className='trackchip'+(cur?' sel':'');
    el.innerHTML='<span class="te">'+t.emoji+'</span> '+t.name+(locked?' 🔒':(t.tier!=='free'?' ⭐':''));
    el.onclick=()=>{S.track=t.id;save();renderDecks();window.scrollTo({top:0,behavior:'smooth'});};b.appendChild(el);});}
function upgradePanel(track){const d=document.createElement('div');d.className='panel';const planName=track.tier==='ultra'?'Premium Ultra (₦5,000/mo)':'Premium (₦2,500/mo)';
  d.innerHTML='<div style="text-align:center"><div style="font-size:46px">'+track.emoji+' 🔒</div><h2 class="title">'+esc(track.name)+'</h2><p class="sub">This library is unlocked with <b>'+planName+'</b>.</p><button class="btn gold" id="goPremium">⭐ View plans</button></div>';
  setTimeout(()=>{const b=document.getElementById('goPremium');if(b)b.onclick=()=>show('subscribe');},0);return d;}
function planCard(name,price,per,feats,active,id){
  return '<div class="deck" style="cursor:default;'+(id&&id!=='free'?'border-color:var(--gold)':'')+'"><h3 style="font-size:18px">'+name+'</h3>'+
    '<div style="font-size:24px;font-weight:900;color:var(--gold)">'+price+'</div><p>'+per+'</p>'+
    '<div style="margin-top:8px;font-size:13px;color:var(--muted);line-height:1.7">'+feats.map(f=>'✓ '+f).join('<br>')+'</div>'+
    (active?'<div class="chip mastered" style="margin-top:10px">Current plan</div>':'')+'</div>';}
function renderSubscribe(){const w=document.getElementById('subWrap');if(!w)return;const sub=S.subscription||'free';
  const planLabel=sub==='ultra'?'Premium Ultra':sub==='premium'?'Premium':'Free';
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'home\')">← Back</button><h2 class="title" style="margin-top:10px">⭐ Study Egg Plans</h2><p class="sub">One organised platform — exams, careers, languages and trades. You are on <b style="color:var(--gold)">'+planLabel+'</b>.</p></div>'+
    '<div class="deckgrid">'+
    planCard('Free','₦0','forever',['WAEC / NECO','JAMB / UTME','Vocational & Trades','Nigerian Languages','XP, streaks, shop & certificates'],sub==='free','free')+
    planCard('Premium','₦2,500','/month',['Everything in Free','University courses','Virtual Assistant','Product Management','Content Creation'],sub==='premium','premium')+
    planCard('Premium Ultra','₦5,000','/month',['Everything in Premium','ICAN professional library','CIBN banking library','First access to new packs'],sub==='ultra','ultra')+
    '</div>'+
    (sub!=='free'?'<div class="panel"><p class="sub">✅ You are on <b>'+planLabel+'</b>.</p><button class="btn ghost sm" id="subCancel">Switch to Free</button></div>':'')+
    '<div class="panel"><h2 class="title">💳 Pay with Paystack</h2><div class="field"><label>Paystack public key (optional)</label><input id="paystackKey" placeholder="pk_test_..."></div>'+
    '<div class="row-actions"><button class="btn gold" id="payPrem">Premium — ₦2,500</button><button class="btn gold" id="payUltra">Ultra — ₦5,000</button></div>'+
    '<div class="row-actions" style="margin-top:6px"><button class="btn ghost sm" id="demoPrem">Demo: Premium</button><button class="btn ghost sm" id="demoUltra">Demo: Ultra</button></div>'+
    '<p class="sub" style="margin-top:8px">Add your Paystack key for real payments (see PAYMENTS-SETUP). Demo buttons unlock locally for testing.</p></div>';
  const wire=(id,fn)=>{const e=document.getElementById(id);if(e)e.onclick=fn;};
  wire('subCancel',()=>{S.subscription='free';save();toast('Switched to Free.');renderSubscribe();renderDecks();});
  wire('demoPrem',()=>{S.subscription='premium';save();toast('⭐ Premium unlocked!');renderSubscribe();renderDecks();});
  wire('demoUltra',()=>{S.subscription='ultra';save();toast('⭐ Premium Ultra unlocked!');renderSubscribe();renderDecks();});
  wire('payPrem',()=>{if(window.payWithPaystack)payWithPaystack('premium',250000);});
  wire('payUltra',()=>{if(window.payWithPaystack)payWithPaystack('ultra',500000);});
  const pk=document.getElementById('paystackKey');if(pk){try{pk.value=localStorage.getItem('SQ_PAYSTACK')||(window.PAYSTACK_KEY||'');}catch(e){}}}

/* ============ STATE ============ */
/* KEY and `let S=load()` are declared just above deckById() so the deck-merge
   that runs at load time can safely read S. */
function activeSlot(){try{return localStorage.getItem('br_active')||'main';}catch(e){return 'main';}}
function slotKey(id){return id==='main'?KEY:('br_state_'+id);}
function fresh(){
  return {xp:0,level:1,coins:0,totalAns:0,totalCorrect:0,totalXP:0,
    streak:0,bestStreak:0,bestCombo:0,bossWins:0,lastDay:null,
    name:"You",srs:{},unlocked:[],customDecks:[],classmates:[],muted:false};
}
function load(){try{const r=localStorage.getItem(slotKey(activeSlot()));if(r)return Object.assign(fresh(),JSON.parse(r));}catch(e){}return fresh();}
function save(){localStorage.setItem(slotKey(activeSlot()),JSON.stringify({
  xp:S.xp,level:S.level,coins:S.coins,totalAns:S.totalAns,totalCorrect:S.totalCorrect,totalXP:S.totalXP,
  streak:S.streak,bestStreak:S.bestStreak,bestCombo:S.bestCombo,bossWins:S.bossWins,lastDay:S.lastDay,
  name:S.name,srs:S.srs,unlocked:S.unlocked,customDecks:S.customDecks,classmates:S.classmates,muted:S.muted,
  profile:S.profile,referralCount:S.referralCount,dailyXP:S.dailyXP,dailyDate:S.dailyDate,lastDeckId:S.lastDeckId,
  freezes:S.freezes,ownedThemes:S.ownedThemes,skin:S.skin,ownedSkins:S.ownedSkins,frame:S.frame,ownedFrames:S.ownedFrames,
  track:S.track,subscription:S.subscription,assignments:S.assignments,children:S.children
}));if(window.CLOUD&&CLOUD.online&&CLOUD.user)cloudSyncSoon();}

/* ============ HELPERS ============ */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function xpForLevel(l){return 100+(l-1)*60;}
function rankFor(l){return RANKS[Math.min(RANKS.length-1,Math.floor((l-1)/2))];}
function avatarStage(l){let idx=0;AVATARS.forEach((x,i)=>{if(l>=x.l)idx=i;});return idx;}
function avatarFor(l){const i=avatarStage(l);const b=AVATARS[i];const sk=(window.BUDDY_SKINS&&S.skin&&BUDDY_SKINS[S.skin])||null;return {l:b.l,f:sk?sk.faces[i]:b.f,n:b.n,h:b.h};}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function todayStr(){return new Date().toISOString().slice(0,10);}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function norm(s){return String(s).toLowerCase().trim().replace(/[.,!?;:°²³]/g,'').replace(/\s+/g,' ');}

/* ---- spaced repetition (Leitner boxes 1..5) ---- */
function srKey(deckId,idx){return deckId+'#'+idx;}
function srGet(deckId,idx){return S.srs[srKey(deckId,idx)];}
function srUpdate(deckId,idx,correct){
  const k=srKey(deckId,idx); const r=S.srs[k]||{box:1,seen:0,correct:0};
  r.seen++; if(correct){r.correct++; r.box=Math.min(5,r.box+1);} else {r.box=1;}
  S.srs[k]=r;
}
function srWeight(deckId,idx){ const r=srGet(deckId,idx);
  if(!r) return 6;                       // unseen → highest priority
  return [0,5,4,3,2,1][r.box]||1;        // box1 weak → 5 ... box5 mastered → 1
}
function deckLearned(d){let n=0;d.cards.forEach((_,i)=>{const r=srGet(d.id,i);if(r&&r.box>=4)n++;});return n;}
function deckWeak(d){let n=0;d.cards.forEach((_,i)=>{const r=srGet(d.id,i);if(!r||r.box<=2)n++;});return n;}
function deckProgress(d){return d.cards.length?Math.round(deckLearned(d)/d.cards.length*100):0;}
function deckMastered(d){return d.cards.length>0 && deckLearned(d)>=d.cards.length;}

/* ============ SOUND ============ */
let AC=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}return AC;}
function beep(freq,dur,type,vol){if(S.muted)return;const c=ac();if(!c)return;
  const o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=freq;g.gain.value=vol||0.07;
  o.connect(g);g.connect(c.destination);const t=c.currentTime;o.start(t);
  g.gain.setValueAtTime(vol||0.07,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.stop(t+dur);}
const SFX={
  click:()=>beep(440,.05,'square',.04),
  correct:()=>{beep(660,.09,'sine',.07);setTimeout(()=>beep(880,.12,'sine',.07),90);},
  wrong:()=>{beep(200,.18,'sawtooth',.06);},
  hit:()=>{beep(330,.06,'square',.06);setTimeout(()=>beep(160,.1,'sawtooth',.06),60);},
  level:()=>{[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.16,'triangle',.07),i*110));},
  win:()=>{[523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>beep(f,.18,'triangle',.08),i*120));},
  lose:()=>{[392,330,262].forEach((f,i)=>setTimeout(()=>beep(f,.2,'sawtooth',.06),i*150));},
};

/* ============ STREAK / XP ============ */
function dayDiff(a,b){return Math.round((Date.parse(b)-Date.parse(a))/864e5);}
function touchStreak(){const t=todayStr();if(S.lastDay===t)return;
  if(!S.lastDay){S.streak=1;}
  else{const gap=dayDiff(S.lastDay,t);
    if(gap===1){S.streak=(S.streak||0)+1;}
    else if(gap>1){const missed=gap-1;
      if((S.freezes||0)>=missed){S.freezes-=missed;S.streak=(S.streak||0)+1;setTimeout(()=>toast('🧊 Streak Freeze saved your '+S.streak+'-day streak!'),300);}
      else{S.streak=1;}}
    else{S.streak=Math.max(1,S.streak||1);}}
  S.lastDay=t;S.bestStreak=Math.max(S.bestStreak||0,S.streak);
  if(S.streak>=3)unlock("streak3");if(S.streak>=7)unlock("streak7");if(S.streak>=30)unlock("streak30");save();}
function addXP(n){if(window.ensureDaily){ensureDaily();const _dx=S.dailyXP||0;S.dailyXP=_dx+n;if(_dx<100&&S.dailyXP>=100)setTimeout(()=>toast('🎯 Daily goal reached!'),250);}
  S.xp+=n;S.totalXP+=n;let leveled=false;const beforeAv=avatarFor(S.level).n;
  while(S.xp>=xpForLevel(S.level)){S.xp-=xpForLevel(S.level);S.level++;S.coins+=50;leveled=true;}
  if(leveled){if(S.level>=5)unlock("lvl5");if(S.level>=10)unlock("lvl10");if(S.level>=14)unlock("dragon");if(S.level>=20)unlock("lvl20");
    const afterAv=avatarFor(S.level);
    if(afterAv.n!==beforeAv){SFX.win();showPopup(afterAv.f,"New rank: "+afterAv.n,afterAv.h);}
    else{SFX.level();showPopup(S.level>=10?'👑':'🎉',"Level "+S.level+"!","You're now a "+rankFor(S.level)+". +50 coins!");}
    confetti();}
  save();renderHUD();}
function addCoins(n){S.coins+=n;if(S.coins>=1000)unlock("rich1k");save();renderHUD();}
function unlock(id){if(S.unlocked.includes(id))return;S.unlocked.push(id);save();
  const a=ACHIEVEMENTS.find(x=>x.id===id);SFX.correct();toast(a.ico+" Badge: "+a.name+"!");renderAch();}

/* ============ UI ============ */
function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;$('#toasts').appendChild(el);
  setTimeout(()=>{el.style.transition='.4s';el.style.opacity='0';el.style.transform='translateY(-10px)';},2200);
  setTimeout(()=>el.remove(),2700);}
function showPopup(icon,title,text){$('#luIcon').textContent=icon;$('#luTitle').textContent=title;$('#luText').textContent=text;$('#luModal').classList.add('show');}
function closeModal(id){$('#'+id).classList.remove('show');}

function renderHUD(){$('#sStreak').textContent=S.streak;$('#sCoins').textContent=S.coins;$('#sLevel').textContent=S.level;
  $('#lvlNum').textContent=S.level;$('#rankName').textContent=rankFor(S.level);
  const need=xpForLevel(S.level),pct=Math.min(100,Math.round(S.xp/need*100));
  $('#xpCur').textContent=S.xp;$('#xpNext').textContent=need;$('#xpFill').style.width=pct+'%';
  $('#lvlRing').style.setProperty('--p',pct+'%');
  const av=avatarFor(S.level);$('#buddyFace').textContent=av.f;$('#buddyName').textContent=av.n;
  $('#muteBtn').textContent=S.muted?'🔇':'🔊';}

/* ============ DECKS ============ */
function renderDecks(){renderTrackBar();const t=S.track||'waec';const track=TRACKS.find(x=>x.id===t)||TRACKS[0];
  const wrap=$('#catWrap');wrap.innerHTML='';
  if(trackLocked(track)){wrap.appendChild(upgradePanel(track));return;}
  if(window.LESSONS&&window.LESSONS[t]&&window.lessonsBanner)wrap.appendChild(lessonsBanner(t));
  if(t==='waec'){
    CATS.forEach(cat=>{const h=document.createElement('div');h.className='cat-h';h.textContent=cat.name;wrap.appendChild(h);
      const g=document.createElement('div');g.className='deckgrid';cat.decks.forEach(d=>g.appendChild(deckEl(d)));wrap.appendChild(g);});
    if(S.customDecks&&S.customDecks.length){const h=document.createElement('div');h.className='cat-h';h.textContent='🛠️ My Decks';wrap.appendChild(h);
      const g=document.createElement('div');g.className='deckgrid';S.customDecks.forEach(d=>g.appendChild(deckEl(d)));wrap.appendChild(g);}
  }else{if(t==='voc'&&window.patternsBanner)wrap.appendChild(patternsBanner());
    if(t==='jamb'&&window.mockBanner)wrap.appendChild(mockBanner());
    
    const decks=trackDeckList(t);const g=document.createElement('div');g.className='deckgrid';
    decks.forEach(d=>{if(d)g.appendChild(deckEl(d));});wrap.appendChild(g);
    if(!decks.length)wrap.appendChild(Object.assign(document.createElement('div'),{className:'empty',textContent:'More packs coming soon.'}));}}
function deckEl(d){const pct=deckProgress(d),mastered=deckMastered(d),weak=deckWeak(d);
  const el=document.createElement('div');el.className='deck';
  let chips=`<span class="chip ${mastered?'mastered':''}">${mastered?'✓ Mastered':pct+'% mastered'}</span>`;
  if(!mastered&&weak>0)chips+=`<span class="chip review">🔁 ${weak} to review</span>`;
  el.innerHTML=`<div class="emoji">${d.emoji||'📚'}</div><h3>${esc(d.name)}</h3>
    <p>${d.cards.length} question${d.cards.length!==1?'s':''}</p>
    <div class="meta">${chips}</div><div class="mini"><i style="width:${pct}%"></i></div>`;
  el.onclick=()=>openMode(d);return el;}

/* ============ MODE SELECT ============ */
let pendingDeck=null;
function openMode(d){if(!d.cards.length){toast("This deck has no questions yet!");return;}
  pendingDeck=d;playLevel='auto';SFX.click();$('#modeEmoji').textContent=d.emoji||'📚';$('#modeTitle').textContent=d.name;
  $('#modeSub').textContent=d.cards.length+" questions • "+deckProgress(d)+"% mastered";
  renderLevelSel();$('#modeModal').classList.add('show');}
$('#modePractice').onclick=()=>{closeModal('modeModal');startQuiz(pendingDeck,false);};
$('#modeBoss').onclick=()=>{closeModal('modeModal');startQuiz(pendingDeck,true);};

/* ============ QUIZ / BOSS ENGINE ============ */
let Q=null, bossTimer=null;
const BOSS_TIME=12;
function srsOrder(deck){
  let idxs=deck.cards.map((_,i)=>i).filter(i=>cardOK(deck.cards[i]));
  if(!idxs.length)idxs=deck.cards.map((_,i)=>i);
  return idxs.map(i=>({i,k:srWeight(deck.id,i)*(0.5+Math.random())}))
    .sort((a,b)=>b.k-a.k).map(o=>o.i).slice(0,10);
}
function startQuiz(deck,boss){ac();
  S.lastDeckId=deck.id;
  const order=srsOrder(deck);
  Q={deck,boss,order,idx:0,correct:0,combo:0,lives:3,bossMax:order.length,bossHp:order.length,clean:true};
  $('#bossWrap').classList.toggle('hidden',!boss);$('#qWhy').classList.add('hidden');
  if(boss){const b=BOSSES[Math.floor(Math.random()*BOSSES.length)];Q.bf=b.f;Q.bn=b.n;
    $('#bossFace').textContent=b.f;$('#bossName').textContent=b.n;updateBoss();}
  show('quiz');nextQ();}
function updateBoss(){$('#bossHp').style.width=Math.max(0,Q.bossHp/Q.bossMax*100)+'%';
  $('#hearts').textContent='❤️'.repeat(Q.lives)+'🖤'.repeat(3-Q.lives);}
function clearTimer(){if(bossTimer){clearInterval(bossTimer);bossTimer=null;}}
function startTimer(){clearTimer();let left=BOSS_TIME;const bar=$('#timerBar');bar.classList.remove('warn');$('#timerFill').style.width='100%';
  bossTimer=setInterval(()=>{left-=0.1;const p=Math.max(0,left/BOSS_TIME*100);$('#timerFill').style.width=p+'%';
    if(left<=4)bar.classList.add('warn');if(left<=0){clearTimer();timeout();}},100);}
function showWhy(card){if(card.e){$('#qWhy').innerHTML='<b>💡 Why:</b> '+esc(card.e);$('#qWhy').classList.remove('hidden');}}
function timeout(){$$('.opt').forEach(o=>o.classList.add('disabled'));
  const ci=Q.order[Q.idx],card=Q.deck.cards[ci];
  srUpdate(Q.deck.id,ci,false);
  SFX.wrong();Q.combo=0;Q.lives--;Q.clean=false;updateBoss();updateCombo(false);
  $('#qFeed').innerHTML='<span style="color:var(--red)">⏰ Time! Answer: '+esc(card.a)+'</span>';showWhy(card);
  $('.qcard').classList.add('shake');setTimeout(()=>$('.qcard').classList.remove('shake'),400);
  touchStreak();save();renderHUD();
  if(Q.lives<=0)return setTimeout(()=>endBoss(false),1100);
  Q.idx++;setTimeout(nextQ,2000);}
function nextQ(){clearTimer();$('#qFeed').textContent='';$('#qWhy').classList.add('hidden');
  if(Q.idx>=Q.order.length)return Q.boss?endBoss(true):finishQuiz();
  const card=Q.deck.cards[Q.order[Q.idx]];
  $('#qFill').style.width=Math.round(Q.idx/Q.order.length*100)+'%';
  const tags={mc:"Multiple choice",tf:"True or False",type:"Type the answer"};
  $('#qTag').textContent=(Q.boss?'⚔️ ':'')+(tags[card.t||'mc']);$('#qText').textContent=card.q;
  const box=$('#qOpts');box.innerHTML='';const type=card.t||'mc';
  if(type==='type'){const wrap=document.createElement('div');wrap.className='typebox';
    wrap.innerHTML='<input id="typeIn" placeholder="Type your answer…" autocomplete="off" /><button class="btn" id="typeGo">Go</button>';
    box.appendChild(wrap);const go=()=>checkType(card);
    setTimeout(()=>{const ti=$('#typeIn');if(ti){ti.focus();ti.onkeydown=e=>{if(e.key==='Enter')go();};}},50);
    $('#typeGo').onclick=go;
  }else{let opts;if(type==='tf')opts=['True','False'];else opts=shuffle([card.a,...((card.w||[]).slice(0,3))]);
    opts.forEach(o=>{const b=document.createElement('button');b.className='opt';b.textContent=o;
      b.onclick=()=>answer(b,o,card.a,card);box.appendChild(b);});}
  if(Q.boss)startTimer();}
function checkType(card){const ti=$('#typeIn');if(!ti)return;const val=ti.value;if(!norm(val))return;
  const accepts=[card.a,...(card.accepts||[])].map(norm);
  const ok=accepts.includes(norm(val))||accepts.some(a=>a.length>3&&norm(val)===a);
  ti.disabled=true;$('#typeGo').disabled=true;
  grade(ok,card,'<div class="opt '+(ok?'correct':'wrong')+' disabled">'+esc(val||'—')+'</div>'+(ok?'':'<div style="margin-top:6px;color:var(--green)">✓ '+esc(card.a)+'</div>'));}
function answer(btn,chosen,correct,card){$$('.opt').forEach(o=>o.classList.add('disabled'));
  const ok=chosen===correct;btn.classList.add(ok?'correct':'wrong');
  if(!ok)$$('.opt').forEach(o=>{if(o.textContent===correct)o.classList.add('correct');});grade(ok,card,null);}
function grade(ok,card,extraHtml){clearTimer();
  const ci=Q.order[Q.idx]; srUpdate(Q.deck.id,ci,ok);
  S.totalAns++;unlock("first");if(S.totalAns>=10)unlock("ten");if(S.totalAns>=100)unlock("hund");if(S.totalAns>=250)unlock("q250");if(S.totalAns>=500)unlock("q500");if(S.totalAns>=1000)unlock("q1000");
  if(Q.deck&&Q.deck.id){if(Q.deck.id.indexOf("lang_")===0)unlock("polyglot");if(Q.deck.id.indexOf("voc_")===0)unlock("tradey");}
  if(ok){Q.correct++;Q.combo++;S.totalCorrect++;S.bestCombo=Math.max(S.bestCombo,Q.combo);
    if(Q.combo>=5)unlock("combo5");if(Q.combo>=10)unlock("combo10");if(Q.combo>=20)unlock("combo20");
    const mult=(1+Math.min(Q.combo-1,5)*0.2)*(Q.boss?2:1);const gain=Math.round(10*mult);
    addXP(gain);addCoins(Math.round(5*mult));SFX.correct();updateCombo(true);
    if(window.floatXP)floatXP('+'+gain+' XP'); if(window.buddyReact)buddyReact(true); if(window.renderHero)renderHero();
    let msg='<span style="color:var(--green)">✓ Correct! +'+gain+' XP</span>';
    if(Q.boss){Q.bossHp--;updateBoss();SFX.hit();msg+=' <span style="color:var(--gold)">💥 -1 boss HP</span>';}
    $('#qFeed').innerHTML=(extraHtml||'')+msg;
  }else{Q.combo=0;SFX.wrong();updateCombo(false);if(window.buddyReact)buddyReact(false);
    $('.qcard').classList.add('shake');setTimeout(()=>$('.qcard').classList.remove('shake'),400);
    let msg='<span style="color:var(--red)">✗ Answer: '+esc(card.a)+'</span>';
    if(Q.boss){Q.lives--;Q.clean=false;updateBoss();msg+=' <span style="color:var(--red)">💔 -1 life</span>';}
    $('#qFeed').innerHTML=(extraHtml||'')+msg;}
  showWhy(card);touchStreak();save();renderHUD();
  if(Q.boss&&Q.bossHp<=0)return setTimeout(()=>endBoss(true),900);
  if(Q.boss&&Q.lives<=0)return setTimeout(()=>endBoss(false),1100);
  Q.idx++;setTimeout(nextQ, ok?1200:2000);}
function updateCombo(on){const t=$('#comboTag');if(on&&Q.combo>=2){$('#comboN').textContent=Q.combo;t.classList.add('show');}else t.classList.remove('show');}
function checkDeckMastery(d){if(deckMastered(d)){unlock("master1");if(d.id==='money')unlock("money");if(d.id==='ai')unlock("ai");if(d.id.indexOf('jss_')===0)unlock("jrmaster");}}
function finishQuiz(){clearTimer();$('#qFill').style.width='100%';$('#qWhy').classList.add('hidden');
  const perfect=Q.correct===Q.order.length;
  if(perfect){unlock("perfect");confetti();addCoins(25);SFX.win();}
  checkDeckMastery(Q.deck);save();renderDecks();renderStats();renderLeaderboard();
  $('#qOpts').innerHTML='';$('#bossWrap').classList.add('hidden');$('#qTag').textContent='';
  $('#qText').textContent=perfect?'🌟 Flawless run!':'✅ Quest complete!';
  $('#qFeed').innerHTML='You got <b>'+Q.correct+'/'+Q.order.length+'</b> correct.'+
    '<div class="row-actions" style="justify-content:center;margin-top:16px">'+
    '<button class="btn" onclick="startQuiz(Q.deck,false)">🔁 Study again</button>'+
    '<button class="btn ghost" onclick="show(\'home\')">🏠 Decks</button></div>';}
function endBoss(won){clearTimer();$('#bossWrap').classList.add('hidden');$('#qOpts').innerHTML='';$('#qTag').textContent='';$('#qWhy').classList.add('hidden');
  if(won){S.bossWins++;unlock("boss1");if(Q.clean)unlock("bossClean");
    const bonus=40+Q.deck.cards.length*5;addXP(bonus);addCoins(60);confetti();SFX.win();checkDeckMastery(Q.deck);
    $('#qText').textContent='🏆 '+Q.bn+' defeated!';
    $('#qFeed').innerHTML='Epic win! <b>+'+bonus+' XP</b> & <b>60 🪙</b>'+(Q.clean?' • 🛡️ no lives lost!':'')+
      '<div class="row-actions" style="justify-content:center;margin-top:16px">'+
      '<button class="btn red" onclick="startQuiz(Q.deck,true)">⚔️ Rematch</button>'+
      '<button class="btn ghost" onclick="show(\'home\')">🏠 Decks</button></div>';
  }else{SFX.lose();$('#qText').textContent='💀 Defeated by '+Q.bn+'…';
    $('#qFeed').innerHTML='You ran out of lives — but you still earned XP for every correct answer. Try again!'+
      '<div class="row-actions" style="justify-content:center;margin-top:16px">'+
      '<button class="btn red" onclick="startQuiz(Q.deck,true)">⚔️ Try again</button>'+
      '<button class="btn ghost" onclick="startQuiz(Q.deck,false)">🧠 Practice first</button>'+
      '<button class="btn ghost" onclick="show(\'home\')">🏠 Decks</button></div>';}
  save();renderDecks();renderStats();renderLeaderboard();}

/* ============ ACHIEVEMENTS ============ */
function renderAch(){const g=$('#achGrid');g.innerHTML='';
  ACHIEVEMENTS.forEach(a=>{const has=S.unlocked.includes(a.id);const el=document.createElement('div');el.className='ach'+(has?' unlocked':'');
    el.innerHTML='<div class="ico">'+a.ico+'</div><h4>'+esc(a.name)+'</h4><p>'+esc(a.desc)+'</p>';g.appendChild(el);});
  $('#achCount').textContent=S.unlocked.length;$('#achTotal').textContent=ACHIEVEMENTS.length;}

/* ============ LEADERBOARD ============ */
const RIVAL_BASE=[{n:"Chidi",f:1.35},{n:"Amara",f:1.12},{n:"Tunde",f:0.92},{n:"Ngozi",f:0.74},{n:"Emeka",f:0.55},{n:"Fatima",f:0.4}];
function renderLeaderboard(){
  const me={name:S.name||"You",e:avatarFor(S.level).f,xp:S.totalXP,me:true,sub:"You • Level "+S.level};
  const base=Math.max(S.totalXP,120);
  const rivals=RIVAL_BASE.map((r,i)=>({name:r.n,e:"🤖",xp:Math.round(base*r.f)+i*7,sub:"Classmate (AI)"}));
  const custom=(S.classmates||[]).map(c=>({name:c.name,e:"🧑‍🎓",xp:c.xp|0,sub:"Classmate"}));
  const all=[me,...rivals,...custom].sort((a,b)=>b.xp-a.xp);const medals=["🥇","🥈","🥉"];
  const list=$('#lbList');list.innerHTML='';
  all.forEach((p,i)=>{const el=document.createElement('div');el.className='lbrow'+(p.me?' me':'');
    if(p.me&&window.frameClass){const fc=frameClass();if(fc)el.className+=' '+fc;}
    const fb=(p.me&&window.frameBadge)?frameBadge():'';
    el.innerHTML='<div class="lbrank">'+(medals[i]||('#'+(i+1)))+'</div><div class="lbface">'+p.e+'</div>'+
      '<div class="lbname">'+esc(p.name)+fb+'<small>'+esc(p.sub)+'</small></div><div class="lbxp">'+p.xp.toLocaleString()+' XP</div>';
    list.appendChild(el);});}
$('#saveName').onclick=()=>{const v=$('#myName').value.trim();if(v){S.name=v;save();renderLeaderboard();toast("Name saved!");}};
$('#addCm').onclick=()=>{const n=$('#cmName').value.trim(),x=parseInt($('#cmXp').value,10)||0;
  if(!n){toast("Enter your friend's name.");return;}S.classmates.push({name:n,xp:x});
  S.referralCount=(S.referralCount||0)+1;unlock("refer");if(S.referralCount>=5)unlock("social");
  if(S.referralCount<=20){addXP(20);addCoins(10);toast("🎁 Friend added! +20 XP, +10 🪙");}else{toast("Friend added!");}
  save();$('#cmName').value='';$('#cmXp').value='';renderLeaderboard();renderProfile();};

/* ============ STATS ============ */
function renderStats(){const av=avatarFor(S.level);
  $('#bigAvatar').textContent=av.f;$('#avatarName').textContent=av.n;$('#avatarHint').textContent=av.h;
  $('#stLevel').textContent='Level '+S.level;$('#stRank').textContent=rankFor(S.level);
  const acc=S.totalAns?Math.round(S.totalCorrect/S.totalAns*100):0;$('#stAcc').textContent=acc+'%';$('#stAns').textContent=S.totalAns;
  let learned=0;CATS.forEach(c=>c.decks.forEach(d=>learned+=deckLearned(d)));(S.customDecks||[]).forEach(d=>learned+=deckLearned(d));
  $('#stLearned').textContent=learned;
  $('#stStreak').textContent=S.streak+' day'+(S.streak!==1?'s':'');$('#stBest').textContent=S.bestStreak;
  $('#stCoins').textContent=S.coins;$('#stBoss').textContent=S.bossWins;$('#stXP').textContent=S.totalXP.toLocaleString();}

/* ============ CREATE ============ */
let draft=[];
$('#fType').onchange=()=>{$('#wrongField').style.display=$('#fType').value==='mc'?'block':'none';
  $('#fA').placeholder=$('#fType').value==='tf'?'Type True or False':'Correct answer';};
function renderDraft(){const l=$('#draftList');l.innerHTML='';
  draft.forEach((c,i)=>{const el=document.createElement('div');el.className='flash';
    el.innerHTML='<div><div class="q">'+esc(c.q)+' <span class="chip">'+c.t+'</span></div>'+
      '<div class="a">✓ '+esc(c.a)+(c.w&&c.w.length?' • '+c.w.map(esc).join(', '):'')+(c.e?'<br>💡 '+esc(c.e):'')+'</div></div>'+
      '<button class="del">×</button>';
    el.querySelector('.del').onclick=()=>{draft.splice(i,1);renderDraft();};l.appendChild(el);});}
function refreshDeckPicker(){const sel=$('#ndPick');sel.innerHTML='<option value="">— or load one of your decks to edit —</option>';
  (S.customDecks||[]).forEach(d=>{const o=document.createElement('option');o.value=d.id;o.textContent=d.name;sel.appendChild(o);});}
$('#addCard').onclick=()=>{const t=$('#fType').value,q=$('#fQ').value.trim();let a=$('#fA').value.trim();const e=$('#fE').value.trim();
  if(!q||!a){toast("Add a question and answer first.");return;}
  if(t==='tf'){a=/^t/i.test(a)?'True':'False';}
  const w=t==='mc'?$('#fW').value.split(',').map(s=>s.trim()).filter(Boolean):[];
  if(t==='mc'&&w.length<1){toast("Add at least one wrong option.");return;}
  draft.push({t,q,a,w,e});$('#fQ').value='';$('#fA').value='';$('#fW').value='';$('#fE').value='';$('#fQ').focus();renderDraft();};
$('#saveDeck').onclick=()=>{const name=$('#ndName').value.trim();
  if(!name){toast("Give your deck a name.");return;}if(!draft.length){toast("Add at least one question.");return;}
  const pub=$('#ndPublic')&&$('#ndPublic').value==='public';const editing=$('#ndPick').value;let deck;
  if(editing){deck=S.customDecks.find(x=>x.id===editing);deck.name=name;deck.emoji=$('#ndEmoji').value.trim()||deck.emoji;deck.cards=draft.slice();deck.public=pub;}
  else{deck={id:'u'+Date.now(),name,emoji:$('#ndEmoji').value.trim()||'📚',cards:draft.slice(),public:pub};S.customDecks.push(deck);}
  unlock("create");draft=[];renderDraft();$('#ndName').value='';$('#ndEmoji').value='';$('#ndPick').value='';
  save();toast("💾 Deck saved!");if(pub&&window.shareDeck)shareDeck(deck);else show('home');};
$('#ndPick').onchange=e=>{const d=(S.customDecks||[]).find(x=>x.id===e.target.value);
  if(!d){draft=[];renderDraft();return;}$('#ndName').value=d.name;$('#ndEmoji').value=d.emoji||'';draft=JSON.parse(JSON.stringify(d.cards));renderDraft();};

/* ============ VIEWS ============ */
function show(v){clearTimer();$$('.view').forEach(x=>x.classList.add('hidden'));$('#view-'+v).classList.remove('hidden');
  $$('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===v));
  if(v==='home'){renderDecks();if(window.renderHero)renderHero();}if(v==='achievements')renderAch();if(v==='stats')renderProfile();if(v==='shop'&&window.renderShop)renderShop();if(v==='subscribe'&&window.renderSubscribe)renderSubscribe();if(v==='patterns'&&window.renderPatterns)renderPatterns();if(v==='lessons'&&window.renderLessons)renderLessons();if(v==='mock'&&window.renderMock)renderMock();if(v==='cert'&&window.renderCertList)renderCertList();if(v==='teacher'&&window.renderTeacher)renderTeacher();
  if(v==='leaderboard'){renderLeaderboard();$('#myName').value=S.name==='You'?'':S.name;}
  if(v==='create'){refreshDeckPicker();$('#fType').onchange();}
  window.scrollTo({top:0,behavior:'smooth'});}
$$('.nav button').forEach(b=>b.onclick=()=>{SFX.click();show(b.dataset.view);});
$('#quitQuiz').onclick=()=>{clearTimer();show('home');};
$('#muteBtn').onclick=()=>{S.muted=!S.muted;save();renderHUD();if(!S.muted)SFX.correct();};
$('#resetBtn').onclick=()=>{if(confirm("Reset ALL progress, custom decks and badges? This cannot be undone.")){
  localStorage.removeItem(slotKey(activeSlot()));S=fresh();save();renderHUD();applyTheme('midnight');showOnboard();toast("Progress reset.");}};

/* ============ PWA ============ */
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;
  $('#installNote').textContent="✅ Your device supports installing — tap the button above!";});
$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();const r=await deferredPrompt.userChoice;
    if(r.outcome==='accepted')toast("🎉 Installing Study Egg!");deferredPrompt=null;}
  else{$('#installNote').textContent="Use your browser's menu: Android → ⋮ → Install app. iPhone → Share ⬆️ → Add to Home Screen.";}};
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}

/* ============ CONFETTI ============ */
const cv=$('#cfx'),ctx=cv.getContext('2d');let parts=[],raf=null;
function resize(){cv.width=innerWidth;cv.height=innerHeight;}resize();addEventListener('resize',resize);
function confetti(){const cols=['#7c5cff','#33d6c9','#ffd166','#4ade80','#fb7185','#60a5fa'];
  for(let i=0;i<130;i++)parts.push({x:cv.width/2,y:cv.height/3,vx:(Math.random()-.5)*12,vy:Math.random()*-12-4,
    g:.3+Math.random()*.2,s:5+Math.random()*6,c:cols[i%cols.length],a:1,rot:Math.random()*6});if(!raf)loop();}
function loop(){ctx.clearRect(0,0,cv.width,cv.height);
  parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.a-=.008;p.rot+=.2;
    ctx.save();ctx.globalAlpha=Math.max(0,p.a);ctx.translate(p.x,p.y);ctx.rotate(p.rot);
    ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);ctx.restore();});
  parts=parts.filter(p=>p.a>0&&p.y<cv.height+40);if(parts.length)raf=requestAnimationFrame(loop);else{raf=null;ctx.clearRect(0,0,cv.width,cv.height);}}

/* ============ BOOT ============ */
renderHUD();renderDecks();renderAch();renderStats();renderLeaderboard();renderDraft();
