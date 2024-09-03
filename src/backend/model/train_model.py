import numpy as np
import tensorflow as tf
from keras import layers, models
from sklearn.model_selection import train_test_split

from utils.utils import read_config, log
from os import makedirs, listdir
from os.path import exists, isfile, join
import urllib.request as url_request


def create_labels(size, label):
    return np.array([label] * size, dtype=np.uint8)


def check_missing_data(expected_datasets) -> set[int]:
    # Ensure the dir exists
    if not exists(data_dir):
        log("Creating missing data directory")
        makedirs(data_dir)

    actual_datasets = set([
        filename.replace(".npy", "") for filename in listdir(data_dir) if isfile(join(data_dir, filename))
    ])

    return set(expected_datasets).difference(actual_datasets)


def download_data(missing_data):
    for dataset in missing_data:
        url = f"https://storage.googleapis.com/quickdraw_dataset/full/numpy_bitmap/{dataset}.npy"
        log(f"Downloading: {url}")
        url_request.urlretrieve(url, join(data_dir, f"{dataset}.npy"))
        log("Downloaded!")


def load_data_sets(classes, samples_per_class) -> tuple[tuple[np.array, np.array], tuple[np.array, np.array]]:
    # Check if all datasets are present
    missing_data = check_missing_data(classes)
    if len(missing_data) > 0:
        log(f"Downloading missing datasets: {list(missing_data)}")
        # Download any missing datasets
        download_data(missing_data)

    # Load the data sets from data/ and create labels for each dataset
    input_data = np.concatenate([np.load(f"data/{name}.npy")[:samples_per_class] for name in classes])
    labels = np.concatenate([create_labels(samples_per_class, i) for i in range(len(classes))])

    # Append the labels onto the input data
    data_set = np.concatenate((input_data, np.array([labels]).T), axis=1)

    # Shuffle and split into training and testing datasets
    train, test = train_test_split(data_set, test_size=0.2, shuffle=True, random_state=1)

    x_train, y_train = train[:, :-1], train[:, -1]
    x_test, y_test = test[:, :-1], test[:, -1]

    x_train = x_train.reshape((x_train.shape[0], 28, 28))
    x_test = x_test.reshape((x_test.shape[0], 28, 28))

    return (x_train, y_train), (x_test, y_test)


def train_model(x_train, y_train, x_test, y_test, num_classes):
    model = models.Sequential([
        layers.Rescaling(1. / 255, input_shape=(28, 28, 1)),
        layers.Conv2D(28, (3, 3), padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(56, (3, 3), padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(56, (3, 3), padding='same', activation='relu'),
        layers.Flatten(),
        layers.Dense(56, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
                  metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=1, validation_data=(x_test, y_test))
    return model


def save_model(model: models.Sequential, model_name: str) -> None:
    # Ensure the dir exists
    if not exists(models_dir):
        makedirs(models_dir)

    model.save(join(models_dir, model_name), zipped=False)


def main():
    # Gather the data sets
    (x_train, y_train), (x_test, y_test) = load_data_sets(config_classes, config_samples_per_class)
    # Train the model
    model = train_model(x_train, y_train, x_test, y_test, len(config_classes))
    # Evaluate the model on the test set
    test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
    # Print the test set accuracy
    print("Accuracy: {:.2f}".format(test_acc * 100))
    # Serialise the model
    save_model(model, config_model_name)


if __name__ == '__main__':
    # Load the config here to globalise its scope
    config = read_config()
    model_config = config["model-params"]
    other_config = config["config"]

    config_classes = model_config["classes"].split(",")
    config_samples_per_class = model_config["samples_per_class"]

    config_model_name = other_config["model_name"]
    data_dir = other_config["data_dir"]
    models_dir = other_config["models_dir"]

    main()
