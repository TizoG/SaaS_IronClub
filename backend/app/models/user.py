

from sqlalchemy import Boolean, Column, Date, Float, Integer, String, func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50), nullable=False)
    surname = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    phone = Column(String(255), nullable=False)
    birthdate = Column(Date, nullable=False)
    membership = Column(String(50), nullable=False)
    role = Column(String(50), nullable=False)
    created_at = Column(Date, default=func.now())
    updated_at = Column(Date, default=func.now(), onupdate=func.now())

    photo = Column(String(255), nullable=True)
    address = Column(String(255), nullable=True)
    emergency_contact = Column(String(255), nullable=True)
    tall = Column(Float, nullable=True)
    weight = Column(Float, nullable=True)
    fitness_level = Column(String(255), nullable=True)
    fitness_objective = Column(String(255), nullable=True)
    medical_condition = Column(String(255), nullable=True)
    allergies = Column(String(255), nullable=True)

    class_reminder = Column(Boolean, default=False)
    payment_reminder = Column(Boolean, default=False)
    class_summary = Column(Boolean, default=False)
    promotions_offers = Column(Boolean, default=False)
    social_updates = Column(Boolean, default=False)

    visible_profile = Column(Boolean, default=False)
    share_progress = Column(Boolean, default=False)
    show_ranking = Column(Boolean, default=False)
