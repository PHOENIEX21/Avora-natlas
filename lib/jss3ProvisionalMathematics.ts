import type {TutorPlan} from './tutorCurriculum';

export const JSS3_PROVISIONAL_SOURCE = {
  key: 'nerdc-jss3-provisional-prior-cycle',
  status: 'OFFICIAL_NERDC_PRIOR_CYCLE_VERIFIED',
  authority: 'Official NERDC JSS1–JSS3 Mathematics curriculum, JSS3 prior-cycle cohort',
  enrichment: ['New General Mathematics JSS3', 'BECE-level worked application'],
  warning: 'Verified against the official NERDC JSS1–JSS3 Mathematics PDF. This is the preserved JSS3 prior-cycle authority, not the September 2025 revised JSS1/JSS2 cohort.'
} as const;

export const jss3WholeNumbersTopic =
  'Whole Numbers (binary operations and base conversion, quantitative reasoning, computer/calculator use, word problems → numerical expressions; brackets/fractions; direct/inverse proportion; compound interest)';

export const jss3WholeNumbersPlan:TutorPlan={
  goal:'Master the JSS3 NERDC Whole Numbers outcomes through binary operations and base conversion, quantitative reasoning, calculator/computer use, and translation of word problems into numerical expressions.',
  why:'This is a BECE-stage number-reasoning unit. The learner must connect place value, binary operations and language-to-mathematics translation rather than memorise isolated conversion rules.',
  outcomes:[
    'Revise and apply the four binary operations accurately.',
    'Convert binary numbers to base ten and other bases, and convert other bases to binary.',
    'Solve quantitative-reasoning problems involving binary numbers.',
    'Use a calculator or computer appropriately for simple calculations and check whether results are reasonable.',
    'Translate verbal and word-problem statements into correct numerical expressions and evaluate them in the correct order.'
  ],
  examFocus:[
    'Show place-value or repeated-division working in base-conversion questions.',
    'Check binary arithmetic by converting to base ten when time permits.',
    'Translate the words before calculating in word problems.',
    'Use brackets to preserve the intended meaning of a verbal statement.',
    'Expect multi-step BECE questions that combine conversion, operations and reasoning.'
  ],
  units:[
    {
      title:'Number bases and binary place value',
      terms:[['base','the number of different digits used by a positional number system'],['binary','the base-two number system using only 0 and 1'],['place value','the value a digit has because of its position'],['decimal','the base-ten number system']],
      prerequisites:['powers such as 2⁰, 2¹, 2² and 2³','ordinary place value','four operations with whole numbers'],
      outcomes:['explain why binary uses only 0 and 1','write binary place values as powers of 2','find the decimal value of a binary numeral'],
      explain:'Our ordinary decimal system is base ten, so its place values are powers of 10. Binary is base two, so its place values are powers of 2: …, 32, 16, 8, 4, 2, 1. Starting from the right, the first place is 2⁰ = 1, not 2¹. To convert binary to decimal, multiply each digit by its power-of-two place value and add. For example, 10101₂ = 1×2⁴ + 0×2³ + 1×2² + 0×2¹ + 1×2⁰ = 16 + 4 + 1 = 21₁₀.',
      example:'110101₂ = 1×32 + 1×16 + 0×8 + 1×4 + 0×2 + 1×1 = 53₁₀.',
      check:'Convert 101101₂ to base ten and show every power-of-two place value.',
      commonMistakes:['reading a binary numeral as an ordinary decimal number','starting the rightmost place at 2¹ instead of 2⁰','using the digit 2 inside a binary numeral']
    },
    {
      title:'Converting base ten to binary',
      terms:[['remainder','what is left after division when the dividend is not exactly divisible'],['repeated division','dividing successively by the target base and recording remainders']],
      outcomes:['convert decimal whole numbers to binary using repeated division by 2','check the conversion using powers of 2'],
      explain:'To convert a base-ten whole number to binary, divide repeatedly by 2. Record every remainder. Continue until the quotient becomes 0, then read the remainders from bottom to top. For 45: 45÷2=22 r1; 22÷2=11 r0; 11÷2=5 r1; 5÷2=2 r1; 2÷2=1 r0; 1÷2=0 r1. Reading upward gives 101101₂. Always check: 32+8+4+1=45.',
      example:'26₁₀ → repeated division by 2 gives remainders 0,1,0,1,1 from top to bottom; reading upward gives 11010₂. Check: 16+8+2=26.',
      check:'Convert 38₁₀ to binary by repeated division and verify by place value.',
      commonMistakes:['reading remainders from top to bottom','stopping repeated division before the quotient reaches zero','failing to check the answer']
    },
    {
      title:'Binary to other bases and other bases to binary',
      terms:[['intermediate base','a convenient base used between the starting and target bases'],['base-five numeral','a numeral using only 0,1,2,3,4']],
      outcomes:['convert binary to another base','convert a numeral in another base to binary','validate digits against the stated base'],
      explain:'A dependable JSS3 method is to pass through base ten. For binary → base n, first expand the binary numeral using powers of 2, then repeatedly divide the decimal result by n. For base n → binary, first expand using powers of n, then convert the decimal result to binary by repeated division by 2. A numeral in base n may only use digits from 0 to n−1.',
      example:'110111₂ = 55₁₀. Then 55÷5=11 r0, 11÷5=2 r1, 2÷5=0 r2, so 110111₂ = 210₅. Conversely 132₅ = 1×25+3×5+2 = 42₁₀ = 101010₂.',
      check:'Convert 101101₂ to base 5, then convert your base-5 answer back to binary.',
      commonMistakes:['using an illegal digit for the target base','forgetting that each base has its own place values','mixing the repeated-division remainders']
    },
    {
      title:'Addition and subtraction in base two',
      terms:[['carry','a value transferred to the next place during addition'],['borrow','regrouping from the next place during subtraction']],
      outcomes:['add binary numerals with carrying','subtract binary numerals with borrowing','check results in decimal'],
      explain:'Binary addition uses 0+0=0, 0+1=1, 1+0=1, 1+1=10₂, and 1+1+1=11₂. In subtraction, 10₂−1₂=1₂ because 10₂ represents decimal 2. Align place values exactly as in decimal arithmetic. When learning, verify the final answer in base ten; later you should calculate directly in binary.',
      example:'1011₂ + 1101₂ = 11000₂. Check: 11+13=24 and 11000₂=24. Also 10110₂−00111₂=1111₂; check: 22−7=15.',
      check:'Calculate 10101₂−1101₂ directly, then check by converting both numbers and the answer to base ten.',
      commonMistakes:['writing 2 as a binary digit when 1+1 occurs','misaligning columns','borrowing as if each column were worth ten rather than twice the previous binary place']
    },
    {
      title:'Multiplication and division in base two',
      terms:[['partial product','one intermediate row produced during multiplication'],['binary long division','division carried out using base-two place values']],
      outcomes:['multiply binary numerals','divide binary numerals','verify binary products and quotients in decimal'],
      explain:'Binary multiplication is based on 0×0=0, 0×1=0, 1×0=0 and 1×1=1. Shift each new partial product one binary place to the left, just as decimal long multiplication shifts by place value. Binary long division follows the same structural idea as ordinary long division, but all quantities remain in base two.',
      example:'101₂×11₂ = 1111₂ because 5×3=15. Also 1100₂÷10₂ = 110₂ because 12÷2=6.',
      check:'Calculate 110₂×101₂ and verify the answer in decimal.',
      commonMistakes:['forgetting the place-value shift in the second partial product','converting halfway and then mixing decimal digits into binary working','accepting a quotient without multiplying back to check']
    },
    {
      title:'Quantitative reasoning with binary numbers',
      terms:[['quantitative reasoning','using numerical relationships and operations to solve a problem'],['multi-step expression','an expression requiring more than one operation']],
      outcomes:['solve multi-step binary expressions','select the correct operation sequence','use decimal checking without replacing binary understanding'],
      explain:'BECE-level mastery requires more than one-step conversion. A question may combine binary addition, subtraction, multiplication or division. Work inside brackets first and preserve the base throughout. Decimal conversion is an excellent checking tool, but the learner should increasingly be able to reason directly in binary.',
      example:'110₂×(1011₂+1001₂−101₂): bracket gives 10100₂−101₂=1111₂; 110₂×1111₂ = 1011010₂. Decimal check: 6×(11+9−5)=6×15=90, and 90₁₀=1011010₂.',
      check:'Evaluate 101₂×(111₂+11₂) and give the answer in base two.',
      commonMistakes:['ignoring brackets','changing base in the middle of an expression without marking it','performing the right arithmetic on the wrong translated expression']
    },
    {
      title:'Translating words into numerical expressions',
      terms:[['numerical expression','numbers and operation symbols representing a quantity without an equality statement'],['sum','result of addition'],['difference','result of subtraction'],['product','result of multiplication'],['quotient','result of division']],
      outcomes:['translate verbal statements accurately','use brackets to preserve grouping','distinguish operation words by meaning rather than keyword guessing'],
      explain:'Word problems test mathematical language. “Sum” suggests addition, “product” multiplication, “quotient” division and “difference” subtraction, but word order and grouping still matter. “Half of the sum of 12 and 8” is (12+8)÷2, not 12+8÷2. “Four less than 10” is 10−4. Translate the complete relationship before calculating.',
      example:'“The difference between 7 and the sum of half of 8 and 3” becomes 7−(8÷2+3)=7−7=0. The brackets are essential because the phrase “the sum of…” forms one quantity.',
      check:'Translate and evaluate: three times the difference between 12 and 5.',
      commonMistakes:['reversing subtraction phrases such as “less than”','calculating before the full statement has been translated','omitting brackets around a grouped phrase']
    },
    {
      title:'Order of operations and technology-assisted checking',
      terms:[['BODMAS','brackets, orders, division/multiplication, addition/subtraction'],['estimate','a reasonable approximate value used to judge an answer'],['input error','entering a different expression from the one intended']],
      outcomes:['evaluate multi-operation expressions in the agreed order','use a calculator/computer for simple calculations','estimate and check whether a technology result is reasonable'],
      explain:'After translating a problem, use the agreed order of operations. Brackets come first; multiplication and division share priority and are handled left to right; addition and subtraction likewise. A calculator or computer is useful only after the mathematical expression is correct. Estimate or mentally check the result so an input mistake is not accepted as truth.',
      example:'18−2(5+1)=18−12=6. For (375+225)÷12, the sum is 600 and 600÷12=50; a calculator display of 500 would signal an input error.',
      check:'Evaluate 24÷3+2×5, then explain the order you used.',
      commonMistakes:['doing every operation strictly from left to right','treating multiplication as always before division regardless of left-to-right order','trusting a calculator result without checking the entered expression']
    }
  ]
};

export type Jss3ProvisionalQuestion={
 id:string; prompt:string; options:string[]; correctAnswer:string; explanation:string; difficulty:1|2|3; skill:string;
};

export const jss3WholeNumbersQuestions:Jss3ProvisionalQuestion[]=[
 {id:'jss3-whole-01',prompt:'What is 10101₂ in base ten?',options:['19','20','21','25'],correctAnswer:'21',explanation:'10101₂ = 16+4+1 = 21.',difficulty:1,skill:'binary-to-decimal'},
 {id:'jss3-whole-02',prompt:'Which is the correct expansion of 10001₂?',options:['1×2⁴+0×2³+0×2²+0×2¹+1×2⁰','1×2⁵+1×2⁰','1×10⁴+1','1×2⁴+1×2¹'],correctAnswer:'1×2⁴+0×2³+0×2²+0×2¹+1×2⁰',explanation:'Binary place values are powers of 2 beginning with 2⁰ on the right.',difficulty:1,skill:'place-value'},
 {id:'jss3-whole-03',prompt:'Convert 26₁₀ to binary.',options:['10110₂','11010₂','11001₂','11100₂'],correctAnswer:'11010₂',explanation:'26 = 16+8+2, so the binary digits are 11010.',difficulty:1,skill:'decimal-to-binary'},
 {id:'jss3-whole-04',prompt:'Which digit cannot appear in a binary numeral?',options:['0','1','2','Both 0 and 1'],correctAnswer:'2',explanation:'Base two uses only the digits 0 and 1.',difficulty:1,skill:'number-bases'},
 {id:'jss3-whole-05',prompt:'Convert 110111₂ to base ten.',options:['47','53','55','57'],correctAnswer:'55',explanation:'32+16+4+2+1=55.',difficulty:1,skill:'binary-to-decimal'},
 {id:'jss3-whole-06',prompt:'Convert 110111₂ to base five.',options:['201₅','210₅','220₅','110₅'],correctAnswer:'210₅',explanation:'110111₂=55₁₀ and 55₁₀=210₅.',difficulty:2,skill:'cross-base-conversion'},
 {id:'jss3-whole-07',prompt:'Convert 132₅ to base ten.',options:['32','40','42','47'],correctAnswer:'42',explanation:'1×25+3×5+2=42.',difficulty:2,skill:'other-base-to-decimal'},
 {id:'jss3-whole-08',prompt:'Convert 132₅ to binary.',options:['101010₂','101100₂','110010₂','100101₂'],correctAnswer:'101010₂',explanation:'132₅=42₁₀ and 42=32+8+2=101010₂.',difficulty:2,skill:'other-base-to-binary'},
 {id:'jss3-whole-09',prompt:'Evaluate 1011₂ + 1101₂.',options:['10110₂','11000₂','11100₂','10000₂'],correctAnswer:'11000₂',explanation:'11+13=24, and 24₁₀=11000₂.',difficulty:2,skill:'binary-addition'},
 {id:'jss3-whole-10',prompt:'Evaluate 10110₂ − 111₂.',options:['1011₂','1101₂','1111₂','10001₂'],correctAnswer:'1111₂',explanation:'22−7=15 and 15₁₀=1111₂.',difficulty:2,skill:'binary-subtraction'},
 {id:'jss3-whole-11',prompt:'Evaluate 101₂ × 11₂.',options:['111₂','1010₂','1111₂','10001₂'],correctAnswer:'1111₂',explanation:'5×3=15 and 15₁₀=1111₂.',difficulty:2,skill:'binary-multiplication'},
 {id:'jss3-whole-12',prompt:'Evaluate 1100₂ ÷ 10₂.',options:['10₂','11₂','101₂','110₂'],correctAnswer:'110₂',explanation:'12÷2=6 and 6₁₀=110₂.',difficulty:2,skill:'binary-division'},
 {id:'jss3-whole-13',prompt:'In binary addition, 1₂ + 1₂ equals:',options:['2₂','10₂','11₂','100₂'],correctAnswer:'10₂',explanation:'The value is decimal 2, written 10 in base two.',difficulty:1,skill:'binary-addition'},
 {id:'jss3-whole-14',prompt:'Which expression means “half of the sum of 12 and 8”?',options:['12+8÷2','(12+8)÷2','12÷2+8','12+(8÷2)'],correctAnswer:'(12+8)÷2',explanation:'The phrase “the sum of 12 and 8” forms one grouped quantity before taking half.',difficulty:2,skill:'word-translation'},
 {id:'jss3-whole-15',prompt:'Which expression represents “four less than 10”?',options:['4−10','10−4','10+4','4÷10'],correctAnswer:'10−4',explanation:'“Four less than 10” means subtract 4 from 10.',difficulty:2,skill:'word-translation'},
 {id:'jss3-whole-16',prompt:'Evaluate 7−(8÷2+3).',options:['0','4','6','8'],correctAnswer:'0',explanation:'8÷2=4; 4+3=7; 7−7=0.',difficulty:2,skill:'word-translation'},
 {id:'jss3-whole-17',prompt:'Evaluate 24÷3+2×5 using the correct order of operations.',options:['18','20','40','50'],correctAnswer:'18',explanation:'24÷3=8 and 2×5=10; then 8+10=18.',difficulty:2,skill:'order-of-operations'},
 {id:'jss3-whole-18',prompt:'Evaluate 101₂×(111₂+11₂).',options:['110010₂','111010₂','101000₂','100010₂'],correctAnswer:'110010₂',explanation:'5×(7+3)=50 and 50₁₀=110010₂.',difficulty:3,skill:'binary-quantitative-reasoning'},
 {id:'jss3-whole-19',prompt:'Why is converting a binary answer to base ten useful after a calculation?',options:['It changes the required answer permanently','It provides an independent check of the arithmetic','It allows the digit 2 to be written in binary','It removes the need to understand binary'],correctAnswer:'It provides an independent check of the arithmetic',explanation:'Decimal conversion can verify the value while the required answer remains in the requested base.',difficulty:2,skill:'checking'},
 {id:'jss3-whole-20',prompt:'A calculator gives 500 for (375+225)÷12. What should you conclude first?',options:['500 must be correct because a calculator produced it','The calculator is broken','Check the expression entered because 600÷12 should be about 50','Change the brackets to multiplication'],correctAnswer:'Check the expression entered because 600÷12 should be about 50',explanation:'375+225=600 and 600÷12=50, so estimation exposes a likely input error.',difficulty:3,skill:'technology-checking'},
 {id:'jss3-whole-21',prompt:'Which numeral is valid in base five?',options:['148₅','253₅','404₅','517₅'],correctAnswer:'404₅',explanation:'Base five permits only digits 0,1,2,3,4.',difficulty:2,skill:'number-bases'},
 {id:'jss3-whole-22',prompt:'What is the best first step when solving a verbal quantitative problem?',options:['Use every number immediately','Translate the relationships and identify what is required','Choose multiplication because it is usually harder','Enter the numbers into a calculator'],correctAnswer:'Translate the relationships and identify what is required',explanation:'Correct modelling comes before calculation.',difficulty:3,skill:'problem-solving'}
];


export const jss3RationalNonRationalTopic='Rational and Irrational (Non-Rational) Numbers';

export const jss3RationalNonRationalPlan:TutorPlan={
 goal:'Identify, explain, compare and approximate rational and non-rational numbers, including the practical meaning of π and square roots, with the depth needed for JSS3 and BECE problem solving.',
 why:'NERDC requires learners to identify rational and non-rational numbers and determine π practically. New General Mathematics additionally matches this topic to distinguishing the two classes and approximating π and square roots. AVORA therefore teaches the definitions, recognition tests and applications behind those outcomes.',
 outcomes:[
  'Define and identify rational numbers as numbers expressible as p/q where p and q are integers and q ≠ 0.',
  'Define and identify non-rational (irrational) numbers.',
  'Recognise integers, fractions, terminating decimals and recurring decimals as rational numbers.',
  'Recognise common irrational numbers such as π and square roots of positive non-perfect squares.',
  'Distinguish perfect-square roots from irrational square roots.',
  'Determine an approximate value of π experimentally from circumference and diameter.',
  'Approximate irrational values sensibly and place them between neighbouring rational numbers.',
  'Classify mixed BECE-style examples and justify each classification.'
 ],
 examFocus:[
  'Classification answers should include a reason, not only the word rational or irrational.',
  'Remember that every integer is rational because n = n/1.',
  'A terminating decimal is rational; a recurring decimal is also rational.',
  'A non-terminating decimal is irrational only when it does not repeat in a fixed pattern.',
  '√n is not automatically irrational: √49 = 7 is rational.',
  'π is irrational even though 22/7 and 3.142 are useful rational approximations.',
  'For practical π work, measure circumference and diameter of several circular objects and compare C÷d.',
  'In approximation questions, state the requested degree of accuracy.'
 ],
 units:[
  {
   title:'The real-number family and where this topic fits',
   terms:[['natural numbers','counting numbers such as 1,2,3,…'],['whole numbers','0 and the positive counting numbers'],['integers','…,−3,−2,−1,0,1,2,3,…'],['real numbers','all rational and irrational numbers represented on the ordinary number line']],
   explain:'Before separating rational from non-rational numbers, organise familiar numbers. Natural numbers lie inside whole numbers; whole numbers lie inside integers; integers are rational because every integer n can be written n/1. Rational and irrational numbers together make the real numbers studied at this level. This hierarchy prevents the common mistake of thinking a number can belong to only one useful set.',
   example:'−8 is an integer and also rational because −8 = −8/1. It is therefore a real number. It is not a whole number.',
   check:'Classify 0 as natural/whole/integer/rational wherever appropriate, and explain why it is rational.',
   commonMistakes:['thinking integers and rational numbers are completely separate groups','thinking negative numbers cannot be rational','forgetting that zero can be written 0/1']
  },
  {
   title:'Meaning of a rational number: the p/q test',
   terms:[['rational number','a number expressible as p/q where p and q are integers and q is not zero'],['numerator','the integer p in p/q'],['denominator','the non-zero integer q in p/q']],
   explain:'The decisive definition is the fraction or ratio test. A number is rational if it can be written exactly as p/q, with p and q integers and q≠0. “Exactly” matters. The fraction need not already be visible: 7 is 7/1; −2.5 is −5/2; 0 is 0/1.',
   example:'3¾ = 15/4, so it is rational. −0.6 = −6/10 = −3/5, so it is rational. 18 = 18/1, so it is rational.',
   check:'Show explicitly why −1.25 is rational.',
   commonMistakes:['believing rational means positive','requiring p/q to be a proper fraction','allowing q=0']
  },
  {
   title:'Fractions, integers and zero as rational numbers',
   terms:[['proper fraction','a fraction whose numerator magnitude is smaller than its denominator in the usual positive-fraction setting'],['improper fraction','a fraction whose numerator is at least as large as its denominator'],['mixed number','a whole-number part combined with a proper fraction']],
   explain:'Ordinary fractions with non-zero denominators are rational. Mixed numbers become improper fractions. Integers are fractions over 1. Zero is rational because 0/q=0 for every non-zero integer q. However, a/0 is undefined and cannot be used as a rational representation.',
   example:'2⅓ = 7/3; −11 = −11/1; 0 = 0/5. Each is rational. By contrast, 7/0 is undefined.',
   check:'Which of 5/8, −13, 0 and 9/0 are rational numbers? Justify each answer.',
   commonMistakes:['calling 0 irrational','treating division by zero as an ordinary fraction','thinking only proper fractions are rational']
  },
  {
   title:'Terminating decimals are rational',
   terms:[['terminating decimal','a decimal expansion that ends after finitely many digits'],['place-value fraction','a fraction with denominator 10,100,1000,… obtained directly from a terminating decimal']],
   explain:'Every terminating decimal can be written exactly as a fraction with denominator 10, 100, 1000 and so on, then simplified. Therefore every terminating decimal is rational.',
   example:'0.375 = 375/1000 = 3/8. Also 2.45 = 245/100 = 49/20. Both are rational.',
   check:'Convert 0.625 to its simplest fraction and use the result to classify it.',
   commonMistakes:['assuming a decimal must recur to be rational','rounding a terminating decimal before converting it','forgetting to simplify when asked for simplest form']
  },
  {
   title:'Recurring decimals are rational',
   terms:[['recurring decimal','a decimal in which a digit or block repeats forever'],['repetend','the repeating digit or block']],
   explain:'A recurring decimal does not terminate, but it is still rational because it can be converted exactly to a fraction. For a one-digit recurrence x=0.333…, then 10x=3.333…; subtracting gives 9x=3, so x=1/3. The same subtraction idea works for repeating blocks.',
   example:'Let x=0.272727…. Then 100x=27.272727…. Subtract x: 99x=27, so x=27/99=3/11. Hence 0.272727… is rational.',
   check:'Convert 0.666… to a fraction using an algebraic step, not by guessing.',
   commonMistakes:['calling every endless decimal irrational','confusing recurring with rounded decimal notation','subtracting before multiplying by the correct power of 10']
  },
  {
   title:'Meaning of non-rational or irrational numbers',
   terms:[['irrational number','a real number that cannot be expressed exactly as p/q for integers p,q with q≠0'],['non-terminating non-recurring decimal','an endless decimal with no repeating fixed block']],
   explain:'NERDC uses the expression non-rational; standard mathematics also calls these numbers irrational. Their decimal expansions neither terminate nor settle into a repeating pattern. Irrational does not mean unreasonable or undefined: these are valid real numbers with precise positions on the number line.',
   example:'π = 3.14159265… continues without a repeating block. √2 = 1.41421356… also continues without a repeating block. Both are irrational.',
   check:'Explain the single most important decimal-pattern difference between 0.333… and √2.',
   commonMistakes:['thinking “irrational” means the number has no value','calling every long decimal irrational','confusing undefined expressions such as 1/0 with irrational numbers']
  },
  {
   title:'Perfect squares and rational square roots',
   terms:[['perfect square','a number that is the square of an integer'],['square root','a number which multiplied by itself gives the stated number']],
   explain:'Do not classify every square root as irrational. If the radicand is a perfect square, its principal square root is an integer and therefore rational. Useful perfect squares include 1,4,9,16,25,36,49,64,81,100,121,144 and 169.',
   example:'√144=12, so √144 is rational. √0.81=0.9=9/10, also rational.',
   check:'Classify √64, √121 and √0.25 and explain the common reason.',
   commonMistakes:['saying any expression with √ is irrational','forgetting decimal perfect squares','confusing √49 with ±7; the principal square root symbol √49 denotes 7']
  },
  {
   title:'Square roots of non-perfect squares',
   terms:[['non-perfect square','a number that is not the square of an integer'],['bounds','known lower and upper values between which an unknown value lies']],
   explain:'For a positive integer that is not a perfect square, its square root is irrational. To estimate it, trap it between nearby perfect squares. If 16<20<25, then 4<√20<5. Refine using decimals or an approved table/calculator where the task allows it.',
   example:'49<50<64, so 7<√50<8. Since 7.0²=49 and 7.1²=50.41, √50 lies between 7.0 and 7.1 and is about 7.07.',
   check:'Without a calculator, show between which two consecutive integers √70 lies.',
   commonMistakes:['rounding before establishing sensible bounds','assuming √20=√16+√4','treating an approximation such as 4.47 as the exact value']
  },
  {
   title:'π as a non-rational number',
   terms:[['pi (π)','the constant ratio of a circle’s circumference to its diameter'],['circumference','distance around a circle'],['diameter','straight distance across a circle through its centre'],['approximation','a value close to, but not exactly equal to, another value']],
   explain:'π is the same constant for every ideal circle: π=C/d. Its decimal expansion does not terminate or repeat, so π is irrational. Values such as 22/7, 3.14 and 3.142 are rational approximations used for calculations; they are not exactly π.',
   example:'If a circular object has circumference about 62.8 cm and diameter about 20.0 cm, C/d≈62.8/20=3.14. Measurement error means practical results may be a little above or below the true value.',
   check:'Why is 22/7 rational even though it is often used in calculations involving π?',
   commonMistakes:['writing π=22/7 as an exact equality in a classification lesson','thinking each circle has a different π','dividing diameter by circumference instead of circumference by diameter']
  },
  {
   title:'NERDC practical investigation of π',
   terms:[['measurement error','difference introduced by limitations of measuring instruments or technique'],['experimental ratio','a ratio calculated from measured quantities']],
   explain:'NERDC specifically expects learners to determine an approximate value of π practically. Wrap thread once around a cylindrical object and measure the thread length as circumference C. Measure the diameter d across the centre. Calculate C/d. Repeat with several circular objects. The ratios should cluster near 3.14. Averaging several careful measurements reduces the effect of random measurement errors.',
   example:'Object A: C=31.5 cm,d=10.0 cm → 3.15. Object B: C=47.0 cm,d=15.0 cm → 3.13. Object C: C=62.9 cm,d=20.0 cm → 3.145. The results support a common ratio close to 3.14.',
   check:'A learner obtains 2.2 for C/d. Give two things that should be checked before accepting the result.',
   commonMistakes:['measuring radius but calling it diameter','letting thread overlap or leave a gap','expecting experimental measurements to equal π to many decimal places']
  },
  {
   title:'Approximating irrational numbers accurately',
   terms:[['decimal place','position to the right of a decimal point'],['significant figure','a digit contributing to the precision of a number'],['rounding','replacing a number by a nearby value at a stated accuracy']],
   explain:'Irrational numbers cannot be written completely as decimals, so calculations often use approximations. Keep enough digits during working and round at the end. The requested accuracy may be decimal places or significant figures. The approximation is rational even though the exact number is irrational.',
   example:'√17≈4.1231056. To 3 significant figures it is 4.12. π≈3.14159265; to 3 decimal places it is 3.142.',
   check:'Round √29≈5.3851648 to 2 decimal places and to 3 significant figures.',
   commonMistakes:['rounding too early in a multi-step problem','confusing decimal places with significant figures','claiming the rounded decimal becomes the exact irrational value']
  },
  {
   title:'Placing rational and irrational numbers on the number line',
   terms:[['number line','a line on which numbers are positioned according to magnitude'],['order','relative size of numbers']],
   explain:'Rational and irrational numbers share the same real number line. Approximation helps locate irrational numbers. Since 1²<2<2², 1<√2<2; since 1.4²=1.96 and 1.5²=2.25, √2 lies between 1.4 and 1.5. This supports comparisons without pretending the decimal terminates.',
   example:'Compare √10 and 3.2. Since 3.2²=10.24>10 and both are positive, √10<3.2. Numerically √10≈3.162.',
   check:'Arrange 3, √10 and 3.5 in ascending order.',
   commonMistakes:['comparing only the written symbols rather than their values','squaring negative comparison values without considering sign','writing an approximate decimal as if it were exact']
  },
  {
   title:'Classification decision strategy',
   terms:[['classification','placing an item in the correct mathematical set'],['justification','a mathematical reason supporting an answer']],
   explain:'Use a consistent test. First simplify the number if possible. An integer is rational. An ordinary fraction with non-zero denominator is rational. A terminating or recurring decimal is rational. A square root of a perfect square is rational. π and square roots of positive non-perfect-square integers are irrational. If a decimal is described as non-terminating and non-recurring, it is irrational.',
   example:'Classify: −5 → rational (−5/1); 0.125 → rational (1/8); 0.181818… → rational (recurring); √81 → rational (=9); √11 → irrational; π → irrational; 22/7 → rational.',
   check:'Classify −3, 5/9, 0.121212…, √36, √37, π and 3.142, giving a reason for each.',
   commonMistakes:['classifying by appearance before simplifying','treating π and 3.142 as the same type of number','assuming a fraction-looking expression is valid when its denominator is zero']
  },
  {
   title:'BECE-style mixed reasoning',
   terms:[['exact value','a value represented without rounding error'],['approximate value','a nearby numerical representation'],['counterexample','an example showing a general claim is false']],
   explain:'Exam questions may disguise the classification. Simplify first, then apply the definition. To disprove “every square root is irrational,” use √25=5. To distinguish exact from approximate values, remember π is exact as the symbol π while 3.142 is an approximation. A question may also combine ordering, rounding and classification.',
   example:'Which is irrational: √(9/16), √18, 0.45, 0.272727…? √(9/16)=3/4 rational; 0.45=9/20 rational; 0.272727…=3/11 rational; √18=3√2 is irrational. Therefore √18 is the required number.',
   check:'A student says “√0.09 is irrational because it contains a root sign.” Correct the student with complete working.',
   commonMistakes:['choosing the most complicated-looking option','failing to simplify before classifying','giving a classification without evidence']
  }
 ]
};

export const jss3RationalNonRationalQuestions:Jss3ProvisionalQuestion[]=[
 {id:'jss3-rnr-01',prompt:'Which definition correctly describes a rational number?',options:['A number expressible as p/q where p and q are integers and q≠0','Any positive fraction only','Any decimal that has many digits','Any number containing a square-root sign'],correctAnswer:'A number expressible as p/q where p and q are integers and q≠0',explanation:'This is the defining fraction test for rational numbers.',difficulty:1,skill:'definition'},
 {id:'jss3-rnr-02',prompt:'Why is −7 rational?',options:['It is negative','It can be written −7/1','It has no decimal point','Every negative number is irrational'],correctAnswer:'It can be written −7/1',explanation:'Both −7 and 1 are integers and the denominator is non-zero.',difficulty:1,skill:'classification'},
 {id:'jss3-rnr-03',prompt:'Which expression is undefined rather than an irrational number?',options:['√2','π','7/0','√11'],correctAnswer:'7/0',explanation:'Division by zero is undefined; it is not a real irrational number.',difficulty:2,skill:'classification'},
 {id:'jss3-rnr-04',prompt:'Which decimal is rational because it terminates?',options:['0.625','π','√3','1.4142135… with no repeating block'],correctAnswer:'0.625',explanation:'0.625=625/1000=5/8.',difficulty:1,skill:'terminating-decimals'},
 {id:'jss3-rnr-05',prompt:'0.272727… is:',options:['irrational because it never ends','rational because 27 repeats','undefined','an integer'],correctAnswer:'rational because 27 repeats',explanation:'Recurring decimals are rational; 0.272727…=3/11.',difficulty:1,skill:'recurring-decimals'},
 {id:'jss3-rnr-06',prompt:'Which is irrational?',options:['√49','√50','0.75','−12'],correctAnswer:'√50',explanation:'50 is not a perfect square, so √50 is irrational; √49=7.',difficulty:1,skill:'square-roots'},
 {id:'jss3-rnr-07',prompt:'Which statement about π is correct?',options:['π=22/7 exactly','π is irrational and 22/7 is a rational approximation','π is a recurring decimal','π changes with the size of a circle'],correctAnswer:'π is irrational and 22/7 is a rational approximation',explanation:'π is non-terminating and non-recurring; 22/7 is rational.',difficulty:2,skill:'pi'},
 {id:'jss3-rnr-08',prompt:'In the practical NERDC investigation of π, which ratio should be calculated?',options:['diameter/circumference','circumference/diameter','radius/circumference','circumference/radius²'],correctAnswer:'circumference/diameter',explanation:'For every circle π=C/d.',difficulty:1,skill:'pi-investigation'},
 {id:'jss3-rnr-09',prompt:'A circle has measured circumference 31.4 cm and diameter 10 cm. What experimental value of π is obtained?',options:['0.314','3.14','31.4','314'],correctAnswer:'3.14',explanation:'C/d=31.4/10=3.14.',difficulty:1,skill:'pi-investigation'},
 {id:'jss3-rnr-10',prompt:'Which number lies between 4 and 5?',options:['√15','√20','√26','√36'],correctAnswer:'√20',explanation:'16<20<25, so 4<√20<5.',difficulty:2,skill:'bounding-roots'},
 {id:'jss3-rnr-11',prompt:'√17≈4.1231056. What is √17 to 3 significant figures?',options:['4.12','4.13','4.123','4.1'],correctAnswer:'4.12',explanation:'The first three significant digits are 4,1,2 and the next digit is 3.',difficulty:2,skill:'approximation'},
 {id:'jss3-rnr-12',prompt:'π≈3.14159265. What is π to 3 decimal places?',options:['3.141','3.142','3.140','3.150'],correctAnswer:'3.142',explanation:'The fourth decimal digit is 5, so the third decimal digit rounds upward.',difficulty:2,skill:'approximation'},
 {id:'jss3-rnr-13',prompt:'Which list contains only rational numbers?',options:['3, 1/4, 0.2, 0.333…','π, √2, √3','√5, 7, π','√11, 0.5, 2/3'],correctAnswer:'3, 1/4, 0.2, 0.333…',explanation:'Integers, fractions, terminating decimals and recurring decimals are rational.',difficulty:2,skill:'classification'},
 {id:'jss3-rnr-14',prompt:'Which statement is false?',options:['Every integer is rational','Every terminating decimal is rational','Every square root is irrational','Every recurring decimal is rational'],correctAnswer:'Every square root is irrational',explanation:'For example √25=5, which is rational.',difficulty:2,skill:'misconceptions'},
 {id:'jss3-rnr-15',prompt:'Convert 0.375 to its simplest fraction.',options:['3/8','3/5','5/8','375/10'],correctAnswer:'3/8',explanation:'375/1000 simplifies by 125 to 3/8.',difficulty:2,skill:'decimal-to-fraction'},
 {id:'jss3-rnr-16',prompt:'If x=0.666…, which equation follows after multiplying by 10 and subtracting x?',options:['9x=6','10x=6','x=6','11x=6'],correctAnswer:'9x=6',explanation:'10x=6.666… and x=0.666…; subtraction gives 9x=6.',difficulty:2,skill:'recurring-to-fraction'},
 {id:'jss3-rnr-17',prompt:'Which is the best reason √81 is rational?',options:['81 is odd','√81=9 and 9=9/1','It contains a radical sign','All roots are rational'],correctAnswer:'√81=9 and 9=9/1',explanation:'81 is a perfect square, so its square root is the rational integer 9.',difficulty:2,skill:'perfect-squares'},
 {id:'jss3-rnr-18',prompt:'Between which consecutive integers does √70 lie?',options:['6 and 7','7 and 8','8 and 9','9 and 10'],correctAnswer:'8 and 9',explanation:'64<70<81, so 8<√70<9.',difficulty:2,skill:'bounding-roots'},
 {id:'jss3-rnr-19',prompt:'Arrange 3, √10 and 3.5 in ascending order.',options:['3, √10, 3.5','√10, 3, 3.5','3.5, √10, 3','3, 3.5, √10'],correctAnswer:'3, √10, 3.5',explanation:'√10≈3.162, so it lies between 3 and 3.5.',difficulty:3,skill:'number-line'},
 {id:'jss3-rnr-20',prompt:'Which is irrational after simplification?',options:['√(9/16)','√18','0.45','0.121212…'],correctAnswer:'√18',explanation:'√(9/16)=3/4 and the decimals are rational; √18=3√2 is irrational.',difficulty:3,skill:'bece-classification'},
 {id:'jss3-rnr-21',prompt:'A learner measures C/d as 3.13, 3.15 and 3.14 for three circular objects. What conclusion is most reasonable?',options:['π is approximately 3.14 and small measurement errors explain the variation','Each circle has a different value of π','π is exactly 3.13','Diameter is always equal to circumference'],correctAnswer:'π is approximately 3.14 and small measurement errors explain the variation',explanation:'Repeated measurements should cluster near the common constant π.',difficulty:3,skill:'pi-investigation'},
 {id:'jss3-rnr-22',prompt:'Which statement correctly compares π and 3.142?',options:['Both are irrational','π is irrational while 3.142 is rational','π is rational while 3.142 is irrational','They are exactly equal'],correctAnswer:'π is irrational while 3.142 is rational',explanation:'3.142 is a terminating decimal and therefore rational; it only approximates π.',difficulty:2,skill:'exact-vs-approximate'},
 {id:'jss3-rnr-23',prompt:'A decimal continues forever without any repeating block. How is it classified?',options:['rational','irrational','integer','undefined'],correctAnswer:'irrational',explanation:'A non-terminating, non-recurring real decimal is irrational.',difficulty:1,skill:'decimal-patterns'},
 {id:'jss3-rnr-24',prompt:'Which counterexample disproves the claim “every number written with √ is irrational”?',options:['√2','√3','√25=5','π'],correctAnswer:'√25=5',explanation:'5 is an integer and hence rational.',difficulty:3,skill:'reasoning'},
 {id:'jss3-rnr-25',prompt:'√29≈5.3851648. What is it to the nearest tenth?',options:['5.3','5.4','5.38','5.39'],correctAnswer:'5.4',explanation:'The hundredths digit is 8, so 5.3 rounds to 5.4.',difficulty:2,skill:'approximation'},
 {id:'jss3-rnr-26',prompt:'Which classification is correct for 0?',options:['irrational because it is neither positive nor negative','rational because 0=0/1','undefined because it has no reciprocal','irrational because it has no recurring digits'],correctAnswer:'rational because 0=0/1',explanation:'Zero satisfies the p/q definition with any non-zero denominator.',difficulty:2,skill:'classification'}
];


export const jss3BaseTwoOperationsTopic='Base 2 Numerals — Addition, Subtraction, Multiplication, Division (up to 3-digit)';

export const jss3BaseTwoOperationsPlan:TutorPlan={
 goal:'Perform and explain JSS3/BECE binary addition, subtraction, multiplication and division accurately, including NERDC-required two/three-number and 2–3-digit cases, with checking and reasoning.',
 why:'NERDC treats the four binary operations as four explicit JSS3 Basic Operations topics. Mastery therefore requires the algorithm, the meaning of every carry/borrow/shift, standard vertical working, and mixed BECE-style application—not memorised answers.',
 outcomes:[
  'Add two or three 3-digit binary numbers accurately.',
  'Subtract two 3-digit binary numbers using correct base-two borrowing.',
  'Multiply two 2-digit binary numbers using binary partial products.',
  'Divide 2–3-digit binary numbers by suitable binary divisors using long division.',
  'Check each operation by converting operands and answers to base ten.',
  'Solve missing-digit, error-analysis and mixed BECE-style binary questions.'
 ],
 examFocus:[
  'Keep all digits aligned by binary place value.',
  'Show carries and borrowing clearly; never write digit 2 in a final binary numeral.',
  'For three addends, a column total can be 0,1,2 or 3 in decimal value, so know how 2=10₂ and 3=11₂ are recorded.',
  'In subtraction, borrowing 1 from the next column gives 10₂ in the current column.',
  'In multiplication, each left shift means multiplication by 10₂ (decimal 2).',
  'In division, compare, subtract, bring down and continue just as in long division, but entirely in base two.',
  'Use decimal conversion as a check, not as a substitute for learning the binary algorithm.'
 ],
 units:[
  {title:'Foundation: binary place value before operating',terms:[['bit','a binary digit, 0 or 1'],['place value','…,8,4,2,1 corresponding to powers of 2'],['operand','a number on which an operation is performed']],explain:'Operations work because binary is positional. From right to left the columns are 1,2,4,8,… in decimal value. Numbers must be aligned at the right so equal place values sit in the same column. 101₂ means 4+1=5; 11₂ means 2+1=3.',example:'101₂ and 011₂ are aligned as 4-2-1 columns. Their decimal values are 5 and 3.',check:'Write 110₂ in expanded place-value form.',commonMistakes:['aligning numbers at the left','reading 101₂ as one hundred and one','forgetting that binary digits are only 0 and 1']},
  {title:'Binary addition facts and why carrying works',terms:[['carry','value transferred to the next higher place'],['column total','sum of digits and incoming carry in one place']],explain:'Memorise with understanding: 0+0=0; 0+1=1; 1+0=1; 1+1=10₂, so write 0 and carry 1. Also 1+1+1=11₂, so write 1 and carry 1. A carried 1 is worth twice the current place because the next column has double the place value.',example:'In the 1s column, 1+1=10₂: write 0 under the 1s column and carry 1 into the 2s column.',check:'What do you write and carry when a column contains 1+1+1?',commonMistakes:['writing 2','forgetting an incoming carry','carrying to the wrong column']},
  {title:'Adding two 3-digit binary numbers',terms:[['vertical addition','placing equal place values in columns before adding']],explain:'Start at the rightmost column. Add its two digits and any carry. Write the result digit and carry when needed. Move left one column at a time. If a carry remains after the leftmost column, write it as a new leading digit.',example:'  101₂\n+ 011₂\n------\n 1000₂. Steps: 1+1=10₂ write 0 carry1; 0+1+carry1=10₂ write0 carry1; 1+0+carry1=10₂ write0 carry1; bring down carry1. Decimal check:5+3=8.',check:'Calculate 110₂+101₂ vertically and check in decimal.',commonMistakes:['dropping the final carry','not writing a leading zero for alignment when helpful','adding decimal-style']},
  {title:'Adding three 3-digit binary numbers — NERDC maximum case',terms:[['three-addend sum','addition involving three numbers at once']],explain:'NERDC explicitly requires addition of two OR THREE 3-digit binary numbers. A column may therefore contain three 1s plus a carry. Think of the column total in binary. For example 1+1+1=11₂: write 1 and carry1. If there is also an incoming 1, the total is four decimal =100₂: write 0 and carry 10₂ into the next place; equivalently handle the accumulated carry by place value carefully. A safer school method is to add two numbers first, then add the third, while showing both binary sums.',example:'101₂+110₂+011₂. First 101₂+110₂=1011₂. Then 1011₂+0011₂=1110₂. Decimal check:5+6+3=14.',check:'Find 111₂+101₂+010₂ and verify in base ten.',commonMistakes:['assuming the carry can only ever be 1 when several addends are present','losing a third addend','failing to align all rightmost digits']},
  {title:'Addition error analysis and missing digits',terms:[['verification','checking a result independently'],['missing digit','unknown bit to be determined from an equation']],explain:'BECE-style reasoning can ask whether a worked sum is correct or require a missing bit. Work from the rightmost column and enforce binary addition facts. Decimal conversion gives a second independent check.',example:'If 10?₂+001₂=100₂, then the unknown is 1 because 101₂+1₂=110₂—not 100₂; therefore the stated equation has no valid ? under that form. Error analysis matters: do not force an answer when the equation is inconsistent.',check:'Find ?: 1?0₂+001₂=111₂.',commonMistakes:['guessing the missing bit without checking all columns','assuming every printed equation must be consistent','using decimal digit rules']},
  {title:'Subtraction facts and the meaning of borrowing',terms:[['borrow','regroup one unit from the next higher place'],['regroup','rewrite a place value in smaller-place units']],explain:'Basic facts are 0−0=0, 1−0=1, 1−1=0. When 0−1 occurs, borrow 1 from the next occupied higher column. Because each binary place is twice the previous one, the borrowed 1 becomes 10₂ in the current column. Then 10₂−1₂=1₂.',example:'In 10₂−1₂, borrow the 1 from the 2s place; it becomes 10₂ in the 1s place, so the answer is 1₂.',check:'Explain in words why borrowing one binary place produces 10₂, not 10₁₀.',commonMistakes:['borrowing ten as in decimal','forgetting to reduce the donor column','writing negative column digits']},
  {title:'Subtracting two 3-digit binary numbers',terms:[['minuend','number from which another is subtracted'],['subtrahend','number being subtracted']],explain:'Align columns and work right to left. Borrow only when the top bit is smaller than the bottom bit. After borrowing, update the donor column before continuing.',example:'110₂−011₂=011₂. Decimal check:6−3=3. In vertical work, the rightmost 0 borrows through the middle 1, becoming 10₂; 10₂−1=1, the adjusted middle becomes 0 and 0−1 requires borrowing from the left.',check:'Calculate 101₂−011₂ using explicit borrowing.',commonMistakes:['forgetting an earlier borrow changed the next top digit','subtracting the smaller digit from the larger regardless of position','dropping necessary internal zeros']},
  {title:'Borrowing across zeroes',terms:[['borrow chain','borrowing that passes through one or more zero columns']],explain:'A harder subtraction occurs when the next column is 0. Move left until you reach a 1. Reduce that 1 to 0; the zero columns crossed receive value 10₂ and pass a borrow rightward. Track every changed column. This is the binary equivalent of borrowing across zeroes in decimal.',example:'1000₂−0011₂=0101₂. Decimal check:8−3=5. The borrow must travel from the 8s place through the 4s and 2s positions.',check:'Calculate 100₂−011₂ and explain the borrow chain.',commonMistakes:['borrowing from a zero without tracing to an available 1','changing only the final column','forgetting the decimal check']},
  {title:'Subtraction as the inverse of addition',terms:[['inverse operation','operation that reverses another']],explain:'If A−B=C, then C+B=A. This gives a strong check that does not require decimal conversion. Use both checks for difficult questions when time permits.',example:'101₂−011₂=010₂. Check:010₂+011₂=101₂.',check:'After solving 111₂−010₂, verify by addition.',commonMistakes:['checking by repeating the same subtraction','adding the wrong two quantities','ignoring leading zeros when aligning']},
  {title:'Binary multiplication facts and structure',terms:[['partial product','intermediate product from one multiplier digit'],['shift','moving a partial product left to represent the next binary place']],explain:'Only four digit facts are needed:0×0=0,0×1=0,1×0=0,1×1=1. The challenge is place value. Multiplying by the rightmost 1 copies the multiplicand. Multiplying by a 1 one place left copies it shifted left one place, which is multiplication by 10₂=2₁₀.',example:'11₂×10₂=110₂. Multiplication by 10₂ shifts 11₂ one place left.',check:'Why does 101₂×10₂ equal 1010₂?',commonMistakes:['using decimal multiplication facts involving digits above 1','forgetting the shift','adding partial products incorrectly']},
  {title:'Multiplying two 2-digit binary numbers — NERDC target',terms:[['multiplicand','number being multiplied'],['multiplier','number multiplying it']],explain:'Write the numbers vertically. Multiply the multiplicand by the rightmost multiplier bit. Write the first partial product. Move to the next multiplier bit and shift its partial product one place left. Add the partial products in binary.',example:'  11₂\n× 11₂\n-----\n  11\n 110\n-----\n1001₂. Decimal check:3×3=9.',check:'Calculate 10₂×11₂ by partial products and verify in decimal.',commonMistakes:['not shifting the second row','writing 1×1 as 10','adding partial products as decimal numerals']},
  {title:'Multiplication involving zero bits',terms:[['zero partial product','row of zeros produced when the multiplier bit is 0']],explain:'A multiplier bit of 0 produces a zero partial product, but its place still exists. Keeping the place visible prevents alignment errors. For larger practice beyond NERDC minimum, the same principle extends to more digits.',example:'101₂×10₂: rightmost multiplier 0 gives 000; next bit 1 gives shifted 1010; result 1010₂.',check:'Calculate 11₂×10₂ and explain the zero row.',commonMistakes:['skipping a zero bit and losing its place','shifting the wrong row','treating a zero row as the final answer']},
  {title:'Division foundation: what binary division is doing',terms:[['dividend','number being divided'],['divisor','number dividing it'],['quotient','result of division'],['remainder','amount left after division']],explain:'Binary long division asks the same repeated question as decimal long division: does the divisor fit into the current part? If yes, write 1 in the quotient and subtract; if no, write 0. Then bring down the next bit. Quotient digits are only 0 or 1.',example:'110₂÷10₂=11₂ because 6÷2=3. Check:11₂×10₂=110₂.',check:'Identify dividend, divisor and quotient in 111₂÷1₂=111₂.',commonMistakes:['using quotient digits larger than 1','forgetting to bring down the next bit','not checking by multiplication']},
  {title:'Long division of 2–3-digit binary numbers',terms:[['long division','stepwise division by compare, subtract and bring down']],explain:'Start from the left. Take enough leading bits to be at least the divisor. Write 1 when the divisor fits and subtract it; write 0 when it does not. Bring down the next bit and repeat. Keep quotient places aligned with the dividend positions.',example:'110₂÷10₂. 10₂ fits into 11₂ once: write1, subtract10₂ leaving1; bring down0 to make10₂; 10₂ fits once:write1, remainder0. Quotient=11₂.',check:'Use long division to find 100₂÷10₂.',commonMistakes:['omitting a zero quotient digit when the divisor does not fit','subtracting without aligning','ending before all dividend bits are brought down']},
  {title:'Division with a remainder',terms:[['remainder condition','a valid remainder must be smaller than the divisor']],explain:'Not every binary division is exact. Continue until all dividend bits have been used. The final remainder must be less than the divisor. Check using dividend = divisor×quotient + remainder.',example:'111₂÷10₂ = 11₂ remainder1₂. Check:10₂×11₂+1₂ =110₂+1₂=111₂.',check:'Find 101₂÷10₂, giving quotient and remainder.',commonMistakes:['discarding the remainder','allowing remainder equal to or greater than divisor','checking with divisor+quotient instead of multiplication']},
  {title:'Choosing the correct operation from a problem',terms:[['operation clue','relationship in a problem indicating addition, subtraction, multiplication or division']],explain:'BECE questions may test the operation inside a short context. Total/combined often indicates addition; difference/remaining subtraction; equal groups or repeated groups multiplication; sharing/grouping division. Read the relationship rather than hunting keywords mechanically.',example:'Three binary quantities 101₂,110₂ and011₂ are combined: addition gives1110₂. If 110₂ items are shared equally into groups of10₂, division gives11₂ groups.',check:'A binary counter shows111₂ units and 10₂ are removed. Which operation is required and what remains?',commonMistakes:['choosing by one word without reading meaning','converting to decimal and forgetting to return to binary','mixing bases in the final answer']},
  {title:'Mixed-operation BECE-style reasoning',terms:[['mixed operation','question containing more than one arithmetic operation'],['order of operations','agreed sequence for evaluating grouped/multiple operations']],explain:'Although NERDC lists the four operations separately, exam readiness requires transfer. Brackets first, then multiplication/division, then addition/subtraction. Keep all quantities in binary or mark any checking conversion clearly.',example:'(101₂+11₂)×10₂ =1000₂×10₂=10000₂. Decimal check:(5+3)×2=16.',check:'Evaluate (111₂−10₂)×11₂ and give the answer in base two.',commonMistakes:['ignoring brackets','doing addition before an unbracketed multiplication','leaving the final answer in decimal when base two is requested']},
  {title:'BECE-style error diagnosis',terms:[['error diagnosis','finding the exact step where a solution becomes invalid']],explain:'A strong exam learner can inspect working. Test digit legality, alignment, carry/borrow, shift and inverse checks. This catches errors faster than redoing everything blindly.',example:'A student writes 11₂×11₂=111₂. Decimal values show3×3=9, but111₂=7, so it is wrong. Correct partial products 11 and110 add to1001₂.',check:'A student writes 101₂+11₂=110₂. Identify the error and give the correct sum.',commonMistakes:['saying only “wrong” without locating the error','checking an incorrect binary result with an incorrect decimal conversion','assuming a neat-looking answer is valid']},
  {title:'Final mastery method: calculate, explain, verify',terms:[['independent verification','checking by a different mathematical route']],explain:'For every difficult binary operation: (1) identify operation; (2) align place values; (3) apply binary digit rules; (4) show carry/borrow/partial products/division steps; (5) ensure every final digit is 0 or1; (6) verify through decimal or inverse operation. This is the exam-safe routine.',example:'For 111₂+101₂+010₂, compute in binary, then verify 7+5+2=14 and confirm the binary answer represents14.',check:'State the six-step routine you would use to protect marks in a binary-operation question.',commonMistakes:['giving answer only with no working in a structured question','using the same mistaken method as the check','failing to return a checked decimal value to the requested base']
  }
 ]
};

export const jss3BaseTwoOperationsQuestions:Jss3ProvisionalQuestion[]=[
 {id:'jss3-b2-01',prompt:'Evaluate 101₂+011₂.',options:['110₂','111₂','1000₂','1010₂'],correctAnswer:'1000₂',explanation:'5+3=8=1000₂. Binary carrying gives the same result.',difficulty:1,skill:'addition'},
 {id:'jss3-b2-02',prompt:'In binary, 1+1 equals:',options:['2₂','10₂','11₂','100₂'],correctAnswer:'10₂',explanation:'Decimal two is written 10 in base two.',difficulty:1,skill:'addition-facts'},
 {id:'jss3-b2-03',prompt:'In a column containing 1+1+1, what binary column total is represented?',options:['10₂','11₂','100₂','111₂'],correctAnswer:'11₂',explanation:'Three decimal is 11₂.',difficulty:1,skill:'addition-facts'},
 {id:'jss3-b2-04',prompt:'Evaluate 110₂+101₂.',options:['1011₂','1101₂','1110₂','1001₂'],correctAnswer:'1011₂',explanation:'6+5=11 and 11₁₀=1011₂.',difficulty:2,skill:'addition'},
 {id:'jss3-b2-05',prompt:'Evaluate 101₂+110₂+011₂.',options:['1100₂','1101₂','1110₂','1111₂'],correctAnswer:'1110₂',explanation:'5+6+3=14=1110₂.',difficulty:2,skill:'three-addend-addition'},
 {id:'jss3-b2-06',prompt:'Evaluate 111₂+101₂+010₂.',options:['1100₂','1110₂','10000₂','10110₂'],correctAnswer:'1110₂',explanation:'7+5+2=14=1110₂.',difficulty:2,skill:'three-addend-addition'},
 {id:'jss3-b2-07',prompt:'What does borrowing 1 from the next binary column provide in the current column?',options:['1₂','10₂','11₂','100₂'],correctAnswer:'10₂',explanation:'Each binary place is twice the place to its right.',difficulty:1,skill:'subtraction-foundation'},
 {id:'jss3-b2-08',prompt:'Evaluate 110₂−011₂.',options:['001₂','010₂','011₂','101₂'],correctAnswer:'011₂',explanation:'6−3=3=011₂.',difficulty:1,skill:'subtraction'},
 {id:'jss3-b2-09',prompt:'Evaluate 101₂−011₂.',options:['001₂','010₂','011₂','100₂'],correctAnswer:'010₂',explanation:'5−3=2=010₂.',difficulty:2,skill:'subtraction'},
 {id:'jss3-b2-10',prompt:'Evaluate 1000₂−0011₂.',options:['0101₂','0110₂','0111₂','1001₂'],correctAnswer:'0101₂',explanation:'8−3=5=0101₂; this requires borrowing across zeros.',difficulty:3,skill:'borrow-chain'},
 {id:'jss3-b2-11',prompt:'Which addition verifies 111₂−010₂=101₂?',options:['101₂+010₂=111₂','111₂+010₂=1001₂','101₂+111₂=1100₂','010₂+010₂=100₂'],correctAnswer:'101₂+010₂=111₂',explanation:'Difference + subtrahend must reproduce the minuend.',difficulty:2,skill:'inverse-check'},
 {id:'jss3-b2-12',prompt:'Evaluate 11₂×10₂.',options:['11₂','100₂','101₂','110₂'],correctAnswer:'110₂',explanation:'3×2=6=110₂; multiplying by10₂ shifts left one binary place.',difficulty:1,skill:'multiplication'},
 {id:'jss3-b2-13',prompt:'Evaluate 11₂×11₂.',options:['110₂','111₂','1000₂','1001₂'],correctAnswer:'1001₂',explanation:'3×3=9=1001₂. Partial products are11₂ and110₂.',difficulty:2,skill:'multiplication'},
 {id:'jss3-b2-14',prompt:'Why is the second partial product shifted left in binary long multiplication?',options:['To make the answer larger','Because that multiplier digit is in the 2s place','Because binary has no zero','To convert to decimal'],correctAnswer:'Because that multiplier digit is in the 2s place',explanation:'A one-place left shift represents multiplication by10₂=2₁₀.',difficulty:2,skill:'multiplication-reasoning'},
 {id:'jss3-b2-15',prompt:'Evaluate 10₂×10₂.',options:['10₂','11₂','100₂','1000₂'],correctAnswer:'100₂',explanation:'2×2=4=100₂.',difficulty:1,skill:'multiplication'},
 {id:'jss3-b2-16',prompt:'Evaluate 110₂÷10₂.',options:['10₂','11₂','100₂','110₂'],correctAnswer:'11₂',explanation:'6÷2=3=11₂.',difficulty:1,skill:'division'},
 {id:'jss3-b2-17',prompt:'Evaluate 100₂÷10₂.',options:['1₂','10₂','11₂','100₂'],correctAnswer:'10₂',explanation:'4÷2=2=10₂.',difficulty:1,skill:'division'},
 {id:'jss3-b2-18',prompt:'Evaluate 111₂÷10₂.',options:['10₂ remainder1₂','11₂ remainder1₂','11₂ remainder0','100₂ remainder1₂'],correctAnswer:'11₂ remainder1₂',explanation:'7÷2=3 remainder1;3=11₂.',difficulty:2,skill:'division-remainder'},
 {id:'jss3-b2-19',prompt:'Which equation correctly checks quotient q and remainder r?',options:['dividend=divisor×q+r','dividend=divisor+q+r','dividend=q÷divisor+r','divisor=dividend×q+r'],correctAnswer:'dividend=divisor×q+r',explanation:'This is the standard division check.',difficulty:2,skill:'division-check'},
 {id:'jss3-b2-20',prompt:'Evaluate (101₂+11₂)×10₂.',options:['1100₂','1110₂','10000₂','10100₂'],correctAnswer:'10000₂',explanation:'5+3=8;8×2=16=10000₂.',difficulty:2,skill:'mixed-operations'},
 {id:'jss3-b2-21',prompt:'Evaluate (111₂−10₂)×11₂.',options:['1100₂','1111₂','1001₂','1010₂'],correctAnswer:'1111₂',explanation:'7−2=5;5×3=15=1111₂.',difficulty:3,skill:'mixed-operations'},
 {id:'jss3-b2-22',prompt:'A student writes 11₂×11₂=111₂. Which is the correct result?',options:['110₂','111₂','1000₂','1001₂'],correctAnswer:'1001₂',explanation:'3×3=9 and9=1001₂; the second partial product must be shifted.',difficulty:2,skill:'error-analysis'},
 {id:'jss3-b2-23',prompt:'Which final answer cannot be a valid binary numeral?',options:['10101₂','1110₂','1201₂','10000₂'],correctAnswer:'1201₂',explanation:'Binary numerals contain only0 and1.',difficulty:1,skill:'digit-validity'},
 {id:'jss3-b2-24',prompt:'What is the safest independent check of 101₂+110₂=1011₂?',options:['Repeat the same written addition only','Convert both sides to base ten','Count the number of digits','Remove leading digits'],correctAnswer:'Convert both sides to base ten',explanation:'5+6=11 and1011₂=11, independently confirming the value.',difficulty:2,skill:'verification'},
 {id:'jss3-b2-25',prompt:'Which NERDC-level addition case is explicitly required at JSS3?',options:['Only two 1-digit numbers','Two or three 3-digit binary numbers','Five 6-digit numbers','Binary fractions only'],correctAnswer:'Two or three 3-digit binary numbers',explanation:'The official JSS3 performance objective explicitly requires two or three 3-digit binary numbers.',difficulty:1,skill:'scope'},
 {id:'jss3-b2-26',prompt:'Which multiplication case is the explicit NERDC JSS3 target?',options:['Two 2-digit binary numbers','Two 10-digit binary numbers','Binary fractions','Decimal by binary only'],correctAnswer:'Two 2-digit binary numbers',explanation:'NERDC specifies multiplication of two 2-digit binary numbers.',difficulty:1,skill:'scope'},
 {id:'jss3-b2-27',prompt:'A remainder after binary division must be:',options:['greater than divisor','equal to divisor','smaller than divisor','always1'],correctAnswer:'smaller than divisor',explanation:'Otherwise another division step is still possible.',difficulty:2,skill:'division-remainder'},
 {id:'jss3-b2-28',prompt:'If a binary multiplication by10₂ is performed, what happens to a whole-number binary numeral?',options:['It shifts one place left','It shifts one place right','Every1 becomes0','It becomes decimal'],correctAnswer:'It shifts one place left',explanation:'10₂ equals decimal2, and the positional shift multiplies the value by2.',difficulty:2,skill:'place-value'},
 {id:'jss3-b2-29',prompt:'Which is the correct result of 101₂+11₂?',options:['110₂','111₂','1000₂','1001₂'],correctAnswer:'1000₂',explanation:'5+3=8=1000₂.',difficulty:2,skill:'error-analysis'},
 {id:'jss3-b2-30',prompt:'Why should a learner not solve every binary problem only by converting to decimal?',options:['Decimal is forbidden','It prevents mastery of the required base-two operations even though decimal is useful for checking','Binary cannot be converted','BECE never accepts checking'],correctAnswer:'It prevents mastery of the required base-two operations even though decimal is useful for checking',explanation:'The curriculum explicitly requires performing the operations in base two; decimal conversion is a verification method.',difficulty:3,skill:'method'},
 {id:'jss3-b2-31',prompt:'Evaluate 101₂÷10₂.',options:['10₂ remainder1₂','11₂ remainder0','1₂ remainder1₂','100₂ remainder1₂'],correctAnswer:'10₂ remainder1₂',explanation:'5÷2=2 remainder1;2=10₂.',difficulty:2,skill:'division-remainder'},
 {id:'jss3-b2-32',prompt:'Which working order is correct for long binary division?',options:['Compare, write quotient bit, subtract, bring down','Add, carry, multiply, round','Borrow, add, shift, estimate','Convert, ignore remainder, round'],correctAnswer:'Compare, write quotient bit, subtract, bring down',explanation:'That is the standard long-division cycle in base two.',difficulty:2,skill:'division-method'}
];
