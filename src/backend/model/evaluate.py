import sys
import numpy as np
from keras import models
import imageio.v3 as iio
from skimage.transform import resize

from utils.utils import read_config


if __name__ == '__main__':
    config = read_config()
    classes = config["classes"].split(",")

    for line in iter(sys.stdin.readline, ""):
        if line.strip() != "":
            line = line.replace("\n", "")
            img = iio.imread(line)[:, :, 0]
            img = resize(img, (28, 28))
            img = np.array([img*255], dtype=np.uint8)
            print("Image resized", file=sys.stderr)
            model = models.load_model("models/model_1")
            model.save('models/model_1.h5')
            model = models.load_model('models/model_1.h5')
            print("Model loaded", file=sys.stderr)
            prediction = model.predict(img, verbose=0)
            print("Prediction made", file=sys.stderr)

            sys.stdout.write(f"{{\"label\": \"{classes[np.argmax(prediction)]}\", \"confidence\": {np.max(prediction)}}}\n")
            sys.stdout.flush()
