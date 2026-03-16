import pandas as pd
import numpy as np
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

# Load training dataset
df = pd.read_csv("./Dataset/Training.csv")

# Symptom list
l1 = ['anorexia','abdominal_pain','anaemia','abortions','acetone','aggression','arthrogyposis',
    'ankylosis','anxiety','bellowing','blood_loss','blood_poisoning','blisters','colic','Condemnation_of_livers',
    'coughing','depression','discomfort','dyspnea','dysentery','diarrhoea','dehydration','drooling',
    'dull','decreased_fertility','diffculty_breath','emaciation','encephalitis','fever','facial_paralysis','frothing_of_mouth',
    'frothing','gaseous_stomach','highly_diarrhoea','high_pulse_rate','high_temp','high_proportion','hyperaemia','hydrocephalus',
    'isolation_from_herd','infertility','intermittent_fever','jaundice','ketosis','loss_of_appetite','lameness',
    'lack_of-coordination','lethargy','lacrimation','milk_flakes','milk_watery','milk_clots',
    'mild_diarrhoea','moaning','mucosal_lesions','milk_fever','nausea','nasel_discharges','oedema',
    'pain','painful_tongue','pneumonia','photo_sensitization','quivering_lips','reduction_milk_vields','rapid_breathing',
    'rumenstasis','reduced_rumination','reduced_fertility','reduced_fat','reduces_feed_intake','raised_breathing','stomach_pain',
    'salivation','stillbirths','shallow_breathing','swollen_pharyngeal','swelling','saliva','swollen_tongue',
    'tachycardia','torticollis','udder_swelling','udder_heat','udder_hardeness','udder_redness','udder_pain','unwillingness_to_move',
    'ulcers','vomiting','weight_loss','weakness']

# Disease list
disease = ['mastitis','blackleg','bloat','coccidiosis','cryptosporidiosis',
        'displaced_abomasum','gut_worms','listeriosis','liver_fluke','necrotic_enteritis','peri_weaning_diarrhoea',
        'rift_valley_fever','rumen_acidosis',
        'traumatic_reticulitis','calf_diphtheria','foot_rot','foot_and_mouth','ragwort_poisoning','wooden_tongue','infectious_bovine_rhinotracheitis',
        'acetonaemia','fatty_liver_syndrome','calf_pneumonia','schmallen_berg_virus','trypanosomosis','fog_fever']

# Encode labels
label_map = {disease[i]: i for i in range(len(disease))}
df['prognosis'] = df['prognosis'].replace(label_map).astype(int)
 
X = df[l1]
y = np.ravel(df[["prognosis"]])

# Load testing dataset
tr = pd.read_csv("./Dataset/Testing.csv")

tr['prognosis'] = tr['prognosis'].replace(label_map).astype(int)
X_test = tr[l1]
y_test = np.ravel(tr[["prognosis"]])

# Train models
clf_tree = tree.DecisionTreeClassifier().fit(X, y)
clf_rf = RandomForestClassifier(n_estimators=100).fit(X, y)
clf_knn = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2).fit(X, y)
clf_nb = GaussianNB().fit(X, y)

def predict_disease(symptoms: list[str]) -> dict:
    """Predict disease from symptoms using 4 ML models"""

    input_vector = [0] * len(l1)
    for s in symptoms:
        if s in l1:
            input_vector[l1.index(s)] = 1

    input_df = pd.DataFrame([input_vector], columns=l1)

    pred_tree = disease[clf_tree.predict(input_df)[0]]
    pred_rf   = disease[clf_rf.predict(input_df)[0]]
    pred_knn  = disease[clf_knn.predict(input_df)[0]]
    pred_nb   = disease[clf_nb.predict(input_df)[0]]

    return {
        "DecisionTree": pred_tree,
        "RandomForest": pred_rf,
        "KNN": pred_knn,
        "NaiveBayes": pred_nb
    }
