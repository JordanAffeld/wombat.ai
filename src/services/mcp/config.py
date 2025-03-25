import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models/")
    API_KEY: str = os.getenv("API_KEY", "")
    MAX_BATCH_SIZE: int = int(os.getenv("MAX_BATCH_SIZE", "32"))
    LANGUAGES: list = ["en", "zh", "ja", "ko"]

    class Config:
        env_file = ".env"

settings = Settings() 