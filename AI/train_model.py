import numpy as np
import pandas as pd
import tensorflow as tf

from keras import datasets, layers, models
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

from AI.utils.utils import read_config


def reshape(data):
    return data.reshape((data.shape[0], 28, 28))


def create_labels(size, label):
    return np.array([label] * size, dtype=np.uint8)


def load_data_sets(classes, samples_per_class) -> tuple[tuple[np.array, np.array], tuple[np.array, np.array]]:
    # Load the data sets from data/ and create labels for each dataset
    input_data = np.concatenate([np.load(f"data/{name}.npy")[:samples_per_class] for name in classes])
    labels = np.concatenate([create_labels(samples_per_class, i) for i in range(len(classes))])

    # Append the labels onto the input data
    data_set = np.concatenate((input_data, np.array([labels]).T), axis=1)

    # Shuffle and split into training and testing datasets
    train, test = train_test_split(data_set, test_size=0.2, shuffle=True, random_state=1)

    x_train, y_train = train[:, :-1], train[:, -1]
    x_test, y_test = test[:, :-1], test[:, -1]

    x_train = reshape(x_train)
    x_test = reshape(x_test)

    return (x_train, y_train), (x_test, y_test)

if __name__ == '__main__':
    pass
