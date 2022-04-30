from sklearn.datasets import make_classification

import pandas as pd
import numpy as np
from collections import Counter

import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, cross_validate, StratifiedKFold
from keras.layers import Dense
from keras.models import Sequential
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.utils import class_weight

from fastapi import FastAPI,Request
import csv

TRAIN_FILE_NAME = 'fetal_health.csv'
TEST_FILE_NAME = 'test.csv'

df = pd.read_csv(TRAIN_FILE_NAME)
np.random.shuffle(df.values)
X = df.drop('fetal_health', inplace=False, axis=1).values #np array
y_old = df['fetal_health'].values #np array
y = []

EPOCHS = 10
BATCH_SIZE = 20


output_dist = {}
for i in y_old:
    if i in output_dist:
        output_dist[i] += 1
    else:
        output_dist[i] = 1


for i in y_old:
    if i == 1:
        y.append([1, 0, 0])
    elif i == 2:
        y.append([0, 1, 0])
    elif i == 3:
        y.append([0, 0, 1])

y = np.array(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


balanced_weights = {0:1655, 1:295, 2:176}


nn_model=Sequential()
nn_model.add(Dense(500, input_dim=21, activation='relu'))
nn_model.add(Dense(200, activation='relu'))
nn_model.add(Dense(100, activation='relu'))
nn_model.add(Dense(50, activation='relu'))
nn_model.add(Dense(3, activation='softmax'))


nn_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

nn_model.fit(X_train, y_train, epochs=EPOCHS, batch_size=BATCH_SIZE, class_weight=balanced_weights)
print('**************')
val = nn_model.evaluate(X_test, y_test)
print('**************')






app = FastAPI()


@app.get("/")
async def root():
    return {"message": "hello"}

@app.post("/post/")
async def post_request(request : Request):
    test = await pd.read_csv('temp.csv').values
    pred = await nn_model.predict(test)
    return pred


'''
f = open('./temp.csv', 'w')
writer = csv.writer(f)

# write a row to the csv file
writer.writerow("test")

# close the file
f.close()
'''