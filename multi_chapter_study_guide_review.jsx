import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Activity, Heart, AlertCircle, CheckCircle, ChevronRight, Menu, X, RefreshCw, MessageCircle, Thermometer, Clipboard, LogOut, Apple, Utensils, RotateCcw, ArrowRight, ArrowLeft, Shuffle, Stethoscope, Brain, Scale } from 'lucide-react';

const StudyGuide = () => {
  const [activeSection, setActiveSection] = useState('communication');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const content = {
    communication: {
      title: "Ch 8: Communication & Nurse-Patient Relationship",
      icon: <MessageCircle className="w-6 h-6" />,
      sections: [
        {
          header: "The Communication Process",
          text: "Communication is a continuous, circular process involving a sender, message, receiver, and feedback. It occurs verbally (spoken/written) and nonverbally (body language).",
          list: [
            { term: "Active Listening", def: "Requires concentration, focused energy, and use of all senses. Demonstrates interest and builds trust." },
            { term: "Nonverbal Cues", def: "Includes posture, gestures, tone, and facial expressions. Often conveys more meaning than words. Congruence is when verbal and nonverbal match." },
            { term: "Feedback", def: "Verifying the message was interpreted correctly (e.g., rephrasing)." }
          ]
        },
        {
          header: "Factors Affecting Communication",
          text: "Various factors influence how messages are sent and received.",
          list: [
            { term: "Cultural Differences", def: "Personal space, eye contact (averting eyes is normal in some cultures), meanings of words." },
            { term: "Past Experience", def: "Cultural values, education, familiarity with the topic, occupation." },
            { term: "Emotions/Mood", def: "Anxious patients may not hear correctly; upset persons may speak loudly." },
            { term: "Attitude", def: "Accepting attitude leads to open communication; negative perception leads to closed body language." }
          ]
        },
        {
          header: "Communicating with Special Populations",
          details: [
            { name: "Hearing Impaired", desc: "Get attention first. Face directly. Do not shout (distorts speech). Speak slowly/distinctly. Maintain 2.5-4 ft distance. Check hearing aid." },
            { name: "Aphasic", desc: "Difficulty expressing/understanding language. Use short phrases. Assume understanding. Use gestures/whiteboard. Give time to respond. Ask Yes/No questions." },
            { name: "Children", desc: "Approach at eye level. Use calm voice. Keep parent visible. Use simple explanations. Be honest about pain." },
            { name: "Older Adults", desc: "Allow time for response (slower processing). Ask one question at a time. Eliminate distractions. Do not rush." }
          ]
        },
        {
          header: "Therapeutic Techniques vs. Blocks",
          text: "Techniques to promote understanding vs. behaviors that hinder it.",
          list: [
            { term: "Therapeutic", def: "Open-ended questions ('Tell me more'), Silence, Restating, Clarifying, General leads ('Go on...'), Offering self, Summarizing." },
            { term: "Blocks", def: "False reassurance ('It'll be fine'), Giving advice ('If I were you...'), Changing subject, Defensive comments, Prying, Clichés." }
          ]
        },
        {
          header: "ISBAR-R Communication",
          text: "Standardized format for handoff and provider calls to ensure safety.",
          list: [
            { term: "I", def: "Introduction (Who you are, patient name/room)" },
            { term: "S", def: "Situation (What is happening now? e.g., Fall, BP spike)" },
            { term: "B", def: "Background (History, admission dx, meds)" },
            { term: "A", def: "Assessment (Current vitals, systems, physical assessment)" },
            { term: "R", def: "Recommendation (What do you want done? e.g., Transfer, Meds)" },
            { term: "R", def: "Readback (Verify orders)" }
          ]
        }
      ]
    },
    vitals: {
      title: "Ch 21: Vital Signs",
      icon: <Activity className="w-6 h-6" />,
      sections: [
        {
          header: "Normal Adult Ranges (Memorize These)",
          text: "The standard baseline values for a healthy adult.",
          list: [
            { term: "Temperature", def: "97.5°F - 99.5°F (36.4°C - 37.5°C)" },
            { term: "Pulse", def: "60 - 100 bpm" },
            { term: "Respirations", def: "12 - 20 breaths/min" },
            { term: "Blood Pressure", def: "Systolic < 120, Diastolic < 80" },
            { term: "Pulse Oximetry", def: "95% - 100%" }
          ]
        },
        {
          header: "Temperature Abnormalities",
          list: [
            { term: "Pyrexia (Fever)", def: "Temp > 100.2°F. Defense mechanism." },
            { term: "Hypothermia", def: "Temp < 95°F. Keep patient warm." },
            { term: "Hyperthermia", def: "Temp > 105.8°F. Risk of cell damage." }
          ]
        },
        {
          header: "Pulse & Respiration Terminology",
          details: [
            { name: "Pulse Rates", desc: "Tachycardia (>100), Bradycardia (<60)." },
            { name: "Pulse Deficit", desc: "Difference between Apical and Radial pulse (count both for 1 min)." },
            { name: "Resp Patterns", desc: "Dyspnea (difficult), Tachypnea (fast), Bradypnea (slow)." },
            { name: "Abnormal Breathing", desc: "Cheyne-Stokes (near death), Kussmaul (DKA), Biot (Brain injury)." }
          ]
        },
        {
          header: "Blood Pressure Concepts",
          text: "Force of blood against arterial walls.",
          list: [
            { term: "Hypertension", def: "Consistently > 140/90 mm Hg." },
            { term: "Hypotension", def: "Low BP. Risk of shock." },
            { term: "Orthostatic", def: "Drop in BP when standing (Safety risk!)." },
            { term: "Korotkoff Sounds", def: "Phase I (Tapping/Systolic) -> Phase V (Silence/Diastolic)." }
          ]
        }
      ]
    },
    assessment: {
      title: "Ch 22: Assessment",
      icon: <Stethoscope className="w-6 h-6" />,
      sections: [
        {
          header: "Examination Techniques",
          text: "The four primary techniques used in physical assessment.",
          list: [
            { term: "1. Inspection", def: "Visual observation (general appearance, skin, contours, behavior)." },
            { term: "2. Palpation", def: "Using hands to feel (size, shape, temp, turgor, tenderness, edema)." },
            { term: "3. Percussion", def: "Tapping to produce sounds (density, location of organs). Resonance over air, dullness over solid." },
            { term: "4. Auscultation", def: "Listening with stethoscope (heart, lungs, bowel sounds)." },
            { term: "5. Olfaction", def: "Sense of smell (fruity breath = ketoacidosis, foul = infection)." }
          ]
        },
        {
          header: "Neurologic Assessment",
          text: "Assessing Level of Consciousness (LOC) and pupillary response.",
          details: [
            { name: "Glasgow Coma Scale", desc: "Max 15. Eye Opening (4), Verbal Response (5), Motor Response (6). Score <7 indicates coma." },
            { name: "PERRLA", desc: "Pupils Equal, Round, Reactive to Light (brisk constriction), and Accommodation (constrict looking near, dilate looking far)." },
            { name: "Orientation", desc: "Person, Place, Time, Event (x4)." }
          ]
        },
        {
          header: "System Specifics",
          list: [
            { term: "Lung Sounds", def: "Vesicular (soft/rustling), Bronchovesicular (medium), Adventitious (Crackles/Rales, Rhonchi/Gurgles, Wheezes, Stridor, Pleural Rub)." },
            { term: "Heart Sounds", def: "S1 (Lub) at apex, S2 (Dub) at base. PMI at 5th ICS MCL. Murmurs are swishing sounds." },
            { term: "Bowel Sounds", def: "Normal (5-30/min), Hypoactive, Hyperactive, Absent (must listen 2-5 mins per quadrant)." },
            { term: "Edema", def: "Pitting vs Non-pitting. Check tibia/ankle. Turgor checks hydration (sternum/forearm - <3 sec return)." }
          ]
        },
        {
          header: "RNS HOPE Acronym",
          text: "Systematic way to perform assessment areas.",
          list: [
            { term: "R", def: "Rest and activity" },
            { term: "N", def: "Nutrition, fluids, electrolytes" },
            { term: "S", def: "Safety and security" },
            { term: "H", def: "Hygiene" },
            { term: "O", def: "Oxygenation" },
            { term: "P", def: "Psychosocial and learning" },
            { term: "E", def: "Elimination" }
          ]
        }
      ]
    },
    admissions: {
      title: "Ch 23: Admissions, Transfer, Discharge",
      icon: <LogOut className="w-6 h-6" />,
      sections: [
        {
          header: "Admission Types & Process",
          text: "Entry of a patient into the health care facility.",
          list: [
            { term: "Routine", def: "Scheduled in advance. Authorization obtained beforehand. Labs/X-rays may be done prior." },
            { term: "Emergency", def: "No prior planning. Sudden illness/injury. Stressful for patient/family. Stabilization is priority." },
            { term: "Orientation", def: "Show call bell, bathroom, TV, phone, visiting hours. Explain daily routine." },
            { term: "Valuables", def: "Send home if possible or lock in safe. Document everything on belongings list." }
          ]
        },
        {
          header: "Discharge & Transfer",
          text: "Discharge planning begins at admission.",
          details: [
            { name: "Transfer", desc: "Requires physician order. Notify family. Transfer belongings/meds. Report using ISBAR-R to receiving nurse." },
            { name: "Discharge AMA", desc: "Against Medical Advice. Notify provider. Explain risks (insurance may not pay). Have patient sign form. Document if refusal to sign." },
            { name: "Home Health", desc: "Skilled nursing, therapy, or aide services provided at home. Reduces infection risk, comfortable environment." }
          ]
        },
        {
          header: "Death & Post-Mortem",
          text: "Procedures following patient death.",
          list: [
            { term: "Pronouncement", desc: "Usually by physician (or RN in some states). Document time life signs ceased." },
            { term: "Autopsy", desc: "Required for sudden/suspicious deaths (Coroner's case) or if requested by family (family pays)." },
            { term: "Support", desc: "Allow family time. Offer spiritual support. Be present. Listen." }
          ]
        }
      ]
    },
    nutrition: {
      title: "Ch 26: Basic Nutrition",
      icon: <Apple className="w-6 h-6" />,
      sections: [
        {
          header: "Macronutrients & Water",
          text: "The body requires 6 classes of nutrients for energy, growth, and maintenance.",
          list: [
            { term: "Protein (4 cal/g)", def: "Builds/repairs tissue. 9 Essential AA (must eat) vs Nonessential. Complete (animal/soy) vs Incomplete (plant)." },
            { term: "Carbohydrates (4 cal/g)", def: "Main energy source. Simple (sugar) vs Complex (starch). Fiber (21-38g) aids elimination." },
            { term: "Fats (9 cal/g)", def: "Concentrated energy, insulation, hormone synthesis. Saturated (solid) vs Unsaturated (oil)." },
            { term: "Water", def: "Most essential nutrient. 50-60% of adult weight. Intake should approx equal output + 500mL." }
          ]
        },
        {
          header: "Vitamins & Minerals (Deficiencies)",
          text: "Micronutrients essential for metabolism.",
          details: [
            { name: "Vitamin C", desc: "Wound healing, immune function. Deficiency: Scurvy (bleeding gums)." },
            { name: "Vitamin D", desc: "Calcium absorption. Deficiency: Rickets (bone softening)." },
            { name: "Vitamin B12", desc: "Nerve function, RBCs. Found in animal products. Vegans at risk for Pernicious Anemia." },
            { name: "Iron", desc: "Hemoglobin formation. Deficiency: Anemia (fatigue, pallor)." },
            { name: "Iodine", desc: "Thyroid function. Deficiency: Goiter." }
          ]
        },
        {
          header: "Lifespan Nutrition",
          list: [
            { term: "Infants", def: "Breast milk/formula 1st yr. Solids at 4-6mo (rice cereal first). No honey/cow milk <1yr." },
            { term: "Adolescents", def: "High caloric needs (growth spurt). Watch for Iron/Calcium deficits and eating disorders." },
            { term: "Pregnancy", def: "Increased protein, iron, folic acid (prevents neural tube defects)." },
            { term: "Older Adults", def: "Decreased metabolism = fewer calories. Risk of dehydration and malnutrition." }
          ]
        },
        {
          header: "Diets & Culture",
          list: [
            { term: "BMI Categories", def: "<18.5 (Under), 18.5-24.9 (Healthy), 25-29.9 (Over), >30 (Obese)." },
            { term: "Vegetarian", def: "Vegan (no animal products - need B12), Lacto-ovo (dairy/eggs ok)." },
            { term: "Religious", def: "Islam (Halal, no pork/alcohol), Judaism (Kosher, no pork/shellfish, sep meat/dairy), SDA (Vegetarian, no caffeine/alcohol)." }
          ]
        }
      ]
    },
    ch27: {
      title: "Ch 27: Diet Therapy & Assisted Feeding",
      icon: <Utensils className="w-6 h-6" />,
      sections: [
        {
          header: "Therapeutic Diets",
          text: "Dietary modifications used as part of the treatment of disease or clinical conditions.",
          list: [
            { term: "Soft Diet", def: "Low in fiber; foods softened by cooking, mashing, or chopping. Used for GI recovery or chewing issues." },
            { term: "Mechanical Soft", def: "Regular diet physically modified (ground/chopped) for ease of chewing." },
            { term: "High Fiber", def: "Used for constipation. Requires increased fluid intake." },
            { term: "Low Sodium", def: "Used for hypertension, heart failure, edema. Limits salt." }
          ]
        },
        {
          header: "Assisting with Feeding",
          text: "Promoting independence and safety during meals.",
          list: [
            { term: "Visually Impaired", def: "Use the 'clock face' method to describe food location." },
            { term: "Dysphagia", def: "Difficulty swallowing. Sit upright (90 degrees). Thicken liquids. Tuck chin when swallowing." },
            { term: "Feeding Aids", def: "Adaptive utensils (built-up handles, plate guards) promote independence." }
          ]
        }
      ]
    },
    deepDive: {
      title: "Deep Dive into Pathophysiology and Clinical Management",
      icon: <Activity className="w-6 h-6" />,
      sections: [] // Managed by DeepDiveFlashcards component
    },
    quiz: {
      title: "Knowledge Check",
      icon: <BookOpen className="w-6 h-6" />
    }
  };

  const FizzySparks = () => {
    const { particles, styles } = useMemo(() => {
      let css = '';
      const particleData = [];
      const random = (max) => Math.floor(Math.random() * max);

      for (let i = 1; i <= 20; i++) {
        const name = `spot-bot-${i}`;
        css += `
          @keyframes ${name} {
            from { opacity: 0; }
            to { transform: translateY(30px) translateX(${-20 + i * 2}px); opacity: 0.6; }
          }
        `;
        particleData.push({
          id: `bot-${i}-${Math.random()}`,
          animationName: name,
          left: -10 + (i * 5) + '%',
          top: '80%',
          color: `hsla(${350 + random(399)}, ${57 - random(10)}%, 85%, 1)`,
          duration: 0.7 + random(10)/10 + 's',
          delay: random(10)/10 + 's'
        });
      }

      for (let i = 20; i <= 40; i++) {
        const name = `spot-top-${i}`;
        css += `
          @keyframes ${name} {
            from { opacity: 0; }
            to { transform: translateY(-30px) translateX(${-50 + (i - 20) * 5}px); opacity: 0.6; }
          }
        `;
        particleData.push({
          id: `top-${i}-${Math.random()}`,
          animationName: name,
          left: -20 + ((i - 20) * 6) + '%',
          top: '10%',
          color: `hsla(${180 + random(50)}, ${70}%, 80%, 1)`,
          duration: 0.6 + random(10)/10 + 's',
          delay: random(10)/10 + 's'
        });
      }

      return { particles: particleData, styles: css };
    }, []);

    return (
      <div className="fizzy-container absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <style>{styles}</style>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-0 transition-opacity duration-300"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: p.color,
              left: p.left,
              top: p.top,
              boxShadow: '0 0 10px rgba(255,255,255,0.4)',
              animation: `${p.animationName} ${p.duration} ${p.delay} linear infinite`
            }}
          />
        ))}
      </div>
    );
  };

  const DeepDiveFlashcards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    
    const rawFlashcards = useMemo(() => [
      {
        id: 1,
        topic: "ISBAR-R",
        mechanism: "Standardized handoff communication tool.",
        cues: "Introduction, Situation, Background, Assessment, Recommendation, Readback.",
        intervention: "Use during shift report and when calling providers to reduce errors.",
        source: "Textbook p. 115 / Lecture Slide 30"
      },
      {
        id: 2,
        topic: "Therapeutic Communication: Silence",
        mechanism: "Appropriate use of pauses in conversation.",
        cues: "Patient needs time to think or is emotional.",
        intervention: "Remain attentive, use open body language. Do not rush to fill the void.",
        source: "Textbook p. 105 / Lecture Slide 14"
      },
      {
        id: 3,
        topic: "Orthostatic Hypotension",
        mechanism: "Failure of vasomotor compensatory mechanisms on standing.",
        cues: "Drop in SBP >20 or DBP >10 with increased pulse when standing. Dizziness.",
        intervention: "Measure BP lying, sitting, standing. Change positions slowly.",
        source: "Textbook p. 371 / Lecture Slide 31"
      },
      {
        id: 4,
        topic: "Pulse Deficit",
        mechanism: "Inefficient contraction of the heart fails to transmit pulse wave to periphery.",
        cues: "Apical pulse rate is higher than Radial pulse rate.",
        intervention: "Two nurses measure simultaneously for 1 full minute. Subtract Radial from Apical.",
        source: "Textbook p. 358 / Lecture Slide 20"
      },
      {
        id: 5,
        topic: "Cheyne-Stokes Respirations",
        mechanism: "Abnormal pattern of breathing.",
        cues: "Faster/deeper breaths -> slower/shallower breaths -> period of apnea.",
        intervention: "Monitor closely; often seen in critically ill or end-of-life patients.",
        source: "Textbook p. 363 / Lecture Slide 24"
      },
      {
        id: 6,
        topic: "Lithotomy Position",
        mechanism: "Positioning for examination.",
        cues: "Supine with legs separated, flexed, and supported in stirrups.",
        intervention: "Used for female pelvic exams. Ensure proper draping for privacy.",
        source: "Textbook p. 392 / Lecture Slide 33"
      },
      {
        id: 7,
        topic: "Auscultation",
        mechanism: "Listening to sounds produced by the body.",
        cues: "Using a stethoscope.",
        intervention: "Use diaphragm for high-pitched (lung/bowel/S1-S2). Use bell for low-pitched (murmurs).",
        source: "Textbook p. 380 / Lecture Slide 12"
      },
      {
        id: 8,
        topic: "Against Medical Advice (AMA)",
        mechanism: "Patient leaves hospital before discharge order.",
        cues: "Patient insists on leaving.",
        intervention: "Notify provider. Explain risks. Have patient sign AMA form. Document refusal if they won't sign.",
        source: "Textbook p. 404 / Lecture Slide 31"
      },
      {
        id: 9,
        topic: "Kwashiorkor",
        mechanism: "Severe protein deficiency with adequate calories.",
        cues: "Edema (ascites), skin pigment changes, reddish hair.",
        intervention: "Protein supplementation. Differentiate from Marasmus (wasting).",
        source: "Textbook p. 463 / Lecture Slide 22"
      },
      {
        id: 10,
        topic: "Fat-Soluble Vitamins",
        mechanism: "Vitamins stored in liver and fat; risk of toxicity.",
        cues: "Vitamins A, D, E, K.",
        intervention: "Monitor intake; excess can lead to toxicity (unlike water-soluble B & C).",
        source: "Textbook p. 466 / Lecture Slide 36"
      }
    ], []);

    const shuffleArray = (array) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
      setFlashcards(shuffleArray(rawFlashcards));
    }, [rawFlashcards]);

    const handleShuffle = () => {
      setIsFlipped(false);
      setTimeout(() => {
        setFlashcards(shuffleArray(rawFlashcards));
        setCurrentIndex(0);
      }, 200);
    };

    const handleNext = () => {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
      }, 200);
    };

    const handlePrev = () => {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
      }, 200);
    };

    if (flashcards.length === 0) return null;

    const currentCard = flashcards[currentIndex];

    return (
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .front-face:hover .fizzy-container > div { opacity: 0.6; }
        `}</style>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">Clinical Judgment Flashcards</h2>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
        </div>

        <div 
          className="relative h-96 w-full cursor-pointer perspective-1000 group"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            <div className="front-face absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 flex flex-col items-center justify-center text-white overflow-hidden">
              <FizzySparks />
              <Activity className="w-12 h-12 mb-4 opacity-80 relative z-10" />
              <h3 className="text-2xl font-bold text-center leading-tight relative z-10">{currentCard.topic}</h3>
              <p className="mt-6 text-indigo-200 text-sm font-medium animate-pulse relative z-10">Tap to reveal details</p>
            </div>

            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl p-8 border-2 border-indigo-100 overflow-y-auto">
              <div className="space-y-4 text-left">
                <div>
                  <h4 className="text-xs font-bold uppercase text-indigo-500 tracking-wider mb-1">Definition / Concept</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{currentCard.mechanism}</p>
                </div>
                
                <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider mb-1">Critical Cues</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{currentCard.cues}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <h4 className="text-xs font-bold uppercase text-green-700 tracking-wider mb-1">Clinical Action</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{currentCard.intervention}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 mt-2">
                  <span className="text-xs text-gray-400 italic">Source: {currentCard.source}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="p-3 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 shadow-md transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {isFlipped ? 'Show Topic' : 'Reveal Answer'}
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleShuffle(); }}
            className="p-3 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm"
          >
            <Shuffle className="w-6 h-6" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="p-3 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

  const QuizComponent = () => {
    const rawQuizData = useMemo(() => [
      {
        id: 1,
        type: 'single',
        question: "A nurse is admitting a patient with a known hearing impairment. Which communication technique is appropriate?",
        options: [
          "Speak loudly into the patient's ear.",
          "Maintain a distance of 2.5 to 4 feet and face the patient.",
          "Speak quickly to ensure they get all information.",
          "Turn off the hearing aid to reduce background noise."
        ],
        answer: 1,
        rationale: "Maintain a distance of 2.5 to 4 feet, face the person directly, speak slowly and distinctly. Do not shout.",
        source: "Chapter 8",
        tip: "Nonverbal cues are crucial for hearing-impaired patients."
      },
      {
        id: 2,
        type: 'multi',
        question: "Which of the following are blocks to effective communication? (Select All That Apply)",
        options: [
          "Using silence",
          "Giving false reassurance",
          "Changing the subject",
          "Restating",
          "Giving advice"
        ],
        answer: [1, 2, 4],
        rationale: "Giving false reassurance, changing the subject, and giving advice are blocks. Silence and restating are therapeutic techniques.",
        source: "Chapter 8",
        tip: "If it shuts down the patient's feelings, it's a block."
      },
      {
        id: 3,
        type: 'single',
        question: "The nurse measures a patient's blood pressure and obtains 150/94 mm Hg. This is classified as:",
        options: [
          "Normal",
          "Hypotension",
          "Hypertension",
          "Prehypertension"
        ],
        answer: 2,
        rationale: "Hypertension is consistently elevated pressure above 140/90 mm Hg.",
        source: "Chapter 21",
        tip: ">140/90 is the threshold for hypertension."
      },
      {
        id: 4,
        type: 'single',
        question: "A patient has a temperature of 102.5°F. Which term correctly describes this condition?",
        options: [
          "Hypothermia",
          "Pyrexia",
          "Crisis",
          "Lysis"
        ],
        answer: 1,
        rationale: "Pyrexia (fever) occurs when body temperature rises above 100.2°F.",
        source: "Chapter 21",
        tip: "Pyro = Fire/Heat."
      },
      {
        id: 5,
        type: 'single',
        question: "Which physical assessment technique involves tapping the body surface to produce sounds?",
        options: [
          "Inspection",
          "Palpation",
          "Percussion",
          "Auscultation"
        ],
        answer: 2,
        rationale: "Percussion involves light, quick tapping on the body surface to produce sounds that reflect the density of underlying organs.",
        source: "Chapter 22",
        tip: "Percussion = Tapping (like a drum)."
      },
      {
        id: 6,
        type: 'single',
        question: "A patient decides to leave the hospital before the physician authorizes discharge. This is documented as:",
        options: [
          "Routine discharge",
          "Transfer",
          "Against Medical Advice (AMA)",
          "Emergency discharge"
        ],
        answer: 2,
        rationale: "Leaving against the primary care provider's advice is AMA. The patient must sign a form acknowledging the risks.",
        source: "Chapter 23",
        tip: "AMA = Against Medical Advice."
      },
      {
        id: 7,
        type: 'multi',
        question: "Which of the following are fat-soluble vitamins? (Select All That Apply)",
        options: [
          "Vitamin C",
          "Vitamin A",
          "Vitamin D",
          "Vitamin B12",
          "Vitamin K"
        ],
        answer: [1, 2, 4],
        rationale: "Vitamins A, D, E, and K are fat-soluble and stored in the body. B and C are water-soluble.",
        source: "Chapter 26",
        tip: "Remember 'ADEK'."
      },
      {
        id: 8,
        type: 'single',
        question: "The nurse is caring for an Orthodox Jewish patient. Which dietary consideration is most important?",
        options: [
          "No alcohol is allowed.",
          "Meat and milk may not be eaten at the same meal.",
          "Pork is the preferred meat.",
          "Vegetarian diet is required."
        ],
        answer: 1,
        rationale: "Kosher laws prohibit mixing meat and dairy. Pork and shellfish are prohibited.",
        source: "Chapter 26",
        tip: "Kosher: No pork, no mixing meat/dairy."
      },
      {
        id: 9,
        type: 'single',
        question: "Which breathing pattern is characterized by periods of deep, rapid breathing followed by periods of apnea?",
        options: [
          "Eupnea",
          "Cheyne-Stokes",
          "Kussmaul",
          "Bradypnea"
        ],
        answer: 1,
        rationale: "Cheyne-Stokes respirations consist of dyspnea (faster/deeper) followed by a short period of apnea. Often seen in critical illness.",
        source: "Chapter 21",
        tip: "Think 'Death Rattle' pattern - often end of life."
      },
      {
        id: 10,
        type: 'single',
        question: "To measure an apical pulse, where should the nurse place the stethoscope?",
        options: [
          "Second intercostal space, right sternal border",
          "Fourth intercostal space, left sternal border",
          "Fifth intercostal space, midclavicular line",
          "Carotid artery"
        ],
        answer: 2,
        rationale: "The apex of the heart is located at the fifth intercostal space at the midclavicular line.",
        source: "Chapter 21",
        tip: "5th ICS, MCL = Apex."
      }
    ], []);

    const shuffleArray = (array) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [missedQuestions, setMissedQuestions] = useState([]);

    useEffect(() => {
      setQuestions(shuffleArray(rawQuizData));
    }, [rawQuizData]);

    const currentQuestion = questions[currentIndex];
    const isMulti = currentQuestion?.type === 'multi';

    const handleOptionSelect = (idx) => {
      if (isSubmitted) return;
      if (isMulti) {
        if (selectedIndices.includes(idx)) {
          setSelectedIndices(selectedIndices.filter(i => i !== idx));
        } else {
          setSelectedIndices([...selectedIndices, idx]);
        }
      } else {
        setSelectedIndices([idx]);
      }
    };

    const handleSubmit = () => {
      setIsSubmitted(true);
      let correct = false;
      if (isMulti) {
        const correctIndices = currentQuestion.answer.sort();
        const userIndices = [...selectedIndices].sort();
        correct = (correctIndices.length === userIndices.length) &&
                  correctIndices.every((val, index) => val === userIndices[index]);
      } else {
        correct = selectedIndices[0] === currentQuestion.answer;
      }

      if (correct) {
        setScore(prev => prev + 1);
      } else {
        setMissedQuestions(prev => [...prev, currentQuestion]);
      }
    };

    const handleNext = () => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedIndices([]);
        setIsSubmitted(false);
        document.getElementById('quiz-top')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setShowResults(true);
      }
    };

    const handleRetakeAll = () => {
      setQuestions(shuffleArray(rawQuizData));
      resetQuiz();
    };

    const handleRetakeMissed = () => {
      setQuestions(shuffleArray(missedQuestions));
      resetQuiz();
    };

    const resetQuiz = () => {
      setCurrentIndex(0);
      setSelectedIndices([]);
      setIsSubmitted(false);
      setScore(0);
      setMissedQuestions([]);
      setShowResults(false);
    };

    if (!currentQuestion) return <div className="p-10 text-center">Loading Quiz...</div>;

    if (showResults) {
      const percentage = Math.round((score / questions.length) * 100);
      return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto mt-8 animate-fadeIn">
          <div className="bg-[#2c3e50] p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Review Completed</h2>
          </div>
          <div className="p-10 text-center">
            <div className="w-40 h-40 bg-[#2c3e50] text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg">
              {percentage}%
            </div>
            <p className="text-lg text-slate-700 mb-8 font-medium">
              {percentage >= 80 ? "Great job! You are ready." : "Review the missed concepts."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={handleRetakeAll} className="px-6 py-3 bg-[#2c3e50] text-white rounded-full font-semibold hover:bg-slate-700 transition-transform active:scale-95 shadow-md">
                Retake Full Quiz
              </button>
              {missedQuestions.length > 0 && (
                <button onClick={handleRetakeMissed} className="px-6 py-3 bg-[#3498db] text-white rounded-full font-semibold hover:bg-blue-600 transition-transform active:scale-95 shadow-md">
                  Retake Missed
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id="quiz-top" className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-xl overflow-hidden font-sans animate-fadeIn">
        <div className="w-full h-2 bg-gray-200">
          <div className="h-full bg-[#27ae60] transition-all duration-300 ease-out" style={{ width: `${((currentIndex) / questions.length) * 100}%` }} />
        </div>
        <div className="bg-[#2c3e50] p-6 flex justify-between items-center text-white">
          <span className="font-bold text-lg tracking-wide">Exam 3 Review Quiz</span>
        </div>
        <div className="p-8">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <h2 className="text-xl font-semibold text-[#2c3e50] mb-6 leading-relaxed">{currentQuestion.question}</h2>
          {isMulti && (
            <span className="inline-block bg-yellow-50 text-[#e74c3c] text-sm font-bold px-3 py-1 rounded mb-4 border border-yellow-100">
              Select All That Apply
            </span>
          )}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let baseStyle = "flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ";
              let statusStyle = "border-gray-200 hover:bg-gray-50";
              const isSelected = selectedIndices.includes(idx);
              const isCorrectAnswer = isMulti ? currentQuestion.answer.includes(idx) : currentQuestion.answer === idx;

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  statusStyle = "bg-green-50 border-green-500";
                  if (!isSelected) statusStyle += " border-dashed";
                } else if (isSelected) {
                  statusStyle = "bg-red-50 border-red-500";
                } else {
                  statusStyle = "border-gray-100 opacity-50";
                }
              } else if (isSelected) {
                statusStyle = "bg-blue-50 border-[#3498db] shadow-sm";
              }

              return (
                <div key={idx} onClick={() => handleOptionSelect(idx)} className={`${baseStyle} ${statusStyle}`}>
                  <div className={`w-5 h-5 mt-1 mr-4 rounded flex-shrink-0 border-2 flex items-center justify-center ${isMulti ? 'rounded-md' : 'rounded-full'} ${isSelected ? 'border-[#3498db] bg-[#3498db]' : 'border-gray-300'} ${isSubmitted && isCorrectAnswer ? '!border-green-500 !bg-green-500' : ''} ${isSubmitted && isSelected && !isCorrectAnswer ? '!border-red-500 !bg-red-500' : ''}`}>
                    {isSelected && !isSubmitted && <div className="w-2 h-2 bg-white rounded-full" />}
                    {isSubmitted && isCorrectAnswer && <CheckCircle className="w-3 h-3 text-white" />}
                    {isSubmitted && isSelected && !isCorrectAnswer && <X className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-base ${isSubmitted && isCorrectAnswer ? 'font-medium text-green-800' : 'text-gray-700'}`}>{option}</span>
                </div>
              );
            })}
          </div>
        </div>
        {isSubmitted && (
          <div className="bg-gray-50 border-t border-gray-200 p-8 animate-fadeIn">
            <h4 className={`text-lg font-bold mb-2 ${(isMulti ? (currentQuestion.answer.length === selectedIndices.length && currentQuestion.answer.every(v => selectedIndices.includes(v))) : selectedIndices[0] === currentQuestion.answer) ? 'text-[#27ae60]' : 'text-[#e74c3c]'}`}>
              {(isMulti ? (currentQuestion.answer.length === selectedIndices.length && currentQuestion.answer.every(v => selectedIndices.includes(v))) : selectedIndices[0] === currentQuestion.answer) ? 'Correct!' : 'Incorrect'}
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">{currentQuestion.rationale}</p>
            {currentQuestion.tip && (
              <div className="bg-blue-50 border-l-4 border-[#3498db] p-3 rounded mb-3">
                <p className="text-sm text-[#3498db] font-bold">💡 Exam Tip: <span className="font-normal text-slate-700">{currentQuestion.tip}</span></p>
              </div>
            )}
            <span className="text-xs text-gray-500 italic block">Source: {currentQuestion.source}</span>
          </div>
        )}
        <div className="p-6 bg-white border-t border-gray-100 text-right">
          {!isSubmitted ? (
            <button onClick={handleSubmit} disabled={selectedIndices.length === 0} className="px-8 py-3 bg-[#3498db] text-white rounded-full font-bold shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:translate-y-px">
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="px-8 py-3 bg-[#27ae60] text-white rounded-full font-bold shadow-md hover:bg-green-600 transition-all active:translate-y-px flex items-center ml-auto">
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderSection = (data, colorClass) => (
    <div className="space-y-6 animate-fadeIn">
      {data.sections.map((section, idx) => (
        <div key={idx} className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${colorClass}`}>
          <h3 className="text-xl font-bold text-slate-800 mb-3">{section.header}</h3>
          {section.text && <p className="text-slate-600 mb-4">{section.text}</p>}
          {section.list && (
            <div className="grid gap-3">
              {section.list.map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className={`font-bold ${colorClass.replace('border-', 'text-')}`}>{item.term}:</span> <span className="text-slate-700">{item.def}</span>
                </div>
              ))}
            </div>
          )}
          {section.details && (
            <div className="space-y-3 mt-3">
              {section.details.map((detail, i) => (
                <div key={i} className={`p-4 rounded-md bg-opacity-10 ${colorClass.replace('border-', 'bg-')}`}>
                  <h4 className={`font-bold ${colorClass.replace('border-', 'text-').replace('600', '800')}`}>{detail.name}</h4>
                  <p className="text-sm text-slate-700 mt-1">{detail.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
      {/* Styles to hide the scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={toggleSidebar} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out flex flex-col h-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight"> Fundamental: Exam 3 Review</h1>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">STUDY GUIDE</div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-white"><X className="w-6 h-6" /></button>
        </div>
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto hide-scrollbar">
          {Object.entries(content).map(([key, section]) => (
            <button key={key} onClick={() => { setActiveSection(key); setSidebarOpen(false); }} className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${activeSection === key ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}>
              <span className={`${activeSection === key ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>{section.icon}</span>
              <span className="ml-3 font-medium text-left leading-tight">{section.title}</span>
              {activeSection === key && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 text-xs text-slate-500 shrink-0">Based on Chapters 8, 21, 22, 23, 26, 27</div>
      </aside>
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="bg-white shadow-sm p-4 flex items-center lg:hidden z-10">
          <button onClick={toggleSidebar} className="text-slate-600 mr-4"><Menu className="w-6 h-6" /></button>
          <h2 className="font-bold text-lg text-slate-800">{content[activeSection].title}</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto">
            <header className="hidden lg:block mb-8 border-b pb-4 border-slate-200">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">{content[activeSection].icon}</span>
                {content[activeSection].title}
              </h2>
            </header>
            {activeSection === 'communication' && renderSection(content.communication, 'border-purple-600')}
            {activeSection === 'vitals' && renderSection(content.vitals, 'border-red-600')}
            {activeSection === 'assessment' && renderSection(content.assessment, 'border-blue-600')}
            {activeSection === 'admissions' && renderSection(content.admissions, 'border-green-600')}
            {activeSection === 'nutrition' && renderSection(content.nutrition, 'border-orange-600')}
            {activeSection === 'ch27' && renderSection(content.ch27, 'border-teal-600')}
            {activeSection === 'deepDive' && <DeepDiveFlashcards />}
            {activeSection === 'quiz' && <QuizComponent />}
          </div>
          <div className="h-20" />
        </div>
      </main>
    </div>
  );
};

export default StudyGuide;
