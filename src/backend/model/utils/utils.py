import configparser

LOG_LEVEL = 2


def read_config() -> dict[str, str]:
    config = configparser.ConfigParser()
    config.read("config.ini")
    return dict(config["config"])


def log(text: str) -> None:
    if LOG_LEVEL > 1:
        print(text)
