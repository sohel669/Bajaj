from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import base64
import json
import re

app = FastAPI()

class RequestData(BaseModel):
    data: list
    file_b64: str = None

@app.post("/bfhl")
async def process_data(request: RequestData):
    user_id = "john_doe_17091999"
    email = "john@xyz.com"
    roll_number = "ABCD123"

    # Extract numbers and alphabets
    numbers = [item for item in request.data if item.isdigit()]
    alphabets = [item for item in request.data if item.isalpha()]

    # Determine highest lowercase alphabet
    highest_lowercase = [max(filter(lambda x: x.islower(), alphabets), default=None)]

    # File handling
    file_valid = False
    file_mime_type = None
    file_size_kb = 0

    if request.file_b64:
        try:
            file_data = base64.b64decode(request.file_b64)
            file_valid = True
            file_size_kb = len(file_data) / 1024
            # Placeholder MIME type logic
            file_mime_type = "image/png"  # Simplified for the example
        except Exception:
            file_valid = False

    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase,
        "file_valid": file_valid,
        "file_mime_type": file_mime_type,
        "file_size_kb": round(file_size_kb, 2)
    }

    return JSONResponse(content=response)

@app.get("/bfhl")
async def get_operation_code():
    return JSONResponse(content={"operation_code": 1})

