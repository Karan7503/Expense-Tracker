from fastapi import APIRouter
from ..database import get_salary, save_salary
from ..models import Salary

router = APIRouter(prefix="/salary", tags=["salary"])

@router.get("/")
def fetch_salary():
    return get_salary()

@router.post("/")
def update_salary(salary: Salary):
    save_salary(salary.dict())
    return {"status": "saved"}