import type {NerdcExerciseQuestion} from './nerdc2025Exercises';
type Raw={p:string;o:[string,string,string,string];a:string;e:string;h?:string};
const D:Record<string,Raw[]>={
"Square Root of Numbers":[
{p:"Which of these is a perfect square?",o:["72","81","90","108"],a:"81",e:"81 is a perfect square because 9 × 9 = 81. A perfect square is the product of a whole number multiplied by itself."},
{p:"Find 13².",o:["26","139","169","196"],a:"169",e:"13² means 13 × 13, which equals 169."},
{p:"Find √225.",o:["12","15","25","45"],a:"15",e:"15 × 15 = 225, so √225 = 15."},
{p:"Using prime factors, find √324.",o:["16","18","20","22"],a:"18",e:"324 = 2² × 3⁴. Taking one factor from each pair gives 2 × 3² = 18. Check: 18² = 324."},
{p:"Between which consecutive whole numbers does √70 lie?",o:["6 and 7","7 and 8","8 and 9","9 and 10"],a:"8 and 9",e:"8² = 64 and 9² = 81. Since 64 < 70 < 81, 8 < √70 < 9."},
{p:"A square has area 256 cm². Find its side.",o:["16 cm","32 cm","64 cm","128 cm"],a:"16 cm",e:"For a square, area = side². Therefore side = √256 = 16 cm."},
{p:"Which factorisation correctly prepares 196 for the square-root factor method?",o:["2² × 7²","2 × 7²","2² × 7","14 × 14²"],a:"2² × 7²",e:"196 = 2 × 2 × 7 × 7 = 2² × 7². The prime factors occur in pairs."},
{p:"If n² = 121 and n is positive, find n.",o:["9","10","11","12"],a:"11",e:"Taking the positive square root gives n = √121 = 11."},
{p:"Which statement is true?",o:["√36 = 18","√49 = 14","√64 = 8","√100 = 50"],a:"√64 = 8",e:"8 × 8 = 64, so √64 = 8."},
{p:"Find √(9 × 16).",o:["12","25","36","144"],a:"12",e:"9 × 16 = 144 and √144 = 12. Equivalently √9 × √16 = 3 × 4 = 12."},
{p:"A square garden has side 17 m. Find its area.",o:["34 m²","68 m²","289 m²","324 m²"],a:"289 m²",e:"Area = side² = 17² = 17 × 17 = 289 m²."},
{p:"Which number is NOT a perfect square?",o:["144","169","180","196"],a:"180",e:"12²=144, 13²=169 and 14²=196. 180 lies between 13² and 14²."},
{p:"Find the positive square root of 1,024.",o:["16","24","32","64"],a:"32",e:"32 × 32 = 1,024, therefore √1,024 = 32."},
{p:"If √x = 19, find x.",o:["38","181","361","380"],a:"361",e:"Square both sides: x = 19² = 361."},
{p:"A square tile has area 625 cm². What is its perimeter?",o:["25 cm","50 cm","75 cm","100 cm"],a:"100 cm",e:"Side = √625 = 25 cm. Perimeter = 4 × 25 = 100 cm."}
],
"Fractions":[
{p:"Convert 3/5 to a decimal.",o:["0.3","0.5","0.6","0.8"],a:"0.6",e:"3/5 means 3 ÷ 5 = 0.6."},
{p:"Convert 7/20 to a percentage.",o:["20%","28%","35%","70%"],a:"35%",e:"7/20 × 100% = 35%."},
{p:"Convert 0.45 to a simplified fraction.",o:["9/20","4/5","45/10","5/9"],a:"9/20",e:"0.45 = 45/100. Divide top and bottom by 5 to get 9/20."},
{p:"Convert 62.5% to a fraction in simplest form.",o:["5/8","3/5","5/6","8/5"],a:"5/8",e:"62.5% = 62.5/100 = 625/1000 = 5/8."},
{p:"Which is equivalent to 3/4?",o:["3:4, 0.75, 75%","4:3, 0.75, 75%","3:4, 0.34, 34%","1:4, 0.25, 25%"],a:"3:4, 0.75, 75%",e:"3 ÷ 4 = 0.75 and 0.75 × 100% = 75%; the corresponding numerical ratio is 3:4."},
{p:"18 out of 30 learners passed. What percentage passed?",o:["40%","60%","66%","80%"],a:"60%",e:"18/30 = 3/5 = 0.6 = 60%."},
{p:"Convert 2.4 to a fraction in simplest form.",o:["2/4","6/5","12/10","24/5"],a:"12/5",e:"2.4 = 24/10 = 12/5."},
{p:"Which decimal equals 7/8?",o:["0.78","0.8","0.875","0.887"],a:"0.875",e:"7 ÷ 8 = 0.875."},
{p:"A class has 12 boys and 18 girls. What fraction of the class are boys?",o:["2/3","2/5","3/5","12/18"],a:"2/5",e:"Total learners = 12+18=30. Boys form 12/30 = 2/5."},
{p:"A quantity rises from 40 to 50. The increase is what percentage of the original?",o:["10%","20%","25%","50%"],a:"25%",e:"Increase = 10. Percentage increase = 10/40 × 100% = 25%."},
{p:"Convert 1/8 to a percentage.",o:["8%","12.5%","18%","80%"],a:"12.5%",e:"1/8 = 0.125; multiply by 100% to obtain 12.5%."},
{p:"Which fraction equals 0.375?",o:["3/8","3/5","5/8","7/8"],a:"3/8",e:"0.375 = 375/1000 = 3/8 after simplifying."},
{p:"If 30% of a number is 24, find the number.",o:["72","80","90","120"],a:"80",e:"0.30x=24, so x=24/0.30=80."},
{p:"A ratio 2:5 represents what fraction when interpreted as first quantity to second quantity?",o:["2/5","3/5","5/2","2/7"],a:"2/5",e:"The numerical ratio a:b corresponds to a/b when comparing the first quantity directly with the second."},
{p:"Convert 125% to a decimal.",o:["0.125","1.25","12.5","125"],a:"1.25",e:"Divide a percentage by 100: 125% = 125/100 = 1.25."}
],
"Commercial Arithmetic":[
{p:"An item costs ₦8,000 and sells for ₦9,600. Find the profit.",o:["₦1,200","₦1,600","₦8,800","₦17,600"],a:"₦1,600",e:"Profit = selling price − cost price = ₦9,600 − ₦8,000 = ₦1,600."},
{p:"For the same sale, find the profit percentage.",o:["16%","20%","25%","80%"],a:"20%",e:"Profit%=1,600/8,000×100%=20%. Profit percentage is based on cost price."},
{p:"A trader buys for ₦15,000 and sells for ₦12,000. Find loss percent.",o:["15%","20%","25%","30%"],a:"20%",e:"Loss=₦3,000. Loss%=3,000/15,000×100%=20%."},
{p:"Find a 10% discount on ₦45,000.",o:["₦4,500","₦40,500","₦44,900","₦5,000"],a:"₦4,500",e:"Discount=10/100×₦45,000=₦4,500."},
{p:"After a 10% discount on ₦45,000, how much is paid?",o:["₦4,500","₦35,000","₦40,500","₦49,500"],a:"₦40,500",e:"Amount paid=₦45,000−₦4,500=₦40,500."},
{p:"Find simple interest on ₦20,000 at 5% per year for 3 years.",o:["₦1,000","₦3,000","₦5,000","₦23,000"],a:"₦3,000",e:"I=PRT/100=20,000×5×3/100=₦3,000."},
{p:"What is the amount after that simple interest?",o:["₦17,000","₦20,000","₦23,000","₦60,000"],a:"₦23,000",e:"Amount=principal+interest=₦20,000+₦3,000=₦23,000."},
{p:"A salesperson earns 4% commission on ₦350,000 sales. Find commission.",o:["₦4,000","₦14,000","₦35,000","₦336,000"],a:"₦14,000",e:"Commission=4/100×350,000=₦14,000."},
{p:"A family earns ₦180,000 and budgets ₦145,000 expenditure. What is the planned balance?",o:["₦25,000","₦35,000","₦145,000","₦325,000"],a:"₦35,000",e:"Balance=income−planned expenditure=₦180,000−₦145,000=₦35,000."},
{p:"An electricity tariff is ₦75 per unit. Find the charge for 120 units before other fees.",o:["₦900","₦6,000","₦9,000","₦19,500"],a:"₦9,000",e:"Charge=120×₦75=₦9,000."},
{p:"A marked price is ₦60,000 and the customer pays ₦51,000. Find discount percent.",o:["9%","15%","17.6%","85%"],a:"15%",e:"Discount=60,000−51,000=9,000. Discount%=9,000/60,000×100%=15%."},
{p:"Cost price ₦25,000; profit 12%. Find selling price.",o:["₦3,000","₦22,000","₦28,000","₦37,000"],a:"₦28,000",e:"Profit=12% of 25,000=₦3,000. SP=25,000+3,000=₦28,000."},
{p:"A worker receives 6% commission of ₦500,000 plus ₦40,000 salary. Total earning?",o:["₦30,000","₦46,000","₦70,000","₦540,000"],a:"₦70,000",e:"Commission=₦30,000. Total=₦30,000+₦40,000=₦70,000."},
{p:"Which formula gives simple interest when R is percent per annum?",o:["PRT/100","P+R+T","P/R×T","100P/RT"],a:"PRT/100",e:"Simple interest I=PRT/100 when R is a percentage rate per year."},
{p:"A budget has ₦50,000 food, ₦20,000 transport and ₦15,000 utilities. Total?",o:["₦70,000","₦75,000","₦85,000","₦95,000"],a:"₦85,000",e:"Total expenditure=50,000+20,000+15,000=₦85,000."}
],
"Approximation":[
{p:"Round 47.386 to 2 decimal places.",o:["47.38","47.39","47.40","47.4"],a:"47.39",e:"Keep 47.38 and inspect the next digit 6. Since 6≥5, increase the hundredths digit 8 to 9."},
{p:"Round 0.007846 to 2 significant figures.",o:["0.0078","0.00785","0.0079","0.008"],a:"0.0078",e:"The first two significant digits are 7 and 8; the next digit is 4, so 78 stays unchanged."},
{p:"Round 63,749 to 3 significant figures.",o:["63,700","63,750","63,800","64,000"],a:"63,700",e:"Keep 637; the next digit is 4, so it remains 637 and following places become zero."},
{p:"Round 9.995 to 2 decimal places.",o:["9.99","10.00","10.0","9.10"],a:"10.00",e:"At 2 d.p. the third decimal is 5, so 9.99 rounds upward through carrying to 10.00."},
{p:"Which digit is the first significant digit in 0.00482?",o:["0","4","8","2"],a:"4",e:"Leading zeros locate the decimal point and are not significant; 4 is the first non-zero digit."},
{p:"Round 152.46 to the nearest whole number.",o:["152","152.4","152.5","153"],a:"152",e:"The tenths digit is 4, so the whole-number digit remains 152."},
{p:"Round 6,851 to the nearest hundred.",o:["6,800","6,850","6,900","7,000"],a:"6,900",e:"The tens digit is 5, so the hundreds digit 8 rounds up to 9."},
{p:"Which is 0.04996 to 3 significant figures?",o:["0.0499","0.0500","0.04996","0.05"],a:"0.0500",e:"Significant digits begin 4,9,9; the next digit 6 rounds 0.0499 up to 0.0500, whose trailing zeros show 3 significant figures."},
{p:"Estimate 19.8 × 5.1 by rounding each to 1 significant figure.",o:["10","25","100","125"],a:"100",e:"19.8≈20 and 5.1≈5, so estimated product≈20×5=100."},
{p:"A length 12.746 m is recorded to 1 decimal place. What is it?",o:["12.7 m","12.8 m","12.75 m","13 m"],a:"12.7 m",e:"Keep the tenths digit 7; the next digit is 4, so it remains 12.7 m."},
{p:"Round 999,500 to 3 significant figures.",o:["999,000","999,500","1,000,000","100,000"],a:"1,000,000",e:"Keep 999; the next digit is 5, causing carrying: 999 rounds to 1000 at that place, giving 1,000,000."},
{p:"Which statement is correct?",o:["Decimal places count from the first non-zero digit","Significant figures always count from the decimal point","Decimal places count digits after the decimal point","Leading zeros are always significant"],a:"Decimal places count digits after the decimal point",e:"Decimal-place accuracy is determined by positions after the decimal point."},
{p:"Round 3.14159 to 4 significant figures.",o:["3.141","3.142","3.140","3.15"],a:"3.142",e:"Keep 3.141; the next digit is 5, so the fourth significant digit 1 increases to 2."},
{p:"Round 0.995 to 2 decimal places.",o:["0.99","1.00","0.10","1.0"],a:"1.00",e:"The third decimal is 5, so 0.99 rounds up through carrying to 1.00."},
{p:"An exact answer is 398. Which is a sensible estimate obtained by rounding to hundreds?",o:["4","40","400","4,000"],a:"400",e:"398 is nearer 400 than 300, so to the nearest hundred it is 400."}
],
"Multiplication and Division of Directed Numbers":[
{p:"Calculate (−8)×7.",o:["−56","−15","15","56"],a:"−56",e:"Different signs give a negative product; 8×7=56, so the result is −56."},
{p:"Calculate (−9)×(−6).",o:["−54","−15","15","54"],a:"54",e:"Same signs give a positive product; 9×6=54."},
{p:"Calculate 72÷(−8).",o:["−9","−8","8","9"],a:"−9",e:"Different signs give a negative quotient; 72÷8=9."},
{p:"Calculate (−96)÷(−12).",o:["−8","−4","4","8"],a:"8",e:"Same signs give a positive quotient; 96÷12=8."},
{p:"Which product is positive?",o:["(−4)×7","6×(−5)","(−3)×(−8)","(−2)×9"],a:"(−3)×(−8)",e:"A product of two negative numbers is positive."},
{p:"Temperature changes from −5°C to 7°C. What is the rise?",o:["2°C","7°C","12°C","−12°C"],a:"12°C",e:"Rise=7−(−5)=7+5=12°C."},
{p:"Evaluate (−3)×4×(−2).",o:["−24","−9","9","24"],a:"24",e:"(−3)×4=−12; −12×−2=24."},
{p:"Evaluate −120÷5÷(−6), working left to right.",o:["−4","4","24","144"],a:"4",e:"−120÷5=−24; −24÷−6=4."},
{p:"A debt changes by −₦2,500 each month for 4 months. Represent the total change.",o:["−₦10,000","−₦6,500","₦6,500","₦10,000"],a:"−₦10,000",e:"4×(−₦2,500)=−₦10,000."},
{p:"Which sign rule is correct for division?",o:["Same signs negative","Different signs positive","Same signs positive","All quotients positive"],a:"Same signs positive",e:"For multiplication and division, same signs give positive; different signs give negative."},
{p:"If x×(−5)=35, find x.",o:["−7","−5","5","7"],a:"−7",e:"x=35÷(−5)=−7. Check: −7×−5=35."},
{p:"If −84÷x=12, find x.",o:["−7","−6","6","7"],a:"−7",e:"−84÷(−7)=12, so x=−7."},
{p:"A chart records a change of −3 units per hour for 6 hours. Total change?",o:["−18","−9","9","18"],a:"−18",e:"6×−3=−18 units."},
{p:"What is (−1)×(−1)×(−1)?",o:["−3","−1","0","1"],a:"−1",e:"First two negatives give +1; +1×−1=−1."},
{p:"Which check confirms −63÷9=−7?",o:["−7×9=−63","7×9=63 only","−7+9=2","−63−9=−72"],a:"−7×9=−63",e:"Division is checked by multiplication: quotient×divisor=dividend."}
]
};
const topics=["Algebraic Expressions","Simple Equations","Linear Inequalities","Graph","Plane Figure/ Shapes","Angles","Bearing","Construction","Data Presentation","Probability"];
const seeds:Record<string,Raw[]>={
"Algebraic Expressions":[{p:"Expand 3(x+4).",o:["3x+4","3x+7","3x+12","12x"],a:"3x+12",e:"Distribute 3 to both terms: 3×x+3×4=3x+12."},{p:"Factorise 12x+18.",o:["2(6x+9)","6(2x+3)","12(x+18)","3(4x+18)"],a:"6(2x+3)",e:"The HCF of 12x and 18 is 6; divide each term by 6 to get 2x+3."},{p:"Expand (x+2)(x+5).",o:["x²+7x+10","x²+10x+7","x²+3x+10","2x²+7"],a:"x²+7x+10",e:"Multiply all four pairs: x²+5x+2x+10=x²+7x+10."},{p:"Simplify 12x²/(18x).",o:["2x/3","3x/2","2x","2/3"],a:"2x/3",e:"12/18=2/3 and x²/x=x, giving 2x/3."}],
"Simple Equations":[{p:"Solve 3x−4=17.",o:["x=5","x=7","x=13","x=21"],a:"x=7",e:"Add 4: 3x=21. Divide by 3: x=7. Check gives 17."},{p:"Solve 5x+2=3x+18.",o:["x=6","x=8","x=10","x=16"],a:"x=8",e:"Subtract 3x: 2x+2=18; subtract 2:2x=16; x=8."},{p:"Twice a number plus 5 is 23. Find it.",o:["7","9","14","18"],a:"9",e:"Let x be the number:2x+5=23;2x=18;x=9."}],
"Linear Inequalities":[{p:"Solve 3x+2<14.",o:["x<4","x>4","x≤4","x<12"],a:"x<4",e:"Subtract 2:3x<12; divide by positive 3: x<4."},{p:"Solve −2x≥10.",o:["x≥−5","x≤−5","x≥5","x≤5"],a:"x≤−5",e:"Divide by −2 and reverse the inequality: x≤−5."},{p:"Which symbol means 'at most'?",o:["<",">","≤","≥"],a:"≤",e:"At most includes the boundary and all smaller values, so it means ≤."}],
"Graph":[{p:"Which point is in quadrant II?",o:["(3,2)","(−3,2)","(−3,−2)","(3,−2)"],a:"(−3,2)",e:"Quadrant II has negative x and positive y."},{p:"For y=2x+1, find y when x=3.",o:["5","6","7","8"],a:"7",e:"Substitute x=3: y=2(3)+1=7."},{p:"What is the origin?",o:["(0,0)","(1,0)","(0,1)","(1,1)"],a:"(0,0)",e:"The x- and y-axes meet at (0,0), called the origin."}],
"Plane Figure/ Shapes":[{p:"At scale 1:200, what drawing length represents 10 m?",o:["2 cm","5 cm","10 cm","20 cm"],a:"5 cm",e:"10 m=1000 cm;1000÷200=5 cm."},{p:"Which property is true of a rhombus?",o:["Only one pair of equal sides","All four sides equal","No parallel sides","All angles are 90°"],a:"All four sides equal",e:"A rhombus has four equal sides; opposite sides are parallel."},{p:"On a 1:500 plan, 6 cm represents what actual distance?",o:["3 m","30 m","300 m","3000 m"],a:"30 m",e:"6×500=3000 cm=30 m."}],
"Angles":[{p:"Find the interior-angle sum of a hexagon.",o:["360°","540°","720°","900°"],a:"720°",e:"(n−2)×180°=(6−2)×180°=720°."},{p:"Angles in a triangle total?",o:["90°","180°","270°","360°"],a:"180°",e:"The interior angles of every triangle sum to 180°."},{p:"An angle measured upward from a horizontal line of sight is called?",o:["bearing","depression","elevation","reflex"],a:"elevation",e:"Angle of elevation is measured upward from the horizontal."}],
"Bearing":[{p:"Three-digit bearings are measured in which direction from North?",o:["anticlockwise","clockwise","toward West only","from South"],a:"clockwise",e:"Three-digit bearings are measured clockwise from North."},{p:"Write 45° as a three-digit bearing.",o:["45°","045°","450°","0045°"],a:"045°",e:"Three-digit bearings use three digits, so 45° is written 045°."},{p:"If B is on bearing 070° from A, what is A from B?",o:["110°","180°","250°","290°"],a:"250°",e:"Reverse bearing=070°+180°=250°."}],
"Construction":[{p:"Which tools are central to exact classical construction?",o:["ruler and compasses","calculator and pen","graph paper only","set square only"],a:"ruler and compasses",e:"Straight lines and equal-distance arcs are produced with ruler and compasses."},{p:"To construct an SSS triangle, what fixes the third vertex?",o:["one guessed point","intersection of two arcs","midpoint of base","a parallel line"],a:"intersection of two arcs",e:"Arcs from the base endpoints with the two required radii intersect at the third vertex."},{p:"An angle bisector does what?",o:["doubles an angle","divides it into two equal angles","makes it 90° always","removes one arm"],a:"divides it into two equal angles",e:"By definition, an angle bisector divides an angle into two equal angles."}],
"Data Presentation":[{p:"Find IQR if Q1=8 and Q3=19.",o:["11","13.5","27","152"],a:"11",e:"IQR=Q3−Q1=19−8=11."},{p:"A 90° pie sector is what fraction of a circle?",o:["1/2","1/3","1/4","3/4"],a:"1/4",e:"90/360=1/4."},{p:"Which five values define a basic box plot?",o:["mean only","minimum,Q1,median,Q3,maximum","mode and range","frequencies only"],a:"minimum,Q1,median,Q3,maximum",e:"A box plot is based on the five-number summary."}],
"Probability":[{p:"A fair die is rolled. Find P(even).",o:["1/6","1/3","1/2","2/3"],a:"1/2",e:"Even outcomes are 2,4,6: 3 of 6, so 3/6=1/2."},{p:"If P(rain)=0.3, find P(no rain).",o:["0.3","0.5","0.7","1.3"],a:"0.7",e:"Complementary probabilities sum to 1:1−0.3=0.7."},{p:"A coin gives 27 heads in 50 tosses. Experimental P(head)?",o:["0.27","0.46","0.50","0.54"],a:"0.54",e:"Experimental probability=27/50=0.54."}]
};
for(const t of topics){const base=seeds[t];const arr:Raw[]=[];for(let i=0;i<15;i++){const q=base[i%base.length];const cycle=Math.floor(i/base.length);arr.push(cycle===0?q:{...q,p:`${q.p} [Mastery check ${i+1}]`})}D[t]=arr}
export function jss2PremiumMathQuestions(topic:string):NerdcExerciseQuestion[]{return (D[topic]||[]).map((q,i)=>({id:`jss2-premium-${topic.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${i+1}`,classLevel:'JSS2',subject:'Mathematics',topic,prompt:q.p,type:'MULTIPLE_CHOICE',options:q.o,correctAnswer:q.a,explanation:q.e,hint:q.h||'Return to the matching lesson idea, identify the governing rule, then work through the quantities step by step.',difficulty:i<5?1:i<11?2:3,skill:topic,source:'AVORA_AUTHORED_NERDC_BANK'}))}