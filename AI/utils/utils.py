import configparser


def read_config() -> dict[str, str]:
    config = configparser.ConfigParser()
    config.read("config.ini")
    return dict(config["config"])
