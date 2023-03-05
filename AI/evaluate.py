import sys
import numpy as np
from keras import models
import imageio.v3 as iio
from skimage.transform import resize

from utils.utils import read_config


if __name__ == '__main__':
    # Extract the configuration data
    config = read_config()
    classes = config["classes"].split(",")

    for line in iter(sys.stdin.readline, ""):
        if line.strip() != "":
            line = line.replace("\n", "")
            img = iio.imread(line)[:, :, 0]
            img = resize(img, (28, 28))
            img = np.array([img])

            model = models.load_model("models/model_1")
            prediction = model.predict(img, verbose=0)

            sys.stdout.write(f"{classes[np.argmax(prediction)]} {np.max(prediction) * 100}\n")
            sys.stdout.flush()
