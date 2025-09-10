from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


class CreateUser(BaseModel):
    name: str
    surname: str
    email: EmailStr
    password: str
    phone: str
    birthdate: date
    membership: str
    role: str
    photo: Optional[str]
    address: Optional[str]
    emergency_contact: Optional[str]
    tall: Optional[float]
    weight: Optional[float]
    fitness_level: Optional[str]
    fitness_objective: Optional[str]
    medical_condition: Optional[str]
    allergies: Optional[str]
    class_reminder: Optional[bool]
    payment_reminder: Optional[bool]
    class_summary: Optional[bool]
    promotions_offers: Optional[bool]
    social_updates: Optional[bool]
    visible_profile: Optional[bool]
    share_progress: Optional[bool]
    show_ranking: Optional[bool]

    class Config:
        orm_mode = True


class ResponseUser(CreateUser):
    id: int
    name: str
    surname: str
    email: EmailStr
    phone: str
    birthdate: date
    membership: str
    role: str
    photo: Optional[str]
    address: Optional[str]
    emergency_contact: Optional[str]
    tall: Optional[float]
    weight: Optional[float]
    fitness_level: Optional[str]
    fitness_objective: Optional[str]
    medical_condition: Optional[str]
    allergies: Optional[str]
    class_reminder: Optional[bool]
    payment_reminder: Optional[bool]
    class_summary: Optional[bool]
    promotions_offers: Optional[bool]
    social_updates: Optional[bool]
    visible_profile: Optional[bool]
    share_progress: Optional[bool]
    show_ranking: Optional[bool]


class LoginUser(BaseModel):
    email: EmailStr
    password: str

    class Config:
        orm_mode = True
