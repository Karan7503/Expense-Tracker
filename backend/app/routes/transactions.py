from fastapi import APIRouter
from ..database import get_transactions, add_transaction
from ..models import Transaction

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/")
def fetch_transactions():
    return get_transactions()

@router.post("/")
def create_transaction(tx: Transaction):
    add_transaction(tx.dict())
    return {"status": "added"}