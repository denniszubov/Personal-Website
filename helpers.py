from datetime import date
from data import DATA


def calculate_age(birthdate):
    today = date.today()
    birthdate = date(year=2001, month=11, day=26)
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


def getDynamicData():
    age = calculate_age(date(year=2001, month=11, day=26))
    year = date.today().year
    data = DATA
    data["age"] = age
    data["year"] = year
    return data
