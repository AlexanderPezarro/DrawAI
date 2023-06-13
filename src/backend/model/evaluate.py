import numpy as np
from keras import models
import imageio.v3 as iio
from skimage.transform import resize

import sys
from os.path import join, exists
from utils.utils import read_config, log


if __name__ == '__main__':
    print("Imports loaded", file=sys.stderr)
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
            print("Static response", file=sys.stderr)
            sys.stdout.write(f"{{\"label\": \"{classes[0]}\", \"confidence\": {0.87}}}\n")
            sys.stdout.flush()
            
            # line = line.replace("\n", "")
            # img = iio.imread(line)[:, :, 0]
            # img = resize(img, (28, 28))
            # img = np.array([img*255], dtype=np.uint8)
            # print("Image resized", file=sys.stderr)
            # model = models.load_model("models/model_1")
            # model.save('models/model_1.h5')
            # model = models.load_model('models/model_1.h5')
            # print("Model loaded", file=sys.stderr)
            # prediction = model.predict(img, verbose=0)
            # print("Prediction made", file=sys.stderr)

            # sys.stdout.write(f"{{\"label\": \"{classes[np.argmax(prediction)]}\", \"confidence\": {np.max(prediction)}}}\n")
            # sys.stdout.flush()
