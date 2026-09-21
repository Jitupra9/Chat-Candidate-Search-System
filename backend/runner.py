# pyrefly: ignore [missing-import]
import uvicorn

if __name__ == "__main__":
    print("[RUNNER] Starting TalentPulse AI Backend server...")
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
