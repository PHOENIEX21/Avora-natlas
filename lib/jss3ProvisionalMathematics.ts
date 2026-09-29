import type {TutorPlan} from './tutorCurriculum';

export const JSS3_PROVISIONAL_SOURCE = {
  key: 'nerdc-jss3-provisional-prior-cycle',
  status: 'PROVISIONAL_NERDC_BASELINE',
  authority: 'NERDC prior-cycle JSS3 Mathematics curriculum',
  enrichment: ['New General Mathematics JSS3', 'BECE-level worked application'],
  warning: 'Do not label this lesson as the September 2025 revised NERDC curriculum. Replace or migrate objective-by-objective when the new official JSS3 tables are available.'
} as const;

export const jss3WholeNumbersTopic =
  'Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)';

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
