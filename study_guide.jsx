import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Activity, Heart, AlertCircle, CheckCircle, ChevronRight, Menu, X, RefreshCw, Utensils, Apple, Scale, RotateCcw, ArrowRight, ArrowLeft, Shuffle } from 'lucide-react';

const StudyGuide = () => {
  const [activeSection, setActiveSection] = useState('anatomy');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const content = {
    anatomy: {
      title: "Digestive System Overview",
      icon: <Utensils className="w-6 h-6" />,
      sections: [
        {
          header: "GI Tract Anatomy",
          text: "The gastrointestinal (GI) system is composed of the alimentary canal and accessory organs. It breaks down food for absorption and metabolism.",
          list: [
            { term: "Mouth", def: "Receives food, breaks it down (mastication), and mixes it with saliva." },
            { term: "Pharynx", def: "Connects nasal/oral cavities to esophagus; passageway for food." },
            { term: "Esophagus", def: "Muscular tube (20cm) that propels food to the stomach via peristalsis." },
            { term: "Stomach", def: "Temporary storage; mixes food with gastric juices to form chyme; begins protein digestion." }
          ]
        },
        {
          header: "Intestines & Absorption",
          text: "The majority of digestion and absorption occurs here.",
          list: [
            { term: "Small Intestine", def: "Includes duodenum, jejunum, ileum. Finishes digestion and absorbs nutrients." },
            { term: "Large Intestine", def: "Includes cecum, colon (ascending, transverse, descending, sigmoid), rectum. Absorbs fluid/electrolytes and eliminates waste." }
          ]
        },
        {
          header: "Accessory Organs",
          text: "Organs that aid digestion but are not part of the tract itself.",
          details: [
            { name: "Liver", desc: "Produces bile for fat digestion; plays major role in metabolism of all nutrients." },
            { name: "Gallbladder", desc: "Stores and concentrates bile; releases it into the duodenum." },
            { name: "Pancreas", desc: "Secretes digestive enzymes for carbs, proteins, fats; produces insulin." }
          ]
        }
      ]
    },
    physiology: {
      title: "Essential Nutrients",
      icon: <Apple className="w-6 h-6" />,
      sections: [
        {
          header: "The Digestive Sequence",
          interactive: true,
          steps: [
            "Ingestion (Mouth)",
            "Mechanical/Chemical Digestion (Saliva)",
            "Swallowing (Pharynx -> Esophagus)",
            "Stomach (Chyme formation)",
            "Small Intestine (Bile/Enzymes added)",
            "Absorption of Nutrients (Villi)",
            "Large Intestine (Water Absorption)",
            "Rectum (Storage)",
            "Elimination (Anus)"
          ]
        },
        {
          header: "Macronutrients",
          text: "Nutrients required in large amounts for energy and structure.",
          list: [
            { term: "Protein", def: "4 cal/g. Builds/repairs tissue. Composed of amino acids (9 essential, 11 nonessential)." },
            { term: "Carbohydrates", def: "4 cal/g. Main energy source. Simple (sugars) vs. Complex (starches/fiber)." },
            { term: "Fats (Lipids)", def: "9 cal/g. Concentrated energy, insulation, hormone production. Saturated vs. Unsaturated." }
          ]
        },
        {
          header: "Micronutrients & Water",
          text: "Essential for metabolic processes.",
          list: [
            { term: "Vitamins", def: "Organic compounds. Water-soluble (B, C) vs. Fat-soluble (A, D, E, K)." },
            { term: "Minerals", def: "Inorganic. Major (Ca, Mg, Na, K) vs. Trace (Fe, Zn, I). Regulate acid-base/fluid balance." },
            { term: "Water", def: "Most essential nutrient. Adult body is 50-60% water. Required for all chemical processes." }
          ]
        },
        {
          header: "Water Requirement Rule",
          text: "General rule for fluid maintenance.",
          formula: "Intake ≈ Output + 500 mL",
          note: "Adults require approx 1 mL/calorie of intake."
        }
      ]
    },
    pathology: {
      title: "Guidelines & Culture",
      icon: <Scale className="w-6 h-6" />,
      sections: [
        {
          header: "Nutritional Guidelines",
          list: [
            { term: "USDA MyPlate", desc: "Half the plate should be fruits and vegetables. Emphasizes whole grains and low-fat dairy." },
            { term: "BMI (Body Mass Index)", desc: "Healthy: 18.5-24.9. Overweight: 25-29.9. Obese: >30. Morbidly Obese: >40." },
            { term: "Dietary Fiber", desc: "Rec: 21-38g/day. Increases stool bulk, lowers cholesterol, stabilizes blood sugar." }
          ]
        },
        {
          header: "Malnutrition Disorders",
          list: [
            { term: "Marasmus", desc: "Severe starvation/calorie deficiency. Wasting of fat and muscle. Common in first year of life." },
            { term: "Kwashiorkor", desc: "Severe protein deficiency despite adequate calories. Symptoms: Edema, pot-belly, liver changes." },
            { term: "Iron Deficiency Anemia", desc: "Lack of iron affects hemoglobin formation. Sources: Red meat, spinach, fortified cereals." }
          ]
        },
        {
          header: "Cultural Considerations",
          text: "Religious and cultural background strongly influences dietary habits.",
          subsections: [
            { title: "Religious Restrictions", desc: "Islam: No pork/alcohol. Judaism: Kosher (no mixing meat/milk, no pork/shellfish). Seventh-Day Adventist: Vegetarianism common, no caffeine/alcohol." },
            { title: "Cultural Patterns", desc: "Asian: High veg/rice, low meat, stir-fry (watch sodium). Hispanic: High carb (beans/corn/rice), fried foods (watch fat). African American: Greens, pork, fried foods (watch sodium/fat/sugar)." }
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

  // --- Fizzy Sparks Component (Internal) ---
  const FizzySparks = () => {
    // Generate random particles and keyframes once
    const { particles, styles } = useMemo(() => {
      let css = '';
      const particleData = [];
      
      // Generator for random numbers
      const random = (max) => Math.floor(Math.random() * max);

      // Loop 1: Bottom spread
      for (let i = 1; i <= 20; i++) {
        const name = `spot-bot-${i}`; // Unique animation name
        css += `
          @keyframes ${name} {
            from { opacity: 0; }
            to { transform: translateY(30px) translateX(${-20 + i * 2}px); opacity: 0.6; }
          }
        `;
        particleData.push({
          id: `bot-${i}-${Math.random()}`, // Unique ID
          animationName: name,
          left: -10 + (i * 5) + '%', // Spread across width
          top: '80%',
          color: `hsla(${350 + random(399)}, ${57 - random(10)}%, 85%, 1)`,
          duration: 0.7 + random(10)/10 + 's',
          delay: random(10)/10 + 's'
        });
      }

      // Loop 2: Top spread
      for (let i = 20; i <= 40; i++) {
        const name = `spot-top-${i}`; // Unique animation name
        css += `
          @keyframes ${name} {
            from { opacity: 0; }
            to { transform: translateY(-30px) translateX(${-50 + (i - 20) * 5}px); opacity: 0.6; }
          }
        `;
        particleData.push({
          id: `top-${i}-${Math.random()}`, // Unique ID
          animationName: name,
          left: -20 + ((i - 20) * 6) + '%',
          top: '10%',
          color: `hsla(${180 + random(50)}, ${70}%, 80%, 1)`, // Cyan/Blue tints
          duration: 0.6 + random(10)/10 + 's',
          delay: random(10)/10 + 's'
        });
      }

      // Loop 3: Side burst
      for (let i = 40; i <= 50; i++) {
        const name = `spot-side-${i}`; // Unique animation name
        css += `
          @keyframes ${name} {
            from { opacity: 0; }
            to { transform: translateY(${-60 + (i - 40) * 10}px) translateX(40px); opacity: 0.6; }
          }
        `;
        particleData.push({
          id: `side-${i}-${Math.random()}`, // Unique ID
          animationName: name,
          left: '90%',
          top: 20 + ((i - 40) * 5) + '%',
          color: '#ffffff',
          duration: 0.8 + random(5)/10 + 's',
          delay: random(5)/10 + 's'
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

  // --- Deep Dive Flashcard Component ---
  const DeepDiveFlashcards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    
    const rawFlashcards = useMemo(() => [
      {
        id: 1,
        topic: "Marasmus (Severe Malnutrition)",
        mechanism: "Severe starvation resulting from specific calorie deficiency (affecting all nutrients). The body metabolizes carbohydrate and fat stores first, then resorts to catabolism of muscle mass/subcutaneous fat for energy.",
        cues: "Growth retardation, wasting of subcutaneous fat and muscle (skin and bones appearance), general weakness. Occurs chiefly in the first year of life.",
        intervention: "Gradual nutritional replenishment. Monitor for refeeding syndrome. Provide high-calorie, protein-rich formula suitable for age.",
        source: "Textbook p. 463"
      },
      {
        id: 2,
        topic: "Kwashiorkor (Protein Malnutrition)",
        mechanism: "Severe protein deficiency despite adequate caloric intake from other sources. Often occurs after weaning. Lack of protein causes fatty liver changes and fluid imbalance (low oncotic pressure).",
        cues: "Edema (ascites/pot-belly), skin pigment changes, reddish-discolored hair, impaired growth, distended abdomen (fatty liver).",
        intervention: "Administer protein supplements and monitor fluid balance. Edema is the hallmark distinguishing it from Marasmus.",
        source: "Textbook p. 463"
      },
      {
        id: 3,
        topic: "Hypermetabolic State (Post-Surgical/Trauma)",
        mechanism: "Illness, surgery, burns, or trauma trigger a catabolic state where cell repair and antibody production demand increased substrates.",
        cues: "Muscle wasting despite normal intake, poor wound healing, susceptibility to infection.",
        intervention: "Increase protein intake to 1.2–1.4 g/kg (or up to 1.8 g/kg for severe stress) to promote healing and immune function.",
        source: "Textbook p. 462"
      },
      {
        id: 4,
        topic: "Vitamin B12 Deficiency (Pernicious Anemia)",
        mechanism: "Lack of Intrinsic Factor (stomach) or dietary exclusion (strict Veganism) prevents B12 absorption, affecting red blood cell maturation and myelin sheath maintenance.",
        cues: "Glossitis (sore tongue), fatigue, paresthesia (numbness/tingling in hands/feet), mental confusion in older adults.",
        intervention: "Lifelong B12 injections (if intrinsic factor is missing) or fortified foods/supplements for Vegans. Monitor neurological status.",
        source: "Textbook p. 463 / Table 26.4"
      },
      {
        id: 5,
        topic: "Protein Complementation (Vegetarianism)",
        mechanism: "Plant proteins are 'incomplete' (lacking one or more of the 9 essential amino acids). The body needs all 9 simultaneously or within 24 hours to synthesize protein.",
        cues: "Dietary history showing exclusion of animal products.",
        intervention: "Combine Legumes + Grains (e.g., Red beans and Rice, Peanut butter on Wheat) to create a complete protein profile.",
        source: "Textbook p. 462"
      },
      {
        id: 6,
        topic: "Glycemic Control & Complex Carbohydrates",
        mechanism: "Complex carbohydrates (starches/fiber) digest slowly, providing consistent blood glucose. Simple sugars spike glucose rapidly, leading to insulin surges and subsequent hunger.",
        cues: "Postprandial hyperglycemia, energy crashes, hunger shortly after eating.",
        intervention: "Replace simple sugars with whole grains/vegetables (85-95% of carb intake). Beneficial for Diabetes management.",
        source: "Textbook p. 464"
      },
      {
        id: 7,
        topic: "Fiber & Metabolic Regulation",
        mechanism: "Insoluble fiber adds bulk to stool; Soluble fiber binds bile acids/cholesterol and delays glucose absorption.",
        cues: "Constipation, Hemorrhoids, Hypercholesterolemia, unstable blood sugar.",
        intervention: "Increase fiber to 21–38 g/day (Whole grains, skins of fruits). Essential for colon health and cholesterol reduction.",
        source: "Textbook p. 465"
      },
      {
        id: 8,
        topic: "Saturated Fats & Cardiovascular Risk",
        mechanism: "Saturated fats (solid at room temp) raise Low-Density Lipoprotein (LDL) levels, contributing to atherosclerosis and arterial hardening.",
        cues: "History of high animal fat intake (butter, lard), elevated cholesterol panel.",
        intervention: "Limit saturated/polyunsaturated fats to 10% of total intake. Substitute with monounsaturated oils (Olive, Canola).",
        source: "Textbook p. 466"
      },
      {
        id: 9,
        topic: "Omega-3 Fatty Acids (Anti-inflammatory)",
        mechanism: "The most unsaturated form of fatty acid; reduces triglyceride levels and has anti-inflammatory properties protecting the heart.",
        cues: "Risk factors for Coronary Artery Disease (CAD).",
        intervention: "Encourage intake of Salmon, Trout, Walnuts, and Flaxseed. Aim for fish 2x/week per AHA guidelines.",
        source: "Textbook p. 466 / Box 26.1"
      },
      {
        id: 10,
        topic: "Vitamin A Toxicity",
        mechanism: "Fat-soluble vitamins (A, D, E, K) are stored in the liver/fat. Excessive supplementation leads to accumulation and toxicity.",
        cues: "Dry skin, headache, fatigue, hepatomegaly (enlarged liver), orange tint to skin (carotenemia - harmless variant).",
        intervention: "Assess supplement use. Educate that toxicity is a risk mainly with supplements, not usually food sources.",
        source: "Textbook p. 466 / Table 26.4"
      },
      {
        id: 11,
        topic: "Vitamin D & Bone Mineralization",
        mechanism: "Vitamin D is essential for the absorption of Calcium and Phosphorus from the gut. Without it, bones demineralize.",
        cues: "Rickets (bowed legs in children), Osteomalacia (soft bones in adults), Bone pain.",
        intervention: "Ensure intake of fortified milk, fish, and exposure to sunlight. Crucial for preventing Osteoporosis.",
        source: "Textbook p. 466 / Table 26.4"
      },
      {
        id: 12,
        topic: "Vitamin K & Coagulation",
        mechanism: "Essential for the hepatic synthesis of Prothrombin and clotting factors.",
        cues: "Easy bruising, prolonged bleeding time, hemorrhage.",
        intervention: "Maintain consistent intake of Green Leafy Vegetables. *Critical Note: Altering intake affects Warfarin (Coumadin) efficacy.*",
        source: "Table 26.4 / Textbook p. 468"
      },
      {
        id: 13,
        topic: "Vitamin C & Tissue Repair",
        mechanism: "Essential for collagen synthesis (connective tissue), iron absorption, and immune function.",
        cues: "Gingivitis (bleeding gums), poor wound healing, easy bruising (Scurvy), loose teeth.",
        intervention: "Encourage Citrus, Broccoli, and Peppers. Priority for post-op patients to prevent wound dehiscence.",
        source: "Table 26.4 / Textbook p. 469"
      },
      {
        id: 14,
        topic: "Thiamine (B1) & Alcoholism",
        mechanism: "Thiamine is critical for nerve function and carbohydrate metabolism. Alcohol inhibits absorption, leading to deficiency.",
        cues: "Mental confusion, Ataxia, Polyneuritis (Wernicke-Korsakoff syndrome signs).",
        intervention: "Supplement Thiamine for patients with history of alcohol abuse to prevent permanent neurological damage.",
        source: "Table 26.4"
      },
      {
        id: 15,
        topic: "Hypocalcemia & Neuromuscular Excitability",
        mechanism: "Calcium stabilizes cell membranes. Deficiency causes increased neuromuscular excitability.",
        cues: "Tetany, muscle twitches, osteoporosis (long term), poor clotting.",
        intervention: "Calcium + Vitamin D supplementation. Dairy, dark green leafy vegetables (Note: not spinach due to oxalates).",
        source: "Table 26.6"
      },
      {
        id: 16,
        topic: "Sodium & Fluid Volume Excess",
        mechanism: "Sodium is the major extracellular cation; water follows sodium. Excess intake leads to fluid retention.",
        cues: "Edema (lower extremities), Hypertension, thirst.",
        intervention: "Limit sodium to <1500-2300 mg/day. Avoid 'The 3 Cs': Canned, Cheeses (processed), Cured meats.",
        source: "Table 26.5 / Textbook p. 469"
      },
      {
        id: 17,
        topic: "Potassium & Cardiac Conduction",
        mechanism: "Potassium controls intracellular osmolality and transmits nerve impulses (cardiac/skeletal muscle).",
        cues: "Cardiac arrhythmias (irregular heartbeat), muscle weakness.",
        intervention: "Monitor ECG. Intake sources: Bananas, Oranges, Potatoes. Deficiency is life-threatening.",
        source: "Table 26.6"
      },
      {
        id: 18,
        topic: "Iron Deficiency Anemia",
        mechanism: "Iron is the core component of Hemoglobin (Hgb) which carries Oxygen. Deficiency leads to tissue hypoxia.",
        cues: "Pale conjunctiva/mucous membranes, fatigue, spoon-shaped nails (koilonychia), low Hgb/Hct.",
        intervention: "Iron supplements (can cause black stool/constipation). Give with Vitamin C (OJ) to enhance absorption.",
        source: "Table 26.6 / Textbook p. 471"
      },
      {
        id: 19,
        topic: "Iodine & Thyroid Regulation",
        mechanism: "Iodine is a structural component of T3/T4 hormones regulating basal metabolic rate.",
        cues: "Goiter (enlarged thyroid gland visible at neck), Cretinism (in infants of deficient mothers).",
        intervention: "Ensure use of Iodized Salt and consumption of Seafood.",
        source: "Table 26.6"
      },
      {
        id: 20,
        topic: "Fluid Balance Maintenance",
        mechanism: "Water is not stored; obligatory loss (urine, skin, lungs, feces) occurs daily. Intake must match output + insensible loss.",
        cues: "Dehydration: Tachycardia, dry mucous membranes, poor skin turgor.",
        intervention: "General Rule: Intake should equal Output + 500 mL. Adult requirement approx 1 mL/calorie or 35 mL/kg.",
        source: "Textbook p. 470"
      },
      {
        id: 21,
        topic: "Dysphagia & Aspiration Risk (Elderly)",
        mechanism: "Aging causes decreased gag reflex and muscle tone at sphincters.",
        cues: "Coughing during meals, 'wet' voice after swallowing, pocketing food, weight loss.",
        intervention: "Upright positioning (High Fowler's), pureed mechanical soft diet, thickened liquids. Allow time to eat.",
        source: "Textbook p. 460 / 472"
      },
      {
        id: 22,
        topic: "Infant Solid Food Introduction",
        mechanism: "GI tract enzymes and immune system are immature before 4-6 months. Early solids increase allergy risk.",
        cues: "Extrusion reflex fades, infant can sit up.",
        intervention: "Introduce solids at 4-6 months. Single-grain cereal (Rice) first. Introduce one new food per week to identify allergies.",
        source: "Textbook p. 473"
      },
      {
        id: 23,
        topic: "Toddler Feeding: 'Food Jags'",
        mechanism: "Slowed growth rate reduces appetite; autonomy needs lead to ritualistic eating (only wanting one food).",
        cues: "Refusal of mixed foods, variable appetite day-to-day.",
        intervention: "Finger foods, small portions, do not force feed. Offer separate items (no casseroles).",
        source: "Textbook p. 475"
      },
      {
        id: 24,
        topic: "Adolescent Iron Needs",
        mechanism: "Rapid growth spurt + onset of menses (blood loss) in females increases iron demand significantly.",
        cues: "Fatigue, pale skin in a teenage girl.",
        intervention: "Screen for anemia. Encourage lean red meats, leafy greens, and Vitamin C sources.",
        source: "Textbook p. 475"
      },
      {
        id: 25,
        topic: "Cultural Considerations: Sodium Sensitivity",
        mechanism: "Certain traditional diets (e.g., African American, Asian American) may rely on preservation (salting/smoking) or seasonings (Soy Sauce/MSG) high in Na+.",
        cues: "Hypertension in specific populations.",
        intervention: "Suggest modifications (herbs/spices instead of salt pork/soy sauce) rather than eliminating traditional foods entirely.",
        source: "Textbook p. 473"
      }
    ], []);

    // Shuffle utility
    const shuffleArray = (array) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    // State for shuffled flashcards
    const [flashcards, setFlashcards] = useState([]);

    // Initialize shuffled deck on mount
    useEffect(() => {
      setFlashcards(shuffleArray(rawFlashcards));
    }, [rawFlashcards]);

    // Function to manually reshuffle
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

    // Guard against empty state before initial effect runs
    if (flashcards.length === 0) return null;

    const currentCard = flashcards[currentIndex];

    return (
      <div className="max-w-2xl mx-auto animate-fadeIn">
        {/* Inject CSS for 3D Flip Effects */}
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          /* Only show particles when hovering front-face */
          .front-face:hover .fizzy-container > div {
            opacity: 0.6; /* Fallback if animation doesn't handle opacity */
          }
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
            
            {/* Front of Card - Added "front-face" class for hover target */}
            <div className="front-face absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 flex flex-col items-center justify-center text-white overflow-hidden">
              
              {/* Fizzy Sparks Effect Component */}
              <FizzySparks />

              <Activity className="w-12 h-12 mb-4 opacity-80 relative z-10" />
              <h3 className="text-2xl font-bold text-center leading-tight relative z-10">{currentCard.topic}</h3>
              <p className="mt-6 text-indigo-200 text-sm font-medium animate-pulse relative z-10">Tap to reveal details</p>
            </div>

            {/* Back of Card */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl p-8 border-2 border-indigo-100 overflow-y-auto">
              <div className="space-y-4 text-left">
                <div>
                  <h4 className="text-xs font-bold uppercase text-indigo-500 tracking-wider mb-1">Mechanism / Definition</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{currentCard.mechanism}</p>
                </div>
                
                <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider mb-1">Critical Cues</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{currentCard.cues}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <h4 className="text-xs font-bold uppercase text-green-700 tracking-wider mb-1">Intervention & Rationale</h4>
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
            title="Previous Card"
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
            title="Shuffle Cards"
          >
            <Shuffle className="w-6 h-6" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="p-3 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm"
            title="Next Card"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

  // --- Quiz Component Implementation ---
  const QuizComponent = () => {
    // Raw Data from user request (Chapter 26 Content)
    const rawQuizData = useMemo(() => [
      {
        id: 1,
        type: 'single',
        question: "A nurse is educating a patient with a new colostomy about digestion. The nurse correctly explains that the majority of nutrient absorption occurs in which segment of the gastrointestinal tract?",
        options: [
          "Stomach",
          "Small intestine",
          "Large intestine",
          "Esophagus"
        ],
        answer: 1,
        rationale: "The small intestine (duodenum, jejunum, and ileum) is where the process of digestion is finished and nutrients are absorbed. The stomach is primarily a storage and mixing chamber, while the large intestine absorbs fluid and electrolytes.",
        source: "Chapter 26 Textbook, pp. 459-460",
        tip: "Remember: Digestion finishes and absorption happens primarily in the Small Intestine."
      },
      {
        id: 2,
        type: 'multi',
        question: "A nurse is teaching a class on vegetarian diets. Which of the following food combinations should the nurse suggest to ensure the consumption of complete proteins? (Select All That Apply)",
        options: [
          "Red beans and rice",
          "Peanut butter on whole wheat bread",
          "Corn and green beans",
          "Stir-fried vegetables with tofu",
          "Bean soup with cornbread"
        ],
        answer: [0, 1, 3, 4],
        rationale: "Plant sources of protein are typically incomplete. Combining complementary proteins provides complete protein intake. Examples include red beans and rice, peanut butter on whole wheat bread, bean soup with cornbread, and stir-fried vegetables with tofu. Corn and green beans are vegetables but do not necessarily form a complete protein profile like grains and legumes do.",
        source: "Chapter 26 Textbook, p. 463",
        tip: "Think 'Grains + Legumes' or 'Legumes + Nuts/Seeds' to create complete proteins."
      },
      {
        id: 3,
        type: 'single',
        question: "A nurse is assessing a child who has recently been weaned from breast milk. The child presents with edema, skin pigment changes, and a distended abdomen. The nurse suspects which form of malnutrition?",
        options: [
          "Marasmus",
          "Kwashiorkor",
          "Rickets",
          "Scurvy"
        ],
        answer: 1,
        rationale: "Kwashiorkor occurs in infants and young children soon after weaning due to severe protein deficiency. Symptoms include edema (swollen belly), skin pigment changes, and impaired growth. Marasmus is severe starvation affecting all nutrients (wasting).",
        source: "Chapter 26 Textbook, p. 463",
        tip: "Kwashiorkor = Protein deficiency (edema). Marasmus = Calorie/All nutrient deficiency (wasting)."
      },
      {
        id: 4,
        type: 'single',
        question: "A patient with Type 2 diabetes asks the nurse about carbohydrate intake. Which advice aligns with current nutritional recommendations?",
        options: [
          "Avoid all carbohydrates completely.",
          "Consume complex carbohydrates like whole grains and vegetables for 85-95% of carbohydrate intake.",
          "Focus on simple carbohydrates like fruit juice for quick energy.",
          "Eliminate fiber from the diet to prevent bloating."
        ],
        answer: 1,
        rationale: "Complex carbohydrates (starches) provide a more consistent blood glucose level than simple sugars. Experts recommend that 85% to 95% of carbohydrates consumed should be complex.",
        source: "Chapter 26 Textbook, p. 464",
        tip: "Complex carbs = Consistent energy. Simple carbs = Blood sugar spikes."
      },
      {
        id: 5,
        type: 'single',
        question: "The nurse is reviewing the lipid profile of a patient with heart disease. The nurse identifies which type of fat as 'solid at room temperature' and one that should be limited in the diet?",
        options: [
          "Unsaturated fat",
          "Saturated fat",
          "Omega-3 fatty acids",
          "Linoleic acid"
        ],
        answer: 1,
        rationale: "Saturated fats are solid at room temperature (e.g., shortening, margarine, lard) and should be limited. Unsaturated fats are usually liquid at room temperature (oils).",
        source: "Chapter 26 Textbook, p. 466",
        tip: "Saturated = Solid (like butter/lard). Unsaturated = Liquid (like olive oil)."
      },
      {
        id: 6,
        type: 'multi',
        question: "A patient is prescribed a low-sodium diet for hypertension. Which of the following foods should the nurse instruct the patient to avoid? (Select All That Apply)",
        options: [
          "Canned tomato soup",
          "Fresh broccoli",
          "Soy sauce",
          "Frozen cheese ravioli",
          "Grilled chicken breast with lemon"
        ],
        answer: [0, 2, 3],
        rationale: "Processed foods are high in sodium. Canned soups (1022 mg), soy sauce (1000 mg), and frozen cheese ravioli (1280 mg) are high sodium choices. Fresh vegetables and fresh meats prepared without salt are low in sodium.",
        source: "Chapter 26 Textbook, p. 469 (Table 26.5)",
        tip: "Canned, cured, and convenience foods are the 'Three Cs' of high sodium."
      },
      {
        id: 7,
        type: 'single',
        question: "A patient asks why they need to eat foods containing Vitamin C. The nurse explains that Vitamin C is essential for:",
        options: [
          "Blood clotting",
          "Vision in dim light",
          "Wound healing and iron absorption",
          "Calcium absorption"
        ],
        answer: 2,
        rationale: "Vitamin C (ascorbic acid) aids in wound healing and helps protect the body against infections. It also aids in the absorption of iron. Vitamin K is for clotting; Vitamin A is for vision.",
        source: "Chapter 26 Textbook, p. 469 (Table 26.4)",
        tip: "Vitamin C = Collagen/Connective tissue (Wound healing)."
      },
      {
        id: 8,
        type: 'single',
        question: "A nurse is caring for a patient who is strictly vegan. The nurse should assess this patient for signs of which vitamin deficiency?",
        options: [
          "Vitamin C",
          "Vitamin B12 (Cobalamin)",
          "Vitamin A",
          "Vitamin E"
        ],
        answer: 1,
        rationale: "Vegans may have a diet deficient in Vitamin B12 because it is found primarily in animal products (meats, dairy, eggs). Deficiency can lead to pernicious anemia.",
        source: "Chapter 26 Textbook, p. 463",
        tip: "B12 comes from 'Beef and Dairy' (animal sources). Vegans need supplements."
      },
      {
        id: 9,
        type: 'single',
        question: "The nurse is calculating the fluid intake goal for a healthy adult patient. If the patient's recorded output is 1200 mL, what is the general rule for their recommended intake?",
        options: [
          "1200 mL",
          "1700 mL",
          "2000 mL",
          "2500 mL"
        ],
        answer: 1,
        rationale: "A general rule is that the patient should take in an amount equal to the recorded fluid output plus 500 mL. 1200 mL + 500 mL = 1700 mL.",
        source: "Chapter 26 Textbook, p. 469",
        tip: "Intake should match Output + 500mL (for insensible loss)."
      },
      {
        id: 10,
        type: 'single',
        question: "A mother asks the nurse when she should introduce solid foods to her 2-month-old infant. What is the nurse's best response?",
        options: [
          "You can start now if the baby seems hungry.",
          "Wait until the baby is 4 to 6 months old to decrease the risk of food allergies.",
          "Start with egg whites and peanut butter immediately.",
          "Wait until the baby is 1 year old before introducing solids."
        ],
        answer: 1,
        rationale: "Pediatricians prefer adding solid foods at 4 to 6 months of age. Introducing solids before this increases the risk of developing food allergies and the GI system is not mature enough before 3 months.",
        source: "Chapter 26 Textbook, p. 474",
        tip: "4-6 months is the 'sweet spot' for solids. Too early = allergy risk."
      },
      {
        id: 11,
        type: 'multi',
        question: "The nurse is assisting an older adult patient who lives alone and has a decreased appetite. Which interventions should the nurse suggest? (Select All That Apply)",
        options: [
          "Prepare several portions of favorite foods to freeze for later.",
          "Eat nutritious snacks like fruit and yogurt.",
          "Use low-sodium seasonings and spices to enhance flavor.",
          "Eat meals alone to avoid distractions.",
          "Engage in light exercise like walking to stimulate appetite."
        ],
        answer: [0, 1, 2, 4],
        rationale: "Interventions include batch cooking/freezing, keeping nutritious snacks available, using spices for flavor (to counteract decreased taste), and exercising to stimulate appetite. Companionship is encouraged, not eating alone.",
        source: "Chapter 26 Textbook, p. 476 (Patient Education Box)",
        tip: "Socialization improves intake in older adults. Isolation decreases it."
      },
      {
        id: 12,
        type: 'single',
        question: "A patient who follows an Orthodox Jewish diet is admitted. Which meal tray should the nurse recognize as appropriate for this patient?",
        options: [
          "Pork chops with applesauce",
          "Shrimp scampi with rice",
          "Cheeseburger with french fries",
          "Baked chicken with potatoes"
        ],
        answer: 3,
        rationale: "Orthodox Jewish dietary laws (Kosher) prohibit pork and shellfish. They also prohibit mixing meat and milk at the same meal (e.g., cheeseburger). Baked chicken with potatoes is acceptable.",
        source: "Chapter 26 Textbook, p. 472",
        tip: "Kosher rules: No Pig, No Shellfish, No Meat + Milk mixing."
      },
      {
        id: 13,
        type: 'single',
        question: "During a nutritional assessment, the nurse calculates a patient's Body Mass Index (BMI) as 27. The nurse interprets this value as:",
        options: [
          "Underweight",
          "Normal weight",
          "Overweight",
          "Obese"
        ],
        answer: 2,
        rationale: "Recommended BMI is 18.5 to 24.9. Overweight is 25 to 29.9. Obese is above 30.",
        source: "Chapter 26 Textbook, p. 477",
        tip: "25-30 is the 'Overweight' zone."
      },
      {
        id: 14,
        type: 'multi',
        question: "The nurse is performing a physical exam and suspects malnutrition. Which of the following physical signs would support this finding? (Select All That Apply)",
        options: [
          "Dull, dry, sparse hair",
          "Swollen, bleeding gums",
          "Smooth, firm fingernails",
          "Pale conjunctiva",
          "Edema in the lower extremities"
        ],
        answer: [0, 1, 3, 4],
        rationale: "Signs of malnutrition include dull/dry hair (protein), swollen/bleeding gums (Vitamin C), pale conjunctiva (Iron), and edema (protein). Smooth firm nails are normal.",
        source: "Chapter 26 Textbook, p. 478 (Table 26.8)",
        tip: "Malnutrition shows in rapidly growing tissues first: Hair, Skin, Gums."
      },
      {
        id: 15,
        type: 'single',
        question: "A nurse is instructing a patient on following the USDA MyPlate guidelines. The nurse explains that approximately half of the plate should consist of:",
        options: [
          "Proteins",
          "Grains",
          "Fruits and vegetables",
          "Dairy products"
        ],
        answer: 2,
        rationale: "MyPlate visually demonstrates that about half of the typical plate should come from fruits and vegetables.",
        source: "Chapter 26 Textbook, p. 460",
        tip: "Visualize the plate: Half is colorful plants (Fruits/Veggies)."
      },
      {
        id: 16,
        type: 'single',
        question: "Which mineral is critical for the formation of hemoglobin and preventing anemia?",
        options: [
          "Calcium",
          "Iron",
          "Magnesium",
          "Potassium"
        ],
        answer: 1,
        rationale: "Iron is necessary for the formation of hemoglobin. Deficiency leads to iron-deficiency anemia.",
        source: "Chapter 26 Textbook, p. 471 (Table 26.6)",
        tip: "Iron = Heme (Blood)."
      },
      {
        id: 17,
        type: 'single',
        question: "The nurse is caring for an adolescent female. The nurse knows that during the growth spurt, this patient has an increased need for which nutrients?",
        options: [
          "Iron and Calcium",
          "Vitamin K and Sodium",
          "Vitamin C and Magnesium",
          "Fat and Carbohydrates"
        ],
        answer: 0,
        rationale: "Adolescent girls require increased iron after menstruation begins. Calcium and Vitamin D are also very important to prevent future osteoporosis.",
        source: "Chapter 26 Textbook, p. 475",
        tip: "Teens need Iron (blood loss/growth) and Calcium (bone density)."
      },
      {
        id: 18,
        type: 'single',
        question: "A patient tells the nurse, 'I'm taking a lot of fat-soluble vitamins to stay healthy.' The nurse should warn the patient about the risk of toxicity for which vitamins?",
        options: [
          "Vitamins B and C",
          "Vitamins A, D, E, and K",
          "Vitamin C and Zinc",
          "Folic Acid and Niacin"
        ],
        answer: 1,
        rationale: "Fat-soluble vitamins (A, D, E, K) are stored in the liver and can cause toxic effects if ingested in excessive quantities. Water-soluble vitamins (B, C) are easily excreted.",
        source: "Chapter 26 Textbook, p. 466",
        tip: "Fat-soluble vitamins are 'ADEK'. They are stored, so toxicity is a risk."
      },
      {
        id: 19,
        type: 'single',
        question: "When teaching a patient about food safety, the nurse should emphasize which action to prevent foodborne illness?",
        options: [
          "Thoroughly wash chicken before cooking.",
          "Cook ground beef until it is well done.",
          "Leave cooked food out to cool for 4 hours before refrigerating.",
          "Use the same cutting board for raw vegetables and meat."
        ],
        answer: 1,
        rationale: "Ground beef must be cooked until well done. Chicken should NOT be washed (spreads bacteria), but must be cooked thoroughly. Cross-contamination must be avoided.",
        source: "Chapter 26 Textbook, p. 473",
        tip: "Ground beef = Well done. Chicken = Thoroughly cooked. Safety first."
      },
      {
        id: 20,
        type: 'single',
        question: "Which laboratory value would the nurse review to assess a patient's protein status over the long term?",
        options: [
          "Serum Sodium",
          "Hemoglobin",
          "Serum Albumin",
          "Blood Glucose"
        ],
        answer: 2,
        rationale: "Serum albumin indicates protein status. Low levels (e.g., <3.5 g/dL) may indicate malnutrition.",
        source: "Chapter 26 Textbook, p. 477",
        tip: "Albumin is the primary protein marker in the blood."
      },
      {
        id: 21,
        type: 'single',
        question: "A patient with abdominal surgery needs increased protein to promote healing. The nurse calculates the protein requirement based on weight. If a healthy adult requires 0.8 g/kg, a post-surgical patient might require up to:",
        options: [
          "0.5 g/kg",
          "0.8 g/kg",
          "1.2 to 1.8 g/kg",
          "3.0 g/kg"
        ],
        answer: 2,
        rationale: "The body requires more protein during times of illness or injury for cell repair. Needs may rise to 1.2-1.4 g/kg or even higher.",
        source: "Chapter 26 Textbook, p. 462",
        tip: "Stress/Healing requires MORE protein than the standard 0.8 g/kg."
      },
      {
        id: 22,
        type: 'multi',
        question: "A nurse is discussing dietary guidelines with a group of adults. According to the American Heart Association 2015 recommendations, which instructions should be included? (Select All That Apply)",
        options: [
          "Limit sodium intake to less than 1500 mg per day.",
          "Consume 2 alcoholic drinks per day if you are female.",
          "Eat oily fish like salmon at least twice a week.",
          "Avoid all fats completely.",
          "Limit saturated fats and trans fats."
        ],
        answer: [0, 2, 4],
        rationale: "Recommendations include eating skinless fish (oily fish) twice a week, limiting sodium to 1500 mg, limiting saturated/trans fats. Alcohol limit is 1 drink/day for women, 2 for men.",
        source: "Chapter 26 Textbook, p. 461 (Box 26.1)",
        tip: "Heart health = Low Salt, Good Fats (Fish), Limited Alcohol."
      },
      {
        id: 23,
        type: 'single',
        question: "A patient reports taking mineral supplements. The nurse explains that which mineral is essential for thyroid hormone function and preventing goiter?",
        options: [
          "Zinc",
          "Iodine",
          "Copper",
          "Selenium"
        ],
        answer: 1,
        rationale: "Iodine helps regulate metabolism as part of thyroid hormones. Deficiency causes goiter (thyroid enlargement).",
        source: "Chapter 26 Textbook, p. 471 (Table 26.6)",
        tip: "Iodine = Thyroid. (Think Iodized Salt)."
      },
      {
        id: 24,
        type: 'single',
        question: "A patient with a high-fiber diet is consuming 35g of fiber daily. The nurse recognizes that this intake helps prevent:",
        options: [
          "Diarrhea",
          "Constipation",
          "Anemia",
          "Osteoporosis"
        ],
        answer: 1,
        rationale: "Fiber increases bulk in the stool, leading to good intestinal function and preventing constipation.",
        source: "Chapter 26 Textbook, p. 465",
        tip: "Fiber = Bulk = Regularity."
      },
      {
        id: 25,
        type: 'single',
        question: "When assessing an Asian American patient's diet, the nurse notes that while traditional dishes are healthy, they may be high in which nutrient due to the use of soy sauce and seasonings?",
        options: [
          "Calcium",
          "Sodium",
          "Vitamin C",
          "Fiber"
        ],
        answer: 1,
        rationale: "Traditional Asian diets may have high sodium content due to the use of soy sauce and MSG, even though MSG use has decreased.",
        source: "Chapter 26 Textbook, p. 473",
        tip: "Soy sauce is very high in Salt (Sodium)."
      }
    ], []);

    // Fisher-Yates Shuffle function
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

    // Initialize quiz on mount
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
        // Scroll to top of quiz area
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

    // Results Screen
    if (showResults) {
      const percentage = Math.round((score / questions.length) * 100);
      let msg = "";
      if (percentage >= 80) msg = "Excellent work! You are ready for the Chapter 26 exam.";
      else if (percentage >= 60) msg = "Good job, but review the missed nutrition concepts.";
      else msg = "Keep studying. Focus on the nutrient functions and dietary guidelines.";

      return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto mt-8 animate-fadeIn">
          <div className="bg-[#2c3e50] p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Exam Completed</h2>
          </div>
          <div className="p-10 text-center">
            <div className="w-40 h-40 bg-[#2c3e50] text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg">
              {percentage}%
            </div>
            <p className="text-lg text-slate-700 mb-8 font-medium">{msg}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleRetakeAll}
                className="px-6 py-3 bg-[#2c3e50] text-white rounded-full font-semibold hover:bg-slate-700 transition-transform active:scale-95 shadow-md"
              >
                Retake Full Exam
              </button>
              {missedQuestions.length > 0 && (
                <button 
                  onClick={handleRetakeMissed}
                  className="px-6 py-3 bg-[#3498db] text-white rounded-full font-semibold hover:bg-blue-600 transition-transform active:scale-95 shadow-md"
                >
                  Retake Missed Questions
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Quiz Interface
    return (
      <div id="quiz-top" className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-xl overflow-hidden font-sans animate-fadeIn">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200">
          <div 
            className="h-full bg-[#27ae60] transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="bg-[#2c3e50] p-6 flex justify-between items-center text-white">
          <span className="font-bold text-lg tracking-wide">Chapter 26: Basic Nutrition (Review)</span>
        </div>

        {/* Question Area */}
        <div className="p-8">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <h2 className="text-xl font-semibold text-[#2c3e50] mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

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
              const isCorrectAnswer = isMulti 
                ? currentQuestion.answer.includes(idx) 
                : currentQuestion.answer === idx;

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  statusStyle = "bg-green-50 border-green-500";
                  if (!isSelected) statusStyle += " border-dashed"; // Missed correct answer
                } else if (isSelected) {
                  statusStyle = "bg-red-50 border-red-500"; // Wrong selection
                } else {
                  statusStyle = "border-gray-100 opacity-50";
                }
              } else if (isSelected) {
                statusStyle = "bg-blue-50 border-[#3498db] shadow-sm";
              }

              return (
                <div 
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`${baseStyle} ${statusStyle}`}
                >
                  <div className={`w-5 h-5 mt-1 mr-4 rounded flex-shrink-0 border-2 flex items-center justify-center
                    ${isMulti ? 'rounded-md' : 'rounded-full'}
                    ${isSelected ? 'border-[#3498db] bg-[#3498db]' : 'border-gray-300'}
                    ${isSubmitted && isCorrectAnswer ? '!border-green-500 !bg-green-500' : ''}
                    ${isSubmitted && isSelected && !isCorrectAnswer ? '!border-red-500 !bg-red-500' : ''}
                  `}>
                    {isSelected && !isSubmitted && <div className="w-2 h-2 bg-white rounded-full" />}
                    {isSubmitted && isCorrectAnswer && <CheckCircle className="w-3 h-3 text-white" />}
                    {isSubmitted && isSelected && !isCorrectAnswer && <X className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-base ${isSubmitted && isCorrectAnswer ? 'font-medium text-green-800' : 'text-gray-700'}`}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {isSubmitted && (
          <div className="bg-gray-50 border-t border-gray-200 p-8 animate-fadeIn">
            <h4 className={`text-lg font-bold mb-2 ${
              (isMulti 
                ? (currentQuestion.answer.length === selectedIndices.length && currentQuestion.answer.every(v => selectedIndices.includes(v)))
                : selectedIndices[0] === currentQuestion.answer
              ) ? 'text-[#27ae60]' : 'text-[#e74c3c]'
            }`}>
              {(isMulti 
                ? (currentQuestion.answer.length === selectedIndices.length && currentQuestion.answer.every(v => selectedIndices.includes(v)))
                : selectedIndices[0] === currentQuestion.answer
              ) ? 'Correct!' : 'Incorrect'}
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

        {/* Navigation Footer */}
        <div className="p-6 bg-white border-t border-gray-100 text-right">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIndices.length === 0}
              className="px-8 py-3 bg-[#3498db] text-white rounded-full font-bold shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:translate-y-px"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#27ae60] text-white rounded-full font-bold shadow-md hover:bg-green-600 transition-all active:translate-y-px flex items-center ml-auto"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderAnatomy = () => (
    <div className="space-y-6 animate-fadeIn">
      {content.anatomy.sections.map((section, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-slate-800 mb-3">{section.header}</h3>
          <p className="text-slate-600 mb-4">{section.text}</p>
          
          {section.list && (
            <div className="grid gap-3">
              {section.list.map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="font-bold text-blue-700">{item.term}:</span> <span className="text-slate-700">{item.def}</span>
                </div>
              ))}
            </div>
          )}

          {section.details && (
            <div className="space-y-3">
              {section.details.map((detail, i) => (
                <div key={i} className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-bold text-blue-800">{detail.name}</h4>
                  <p className="text-sm text-slate-700 mt-1">{detail.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
    </div>
  );

  const renderPhysiology = () => (
    <div className="space-y-6 animate-fadeIn">
      {content.physiology.sections.map((section, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
          <h3 className="text-xl font-bold text-slate-800 mb-3">{section.header}</h3>
          
          {section.interactive ? (
            <div className="bg-slate-900 text-white p-4 rounded-lg">
              <div className="text-center text-sm text-gray-400 mb-4">Sequence of Digestion:</div>
              <div className="space-y-2">
                {section.steps.map((step, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full text-xs font-bold mr-3 shrink-0 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-slate-800 p-2 rounded text-sm border border-slate-700 group-hover:border-red-500 transition-colors">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {section.text && <p className="text-slate-600 mb-4">{section.text}</p>}
              {section.formula && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded text-center font-mono text-yellow-800 font-bold my-4">
                  {section.formula}
                  {section.note && <div className="text-xs font-normal mt-2 text-slate-600">{section.note}</div>}
                </div>
              )}
              {section.list && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.list.map((item, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded border border-slate-200 hover:shadow-sm transition-shadow">
                      <div className="font-bold text-red-700 mb-1">{item.term}</div>
                      <div className="text-sm text-slate-600">{item.def}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}
      
    </div>
  );

  const renderPathology = () => (
    <div className="space-y-6 animate-fadeIn">
      {content.pathology.sections.map((section, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
          <h3 className="text-xl font-bold text-slate-800 mb-3">{section.header}</h3>
          {section.text && <p className="text-slate-600 mb-4">{section.text}</p>}
          
          {section.list && (
            <div className="space-y-3">
              {section.list.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center bg-slate-50 p-3 rounded">
                  <span className="font-bold text-purple-700 min-w-[200px]">{item.term}</span>
                  <span className="text-slate-600 text-sm">{item.desc}</span>
                </div>
              ))}
            </div>
          )}

          {section.subsections && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {section.subsections.map((sub, i) => (
                <div key={i} className="bg-purple-50 p-4 rounded border border-purple-100">
                  <h4 className="font-bold text-purple-800 mb-2">{sub.title}</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{sub.desc}</p>
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
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Chapter 26: Basic Nutrition</h1>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">STUDY GUIDE</div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {Object.entries(content).map(([key, section]) => (
            <button
              key={key}
              onClick={() => { setActiveSection(key); setSidebarOpen(false); }}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group
                ${activeSection === key 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'hover:bg-slate-800 hover:text-white'}
              `}
            >
              <span className={`${activeSection === key ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
                {section.icon}
              </span>
              <span className="ml-3 font-medium text-left leading-tight">{section.title}</span>
              {activeSection === key && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800 text-xs text-slate-500">
          Based on Chapter 26 Materials
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm p-4 flex items-center lg:hidden z-10">
          <button onClick={toggleSidebar} className="text-slate-600 mr-4">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-bold text-lg text-slate-800">{content[activeSection].title}</h2>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto">
            <header className="hidden lg:block mb-8 border-b pb-4 border-slate-200">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  {content[activeSection].icon}
                </span>
                {content[activeSection].title}
              </h2>
            </header>

            {activeSection === 'anatomy' && renderAnatomy()}
            {activeSection === 'physiology' && renderPhysiology()}
            {activeSection === 'pathology' && renderPathology()}
            {activeSection === 'deepDive' && <DeepDiveFlashcards />}
            {activeSection === 'quiz' && <QuizComponent />}
          </div>
          <div className="h-20" /> {/* Spacer for bottom scroll */}
        </div>
      </main>
    </div>
  );
};

export default StudyGuide;
