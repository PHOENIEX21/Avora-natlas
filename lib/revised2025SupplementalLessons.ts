export type Revised2025SupplementalLesson={topicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';strand:string;topic:string;source:{authority:'NERDC Revised BEC 2025';url:string;verified:'OFFICIAL_REVISED'|'OFFICIAL_PLUS_SCHEME_CROSSCHECK'};objectives:string[];prerequisites:string[];teaching:string[];workedExamples:string[];misconceptions:string[];guidedPractice:string[];independentPractice:string[];mastery:{criterion:string;status:'DEEP_WHEN_PASSED'};boardReady:true};
const authorityUrl='https://www.nerdc.gov.ng/content_manager/new_curriculum_home.html';
export const revised2025SupplementalLessons:Revised2025SupplementalLesson[]=[
  {
    "topicId": "revised2025-jss2-math-directed-numbers",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Directed and Non-Directed Numbers",
    "objectives": [
      "Distinguish directed from non-directed quantities",
      "Interpret positive and negative values in everyday contexts",
      "Place and compare directed numbers on a number line"
    ],
    "prerequisites": [
      "whole-number ordering",
      "number-line reading",
      "meaning of zero"
    ],
    "teaching": [
      "A directed number has a sign because direction or position relative to a reference point matters; examples include +6°C, −3°C, ₦2,000 credit and ₦500 debt.",
      "A non-directed quantity gives magnitude only, such as 5 kg or 12 m, unless a direction/reference is attached.",
      "On a number line, numbers increase to the right; every negative number is less than zero, and among negatives the number farther left is smaller.",
      "The sign belongs to the quantity. Do not remove it when translating a context into mathematics."
    ],
    "workedExamples": [
      "A temperature 4°C below zero is −4°C, while 4°C above zero is +4°C.",
      "−2 is greater than −7 because −2 lies to the right of −7 on the number line.",
      "If a lift is two floors below ground level, its position may be represented as −2 relative to ground floor 0."
    ],
    "misconceptions": [
      "thinking a minus sign always means “subtract now”",
      "believing −9 is greater than −3 because 9>3",
      "using signed numbers where no reference direction has been defined"
    ],
    "guidedPractice": [
      "Plot −6, −1, 0, +3 and +8; then translate five temperature/elevation/debt statements into signed numbers."
    ],
    "independentPractice": [
      "Solve ten mixed directed/non-directed classification and comparison problems, explaining the reference point in each contextual item."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct with accurate contextual interpretation and number-line comparisons.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-math-scale-drawing",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Scale Drawing of Lengths and Distances",
    "objectives": [
      "Interpret common scale statements",
      "Draw lengths to scale",
      "Recover actual lengths/distances from scale drawings"
    ],
    "prerequisites": [
      "ratio",
      "metric unit conversion",
      "ruler measurement"
    ],
    "teaching": [
      "A scale relates a drawing measurement to the corresponding real measurement. Both quantities must be expressed in compatible units before calculation.",
      "For a statement scale such as 1 cm represents 5 m, multiply drawing length by 5 m/cm to obtain actual length; divide actual length by 5 to obtain drawing length.",
      "A representative fraction such as 1:50 means one unit on the drawing represents fifty of the same units in reality.",
      "Accuracy depends on both calculation and careful measurement; label the scale and units on every construction."
    ],
    "workedExamples": [
      "At 1 cm:4 m, 7.5 cm represents 30 m.",
      "A 12 m wall at 1 cm:2 m is drawn as 6 cm.",
      "At 1:100, a 3.4 cm drawing length represents 340 cm=3.4 m."
    ],
    "misconceptions": [
      "mixing centimetres and metres without conversion",
      "multiplying when the task requires division",
      "treating 1:100 as 1 cm:100 m",
      "rounding a measured length too early"
    ],
    "guidedPractice": [
      "Convert six real distances to drawing lengths using two different scales, then measure a prepared drawing and recover actual dimensions."
    ],
    "independentPractice": [
      "Create a simple scaled floor-plan segment with three labelled lengths and answer five reverse-scale questions."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% across forward and reverse scale problems, with correct units and usable drawing accuracy.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-math-quantitative-aptitude",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Quantitative Aptitude with Shapes and Scale",
    "objectives": [
      "Recognise numerical/spatial relationships in shape problems",
      "Apply scale, symmetry and pattern reasoning",
      "Explain the rule used to reach an answer"
    ],
    "prerequisites": [
      "basic shape properties",
      "ratio and scale",
      "number patterns"
    ],
    "teaching": [
      "Quantitative aptitude is reasoning, not guessing. First list what changes and what stays constant in the diagram, table or sequence.",
      "For shape patterns, inspect number of sides, orientation, shading, count, symmetry and position systematically rather than focusing on one attractive feature.",
      "For scaled or partitioned figures, convert the picture into measurable relationships before doing arithmetic.",
      "A good solution states the rule and then checks that the rule fits every given example, not just the final pair."
    ],
    "workedExamples": [
      "Sequence of polygons triangle, square, pentagon suggests sides increase by one; next is a hexagon.",
      "If every drawing length doubles while the scale remains fixed, corresponding real lengths also double.",
      "A pattern with shaded sectors 1,2,3 in successive equal circles suggests one additional shaded sector per step only if total sectors are unchanged."
    ],
    "misconceptions": [
      "choosing by visual similarity without a rule",
      "using a rule that works for only one step",
      "confusing area growth with length growth",
      "ignoring scale information"
    ],
    "guidedPractice": [
      "Solve six visual/numerical pattern items and verbalise the rule before selecting each answer."
    ],
    "independentPractice": [
      "Complete twelve mixed shape, scale and sequence reasoning items; write a one-sentence justification for at least six."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% accuracy and an explicit valid rule for every non-routine item.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-math-elevation-depression",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Angles of Elevation and Depression",
    "objectives": [
      "Define angles of elevation and depression",
      "Sketch horizontal reference lines correctly",
      "Use measured/scale diagrams to solve simple height/distance situations"
    ],
    "prerequisites": [
      "angle measurement",
      "parallel lines",
      "scale drawing"
    ],
    "teaching": [
      "An angle of elevation is measured upward from the observer’s horizontal line of sight; an angle of depression is measured downward from the horizontal.",
      "The reference is horizontal, not vertical. Draw a horizontal through the observer before marking either angle.",
      "When two horizontal lines are parallel, alternate-angle relationships often make an angle of depression equal to the corresponding angle of elevation.",
      "At this level, many problems are solved through accurate diagrams, scale and known angle facts; label observer, object, horizontal and line of sight before calculating."
    ],
    "workedExamples": [
      "Looking from ground at a roof forms an angle of elevation at the observer.",
      "Looking from a balcony down to a car forms an angle of depression at the balcony.",
      "If a depression angle is 35° from a horizontal balcony line, the corresponding elevation angle from the car to the balcony is also 35° when horizontals are parallel."
    ],
    "misconceptions": [
      "measuring from a vertical wall",
      "putting the angle at the wrong endpoint",
      "assuming elevation and depression are complements",
      "drawing the horizontal line sloping"
    ],
    "guidedPractice": [
      "Classify six diagrams as elevation/depression and redraw two incorrectly labelled examples."
    ],
    "independentPractice": [
      "Solve eight sketch/scale problems, including reverse identification of the relevant angle from a written scenario."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% with correct reference line, angle location and interpretation.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-conversation",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Conversation on Various Issues",
    "objectives": [
      "Explain conversation as purposeful two-way spoken communication",
      "Initiate, sustain and close age-appropriate conversations",
      "Listen actively, take turns and respond relevantly",
      "Ask useful questions and build on another speaker's contribution",
      "Agree and disagree respectfully while giving reasons",
      "Discuss current national and global issues including the economy, security, education, out-of-school children and climate change",
      "Select and use appropriate registers and issue-specific vocabulary"
    ],
    "prerequisites": [
      "basic sentence formation",
      "listening for meaning",
      "basic polite expressions"
    ],
    "teaching": [
      "Conversation is a two-way exchange of spoken ideas, information, feelings or opinions. Unlike a speech, it requires participants to listen and respond to one another. A successful conversation therefore has both speaking and listening.",
      "Every conversation has a topic, participants, purpose and situation. The topic is what is being discussed; the participants are the speakers; the purpose may be to inform, ask, explain, solve a problem or exchange opinions; the situation helps determine the language that is appropriate.",
      "A conversation normally develops through opening, development and closing. An opening introduces the topic or greets the other speaker. The development contains connected turns, questions, explanations and responses. A closing ends the exchange politely or summarises what has been agreed.",
      "Turn-taking means speakers share the conversation. Listen while another person speaks, avoid unnecessary interruption, respond to the point made, then allow the other person another opportunity to speak. Good turn-taking makes discussion cooperative rather than competitive.",
      "Active listening can be shown through relevant responses and follow-up questions: “I understand.” “Why do you think that happened?” “Could you explain what you mean?” “You mentioned school attendance; how can the community help?” These responses prove that the next turn grows from the previous one.",
      "A relevant response answers or develops what was actually said. If A says, “Many pupils are absent because the road floods during heavy rain,” B might ask, “Could better drainage make the route safer?” A reply about a football match would break the flow because it does not connect to the topic.",
      "Questions keep conversation moving. Closed questions often request a short fact: “When did the programme begin?” Open questions invite explanation: “Why do you think some children remain out of school?” Follow-up questions connect directly to an earlier answer: “You said cost is a problem; which school expenses create the greatest difficulty?”",
      "Agreement should be meaningful. Instead of only saying “Yes,” a learner can say, “I agree that keeping drains clear can reduce local flooding because blocked drains prevent water from flowing away.” The reason shows understanding.",
      "Respectful disagreement attacks the idea, not the person. Useful patterns include “I understand your point, but…”, “I see it differently because…”, “That may be true in some cases; however…”, and “Could we also consider…?” Insults and ridicule weaken discussion.",
      "Register means the kind of language chosen for a particular subject, audience and situation. Register includes vocabulary, expressions and level of formality. A conversation with a close friend may be informal; a discussion with a teacher, public official or invited expert normally requires more formal and respectful language.",
      "Register is also connected to subject matter. Each field has useful vocabulary. In a discussion of the economy, words such as income, prices, goods, services, employment, budget and cost of living may be relevant. In security, words such as safety, prevention, emergency, reporting, protection and community may be appropriate.",
      "Do not force difficult vocabulary into every sentence. Appropriate register means choosing words that make the idea accurate and suitable for the audience. Clear ordinary English is better than impressive words used incorrectly.",
      "Before discussing a current issue, separate facts from opinions. A fact is a claim that can be checked against reliable evidence; an opinion expresses a judgement or view. Current issues can change, so learners should use recent, trustworthy sources and avoid presenting rumours as facts.",
      "When introducing information from a source, use responsible expressions such as “According to the report…”, “The article states that…”, or “The information we found suggests…”. If the information has not been verified, do not present it confidently as established fact.",
      "A productive issue discussion can follow ISSUE → CAUSES → EFFECTS → POSSIBLE SOLUTIONS. First state the problem clearly, discuss reasons it may occur, explain its consequences, then propose realistic responses. Different speakers may disagree about causes or solutions while still remaining respectful.",
      "ECONOMY refers broadly to how people and institutions produce, exchange and use goods, services and resources. At JSS1 level, a conversation can discuss prices, family budgeting, employment, saving, needs and wants, local businesses and cost of living without requiring advanced economic theory.",
      "Useful economy register includes economy, income, expenditure, budget, savings, price, cost, goods, services, employment, business, production and consumer. Example: “If food prices rise while a family's income stays the same, the family may need to revise its budget and prioritise essential needs.”",
      "SECURITY concerns protection from danger and actions that improve safety. School-level discussion may cover personal safety, road safety, school security, cyber safety, community awareness and responsible reporting. Learners should discuss prevention and safe help-seeking, not dangerous operational details.",
      "Useful security register includes safety, security, risk, prevention, emergency, protect, report, authority, suspicious, alert and community. Example: “Students should report a serious safety concern to a trusted adult or appropriate authority rather than spread an unverified rumour.”",
      "OUT-OF-SCHOOL CHILDREN are children of school age who are not attending school. A discussion may explore barriers such as poverty, distance, displacement, disability, family circumstances or lack of access, while avoiding the assumption that every child's situation has the same cause.",
      "Useful education and out-of-school register includes education, enrolment, attendance, access, learning, school-age child, barrier, support, inclusion, fees/costs, classroom and community. Possible solutions should match the cause being discussed; one solution cannot solve every barrier.",
      "CLIMATE CHANGE refers to long-term changes in climate patterns. A JSS1 conversation can focus on observable impacts and responsible responses such as heat, changing rainfall patterns, flooding risks, environmental care, waste management, tree protection and community preparedness, while distinguishing long-term climate from today's weather.",
      "Useful climate register includes climate, weather, rainfall, temperature, flooding, drought, environment, pollution, emissions, waste, adaptation and conservation. Example: “Heavy rain on one day is weather; climate discussion concerns patterns and changes observed over much longer periods.”",
      "EDUCATION discussions may cover attendance, learning materials, teacher support, reading habits, safe learning environments and access to school. DRUG ABUSE may be discussed using health- and safety-focused language such as misuse, harmful effects, prevention, support and trusted adult, without glamorising harmful substances.",
      "Problem-solving conversation should move beyond complaining. After identifying a problem, ask: What can an individual do? What can a school or family do? What may require community or government action? Which suggestion is realistic, safe and relevant to the cause?",
      "To prepare for a group discussion, research the issue, note a few reliable facts, learn the important vocabulary, decide the main point you want to contribute, and prepare questions for other speakers. During the discussion, listen and adjust your response instead of reciting a memorised speech.",
      "After a conversation, evaluate four things: relevance—did each turn stay connected to the issue? register—were words suitable for topic and audience? interaction—did speakers listen, question and take turns? reasoning—were claims explained and solutions supported?"
    ],
    "workedExamples": [
      "Conversation structure: A: “Good afternoon. Our group is discussing why some learners miss school regularly.” B: “One possible barrier is transport. Some learners live far from school.” A: “That is important. How might distance affect attendance during heavy rain?” B: “Travel may become more difficult, so safer transport or a closer learning option could help.” The exchange opens a topic, develops it through connected turns and uses a follow-up question.",
      "Relevant versus irrelevant response: A: “Food prices have increased in the market.” Relevant B: “How has that affected what families can buy with the same budget?” Irrelevant B: “My favourite subject is English.” The relevant response develops the economic issue.",
      "Register example: Informal friend-to-friend: “I think we should talk to the teacher about the broken gate.” More formal school meeting: “I suggest that we report the damaged gate to the school management because it may create a safety risk.” Both can communicate the same basic idea, but audience and situation change the register.",
      "Economy dialogue: A: “What does a budget help a family do?” B: “It helps the family plan how available income will be spent.” A: “What might happen when prices rise?” B: “The same amount of money may buy fewer goods, so the family may need to prioritise needs and reduce some non-essential spending.”",
      "Security dialogue: A: “Should students forward every alarming message they receive?” B: “No. They should first check whether the information is reliable and tell a trusted adult if there is a genuine safety concern.” A: “Why?” B: “Because spreading an unverified warning can create confusion or panic.”",
      "Out-of-school children dialogue: A: “Why might a child of school age be out of school?” B: “There can be different barriers, including cost, distance, displacement or lack of suitable access.” A: “So is one solution enough for every child?” B: “No. The response should address the particular barrier affecting the child.”",
      "Climate dialogue: A: “Is one very hot afternoon enough to prove climate change?” B: “No. A single day's condition is weather. Climate refers to patterns over a much longer period.” A: “What can communities still discuss?” B: “They can discuss long-term changes, flooding risk, waste management, tree protection and ways to prepare for environmental effects.”",
      "Respectful disagreement: A: “I think punishment alone will solve school lateness.” B: “I understand why rules matter, but I do not think punishment alone addresses every cause. A learner who arrives late because of transport difficulties may need a different solution.” B disagrees with the proposal without insulting A.",
      "Fact and opinion: “The report recorded 120 pupils” is a checkable factual claim if the report exists. “The programme is the best solution” is an evaluation that needs reasons. A good speaker does not present both statements as if they have the same kind of evidence.",
      "Problem-solving model: Issue—plastic waste blocks a drain. Cause—waste is dumped carelessly and collection is inadequate. Effect—water flow is obstructed and local flooding risk may increase. Possible responses—better disposal habits, reliable collection, clearing blocked drains safely and community education. Speakers can then discuss which response is practical and who is responsible."
    ],
    "misconceptions": [
      "thinking conversation means delivering a memorised speech while others wait",
      "interrupting or dominating the exchange instead of sharing turns",
      "replying with an unrelated point because it was prepared beforehand",
      "using slang or casual expressions in every situation regardless of audience",
      "believing register means using unnecessarily difficult vocabulary",
      "disagreeing by insulting the speaker rather than examining the idea",
      "presenting rumours or outdated claims as facts during discussion of current issues",
      "assuming every out-of-school child has the same reason for not attending school",
      "confusing one day's weather with long-term climate",
      "listing problems without discussing causes, effects or realistic solutions"
    ],
    "guidedPractice": [
      "Sort twelve expressions into suitable formal, informal or issue-specific registers and explain the audience or situation for each.",
      "Complete four short dialogues by choosing the response that most logically follows the previous speaker.",
      "Practise asking closed, open and follow-up questions about one school issue.",
      "In pairs, discuss rising household costs for six turns using at least four appropriate economy terms and one respectful agreement or disagreement.",
      "In groups, choose security, education, out-of-school children or climate change and organise the discussion as issue → causes → effects → possible solutions.",
      "Use a recent teacher-approved newspaper, magazine or online source to identify one checkable fact and one opinion about a current issue, then practise attributing the information accurately."
    ],
    "independentPractice": [
      "Prepare and perform an eight-turn conversation on a current national or global issue. Include an opening, at least two follow-up questions, relevant responses, appropriate register, one supported agreement/disagreement and a polite closing.",
      "Choose one issue from economy, security, education, out-of-school children, climate change or drug abuse. Create a vocabulary bank of twelve relevant words, then use at least eight correctly in a conversation.",
      "Research one current issue using two reliable sources. Record source/date, three verified facts and two possible solutions; then discuss the issue without presenting opinion as fact.",
      "Self-assess a recorded conversation for relevance, turn-taking, register, vocabulary, clarity, evidence and respectful interaction."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_TEXTBOOK_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Learner sustains an issue-based conversation for at least eight connected turns, uses appropriate issue-specific register, asks and answers relevant questions, disagrees respectfully, distinguishes sourced facts from opinions, and contributes a reasoned solution with at least 80% on the associated mastery exercise.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-fluency",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading Short Passages with Fluency",
    "objectives": [
      "Explain reading fluency and its major components",
      "Read short age-appropriate passages accurately and with understanding",
      "Read at an appropriate speed without sacrificing meaning",
      "Group words into meaningful phrases rather than reading word by word",
      "Use punctuation, stress and intonation to support meaning",
      "Avoid habits that unnecessarily slow or disrupt reading",
      "Self-correct important reading errors and reread smoothly",
      "Improve oral reading through modelled and repeated reading"
    ],
    "prerequisites": ["word recognition","basic punctuation","sentence meaning","basic pronunciation"],
    "teaching": [
      "Reading fluency means reading a text accurately, at a suitable pace, with meaningful phrasing and expression, while still understanding what is read. Fluency is not a race. A reader who moves very fast but changes words, ignores punctuation or cannot explain the passage is not reading fluently.",
      "Five ideas work together in fluent reading: ACCURACY—saying the printed words correctly; RATE—moving at an appropriate speed; COMPREHENSION—understanding the message; PHRASING—grouping words that belong together; and PROSODY—using stress, rhythm, pauses and intonation so the reading reflects meaning.",
      "Accuracy comes first. Look carefully at the whole word. If you misread a word, check its letters and the meaning of the sentence, correct it, then reread the whole phrase. Self-correction is a reading skill; silently noticing an error but continuing with broken meaning is not enough.",
      "Appropriate speed is neither painfully slow nor uncontrolled. Slow word-by-word reading can overload attention because the reader reaches the end of a sentence after forgetting its beginning. Excessive speed can cause skipped words and lost meaning. The goal is an efficient pace at which words, phrases and ideas remain clear.",
      "Comprehension is part of fluency. Before reading, know your purpose. During reading, keep asking: What is happening? What is the main point? Does this sentence make sense with what came before? After reading, you should be able to state the central message or answer basic questions.",
      "Phrasing means reading words in sense groups. Compare: “After / the / rain / the / children / returned / to / the / field” with “After the rain, / the children returned to the field.” The second grouping carries meaning more naturally. Do not pause mechanically after every word.",
      "Punctuation guides phrasing and expression. A full stop normally signals the end of a complete statement and a clear pause. A comma often marks a shorter boundary. A question mark tells us the sentence is a question. An exclamation mark can signal strong feeling or emphasis. Punctuation guides meaning; it is not merely decoration.",
      "Prosody is the expressive side of fluent reading. It includes appropriate stress, rhythm, pausing and intonation. A warning, question, exciting announcement and sad statement should not all sound flat and identical. Expression should come from the meaning of the text, not from random dramatic shouting.",
      "Word stress also affects clarity. Important content words may receive natural emphasis in a sentence, while function words are often lighter. However, do not exaggerate every important word. Read for the thought being communicated.",
      "Before reading a short passage, preview it. Notice the title, paragraphing, unfamiliar names, difficult words and punctuation. Decide why you are reading. A brief preview reduces avoidable stumbling and gives the mind a framework for meaning.",
      "NERDC identifies conditions and habits that support faster, more efficient reading: good eyesight, avoiding unnecessary vocalisation during silent speed reading, avoiding regressive reading, increasing eye span and reading phrases rather than isolated words.",
      "Good eyesight matters because the eyes must recognise print clearly. Persistent difficulty seeing the board or page should not be treated as laziness or a reading fault; the learner should tell a responsible adult so that vision can be checked.",
      "Vocalisation means saying every word aloud or moving the lips while trying to read silently. Oral reading is necessary when practising pronunciation and expression, but unnecessary vocalisation can restrict speed when the task specifically requires efficient silent reading.",
      "Regressive reading means repeatedly jumping backward to words already read even when there is no genuine need. Occasional rereading is useful when meaning is unclear; the problem is habitual backtracking that breaks the flow. Train yourself to move forward while monitoring meaning.",
      "Eye span refers to how much useful print the eyes can take in at one fixation. Fluent readers increasingly recognise groups of words rather than fixing separately on every tiny unit. Phrase reading supports both wider visual grouping and better meaning.",
      "Finger, pencil or ruler tracking can help a beginning reader temporarily, but habitual pointing at every single word can encourage word-by-word reading. As recognition improves, practise allowing the eyes to move through meaningful groups.",
      "Do not confuse skimming or scanning with fluent passage reading. Scanning searches rapidly for a specific item; skimming gathers the broad idea. Fluent reading of a short passage aims to carry the connected meaning accurately and naturally.",
      "Repeated reading is purposeful rereading, not empty repetition. First reading: secure the words and meaning. Second reading: improve phrase grouping and punctuation. Third reading: improve smoothness and expression. Feedback should identify a specific target rather than simply saying “read faster.”",
      "A useful self-check after reading is ACCURACY—Did I change or omit important words? PHRASING—Did I group ideas naturally? EXPRESSION—Did punctuation and meaning affect my voice? MEANING—Can I explain what I read? CORRECTION—Did I repair important mistakes?",
      "Fluency develops through practice with many texts. A learner should eventually transfer the skill from a practised passage to a fresh passage. Memorising one passage is not evidence that the learner can read unfamiliar text fluently."
    ],
    "workedExamples": [
      "Phrase grouping: “Before the match, / our coach reminded us / to remain calm.” The slashes mark sense groups, not compulsory long pauses. Read each group as one connected idea.",
      "Punctuation: “Stop!” should not sound like “Stop?” The exclamation mark and question mark communicate different purposes. Let the voice reflect the sentence meaning.",
      "Self-correction: Printed text: “The pupils planted trees beside the road.” If a learner reads “plants,” the grammar and print do not match. Correct “planted,” then reread: “The pupils planted trees / beside the road.”",
      "Rate versus meaning: Racing through “Because the bridge was flooded, the driver turned back” and missing “flooded” destroys the cause of the action. A slightly slower accurate reading is more fluent than a faster inaccurate one.",
      "Repeated reading target 1: First attempt has several hesitations. Before the second attempt, practise only the difficult words. Then reread the complete sentence so the repaired words fit smoothly into meaning.",
      "Repeated reading target 2: Accurate but robotic reading. Mark phrase groups: “At sunrise, / the farmers entered the field / and began their work.” Reread without stopping after every word.",
      "Expression: “Did you lock the gate?” is a genuine question. “What a beautiful performance!” expresses a reaction. “Please remain seated until the bus stops.” is an instruction. Their delivery should not be identical.",
      "Comprehension check: Passage: “Amina noticed dark clouds before school. She carried an umbrella. At noon, heavy rain began.” Main point: Amina prepared for expected rain. Fluency includes retaining this connected meaning while reading.",
      "Eye movement: Instead of visually treating “the / new / science / laboratory” as four disconnected stops, practise recognising “the new science laboratory” as a meaningful group.",
      "Useful rereading versus regression: Going back once because a pronoun is unclear is strategic rereading. Jumping backward after nearly every phrase from habit is regressive reading and disrupts flow."
    ],
    "misconceptions": [
      "believing the fastest reader is automatically the most fluent",
      "thinking fluency means oral speed only and has nothing to do with comprehension",
      "pausing after every printed word",
      "ignoring commas, full stops, question marks and exclamation marks",
      "reading every sentence in a flat voice regardless of meaning",
      "guessing difficult words from their first letter and continuing without checking",
      "refusing to self-correct because correction feels like failure",
      "believing repeated reading means racing through the same passage several times",
      "thinking all rereading is bad; strategic rereading for lost meaning can be useful",
      "using finger or ruler tracking forever even when it prevents phrase reading",
      "assuming a memorised performance proves fluency on unfamiliar text",
      "sacrificing accuracy and understanding merely to improve a timer score"
    ],
    "guidedPractice": [
      "MODEL PASSAGE — The School Garden: “Early on Saturday, members of the Environmental Club gathered behind the science block. / Some loosened the soil, / while others planted vegetable seeds. / Their teacher showed them how to water the beds without washing the seeds away. / By noon, the tired pupils were smiling / because the neglected corner had begun to look like a real garden.” First listen to/model the passage, then identify difficult words, mark sense groups, read aloud, answer what the pupils did and why they smiled, receive one specific fluency target, and reread.",
      "PUNCTUATION PRACTICE — Read: “Wait, Tunde!” “Wait, Tunde?” and “Wait, Tunde.” Discuss how punctuation and intended meaning change the delivery without changing the words.",
      "PHRASE PRACTICE — Re-group: “When the bell rang the students who had finished their work walked quietly to the hall.” Suggested grouping: “When the bell rang, / the students who had finished their work / walked quietly to the hall.” Explain why each group belongs together.",
      "ERROR REPAIR — Teacher/AVORA deliberately substitutes, omits or repeats a word in a short sentence. Learner identifies the mismatch, checks print and meaning, corrects it, and rereads the whole phrase.",
      "REPEATED READING — Read one 100–140 word passage three times. Attempt 1 targets accurate word recognition and meaning; attempt 2 targets phrasing/punctuation; attempt 3 targets smoothness/expression. Compare improvement rather than merely comparing speed."
    ],
    "independentPractice": [
      "PASSAGE A — The Library Card: “Bola had visited the school library many times, but she had never borrowed a book. On Monday, the librarian explained how the borrowing system worked. Bola completed a small form and received her library card. She chose a book about Nigerian wildlife, checked the return date carefully, and placed the card inside her purse. On her way home, she decided to read one chapter before dinner. She was pleased that the library could now become part of her weekly study routine.” Read once for meaning, mark phrase boundaries, practise difficult words, then make two oral readings. Afterwards state why Bola was pleased.",
      "PASSAGE B — A Sudden Change: “The football practice began under a bright sky. Half an hour later, the wind became stronger and dark clouds gathered above the field. The coach blew his whistle and asked everyone to move into the hall. Moments after the last player entered, rain swept across the playground. The team could not continue outside, so the coach used the remaining time to discuss their next match.” Read naturally and explain the sequence of events without looking back at every sentence.",
      "Record or have a partner listen to one fresh passage. Mark each omitted, substituted or added word; note unnecessary pauses and successful self-corrections; then reread once with one clear improvement goal.",
      "Silent-reading transfer: read a short unfamiliar passage without lip movement or word-by-word pointing, then give the main idea and two supporting details. Reread strategically only where meaning was genuinely unclear."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_AND_READING_RESEARCH_CROSSCHECK"},
    "mastery": {
      "criterion": "On an unfamiliar age-appropriate short passage, learner reads with high word accuracy, appropriate pace, meaningful phrase grouping, punctuation-sensitive expression and successful comprehension, while self-correcting major miscues; learner also demonstrates efficient silent-reading habits and achieves at least 80% on the associated mastery exercise.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-reading-for-meaning",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading passages for meaning",
    "objectives": [
      "Explain main idea and supporting idea/detail",
      "Identify the subject or topic of a paragraph before deciding its main idea",
      "Identify stated and implied main ideas in age-appropriate paragraphs",
      "Select details that genuinely support a main idea",
      "Differentiate main ideas from examples, facts, reasons, descriptions and minor details",
      "Use paragraph evidence to justify a chosen main idea",
      "Identify the main idea of a multi-paragraph passage from its paragraph-level ideas",
      "Read and comprehend passages on NERDC-specified contemporary and civic themes"
    ],
    "prerequisites": ["reading complete sentences","basic vocabulary in context","recognising paragraph boundaries"],
    "teaching": [
      "Reading for meaning means reading to understand what a text communicates, not merely pronouncing its words. In this NERDC topic, the central skill is distinguishing MAIN IDEAS from SUPPORTING IDEAS or DETAILS.",
      "Begin with the TOPIC. The topic is the general subject being discussed and is often expressed in a word or short phrase such as “road safety” or “artificial intelligence.” The MAIN IDEA is a complete thought explaining the most important point the writer makes about that topic.",
      "Example: “Trees help a school environment in several ways. They provide shade during hot weather. Their roots can help hold soil together. They can also make the compound more pleasant.” Topic: trees in the school environment. Main idea: Trees benefit the school environment in several ways. The remaining sentences support that idea.",
      "A SUPPORTING IDEA or DETAIL develops the main idea. It may give a reason, example, fact, explanation, description, cause, effect or evidence. A supporting detail is important, but it does not usually cover the whole paragraph.",
      "Use the UMBRELLA TEST. The main idea should be broad enough to cover most of the important details beneath it. If a proposed main idea explains only one sentence while several other sentences are left outside, it is probably too narrow.",
      "Use the TOO-BROAD TEST as well. “Life is important” may be related to a paragraph about wearing seat belts, but it is so general that it does not accurately capture what that particular paragraph says. A good main idea is neither too narrow nor too broad.",
      "Ask four questions: (1) What or who is this paragraph mainly about? (2) What is the writer saying about it? (3) Which sentence or statement covers most of the important details? (4) Which details prove or explain that statement?",
      "A TOPIC SENTENCE often states the main idea directly, but do not assume that the first sentence is always the main idea. A topic sentence may appear at the beginning, middle or end, and sometimes the main idea is implied rather than stated word-for-word.",
      "When the main idea is IMPLIED, combine the repeated or closely related details. Example: “Musa checks the source before forwarding a message. He compares the claim with another reliable source. He also checks when the information was published.” No sentence says it directly, but the details imply: Musa verifies information before accepting or sharing it.",
      "Repeated key words, synonyms and related ideas can reveal the paragraph's focus. However, counting repeated words alone is not enough; decide what complete message the writer builds around them.",
      "Signal expressions can reveal the role of details. “For example” often introduces an illustration; “because” may introduce a reason; “therefore” may introduce a result; “however” signals contrast; “first, next, finally” show sequence. These signals help the reader see how supporting information is organised.",
      "A main idea must come from the text. Do not choose an answer simply because it is true in real life or because you personally agree with it. Ask: Does the passage actually develop this idea?",
      "To identify a paragraph's main idea reliably, use TOPIC → CLAIM → SUPPORT. Name the topic, state the writer's central claim about it, then point to two or more details that support that claim.",
      "In a multi-paragraph passage, each paragraph may have its own main idea. The whole passage also has an overall central idea. Build upward: identify the main idea of each paragraph, then ask what larger message connects them.",
      "Titles can help predict a passage's subject, but the title is not automatically the main idea. Read the passage and confirm the writer's actual message.",
      "NERDC expects learners to practise this skill through passages on varied issues. The purpose is not to memorise facts about each theme; the purpose is to transfer the same reading-for-meaning strategy to unfamiliar content.",
      "ARTIFICIAL INTELLIGENCE passage reading: distinguish what the text actually says AI can do from exaggerated claims. A supporting example of a tool is not automatically the paragraph's main idea.",
      "INFORMATION LITERACY means being able to find, examine and use information responsibly. In a passage, details such as checking author, source, date and evidence may support a broader main idea about verifying information before sharing it.",
      "PATRIOTISM can be presented through responsible actions that contribute to one's country or community. When reading, identify the writer's particular message rather than assuming every patriotic passage has exactly the same main idea.",
      "PEACEFUL COEXISTENCE passages may contain details about respect, tolerance, dialogue and cooperation. Decide what larger statement those details jointly support.",
      "ROAD SAFETY passages may use examples such as pedestrian crossings, seat belts, helmets or obeying traffic rules. The main idea should cover the set of safety details rather than merely repeat one example.",
      "DISASTER RISK REDUCTION concerns actions that reduce harm before or during hazards. In a reading passage, preparation, warnings and safe procedures may all support a central idea about reducing risk.",
      "HUMAN TRAFFICKING passages should be read with safeguarding in mind. Focus on the text's prevention, awareness and safe help-seeking message. Do not invent frightening details that are not in the passage.",
      "CYBER SECURITY passages may discuss strong passwords, suspicious links, privacy or reporting problems. If several such details appear together, look for the broader online-safety idea that unites them.",
      "MENTAL HEALTH passages should be handled respectfully. Details about healthy routines, seeking support from trusted adults, rest and social connection may support a broader message about caring for wellbeing; do not diagnose a person from a reading passage.",
      "When answering a main-idea question, briefly prove your choice: “The main idea is ___ because the paragraph explains ___, ___ and ___.” Evidence prevents guessing.",
      "When asked for supporting ideas, choose details that directly explain or prove the main idea. An interesting sentence can still be irrelevant to the main idea.",
      "After reading, try the ONE-SENTENCE TEST: state what the paragraph is mainly saying in one accurate sentence. If your sentence contains only a tiny example, widen it. If it could fit hundreds of unrelated passages, make it more specific."
    ],
    "workedExamples": [
      "MAIN IDEA versus TOPIC: “Regular exercise can help young people stay healthy. It strengthens the body, can improve fitness and can support healthy routines.” Topic: exercise. Main idea: Regular exercise can help young people stay healthy. Supporting ideas: stronger body, improved fitness and healthier routines.",
      "TOO NARROW: Passage details mention seat belts, pedestrian crossings and obeying traffic lights. “Seat belts are useful” is supported but too narrow to cover the other details. A stronger main idea is: Following road-safety rules reduces avoidable danger.",
      "TOO BROAD: For the same road-safety paragraph, “Safety is important everywhere” is too broad. It does not capture the specific message developed by the passage.",
      "STATED MAIN IDEA: “Good information habits protect people from false claims. Before sharing a message, check who produced it, when it was published and whether reliable evidence supports it.” The first sentence states the main idea; the second supplies supporting actions.",
      "IMPLIED MAIN IDEA: “Ada uses a different strong password for important accounts. She does not give her password to friends. When a strange link arrives, she checks before opening it.” Implied main idea: Ada follows safe online habits. No sentence states those exact words, but all three details support them.",
      "SUPPORT TEST: Main idea: “The school reduced waste through organised action.” Detail A: labelled bins were placed around the compound. Detail B: pupils learned how to separate waste. Detail C: the principal likes football. C may be true, but it does not support the main idea.",
      "PEACEFUL COEXISTENCE: “Students from different backgrounds worked together on the class project. They listened when opinions differed, divided the tasks fairly and solved disagreements through discussion.” Main idea: Respectful cooperation helps people with differences work peacefully together.",
      "AI: “Artificial intelligence can help computer systems perform tasks that normally require aspects of human intelligence, such as recognising patterns or generating responses. However, users still need to check important outputs because an AI system can produce inaccurate information.” Main idea: AI can perform useful tasks, but its important outputs should still be checked. Supporting ideas: examples of AI tasks and the possibility of inaccurate output.",
      "DISASTER RISK REDUCTION: “Before the rainy season, residents cleared blocked drainage channels and learned the community's emergency contacts. During heavy rain, families followed official warnings about unsafe areas.” Main idea: Preparation and attention to warnings can reduce disaster risk.",
      "MULTI-PARAGRAPH METHOD: Paragraph 1 explains why a rumour can spread quickly online. Paragraph 2 explains checking the source and date. Paragraph 3 explains comparing a claim with reliable evidence. Overall idea: Careful verification helps people avoid spreading unreliable online information."
    ],
    "misconceptions": [
      "thinking the topic and main idea are the same thing",
      "automatically choosing the first sentence as the main idea",
      "choosing the most dramatic or interesting detail instead of the central idea",
      "selecting an answer that is true generally but not developed by the passage",
      "choosing a statement too narrow to cover most supporting details",
      "choosing a statement so broad that it could fit many unrelated passages",
      "assuming every paragraph states its main idea explicitly",
      "treating every sentence as equally important",
      "using the title alone without confirming it against the passage",
      "adding personal opinions when asked what the writer's main idea is",
      "confusing an example introduced by “for example” with the larger idea it illustrates",
      "memorising issue facts instead of learning a transferable reading strategy"
    ],
    "guidedPractice": [
      "PASSAGE 1 — Information Literacy: “A message may look convincing and still be unreliable. Before sharing it, a careful reader checks who created it, when it was published and whether trustworthy evidence supports the claim. Comparing the information with another reliable source can also expose errors.” Identify topic, main idea and four supporting details. Explain why “checking the publication date” alone is too narrow to be the main idea.",
      "PASSAGE 2 — Road Safety: “Many road injuries can be prevented when road users follow safety rules. Pedestrians should use safe crossing points where available. Vehicle occupants should use appropriate restraints, and road users should obey traffic signals. Small acts of care can prevent serious harm.” Identify the stated main idea and classify the remaining statements as supporting details.",
      "PASSAGE 3 — Peaceful Coexistence: “During group work, Chidi and Amina disagreed about the best design. Instead of insulting each other, they explained their reasons and listened carefully. The group combined the strongest parts of both suggestions and completed the task successfully.” Infer the main idea and cite at least two details that support it.",
      "MAIN-IDEA LADDER: For five short paragraphs, first write the topic as a phrase, then the main idea as a complete sentence, then two supporting details. Compare the three levels so topic is not confused with main idea.",
      "DISTRACTOR CLINIC: Given four possible main ideas, label each as BEST, TOO BROAD, TOO NARROW or NOT SUPPORTED and explain the evidence."
    ],
    "independentPractice": [
      "PASSAGE A — Cyber Security: “Kemi received an email saying that her account would close immediately unless she clicked a link and entered her password. The message made her worried, but she noticed that the sender's address looked unusual. Instead of clicking, she opened the organisation's official app directly and checked her account there. She also showed the suspicious message to a trusted adult. The warning turned out to be false.” Write the topic, one-sentence main idea and four supporting details. Explain which detail most clearly shows that Kemi verified the message safely.",
      "PASSAGE B — Patriotism and Community Responsibility: “On the monthly sanitation day, several residents cleaned the public space near the market. Others reported a damaged water pipe instead of ignoring it. A youth group later organised a reading programme for younger children. None of these actions solved every community problem, but each showed people taking responsibility for the place where they lived.” Identify the implied main idea and show how at least three details support it.",
      "PASSAGE C — Mental Wellbeing: “Examination periods can feel demanding for some learners. A sensible routine can include planning study time, taking reasonable breaks, sleeping adequately and speaking to a trusted adult when worries become difficult to manage. These actions do not make every problem disappear, but they can support wellbeing while a learner seeks appropriate help.” Identify the main idea and separate the supporting actions from the writer's qualification in the final sentence.",
      "Read an unfamiliar age-appropriate passage from a teacher-approved source. Write: TOPIC → MAIN IDEA → three SUPPORTING DETAILS → one sentence from the passage that is interesting but least important to the central message."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_AND_READING_PEDAGOGY_CROSSCHECK"},
    "mastery": {
      "criterion": "Across unfamiliar age-appropriate paragraphs and short passages, learner correctly distinguishes topic, main idea and supporting ideas, identifies both stated and implied main ideas, rejects too-broad/too-narrow/unsupported alternatives, and justifies answers with textual evidence at at least 80% mastery.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-literal-inferential-critical",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading Passages to Answer Literal, Inferential and Critical Questions",
    "objectives": [
      "Explain literal, inferential and critical comprehension",
      "Identify what level of comprehension a question requires",
      "Answer literal questions with precise evidence from a passage",
      "Make reasonable inferences by combining textual clues with prior knowledge or logic",
      "Answer critical questions by making evidence-based judgements about ideas in a text",
      "Distinguish an inference from an unsupported guess",
      "Distinguish critical evaluation from personal preference",
      "Use prediction before reading and revise predictions when textual evidence changes",
      "Support comprehension answers with relevant textual evidence"
    ],
    "prerequisites": ["reading for meaning","main and supporting ideas","basic vocabulary in context"],
    "teaching": [
      "Comprehension is more than remembering words. A strong reader can recover information the writer states, work out reasonable meanings the writer implies, and examine ideas critically. NERDC therefore requires three levels: LITERAL, INFERENTIAL and CRITICAL comprehension.",
      "Use the AVORA memory rule: LITERAL = FIND IT. INFERENTIAL = WORK IT OUT. CRITICAL = EVALUATE IT WITH EVIDENCE. These are not three unrelated tricks; they are increasingly demanding ways of thinking about the same text.",
      "LITERAL comprehension asks for information stated directly in the passage. Typical prompts include who, what, when, where, how many, according to the passage, or what happened first. The answer should be traceable to specific words or sentences.",
      "Literal does not mean careless copying. Read the exact question, locate the relevant sentence, and select only the information requested. If the passage says, “At 7:30 a.m., Aisha boarded the bus at Unity Road,” the question “Where did Aisha board the bus?” requires “at Unity Road,” not every detail in the sentence.",
      "A useful literal strategy is QUESTION → KEY WORDS → LOCATE → CHECK → ANSWER. Identify the important words in the question, scan the passage for the matching idea, reread the surrounding sentence, and answer precisely.",
      "Inferential comprehension asks for a meaning that is not stated completely in one sentence. Use INFERENCE = TEXTUAL CLUES + REASONING. The clue must come from the passage; reasoning connects the clues to a conclusion.",
      "Example: “Kunle entered the room shaking water from his umbrella. Drops ran from the shoulders of his jacket.” The passage never says, “It was raining outside,” but that is a reasonable inference because the umbrella and wet jacket are textual clues.",
      "An inference is not a wild guess. If a learner says Kunle had just won a football match, the passage supplies no supporting clue. A defensible inference should answer the challenge: “Which words in the text helped you think that?”",
      "Common inference tasks include working out a character's likely feeling or motive, cause and effect, the meaning of an unfamiliar word from context, what probably happened before or may happen next, and what an unstated relationship between ideas suggests.",
      "Be careful with feelings. If a character “smiled, thanked everyone and held the prize tightly,” it is reasonable to infer pleasure or pride. It would be much weaker to diagnose a complex emotional condition that the passage does not support.",
      "Critical comprehension asks the reader to examine, evaluate or judge something about the text. A critical answer should use CRITERION + TEXTUAL EVIDENCE + REASON. It is not simply “I like it” or “I don't like it.”",
      "Critical questions may ask whether a decision was sensible, whether evidence is sufficient, whether an argument is convincing, whether a title is suitable, whether information seems reliable, what alternative action might be better, or whether the writer has supported a claim adequately.",
      "Example: Passage: “The club cancelled its outdoor event after an official warning of severe weather.” Critical question: “Was the cancellation reasonable?” Strong answer: “Yes. The passage says there was an official severe-weather warning, so avoiding the outdoor event reduced an identified safety risk.” The judgement is tied to evidence and a clear criterion: safety.",
      "Critical thinking does not mean automatically disagreeing with the writer. You may agree, disagree or partly agree, but your conclusion must follow from the passage and a defensible reason.",
      "Some questions can look similar. “Why did Ada leave?” may be literal if the passage directly says, “Ada left because she was ill.” It becomes inferential if the reason is only suggested by clues. Classify the question by what the TEXT requires, not by one question word alone.",
      "Question stems provide clues, not guarantees. “According to the passage...” often signals literal retrieval. “What can you infer/suggest...” usually signals inference. “Do you think... Give a reason,” “How effective...?” or “Was this justified?” often requires critical evaluation.",
      "PRE-READING PREDICTION prepares the mind. Look at a title, picture or heading and predict what the passage may discuss. Then read to confirm, reject or revise the prediction. A prediction is provisional; evidence from the text has final authority.",
      "For every answer, practise an EVIDENCE HABIT. Literal: point to the exact statement. Inferential: name the clues and explain the connection. Critical: state the judgement, identify the relevant evidence and explain the criterion or reason.",
      "Do not overquote. Unless exact wording is requested, answer in a clear sentence using the relevant information. Copying an entire paragraph can hide whether you understood the question.",
      "When a question contains an unfamiliar word, reread the sentence and nearby sentences. Definition clues, examples, contrast, cause/effect and synonyms can help. Then test the possible meaning in the original sentence.",
      "For multiple-choice comprehension, answer from the passage before being attracted by the options. Eliminate answers that contradict the text, are unsupported, are only partly correct, or answer a different question.",
      "For written comprehension, use complete, economical answers. Include enough information to answer fully, but avoid unrelated details. If evidence or a reason is requested, provide it explicitly.",
      "After answering, verify: LITERAL—Can I point to where the text states it? INFERENTIAL—Can I show clues plus reasoning? CRITICAL—Can I show judgement plus evidence plus reason? If not, revise the answer."
    ],
    "workedExamples": [
      "ONE TEXT, THREE LEVELS: “After two days of heavy rain, the stream beside Oke School rose above its normal level. On Wednesday morning, the head teacher saw water covering part of the footpath and asked pupils to use the longer paved route. Some pupils complained that the new route added ten minutes to their journey, but everyone reached the school safely.” LITERAL: Why did pupils use the longer route? Because water covered part of the footpath. INFERENTIAL: What was probably the head teacher's main concern? Pupil safety—the flooded path and the safer alternative are clues. CRITICAL: Was the decision reasonable? Yes; although inconvenient, it avoided a path partly covered by rising water.",
      "LITERAL PRECISION: “The science exhibition begins at 10 a.m. in the assembly hall.” Question: Where will it hold? Answer: In the assembly hall. Do not answer “at 10 a.m.” because that answers when, not where.",
      "INFERENCE FROM ACTION: “Bisi read the message twice, frowned, and immediately called her mother instead of clicking the link.” Reasonable inference: Bisi was suspicious or concerned about the message. Evidence: rereading, frowning and avoiding the link.",
      "UNSUPPORTED GUESS: From Bisi's example, “Bisi's phone was stolen yesterday” is not a valid inference. Nothing in the passage points to theft.",
      "CRITICAL RELIABILITY: A post says, “Everyone should take this medicine; my neighbour says it works,” but gives no qualified source or evidence. A critical reader can judge the support as weak because a neighbour's claim alone is insufficient evidence for a general health recommendation.",
      "CONTEXT CLUE: “The path was treacherous; loose stones made several walkers slip.” Even if “treacherous” is unfamiliar, the example of loose stones and slipping suggests dangerous or unsafe.",
      "PREDICTION: Title: “The Unexpected Visitor.” Predicting that someone arrives unexpectedly is sensible. Predicting that the visitor is a famous musician is possible but unsupported until the passage provides evidence.",
      "MIXED QUESTION WORD: Passage directly states, “Tunde stayed indoors because he had a fever.” “Why did Tunde stay indoors?” is LITERAL, even though it asks “why,” because the reason is explicitly stated.",
      "CRITICAL TITLE: If a passage mainly explains three ways students can verify online information, “Checking Before Sharing” is more suitable than “My Favourite Website” because the first title represents the central content.",
      "PARTIAL AGREEMENT: A character decides never to use the internet again after receiving one suspicious message. Critical response: The caution is understandable, but completely avoiding the internet may be excessive; the passage's safer strategies—verification and trusted help—address the risk without requiring total avoidance."
    ],
    "misconceptions": [
      "thinking every 'why' question is inferential",
      "thinking literal answers must copy whole sentences word for word",
      "treating an inference as permission to guess anything",
      "giving an inference without identifying textual clues",
      "confusing prior knowledge with evidence from the passage",
      "thinking critical comprehension means criticising or finding fault",
      "answering critical questions with unsupported personal preference",
      "assuming a prediction must remain unchanged after reading",
      "choosing an option because it sounds generally true even when the passage does not support it",
      "over-interpreting a character's behaviour beyond what textual evidence reasonably supports",
      "answering only one part of a two-part question",
      "copying large sections of text instead of selecting the precise answer"
    ],
    "guidedPractice": [
      "GUIDED PASSAGE 1 — The Lost Purse: “As Ngozi approached the school gate, she noticed a small purse beneath a bench. She opened only the outer pocket and found an identification card bearing Mrs Bello's name. Instead of taking the purse home, Ngozi carried it to the school office. Twenty minutes later, Mrs Bello arrived looking worried. When the secretary handed her the purse, she smiled with relief and thanked Ngozi.” Literal: Where did Ngozi find the purse? Inferential: Why was Mrs Bello probably worried? Critical: Was Ngozi's decision appropriate? For each answer, mark the exact evidence or clues.",
      "GUIDED PASSAGE 2 — The Online Notice: “A message in a class group claimed that school would close the next day. Femi noticed that the message had no date and did not come from the school's official account. He checked the school's verified notice board and found no closure announcement. He then asked the class representative to confirm with a teacher.” Ask three literal, three inferential and two critical questions; classify each before answering.",
      "GUIDED PASSAGE 3 — Community Water: “For weeks, a leaking pipe sent clean water into the gutter. Residents first placed a container beneath the leak, but this did not stop the waste. A youth group photographed the damaged pipe, recorded its location and reported it to the responsible office. Two days later, workers repaired it.” Determine what is directly stated, infer why the group recorded the location, and critically compare the temporary container with reporting the fault.",
      "QUESTION-SORTING DRILL: Sort twelve question cards into FIND IT, WORK IT OUT and EVALUATE IT WITH EVIDENCE. Then explain what feature of the required answer—not merely the question word—determines each category.",
      "EVIDENCE LADDER: For each inference, write CLUE 1 + CLUE 2 → CONCLUSION. For each critical answer, write JUDGEMENT + EVIDENCE → REASON."
    ],
    "independentPractice": [
      "PASSAGE A — The Debate Trip: “The debate team was due to leave at 7 a.m. At 6:40, the driver called to report a mechanical problem with the bus. The teacher informed the students and contacted another approved transport provider. The replacement bus arrived at 7:35. Although the team reached the venue later than planned, their debate had not yet begun.” Answer: (1) What caused the original bus delay? [literal] (2) What can you infer about why the teacher contacted another approved provider? [inferential] (3) Was waiting for approved replacement transport a defensible decision? Give evidence and a reason. [critical]",
      "PASSAGE B — A Viral Photograph: “A photograph circulated online with a caption claiming that it showed yesterday's flood in a nearby town. Sade noticed a shop sign in the image carrying the name of a different country. She used a trusted image-search tool with her older sister and found the same photograph in a news report published three years earlier. Sade decided not to forward the post.” Answer literal questions about what Sade noticed and found; infer why she stopped sharing; critically assess whether the original caption was reliable and justify the judgement.",
      "PASSAGE C — The Reading Club: “Only eight pupils attended the first meeting of the new reading club. Rather than cancel it, the members selected short books and displayed brief recommendations on the class notice board. They also invited classmates to a ten-minute lunchtime reading session. By the fourth week, twenty-three pupils were attending regularly.” Identify two literal facts, make two supported inferences about the club's actions, and evaluate whether the members' strategy appears effective using evidence from the passage.",
      "Create one literal, one inferential and one critical question from a fresh teacher-approved passage. Exchange questions with a partner, answer them, and require the partner to show the evidence/reasoning for each answer."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_AND_COMPREHENSION_PEDAGOGY_CROSSCHECK"},
    "mastery": {
      "criterion": "On unfamiliar age-appropriate passages, learner accurately classifies and answers literal, inferential and critical questions, supports inferences with textual clues, supports critical judgements with evidence and reasons, and achieves at least 80% on the associated mastery exercise.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-tag-questions",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Question Tags",
    "objectives": [
      "Form common affirmative/negative question tags",
      "Match auxiliary and pronoun to the statement",
      "Use appropriate spoken intonation for confirmation or genuine inquiry"
    ],
    "prerequisites": [
      "pronouns",
      "auxiliary verbs",
      "positive/negative clauses"
    ],
    "teaching": [
      "A question tag is a short question added to a statement. A positive statement normally takes a negative tag, while a negative statement takes a positive tag.",
      "Reuse the statement’s auxiliary where possible: “She is ready, isn’t she?” If there is no auxiliary with a simple present/past lexical verb, use do/does/did.",
      "Replace the statement subject with the correct pronoun in the tag.",
      "Intonation can signal purpose: rising tone often asks genuinely, while falling tone often seeks confirmation the speaker expects."
    ],
    "workedExamples": [
      "They are coming, aren’t they?",
      "Musa plays football, doesn’t he?",
      "You didn’t call, did you?"
    ],
    "misconceptions": [
      "repeating the same polarity in statement and tag",
      "using the noun again instead of a pronoun",
      "using “isn’t” with a simple lexical verb",
      "forgetting tense/person agreement in do/does/did"
    ],
    "guidedPractice": [
      "Complete and read aloud ten tags, then change five statements from positive to negative while repairing the tags."
    ],
    "independentPractice": [
      "Write twelve original tagged statements covering be, have, modals and simple present/past; mark likely rising/falling intonation."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% structurally correct tags and appropriate oral delivery in a short dialogue.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-summary",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for Summary",
    "objectives": [
      "Identify central ideas in a short passage",
      "Separate essential ideas from examples/repetition",
      "Restate key points concisely in original wording"
    ],
    "prerequisites": [
      "main/supporting ideas",
      "basic paraphrase"
    ],
    "teaching": [
      "A summary keeps the important meaning while removing repetition, minor examples and decoration.",
      "Read the whole passage first, identify the controlling idea, then select only points needed to represent it.",
      "Paraphrase by changing structure and wording while preserving meaning; replacing one word with a synonym is not enough.",
      "Check the required number of points or word limit and avoid adding personal opinions."
    ],
    "workedExamples": [
      "Original: “Many pupils walk because fares are high. Some leave home before sunrise.” Summary point: High transport costs make many pupils walk long distances/leave early.",
      "Three examples of littering can often be reduced to the broader point “Improper waste disposal blocks drainage.”",
      "A personal comment such as “This is terrible” is removed unless the task asks for evaluation."
    ],
    "misconceptions": [
      "copying whole sentences",
      "including every example",
      "adding new ideas",
      "writing notes so short that meaning is lost"
    ],
    "guidedPractice": [
      "Reduce a 180-word passage to four key points, compare with source, and remove unnecessary examples."
    ],
    "independentPractice": [
      "Summarise two passages under stated point/word limits and underline where each summary point came from."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% of required key points captured accurately, concisely and without unsupported additions.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-interjections",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Interjections",
    "objectives": [
      "Identify interjections in context",
      "Explain the emotion/reaction they express",
      "Punctuate and use interjections appropriately"
    ],
    "prerequisites": [
      "sentence punctuation",
      "basic parts of speech"
    ],
    "teaching": [
      "An interjection is a short expression that conveys a sudden feeling or reaction, such as surprise, pain, joy, disgust or attention.",
      "Interjections are often grammatically separate from the sentence that follows, so punctuation helps show the strength of the reaction.",
      "Meaning depends on context and tone: “Oh” may express surprise, disappointment or realisation.",
      "Use interjections sparingly in suitable informal/creative contexts; they are usually inappropriate in formal reports."
    ],
    "workedExamples": [
      "“Ouch! That pan is hot.” expresses pain.",
      "“Oh, I understand now.” expresses realisation.",
      "“Hurray! Our team won.” expresses joy."
    ],
    "misconceptions": [
      "calling every exclamation an interjection",
      "assuming one interjection has only one emotion",
      "overusing interjections in formal writing",
      "forgetting punctuation"
    ],
    "guidedPractice": [
      "Identify interjections in eight mini-dialogues and state the emotion/contextual function."
    ],
    "independentPractice": [
      "Write six short contexts using different interjections, then rewrite two as formal prose without interjections."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% accuracy identifying function and using punctuation/register appropriately.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-pronouns",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Pronouns",
    "objectives": [
      "Identify common pronoun types",
      "Use pronouns with clear antecedents",
      "Maintain person, number and case consistency"
    ],
    "prerequisites": [
      "nouns",
      "sentence subjects/objects"
    ],
    "teaching": [
      "A pronoun replaces or refers to a noun/noun phrase to avoid unnecessary repetition. The noun it refers to is its antecedent.",
      "Personal pronouns change form by role: I/he/she/we/they commonly act as subjects, while me/him/her/us/them commonly act as objects.",
      "Possessive and reflexive forms have different jobs: “This book is mine”; “She taught herself.”",
      "A pronoun must point clearly to its antecedent. Avoid ambiguous sentences where two nouns could match “he”, “she” or “it”."
    ],
    "workedExamples": [
      "Amina greeted Tola. She smiled. This is ambiguous unless context shows who “she” is.",
      "“The teacher called him,” not “called he,” because the pronoun is an object.",
      "“The girls prepared themselves,” agrees in number with girls."
    ],
    "misconceptions": [
      "choosing subject forms after verbs/prepositions",
      "using reflexive pronouns as fancy substitutes for me/I",
      "unclear antecedents",
      "switching from one person to another without reason"
    ],
    "guidedPractice": [
      "Replace repeated nouns in six sentences with suitable pronouns and repair four ambiguous references."
    ],
    "independentPractice": [
      "Edit a paragraph for pronoun agreement/case/clarity and write eight original examples using personal, possessive, demonstrative and reflexive pronouns."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct pronoun form, agreement and antecedent clarity in editing and production tasks.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-agreement",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Subject–Verb Agreement",
    "objectives": [
      "Match verbs with subjects in number/person",
      "Identify the true subject despite intervening words",
      "Apply agreement in common present-tense and be/have constructions"
    ],
    "prerequisites": [
      "subjects and verbs",
      "singular/plural nouns",
      "present tense"
    ],
    "teaching": [
      "Subject–verb agreement means the verb form fits its grammatical subject. In the simple present, third-person singular subjects usually take -s/-es on lexical verbs.",
      "Words between subject and verb do not change the controlling subject: “The basket of oranges is heavy.”",
      "Compound subjects joined by “and” are usually plural, while some either/or and neither/nor patterns require attention to the nearer subject at this level.",
      "Be and have show agreement clearly: I am, he is, they are; she has, they have."
    ],
    "workedExamples": [
      "The boy runs; the boys run.",
      "The list of names is on the desk—“list” is the subject.",
      "Musa and Ada are ready."
    ],
    "misconceptions": [
      "making the verb agree with the nearest noun inside a prepositional phrase",
      "adding -s to plural-subject verbs in present tense",
      "treating every “and” phrase as singular",
      "forgetting irregular be/have forms"
    ],
    "guidedPractice": [
      "Underline subjects and choose the correct verb in twelve increasingly complex sentences."
    ],
    "independentPractice": [
      "Edit a 120-word paragraph containing twelve deliberate agreement errors and explain five corrections."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 90% agreement accuracy, including sentences with intervening phrases and compound subjects.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-word-formation",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Prefixes, Suffixes and Compound Words",
    "objectives": [
      "Identify roots, prefixes and suffixes",
      "Use common affixes to form/change words",
      "Recognise and form compound words"
    ],
    "prerequisites": [
      "basic vocabulary",
      "parts of speech"
    ],
    "teaching": [
      "A root/base carries the central lexical meaning. A prefix is added before it; a suffix is added after it.",
      "Affixes can change meaning, grammatical class or both: happy→unhappy changes meaning; teach→teacher changes verb to noun.",
      "Do not assume every initial/final letter group is an affix; the remaining base must make linguistic sense in the intended analysis.",
      "Compound words combine two meaningful bases and may be written closed, open or hyphenated according to accepted usage."
    ],
    "workedExamples": [
      "possible→impossible uses prefix im- to express negation.",
      "care→careful→carefully shows suffixes changing meaning/class.",
      "school bus is an open compound; classroom is a closed compound."
    ],
    "misconceptions": [
      "splitting words into fake roots",
      "assuming prefixes always change word class",
      "inventing spellings when adding suffixes",
      "thinking all compounds must be one word"
    ],
    "guidedPractice": [
      "Build word families from help, agree, care and use; classify ten compound words by form."
    ],
    "independentPractice": [
      "Analyse fifteen words into meaningful parts and use ten derived/compound words correctly in sentences."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct morphological analysis and appropriate use of derived/compound forms.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-creative-writing",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Introduction to Creative Writing",
    "objectives": [
      "Generate an original idea from a prompt",
      "Use setting, character, detail and voice to develop a short creative piece",
      "Draft and revise for coherence and effect"
    ],
    "prerequisites": [
      "paragraphing",
      "sentence punctuation",
      "basic narrative description"
    ],
    "teaching": [
      "Creative writing makes deliberate choices to create an experience for the reader; originality means shaping details and voice rather than copying a memorised story.",
      "Start from a clear situation: who is involved, where/when it happens, what changes or matters, and whose viewpoint guides the reader.",
      "Concrete sensory details and purposeful actions often show more than strings of adjectives. Dialogue should reveal character or advance events.",
      "Revision checks sequence, consistency, unnecessary repetition, stronger verbs, paragraphing and an ending that grows from the piece."
    ],
    "workedExamples": [
      "Instead of “The market was very busy,” write details such as “Traders called across narrow aisles as baskets brushed against passing shoppers.”",
      "A prompt “The unopened box” can become suspense by delaying information while giving relevant clues.",
      "Dialogue “Give it back,” Tola whispered shows action/tone more efficiently than a long explanation."
    ],
    "misconceptions": [
      "believing creative writing has no structure",
      "copying stock openings/endings",
      "using many adjectives without precise detail",
      "adding dialogue that does not serve the piece"
    ],
    "guidedPractice": [
      "Plan a 250-word piece from a visual prompt using character, setting, conflict/change and five sensory/action details."
    ],
    "independentPractice": [
      "Write and revise a 350–450 word creative piece; submit first plan plus final version with three explained revisions."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Coherent original piece meeting prompt, with controlled viewpoint, purposeful detail, paragraphing and meaningful revision.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-expository-argumentative",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Expository and Argumentative Composition",
    "objectives": [
      "Distinguish explanation from argument",
      "Organise expository ideas logically",
      "State and support a clear argumentative position with reasons/examples"
    ],
    "prerequisites": [
      "paragraph structure",
      "main/supporting ideas",
      "basic outlining"
    ],
    "teaching": [
      "Expository writing explains or informs; argumentative writing takes a position and tries to justify it. Both require organisation and evidence, but their purposes differ.",
      "An expository paragraph can use definition, sequence, cause/effect, comparison or examples. Each paragraph should develop one controlling point.",
      "An argument needs a clear claim, relevant reasons and support. A reason is not automatically evidence; examples, facts or logical explanation strengthen it.",
      "A fair argument can acknowledge an opposing view and answer it respectfully rather than insulting people who disagree."
    ],
    "workedExamples": [
      "Expository topic “How flooding affects communities” can organise paragraphs by causes, effects and prevention.",
      "Argument claim “Schools should provide more library periods” needs reasons such as reading practice and research access, then supporting examples.",
      "“Everyone knows this” is assertion, not evidence."
    ],
    "misconceptions": [
      "turning exposition into a personal quarrel",
      "listing reasons without explaining them",
      "using irrelevant examples",
      "writing a conclusion that introduces a new main point"
    ],
    "guidedPractice": [
      "Classify six prompts as mainly expository/argumentative, create outlines, and develop one body paragraph for each type."
    ],
    "independentPractice": [
      "Write one 350-word expository and one 350-word argumentative composition; revise with purpose, organisation, support and language checklist."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% on a rubric covering purpose, structure, paragraph development, support, coherence and language accuracy.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-modals-requests",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Polite Requests and Modal Expressions",
    "objectives": [
      "Use modal verbs to make requests/offers/permission appropriately",
      "Adjust politeness to context",
      "Respond to requests naturally"
    ],
    "prerequisites": [
      "auxiliary verbs",
      "conversation register"
    ],
    "teaching": [
      "Modals such as can, could, may, might and would express degrees of ability, permission, possibility or politeness. Context determines which meaning is active.",
      "Requests can be softened by modal choice and phrasing: “Could you help me, please?” is generally more polite than an abrupt command.",
      "Formal settings often favour more respectful formulations; close peers may use simpler forms without being rude.",
      "A complete interaction includes a suitable response—acceptance, refusal with reason where appropriate, or clarification."
    ],
    "workedExamples": [
      "Could you open the window, please?—polite request.",
      "May I come in?—formal permission request.",
      "Would you mind repeating that?—polite request for repetition."
    ],
    "misconceptions": [
      "treating all modals as interchangeable",
      "using “may” to express every kind of ability",
      "adding “please” to an otherwise insulting command and calling it polite",
      "ignoring response/register"
    ],
    "guidedPractice": [
      "Transform six commands into context-appropriate requests and role-play requester/respondent."
    ],
    "independentPractice": [
      "Write and perform three short dialogues: peer, teacher, public office; vary modal/register appropriately."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% appropriate modal meaning, register and response across written and oral tasks.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-transitive-intransitive",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Transitive and Intransitive Verbs",
    "objectives": [
      "Identify whether a verb takes a direct object in a given use",
      "Distinguish transitive/intransitive uses of the same verb",
      "Construct accurate examples"
    ],
    "prerequisites": [
      "verbs",
      "objects in sentences"
    ],
    "teaching": [
      "A transitive verb has a direct object receiving the action: “Ada opened the door.” Ask “opened what?”",
      "An intransitive verb does not take a direct object: “The baby slept.” A following adverbial such as “on the bed” is not a direct object.",
      "Some verbs can be either depending on use: “The bell rang” (intransitive); “She rang the bell” (transitive).",
      "Classification belongs to the verb as used in the sentence, not permanently to the dictionary word."
    ],
    "workedExamples": [
      "They built a bridge—transitive; bridge is direct object.",
      "The crowd laughed loudly—intransitive; loudly is adverb, not object.",
      "The door opened—intransitive; Musa opened the door—transitive."
    ],
    "misconceptions": [
      "calling any noun after a verb its object",
      "assuming a verb is always transitive/intransitive",
      "mistaking prepositional complements for direct objects",
      "using “what?” mechanically without checking meaning"
    ],
    "guidedPractice": [
      "Classify twelve verb uses and underline direct objects where present."
    ],
    "independentPractice": [
      "Write ten paired sentences showing five verbs used transitively and intransitively; explain the difference."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct classification with accurate object identification.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-regular-irregular",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Regular and Irregular Verbs",
    "objectives": [
      "Form past/past participles of common regular verbs",
      "Use high-frequency irregular forms accurately",
      "Choose correct forms with auxiliaries"
    ],
    "prerequisites": [
      "verb tense basics",
      "auxiliary have/be"
    ],
    "teaching": [
      "Regular verbs generally form past and past participle with -ed, with spelling adjustments such as study→studied and stop→stopped.",
      "Irregular verbs do not follow one universal -ed pattern and must be learned in meaningful families and contexts: go/went/gone; write/wrote/written.",
      "After has/have/had use the past participle, not automatically the simple past: “has gone”, not “has went”.",
      "Practice in sentences is better than memorising isolated lists because tense and auxiliary determine the required form."
    ],
    "workedExamples": [
      "walk/walked/walked is regular.",
      "see/saw/seen: “I saw it yesterday”; “I have seen it before.”",
      "teach/taught/taught: “She has taught us.”"
    ],
    "misconceptions": [
      "adding -ed to every verb",
      "using simple past after have/has/had",
      "confusing participles such as wrote/written",
      "forgetting spelling changes in regular verbs"
    ],
    "guidedPractice": [
      "Complete a base/past/participle table and select forms in twelve context sentences."
    ],
    "independentPractice": [
      "Edit a paragraph containing fifteen verb-form errors and write ten original sentences using irregular participles."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 90% correct forms in contextual tense/auxiliary tasks.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-punctuation",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Punctuation Marks",
    "objectives": [
      "Use major punctuation marks to structure meaning",
      "Distinguish comma, colon and semicolon functions",
      "Punctuate direct speech and lists appropriately"
    ],
    "prerequisites": [
      "sentence boundaries",
      "capitalisation"
    ],
    "teaching": [
      "A full stop closes a complete declarative sentence; a question mark closes a direct question; an exclamation mark marks strong exclamation and should not be overused.",
      "Commas separate items and some introductory/nonessential elements, but a comma alone should not join two complete sentences in formal writing.",
      "A colon can introduce a list or explanation after a complete lead-in; a semicolon can link closely related complete clauses.",
      "Quotation marks and accompanying punctuation show direct speech; start a new paragraph when a different speaker takes a turn in extended dialogue."
    ],
    "workedExamples": [
      "Bring these items: a ruler, pencil and compass.",
      "The rain stopped; the match continued.",
      "“Where are you going?” Ada asked."
    ],
    "misconceptions": [
      "using commas instead of full stops between independent sentences",
      "putting a colon immediately after an incomplete verb phrase",
      "using apostrophes for ordinary plurals",
      "scattering exclamation marks for emphasis"
    ],
    "guidedPractice": [
      "Punctuate an unpunctuated 100-word passage and explain ten choices."
    ],
    "independentPractice": [
      "Edit two paragraphs for sentence boundaries, lists and dialogue; write five examples correctly using colon/semicolon/direct speech."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 90% correct punctuation in editing, with explanations showing meaning-based choices.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-concessives",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Conjunctions and Concessive Structures",
    "objectives": [
      "Use conjunctions to show logical relationships",
      "Use although/though with clauses",
      "Use despite/in spite of with noun phrases or gerund structures"
    ],
    "prerequisites": [
      "clauses",
      "conjunctions",
      "prepositions"
    ],
    "teaching": [
      "Conjunctions connect ideas and signal relationships such as addition, contrast, cause, condition or choice.",
      "Although/though introduce concessive clauses containing a subject and verb: “Although it rained, we played.”",
      "Despite/in spite of are followed by a noun phrase or -ing form, not a finite clause unless restructured: “Despite the rain…”; “In spite of being tired…”.",
      "Do not double-mark the same contrast with “although…but” in standard formal structures."
    ],
    "workedExamples": [
      "Although she was tired, she completed the work.",
      "Despite her tiredness, she completed the work.",
      "In spite of arriving late, he joined the meeting."
    ],
    "misconceptions": [
      "although…but together",
      "despite of",
      "despite + full finite clause without restructuring",
      "choosing a connector whose meaning contradicts the sentence"
    ],
    "guidedPractice": [
      "Transform eight although sentences into despite/in-spite-of forms and back."
    ],
    "independentPractice": [
      "Complete twelve connector-choice items and write six original sentences expressing contrast, cause and condition."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% grammatically correct and semantically appropriate conjunction/concessive use.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-narrative-descriptive",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Narrative and Descriptive Composition",
    "objectives": [
      "Plan coherent narratives",
      "Create controlled description around a dominant impression",
      "Revise organisation, detail and language"
    ],
    "prerequisites": [
      "paragraphing",
      "JSS1 composition basics"
    ],
    "teaching": [
      "Narrative writing develops events through a meaningful sequence, with characters, setting, conflict/change and resolution rather than a bare list of happenings.",
      "Description organises selected sensory and spatial details to create a dominant impression; it is not simply a catalogue of adjectives.",
      "Both forms benefit from planning: choose viewpoint, key details, paragraph progression and an ending that fits the purpose.",
      "Revision removes irrelevant events/details, repairs tense/viewpoint shifts and replaces vague expressions with precise nouns/verbs."
    ],
    "workedExamples": [
      "Narrative plan: missed bus→unexpected helper→problem solved→reflection; each event causes the next.",
      "Description of a workshop can move from entrance to workbench to sounds/smells, maintaining spatial order.",
      "“The machine coughed and rattled” is more precise/effective than “The machine was very noisy.”"
    ],
    "misconceptions": [
      "using “and then” for every event",
      "describing everything equally",
      "changing tense/person without purpose",
      "memorised unrelated openings/endings"
    ],
    "guidedPractice": [
      "Develop one narrative and one descriptive outline from prompts, then draft a strong body paragraph for each."
    ],
    "independentPractice": [
      "Write 400–500 words in each mode across two assignments and revise using a coherence/detail/language rubric."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% on purpose, organisation, development, coherence and language-control rubric.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-report-writing",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Report Writing",
    "objectives": [
      "State report purpose/audience",
      "Present facts in logical order",
      "Use objective, precise language and appropriate headings where required"
    ],
    "prerequisites": [
      "formal paragraphing",
      "past tense",
      "fact/opinion distinction"
    ],
    "teaching": [
      "A report records findings or events for a defined reader and purpose; this determines what information is relevant.",
      "Use factual, verifiable details—who, what, when, where, how, and outcomes—rather than unsupported judgement.",
      "Organisation may be chronological for an event report or sectional for an investigation; headings can improve retrieval in longer reports.",
      "Objective tone does not mean vague language. Give concrete quantities, observations and sources where available."
    ],
    "workedExamples": [
      "“The sanitation exercise began at 8:10 a.m. with 42 pupils present” is more report-like than “Everybody came early and it was wonderful.”",
      "An incident report separates observed events from later recommendations.",
      "A findings section can group observations by location rather than narrating every movement of the writer."
    ],
    "misconceptions": [
      "turning a report into a story with invented dialogue",
      "mixing opinion into factual findings",
      "omitting date/place/purpose",
      "using emotional praise/blame instead of evidence"
    ],
    "guidedPractice": [
      "Convert a narrative account into a concise factual school-event report with heading and ordered details."
    ],
    "independentPractice": [
      "Write a 350–450 word report on a simulated club event/investigation, including purpose, findings and suitable conclusion/recommendation."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% on relevance, factual accuracy, organisation, register and language.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-story-writing",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Story Writing",
    "objectives": [
      "Develop a plot from a prompt",
      "Use character, setting, conflict and resolution coherently",
      "Use dialogue/action selectively and revise for effect"
    ],
    "prerequisites": [
      "narrative composition",
      "paragraphing",
      "direct speech punctuation"
    ],
    "teaching": [
      "A story needs change: something unsettles the starting situation, characters respond, consequences follow and the ending resolves or meaningfully reframes the conflict.",
      "Plot events should be causally connected. Remove episodes that could disappear without affecting the central conflict.",
      "Character is shown through choices, speech, action and selective description. Dialogue works best when it reveals motive, tension or necessary information.",
      "Control viewpoint and tense. Revise for pace: expand important scenes, compress routine transitions and avoid explaining every emotion directly."
    ],
    "workedExamples": [
      "Prompt “The message arrived too late” can centre on one delayed decision rather than ten unrelated adventures.",
      "“Bisi folded the note twice before answering” can imply hesitation without writing “Bisi was very hesitant.”",
      "A final consequence that grows from an earlier decision creates stronger resolution than “I woke up and it was a dream.”"
    ],
    "misconceptions": [
      "plot as random sequence",
      "too many characters",
      "dialogue with no function",
      "cliché endings unrelated to the conflict"
    ],
    "guidedPractice": [
      "Create a scene-by-scene plot map and draft the turning-point scene with dialogue/action."
    ],
    "independentPractice": [
      "Write a 500-word story from one of three prompts; revise specifically for causal plot, viewpoint, dialogue and ending."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Coherent original story scoring at least 80% on plot, characterisation, setting, language and revision evidence.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-personification-onomatopoeia",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Figures of Speech: Personification and Onomatopoeia",
    "objectives": [
      "Identify personification and onomatopoeia",
      "Explain their contextual effect",
      "Create appropriate original examples"
    ],
    "prerequisites": [
      "literal/figurative meaning",
      "basic imagery"
    ],
    "teaching": [
      "Personification gives human actions, feelings or qualities to non-human things; the important step is explaining what the human quality helps the reader imagine.",
      "Onomatopoeia uses words whose sound evokes or imitates a sound, such as buzz, clang or hiss; effect depends on context, rhythm and sound pattern.",
      "A label alone is incomplete literary analysis. Connect the device to mood, movement, emphasis or imagery in the passage.",
      "Not every verb applied to nature is automatically personification; check whether the expression genuinely attributes human behaviour/quality."
    ],
    "workedExamples": [
      "“The angry storm pounded the roof” personifies the storm and intensifies threat.",
      "“The bees buzzed around the hive” uses buzz as onomatopoeic sound imagery.",
      "“The leaves danced in the wind” personifies leaves to suggest lively movement."
    ],
    "misconceptions": [
      "identifying any animal action as personification",
      "calling rhyme onomatopoeia",
      "naming the device without explaining effect",
      "forcing literal sound words into every poem"
    ],
    "guidedPractice": [
      "Identify and explain the effect of devices in eight short lines, including distractors."
    ],
    "independentPractice": [
      "Annotate a short poem/prose paragraph and write six original examples with one-sentence effect explanations."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% identification accuracy plus defensible contextual effect explanations.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  }
];
export function getRevised2025SupplementalLesson(id:string){return revised2025SupplementalLessons.find(x=>x.topicId===id)}
