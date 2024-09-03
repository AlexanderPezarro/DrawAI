import numpy as np
from keras import models
import imageio.v3 as iio
from skimage.transform import resize

import sys
from os.path import join, exists
from utils.utils import read_config, log


if __name__ == '__main__':
    config = read_config()
    classes = config["model-params"]["classes"].split(",")
    model_name = config["config"]["model_name"]
    models_dir = config["config"]["models_dir"]

    if not exists(models_dir):
        log("Error: model directory does not exist!")
        exit(-1)

    # De-serialise the model
    model = models.load_model(join(models_dir, model_name))

    for line in iter(sys.stdin.readline, ""):
        if line.strip() != "":
            # Read the image from the path given in stdin
            line = line.replace("\n", "")
            img = iio.imread(line)[:, :, 0]
            img = resize(img, (28, 28))
            img = np.array([img*255], dtype=np.uint8)

            # Use the model to generate a prediction
            prediction = model.predict(img, verbose=0)

            sys.stdout.write(f"{{\"label\": \"{classes[np.argmax(prediction)]}\", \"confidence\": {np.max(prediction)}}}\n")
            sys.stdout.flush()
