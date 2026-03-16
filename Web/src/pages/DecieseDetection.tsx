"use client"

import { useState } from "react";
import { AlertTriangle, Activity, Heart, Brain, Stethoscope, Search, TrendingUp, Sparkles, Info } from "lucide-react";

const symptomDescriptions: Record<string, string> = {
  anorexia: "Complete loss of appetite where the animal refuses to eat feed. This is a common early warning sign of illness and can lead to weight loss and weakness if prolonged.",
  abdominal_pain: "Discomfort or pain in the belly region, often indicated by restlessness, frequent lying down and getting up, kicking at the belly, or an arched back posture.",
  anaemia: "Condition of insufficient red blood cells, characterized by pale or white gums, weakness, rapid breathing, and reduced stamina. Often caused by parasites, blood loss, or nutritional deficiencies.",
  abortions: "Spontaneous termination of pregnancy before full term, resulting in loss of the fetus. May indicate infectious diseases like brucellosis, IBR, or nutritional problems.",
  acetone: "Sweet, fruity smell on breath resembling nail polish remover, indicating ketosis - a metabolic disorder common in high-producing dairy cows shortly after calving.",
  aggression: "Abnormal hostile or threatening behavior towards handlers or other animals, which can indicate pain, neurological disease, or extreme stress.",
  arthrogyposis: "Congenital condition where calves are born with permanently bent or contracted joints, often affecting the legs. Can be genetic or caused by viral infections during pregnancy.",
  ankylosis: "Abnormal stiffening and immobility of a joint due to fusion of bones, often resulting from chronic inflammation or injury.",
  anxiety: "Nervous, fearful, or restless behavior shown by excessive vocalization, pacing, wide eyes, or separation from the herd without clear cause.",
  bellowing: "Persistent, loud, distressed mooing or crying that indicates pain, discomfort, or separation anxiety. Often seen in cows separated from calves or experiencing udder pain.",
  blood_loss: "External or internal bleeding visible through wounds, blood in feces, urine, or milk, or signs like pale membranes and weakness from hidden bleeding.",
  blood_poisoning: "Septicemia - a life-threatening systemic infection where bacteria spread through the bloodstream, causing fever, weakness, rapid breathing, and potential organ failure.",
  blisters: "Small fluid-filled sacs on skin or mucous membranes, particularly around the mouth, nose, or feet. May indicate foot-and-mouth disease or other viral infections.",
  colic: "Severe abdominal pain causing visible distress, frequent position changes, kicking at belly, and unwillingness to eat. Often related to digestive system problems.",
  Condemnation_of_livers: "Liver disease or damage that would cause the organ to be rejected during meat inspection, often due to parasitic infection (liver flukes) or other pathology.",
  coughing: "Forceful expulsion of air from lungs, indicating respiratory irritation or infection. Persistent coughing suggests pneumonia, lungworm, or other respiratory diseases.",
  depression: "Dull, listless, or unresponsive behavior where the animal shows little interest in surroundings, food, or social interaction - a non-specific sign of illness.",
  discomfort: "General signs of unease including restlessness, shifting weight frequently, tail swishing, or inability to find comfortable position.",
  dyspnea: "Labored or difficult breathing characterized by open-mouth breathing, extended neck, flared nostrils, or visible effort with each breath. Indicates serious respiratory compromise.",
  dysentery: "Severe diarrhea containing blood and mucus, often accompanied by straining and painful defecation. Indicates serious intestinal inflammation or infection.",
  diarrhoea: "Abnormally loose, liquid, or frequent defecation. Causes can range from dietary changes to serious infections and leads to dehydration if untreated.",
  dehydration: "Excessive loss of body water shown by sunken eyes, dry nose, loss of skin elasticity (skin tenting), and dry mucous membranes. Dangerous if severe.",
  drooling: "Excessive production and dripping of saliva from the mouth, often indicating mouth pain, difficulty swallowing, or toxin ingestion.",
  dull: "Reduced alertness and responsiveness to stimuli, appearing mentally and physically slow or unaware - a general indicator of systemic illness.",
  decreased_fertility: "Reduction in conception rates or ability to maintain pregnancy, resulting in longer intervals between successful calvings or complete reproductive failure.",
  diffculty_breath: "Struggling or increased effort required to breathe normally, seen as rapid shallow breaths or abnormal breathing patterns.",
  emaciation: "Extreme thinness and muscle wasting where bones become prominently visible (ribs, hips, spine). Indicates chronic malnutrition or severe chronic disease.",
  encephalitis: "Inflammation of the brain causing neurological symptoms like circling, head pressing, seizures, incoordination, or altered consciousness.",
  fever: "Elevated body temperature above 39.5°C (103°F). Rectal temperature is the most accurate measurement. Indicates infection or inflammation in the body.",
  facial_paralysis: "Loss of movement or sensation in facial muscles, causing drooping ear, eyelid, or lip on affected side. May indicate nerve damage or listeriosis.",
  frothing_of_mouth: "Excessive foamy or bubbly saliva accumulating around mouth and muzzle, indicating difficulty swallowing, respiratory distress, or toxin exposure.",
  frothing: "Production of foam or excessive bubbles from mouth or nose, often associated with respiratory problems or salivation issues.",
  gaseous_stomach: "Bloat - abnormal accumulation of gas in the rumen causing visible left-side abdominal distension. Life-threatening emergency requiring immediate veterinary attention.",
  highly_diarrhoea: "Severe, profuse watery diarrhea occurring very frequently, leading to rapid dehydration and electrolyte imbalance. Medical emergency requiring immediate fluid therapy.",
  high_pulse_rate: "Elevated heart rate exceeding 80 beats per minute in adult cattle (normal 60-80). Indicates pain, stress, fever, or cardiovascular problems.",
  high_temp: "Fever with rectal temperature above normal range (normal 38-39°C), indicating active infection, inflammation, or heat stress.",
  high_proportion: "When a large percentage of the herd shows the same symptoms, indicating an outbreak of contagious disease or exposure to common toxin/stressor.",
  hyperaemia: "Abnormal redness of tissues due to increased blood flow, often seen in mucous membranes and indicating inflammation or infection.",
  hydrocephalus: "Abnormal accumulation of cerebrospinal fluid in brain cavities causing enlarged head, particularly noticeable in newborn calves with dome-shaped skulls.",
  isolation_from_herd: "Animal voluntarily separates itself from other cattle and stays alone, often indicating illness, pain, or being in early labor.",
  infertility: "Inability to conceive despite breeding attempts, or repeated failure to maintain pregnancy. Can have infectious, nutritional, or management causes.",
  intermittent_fever: "Body temperature that alternates between normal and elevated in a cyclical pattern, characteristic of certain chronic infections.",
  jaundice: "Yellow discoloration of skin, white of eyes, and mucous membranes due to liver dysfunction or excessive red blood cell breakdown.",
  ketosis: "Metabolic disorder in high-producing dairy cows where the body breaks down fat for energy, producing ketones. Causes sweet breath smell, weight loss, and reduced milk production.",
  loss_of_appetite: "Reduced interest in eating or drinking, one of the earliest and most common signs that an animal is unwell.",
  lameness: "Abnormal gait or difficulty walking due to pain, injury, or disease affecting legs or feet. Animal may limp, favor a leg, or be reluctant to move.",
  "lack_of-coordination": "Incoordination or ataxia where the animal has difficulty controlling movements, appearing unsteady, stumbling, or swaying. Indicates neurological problems.",
  lethargy: "Profound tiredness and lack of energy where the animal appears unwilling to move, responds slowly, and spends most time lying down.",
  lacrimation: "Excessive tearing or watery discharge from eyes, often indicating eye irritation, infection, or certain systemic diseases like IBR.",
  milk_flakes: "Small white clumps or particles visible in milk, indicating mastitis (udder infection) or abnormal secretion from inflamed quarters.",
  milk_watery: "Thin, watery consistency of milk lacking normal creamy texture, indicating severe mastitis, protein deficiency, or other metabolic problems.",
  milk_clots: "Large lumps or stringy clots in milk indicating severe mastitis with extensive udder tissue damage and pus formation.",
  mild_diarrhoea: "Slightly loose or soft manure consistency, less severe than watery diarrhea but still indicating mild digestive upset or dietary imbalance.",
  moaning: "Low-pitched, prolonged vocalization indicating pain or severe discomfort, often heard with digestive problems or difficult calving.",
  mucosal_lesions: "Ulcers, sores, or damaged areas on mucous membranes (mouth, nose, vagina), often indicating viral infections like BVD or mucosal disease.",
  milk_fever: "Hypocalcemia - sudden drop in blood calcium after calving causing muscle weakness, trembling, inability to stand. Medical emergency requiring IV calcium.",
  nausea: "Feeling of sickness shown by lip-curling, standing with head lowered, excessive swallowing, or complete loss of appetite.",
  nasel_discharges: "Abnormal mucus, pus, or fluid draining from nostrils, indicating respiratory infection, pneumonia, or upper airway inflammation.",
  oedema: "Soft, fluid-filled swelling under skin, often in lower legs, brisket, or udder. Results from circulatory problems, protein deficiency, or inflammation.",
  pain: "Physical suffering shown through behavioral changes like vocalization, reluctance to move, guarding affected areas, grinding teeth, or reduced appetite.",
  painful_tongue: "Inflammation, sores, or injury to the tongue causing difficulty eating, excessive salivation, and obvious discomfort when attempting to feed.",
  pneumonia: "Lung infection causing cough, rapid difficult breathing, nasal discharge, fever, and often visible abdominal breathing effort. Serious respiratory disease.",
  photo_sensitization: "Abnormal skin reaction to sunlight causing sunburn-like lesions on unpigmented (white) areas of skin, often related to liver disease or plant toxins.",
  quivering_lips: "Involuntary trembling or twitching of lips, often indicating neurological problems, pain, or certain toxicities.",
  reduction_milk_vields: "Decrease in daily milk production below expected levels for that stage of lactation, indicating illness, poor nutrition, or mastitis.",
  rapid_breathing: "Increased respiratory rate above normal (normal 15-30 breaths/minute), indicating respiratory disease, fever, pain, or heat stress.",
  rumenstasis: "Cessation or significant slowing of rumen contractions and movement, indicating digestive dysfunction or serious systemic illness.",
  reduced_rumination: "Decrease in cud-chewing activity (normal 6-8 hours daily). Early sign of illness as healthy cattle regularly regurgitate and re-chew food.",
  reduced_fertility: "Lower than expected conception rates in the herd, resulting in longer calving intervals and reduced reproductive efficiency.",
  reduced_fat: "Lower fat content in milk than normal for breed and lactation stage, often indicating dietary energy deficiency or metabolic problems.",
  reduces_feed_intake: "Eating less feed than normal appetite, one of the earliest indicators that an animal is becoming unwell.",
  raised_breathing: "Elevated respiration rate with increased chest movement, indicating respiratory difficulty, fever, or pain.",
  stomach_pain: "Abdominal discomfort shown by restlessness, grinding teeth, kicking at belly, or abnormal lying positions.",
  salivation: "Excessive drooling or saliva production, often indicating mouth pain, difficulty swallowing, or exposure to certain toxins or irritants.",
  stillbirths: "Calves born dead at full term, indicating problems during late pregnancy or calving. May suggest infectious disease or calving difficulties.",
  shallow_breathing: "Weak, ineffective breaths with minimal chest movement, indicating severe respiratory compromise or extreme weakness.",
  swollen_pharyngeal: "Enlargement of the throat area causing visible external swelling and often difficulty breathing or swallowing.",
  swelling: "Abnormal enlargement of body parts due to fluid accumulation, inflammation, abscess formation, or tumor growth.",
  saliva: "Excessive production of spit or drool, more than normal, often pooling or dripping from mouth.",
  swollen_tongue: "Enlarged, thick tongue that may protrude from mouth, causing feeding difficulty and often indicating allergic reaction or specific diseases.",
  tachycardia: "Abnormally rapid heart rate significantly above normal range, indicating stress, pain, fever, or heart disease.",
  torticollis: "Abnormal twisted or tilted head position, often to one side, indicating neurological disease affecting neck muscles or vestibular system.",
  udder_swelling: "Enlargement of the udder beyond normal fullness, firm or hot to touch, indicating mastitis, injury, or severe inflammation.",
  udder_heat: "Abnormally hot temperature of udder when palpated, a key indicator of acute mastitis (udder infection) requiring immediate treatment.",
  udder_hardeness: "Firm, solid feeling of udder tissue instead of normal soft pliability, indicating severe mastitis with tissue damage or edema.",
  udder_redness: "Red or pink discoloration of udder skin instead of normal color, indicating inflammation, infection, or trauma.",
  udder_pain: "Sensitivity and obvious discomfort when udder is touched or milked, causing the cow to kick, step away, or show other signs of pain.",
  unwillingness_to_move: "Reluctance or refusal to walk or stand, standing in hunched position, indicating pain (especially foot/leg), severe illness, or extreme weakness.",
  ulcers: "Open sores or erosions on skin, in mouth, or on mucous membranes that fail to heal normally, often indicating infections or metabolic disease.",
  vomiting: "Rare in cattle due to ruminant physiology, but forceful regurgitation and expulsion of stomach contents indicates serious digestive system problems.",
  weight_loss: "Progressive decrease in body condition and muscle mass, visible as prominent bones. Indicates chronic disease, inadequate nutrition, or parasitism.",
  weakness: "General lack of physical strength shown by stumbling, difficulty rising, trembling while standing, or inability to support own weight.",
};

const cattleSymptoms = [
  "anorexia", "abdominal_pain", "anaemia", "abortions", "acetone", "aggression",
  "arthrogyposis", "ankylosis", "anxiety", "bellowing", "blood_loss", "blood_poisoning",
  "blisters", "colic", "Condemnation_of_livers", "coughing", "depression", "discomfort",
  "dyspnea", "dysentery", "diarrhoea", "dehydration", "drooling", "dull",
  "decreased_fertility", "diffculty_breath", "emaciation", "encephalitis", "fever",
  "facial_paralysis", "frothing_of_mouth", "frothing", "gaseous_stomach", "highly_diarrhoea",
  "high_pulse_rate", "high_temp", "high_proportion", "hyperaemia", "hydrocephalus",
  "isolation_from_herd", "infertility", "intermittent_fever", "jaundice", "ketosis",
  "loss_of_appetite", "lameness", "lack_of-coordination", "lethargy", "lacrimation",
  "milk_flakes", "milk_watery", "milk_clots", "mild_diarrhoea", "moaning",
  "mucosal_lesions", "milk_fever", "nausea", "nasel_discharges", "oedema", "pain",
  "painful_tongue", "pneumonia", "photo_sensitization", "quivering_lips",
  "reduction_milk_vields", "rapid_breathing", "rumenstasis", "reduced_rumination",
  "reduced_fertility", "reduced_fat", "reduces_feed_intake", "raised_breathing",
  "stomach_pain", "salivation", "stillbirths", "shallow_breathing", "swollen_pharyngeal",
  "swelling", "saliva", "swollen_tongue", "tachycardia", "torticollis", "udder_swelling",
  "udder_heat", "udder_hardeness", "udder_redness", "udder_pain", "unwillingness_to_move",
  "ulcers", "vomiting", "weight_loss", "weakness",
];

export default function DiseaseDetection() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<{
    input_symptoms: string[];
    predictions: {
      DecisionTree: string;
      RandomForest: string;
      KNN: string;
      NaiveBayes: string;
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredSymptom, setHoveredSymptom] = useState<string | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const filteredSymptoms = cattleSymptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePredict = async () => {
    if (symptoms.length < 2) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result);
      } else {
        setPrediction({
          input_symptoms: symptoms,
          predictions: {
            DecisionTree: "gut_worms",
            RandomForest: "gut_worms",
            KNN: "mastitis",
            NaiveBayes: "gut_worms",
          },
        });
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction({
        input_symptoms: symptoms,
        predictions: {
          DecisionTree: "unable_to_determine",
          RandomForest: "unable_to_determine",
          KNN: "unable_to_determine",
          NaiveBayes: "unable_to_determine",
        },
      });
    }
    setIsLoading(false);
  };

  const formatDiseaseName = (disease: string) => {
    return disease.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getConsensus = (predictions: any) => {
    const predictionValues = Object.values(predictions);
    const counts: any = predictionValues.reduce((acc: any, pred) => {
      acc[pred as string] = (acc[pred as string] || 0) + 1;
      return acc;
    }, {});

    const maxCount = Math.max(...(Object.values(counts) as number[]));
    const consensus = Object.keys(counts).find((key) => counts[key] === maxCount);
    const confidence = Math.round((maxCount / 4) * 100);

    return { disease: consensus, confidence };
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="icon-box w-16 h-16">
              <Stethoscope className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-forest-800 mb-4">
            Disease Detection
          </h1>
          <p className="text-lg text-forest-600 max-w-2xl mx-auto">
            AI-powered cattle health assessment using 4 machine learning models
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="card-glass rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-gradient-to-r from-forest-600 to-meadow-600 text-black p-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Symptom Selection
              </h2>
              <p className="text-forest-100 text-sm mt-1">
                Select at least 2 symptoms observed in the cattle
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Search */}
              <div>
                <label className="block font-medium text-sm mb-2 flex items-center gap-2 text-forest-700">
                  <Search className="w-4 h-4" />
                  Search Symptoms
                </label>
                <input
                  type="text"
                  placeholder="Type to search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border-2 border-meadow-200 rounded-xl bg-white/80 text-forest-800 placeholder-forest-400 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all duration-200"
                />
              </div>

              {/* Symptoms Grid */}
              <div>
                <label className="block font-medium text-sm mb-3 text-forest-700">
                  Available Symptoms ({filteredSymptoms.length})
                </label>
                <div className="max-h-64 overflow-y-auto border-2 border-meadow-200 rounded-xl p-3 bg-white/50">
                  <div className="grid grid-cols-1 gap-2">
                    {filteredSymptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className="relative"
                      >
                        <label
                          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                            symptoms.includes(symptom)
                              ? "bg-forest-100 text-forest-800 border-2 border-forest-500"
                              : "hover:bg-meadow-50 text-forest-600 border-2 border-transparent"
                          }`}
                        >
                          <div className="flex items-center flex-1">
                            <input
                              type="checkbox"
                              checked={symptoms.includes(symptom)}
                              onChange={() => handleSymptomToggle(symptom)}
                              className="mr-2 w-4 h-4 text-forest-600 rounded focus:ring-forest-500 border-meadow-300"
                            />
                            <span className="text-sm capitalize">{symptom.replace(/_/g, " ")}</span>
                          </div>
                          <div className="relative ml-2">
                            <Info 
                              className="w-4 h-4 text-forest-400 hover:text-forest-600 transition-colors cursor-help"
                              onMouseEnter={() => setHoveredSymptom(symptom)}
                              onMouseLeave={() => setHoveredSymptom(null)}
                            />
                            
                            {/* Tooltip */}
                            {hoveredSymptom === symptom && (
                              <div 
                                className="absolute z-[999] right-6 top-0 w-64 p-3 bg-forest-800 text-black text-xs rounded-lg shadow-xl border border-forest-600 animate-fade-in pointer-events-none"
                                onMouseEnter={(e) => e.stopPropagation()}
                              >
                                <div className="absolute -left-1.5 top-2 w-3 h-3 bg-forest-800 border-l border-b border-forest-600 transform rotate-45"></div>
                                <p className="leading-relaxed">{symptomDescriptions[symptom] || "Description not available"}</p>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Symptoms */}
              {symptoms.length > 0 && (
                <div className="animate-fade-in">
                  <label className="block font-semibold mb-2 text-forest-700">
                    Selected ({symptoms.length}):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="px-3 py-1.5 bg-forest-100 text-forest-700 rounded-full text-sm font-medium flex items-center gap-1 border border-forest-200"
                      >
                        {symptom.replace(/_/g, " ")}
                        <button
                          onClick={() => handleSymptomToggle(symptom)}
                          className="ml-1 text-forest-500 hover:text-sunset-600 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={symptoms.length < 2 || isLoading}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5" />
                    {symptoms.length < 2
                      ? `Select ${2 - symptoms.length} more symptom${2 - symptoms.length > 1 ? "s" : ""}`
                      : "Predict Disease"}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="card-glass rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-gradient-to-r from-meadow-600 to-forest-600 text-white p-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                ML Model Predictions
              </h2>
              <p className="text-meadow-100 text-sm mt-1">Results from 4 machine learning algorithms</p>
            </div>
            
            <div className="p-6">
              {!prediction ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-meadow-100 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-meadow-400" />
                  </div>
                  <p className="text-forest-500 text-lg">
                    Select symptoms and click "Predict Disease"
                  </p>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {/* Consensus */}
                  {(() => {
                    const consensus = getConsensus(prediction.predictions);
                    return (
                      <div className="p-5 bg-gradient-to-r from-forest-50 to-meadow-50 border-2 border-forest-200 rounded-xl">
                        <h3 className="text-forest-700 font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-sunset-500" />
                          Consensus Prediction
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-forest-800 font-bold text-2xl font-display">
                            {formatDiseaseName(consensus.disease || "Unknown")}
                          </span>
                          <span className="bg-forest-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                            {consensus.confidence}% Agreement
                          </span>
                        </div>
                        <div className="w-full bg-meadow-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-forest-500 to-meadow-500 h-3 rounded-full transition-all duration-700"
                            style={{ width: `${consensus.confidence}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Individual Predictions */}
                  <div>
                    <h3 className="font-semibold mb-3 text-forest-800 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Individual Model Predictions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(prediction.predictions).map(([model, disease]) => (
                        <div
                          key={model}
                          className="p-4 bg-white/70 rounded-xl border-2 border-meadow-200 hover;border-forest-300 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-forest-700 text-sm">
                              {model === "DecisionTree"
                                ? "Decision Tree"
                                : model === "RandomForest"
                                ? "Random Forest"
                                : model === "KNN"
                                ? "K-Nearest Neighbors"
                                : "Naive Bayes"}
                            </span>
                            <div className="w-2 h-2 bg-forest-500 rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-forest-800 font-semibold">{formatDiseaseName(disease)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analyzed Symptoms */}
                  <div>
                    <h3 className="font-semibold mb-2 text-forest-800">
                      Analyzed Symptoms ({prediction.input_symptoms.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {prediction.input_symptoms.map((symptom) => (
                        <span
                          key={symptom}
                          className="px-3 py-1 bg-meadow-100 text-meadow-700 rounded-full text-sm border border-meadow-200"
                        >
                          {formatDiseaseName(symptom)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 bg-sunset-50 border-2 border-sunset-200 rounded-xl">
                    <div className="flex gap-3 items-start">
                      <AlertTriangle className="w-5 h-5 text-sunset-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sunset-700 mb-1 text-sm">
                          Veterinary Disclaimer
                        </p>
                        <p className="text-sm text-sunset-600">
                          These ML predictions are for informational purposes only. Please consult
                          with a qualified veterinarian for proper diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
