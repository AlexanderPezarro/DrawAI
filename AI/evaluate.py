import argparse

import numpy as np

from keras import models
import imageio.v3 as iio

from utils.utils import read_config


if __name__ == '__main__':
    # Create an argument parser and parse the args
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--img",
        type=str,
        default="",
        help="Path where the image is located.",
        required=True
    )
    flags, unparsed = parser.parse_known_args()

    # Extract the configuration data
    config = read_config()
    classes = config["classes"].split(",")

    img = np.array([iio.imread(flags.img)[:, :, 0]])

    model = models.load_model("models/model_1")
    print(model.predict(img))
    print(classes[np.argmax(model.predict(img))])
    pass
