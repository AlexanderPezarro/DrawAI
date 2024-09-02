import configparser

# Default config values
LOG_LEVEL = 0


def isfloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False


def isint(num):
    try:
        int(num)
        return True
    except ValueError:
        return False


def cast_vals(config):
    return {
        k:
            int(config[k])
            if isint(config[k]) else

            float(config[k])
            if isfloat(config[k]) else

            config[k]
        for k in config
    }


def read_config() -> dict[str, dict[str, any]]:
    config = configparser.ConfigParser()
    config.read("config.ini")

    if config.has_section("config"):
        global LOG_LEVEL
        LOG_LEVEL = int(config.get("config", "log_level"))

    return {
        key: cast_vals(dict(config[key]))
        for key in config.keys()
    }


def log(text: str, file = None) -> None:
    if LOG_LEVEL > 0:
        print(text, file)
