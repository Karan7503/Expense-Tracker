from pydantic import BaseModel
from typing import Optional

class Salary(BaseModel):
    source: str
    amount: float
    description: Optional[str] = ""
    updatedAt: str

class Transaction(BaseModel):
    id: str
    type: str  # "income" or "expense"
    title: str
    category: str
    amount: float
    date: str
    time: str
    createdAt: str