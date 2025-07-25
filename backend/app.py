from fastapi import FastAPI
from pydantic import BaseModel

from .logic_engine import interpreter as interp


app = FastAPI(title="DDW Anti-Normalization API")


@app.get("/")
def read_root():
    return {"msg": "DDW Anti-Normalization API"}


class Logic(BaseModel):
    record: str


@app.post("/interpret")
def interpret(item: Logic):
    return interp.interpret(item.record)
