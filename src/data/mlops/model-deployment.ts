import { LearningModule } from "@/types/learning";

export const modelDeploymentModule: LearningModule = {
  id: "model-deployment",
  title: "Module 4: Model Deployment",
  description:
    "Transform trained models into production-ready REST APIs using FastAPI, and package everything into portable Docker containers.",
  status: "in-progress",
  detailedContent: `# Model Deployment: APIs & Containerization

A trained model sitting on your laptop delivers zero value. This module covers the critical engineering skills to serve your models reliably at scale.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **REST APIs with FastAPI** | Design and implement ML serving endpoints |
| 2 | **Data Validation** | Enforce input contracts with Pydantic |
| 3 | **Model Lifecycle** | Manage model loading and application state |
| 4 | **Docker Basics** | Containerize Python applications |
| 5 | **Multi-Stage Builds** | Create optimized production images |
| 6 | **Security Hardening** | Implement production-grade protections |

## The Deployment Gap

Most ML tutorials end at \`model.fit()\`. In production, you face entirely different challenges:

- **Environment Discrepancies**: Your local Python 3.12 with GPU drivers won't match the server.
- **Dependency Conflicts**: That specific version of NumPy you need might break something else.
- **Scalability**: A Jupyter notebook can't handle 1000 concurrent prediction requests.
- **Reliability**: Crashes, memory leaks, and cold starts become your daily problems.

Containerized APIs solve these issues by providing a consistent, isolated, and scalable deployment target.

---

## 1. REST APIs with FastAPI

**Why FastAPI?**

FastAPI has become the de-facto standard for ML serving in Python due to its performance, automatic documentation, and type safety. Built on Starlette and Pydantic, it provides:

- **Asynchronous I/O**: Handle thousands of concurrent connections efficiently.
- **Automatic OpenAPI docs**: Interactive API documentation generated from your code.
- **Type hints as validation**: Python type hints become runtime validation.
- **Performance**: Comparable to Node.js and Go for I/O-bound workloads.

### Creating a Basic Prediction Endpoint

\`\`\`python
from fastapi import FastAPI

app = FastAPI(
    title="ML Prediction Service",
    description="API for making predictions using trained ML models",
    version="1.0.0"
)

@app.get("/health")
def health_check():
    """Simple health check endpoint"""
    return {"status": "healthy", "service": "ml-predictor"}

@app.post("/predict")
def predict(data: dict):
    """Make a prediction using the trained model"""
    # Prediction logic here
    return {"prediction": 1, "confidence": 0.87}
\`\`\`

### Sync vs Async: Critical for ML

**Important distinction for CPU-bound inference:**

\`\`\`python
# DON'T: Async for CPU-intensive ML inference blocks the event loop
@app.post("/predict")
async def predict_wrong(data: InputData):
    result = model.predict(data)  # Blocks all other requests!
    return result

# DO: Use sync (def) to run in thread pool automatically
@app.post("/predict")
def predict_correct(data: InputData):
    result = model.predict(data)  # Runs in separate thread
    return result

# ALSO OK: Explicitly run in executor for async contexts
import asyncio
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=4)

@app.post("/predict")
async def predict_executor(data: InputData):
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(executor, model.predict, data)
    return result
\`\`\`

**Rule of thumb**: Use \`async def\` for I/O-bound operations (database calls, external APIs). Use regular \`def\` for CPU-bound ML inference—FastAPI automatically runs these in a thread pool.

---

## 2. Data Validation with Pydantic

**Why This Matters:**

Invalid input data is the #1 cause of production ML failures. Pydantic enforces strict data contracts between your API and its consumers.

### Defining Input Schemas

\`\`\`python
from pydantic import BaseModel, Field
from typing import Optional

class PredictionInput(BaseModel):
    """Schema for prediction request data"""
    
    # Required fields with constraints
    age: int = Field(..., ge=18, le=120, description="Customer age")
    income: float = Field(..., gt=0, description="Annual income in USD")
    
    # Optional fields with defaults
    credit_score: Optional[int] = Field(None, ge=300, le=850)
    employment_type: str = Field("employed", pattern="^(employed|self-employed|unemployed)$")
    
    # Nested validation
    loan_amount: float = Field(..., gt=0, le=1_000_000)
    
    class Config:
        # Provide example for API documentation
        json_schema_extra = {
            "example": {
                "age": 35,
                "income": 75000.0,
                "credit_score": 720,
                "employment_type": "employed",
                "loan_amount": 250000.0
            }
        }
\`\`\`

### Defining Response Schemas

\`\`\`python
class PredictionOutput(BaseModel):
    """Schema for prediction response"""
    prediction: int = Field(..., description="Predicted class (0 or 1)")
    probability: float = Field(..., ge=0, le=1, description="Confidence score")
    model_version: str = Field(..., description="Model version used")
    
class ErrorResponse(BaseModel):
    """Schema for error responses"""
    error: str
    detail: str
    status_code: int
\`\`\`

### Using Schemas in Endpoints

\`\`\`python
from fastapi import HTTPException

@app.post("/predict", response_model=PredictionOutput)
def make_prediction(input_data: PredictionInput):
    """
    Predict loan approval based on customer data.
    
    Pydantic automatically:
    - Validates all input fields
    - Converts types where possible
    - Returns 422 Unprocessable Entity on validation failure
    """
    try:
        # Convert to DataFrame for model
        features = input_data.model_dump()
        
        # Make prediction
        proba = model.predict_proba([list(features.values())])[0][1]
        prediction = int(proba >= 0.5)
        
        return PredictionOutput(
            prediction=prediction,
            probability=round(proba, 4),
            model_version="v1.2.0"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
\`\`\`

---

## 3. Model Lifecycle Management

**Why This Matters:**

Loading a large ML model on every request would be catastrophically slow. The model must be loaded once at startup and kept in memory.

### Lifespan Context Manager

FastAPI's lifespan events let you run code at startup and shutdown:

\`\`\`python
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
import joblib
from pathlib import Path

# Global model storage
ml_artifacts = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML artifacts at startup, cleanup at shutdown"""
    
    # --- STARTUP ---
    print("Loading ML models...")
    try:
        models_dir = Path("artifacts/models")
        
        # Load preprocessing pipeline
        ml_artifacts["pipeline"] = joblib.load(models_dir / "preprocessor.pkl")
        
        # Load trained model
        ml_artifacts["model"] = joblib.load(models_dir / "classifier.pkl")
        
        # Store in app state for access in routes
        app.state.pipeline = ml_artifacts["pipeline"]
        app.state.model = ml_artifacts["model"]
        
        print("Models loaded successfully")
        
    except FileNotFoundError as e:
        print(f"Failed to load models: {e}")
        # Set to None - endpoints should handle gracefully
        app.state.pipeline = None
        app.state.model = None
    
    yield  # Application runs here
    
    # --- SHUTDOWN ---
    print("Cleaning up resources...")
    ml_artifacts.clear()
    app.state.pipeline = None
    app.state.model = None


app = FastAPI(
    title="ML Prediction Service",
    lifespan=lifespan
)
\`\`\`

### Accessing Models in Endpoints

\`\`\`python
from fastapi import Request, HTTPException

@app.post("/predict", response_model=PredictionOutput)
def predict(input_data: PredictionInput, request: Request):
    """Make prediction using loaded model"""
    
    # Access models from app state
    pipeline = request.app.state.pipeline
    model = request.app.state.model
    
    # Handle case where models failed to load
    if pipeline is None or model is None:
        raise HTTPException(
            status_code=503, 
            detail="Model not available. Service is starting up or artifacts failed to load."
        )
    
    # Process and predict
    input_df = pd.DataFrame([input_data.model_dump()])
    processed = pipeline.transform(input_df)
    prediction = model.predict(processed)[0]
    
    return PredictionOutput(prediction=int(prediction), ...)
\`\`\`

### Dependency Injection Pattern

For more testable code, use FastAPI's dependency injection:

\`\`\`python
from fastapi import Depends

def get_model(request: Request):
    """Dependency that provides the model"""
    model = request.app.state.model
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return model

@app.post("/predict")
def predict(input_data: PredictionInput, model = Depends(get_model)):
    """Model is injected automatically"""
    return model.predict(input_data.to_array())
\`\`\`

---

## 4. Docker Fundamentals

**Why Docker?**

Docker packages your application, dependencies, and runtime into a single portable unit. This eliminates "it works on my machine" problems.

### Dockerfile Structure

\`\`\`dockerfile
# Base image - use slim for smaller size
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./src ./src
COPY ./artifacts ./artifacts

# Expose the port your app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

### Key Dockerfile Instructions

| Instruction | Purpose | Example |
|:-----------|:--------|:--------|
| \`FROM\` | Base image to build upon | \`FROM python:3.11-slim\` |
| \`WORKDIR\` | Set working directory | \`WORKDIR /app\` |
| \`COPY\` | Copy files into image | \`COPY requirements.txt .\` |
| \`RUN\` | Execute commands during build | \`RUN pip install -r requirements.txt\` |
| \`EXPOSE\` | Document which port to expose | \`EXPOSE 8000\` |
| \`CMD\` | Default command when container starts | \`CMD ["uvicorn", "...]\` |
| \`ENV\` | Set environment variables | \`ENV PYTHONUNBUFFERED=1\` |

### Base Image Selection

**Avoid Alpine for ML:**

\`\`\`dockerfile
# DON'T: Alpine uses musl libc, breaking many ML libraries
FROM python:3.11-alpine

# DO: Slim provides glibc compatibility with small footprint
FROM python:3.11-slim

# ALSO OK: Full image if you need compilation tools
FROM python:3.11
\`\`\`

Alpine seems smaller, but it uses \`musl libc\` instead of \`glibc\`. Most Python ML libraries (NumPy, Pandas, scikit-learn) are compiled against glibc, causing compatibility issues or requiring slow recompilation.

---

## 5. Multi-Stage Builds

**Why This Matters:**

Single-stage builds include build tools (gcc, git) in the final image. Multi-stage builds separate the build environment from runtime, resulting in smaller, more secure images.

### Production Dockerfile

\`\`\`dockerfile
# ================================
# Stage 1: Builder
# ================================
FROM python:3.11-slim AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \\
    build-essential \\
    && rm -rf /var/lib/apt/lists/*

# Install uv for fast dependency management
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

# Copy only dependency files first (cache optimization)
COPY pyproject.toml uv.lock ./

# Create virtual environment and install dependencies
RUN uv venv /opt/venv && \\
    uv pip install --no-cache -r pyproject.toml

# ================================
# Stage 2: Runtime
# ================================
FROM python:3.11-slim

# Create non-root user for security
RUN groupadd --system --gid 1001 appgroup && \\
    useradd --system --uid 1001 --gid appgroup appuser

WORKDIR /app

# Copy virtual environment from builder (no build tools)
COPY --from=builder /opt/venv /opt/venv

# Copy application code
COPY ./src ./src
COPY ./artifacts/models ./artifacts/models

# Set environment variables
ENV PATH="/opt/venv/bin:$PATH" \\
    PYTHONUNBUFFERED=1 \\
    PYTHONDONTWRITEBYTECODE=1

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

### Layer Caching Strategy

Docker caches each layer. Order your \`COPY\` statements from least to most frequently changed:

\`\`\`dockerfile
# Optimal ordering for cache efficiency

# 1. Dependencies file (rarely changes)
COPY requirements.txt .
RUN pip install -r requirements.txt

# 2. Model artifacts (occasionally changes)
COPY ./artifacts ./artifacts

# 3. Application code (frequently changes)
COPY ./src ./src
\`\`\`

This way, code changes don't trigger a full dependency reinstall.

---

## 6. Security Hardening

### Non-Root User

Never run containers as root. A vulnerability could give attackers host-level access.

\`\`\`dockerfile
# Create a dedicated user
RUN groupadd -r mluser && useradd -r -g mluser mluser

# Change ownership of app directory
RUN chown -R mluser:mluser /app

# Switch to non-root user
USER mluser
\`\`\`

### Secrets Management

**Never hardcode secrets in Dockerfiles:**

\`\`\`dockerfile
# NEVER DO THIS
ENV API_KEY="sk-secret-key-12345"

# Pass secrets at runtime
# docker run -e API_KEY=$API_KEY myimage
\`\`\`

Use environment variables or orchestration-level secrets (Kubernetes Secrets, AWS Secrets Manager).

### .dockerignore

Prevent sensitive files from being copied into the image:

\`\`\`text
# .dockerignore

# Git and version control
.git
.gitignore

# Python artifacts
__pycache__/
*.pyc
.venv/
venv/

# Development files
.env
.env.local
*.log

# Large data files (mount at runtime instead)
data/
*.csv
*.parquet

# IDE and editor files
.vscode/
.idea/
\`\`\`

### Health Checks

Kubernetes and orchestrators use health checks to know when your service is ready:

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8000/health || exit 1
\`\`\`

Ensure your \`/health\` endpoint verifies model availability:

\`\`\`python
@app.get("/health")
def health(request: Request):
    model_loaded = request.app.state.model is not None
    return {
        "status": "healthy" if model_loaded else "degraded",
        "model_loaded": model_loaded
    }

@app.get("/ready")
def readiness(request: Request):
    """Readiness check - return 503 if not ready to serve"""
    if request.app.state.model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"ready": True}
\`\`\`

---

## TL;DR - Quick Recall

**Key Takeaways:**

- **FastAPI**: Use \`def\` (not \`async def\`) for CPU-bound ML inference
- **Pydantic**: Define strict input/output schemas for data validation
- **Lifespan Events**: Load models at startup using \`@asynccontextmanager\`
- **Multi-Stage**: Separate build and runtime stages in Dockerfile
- **Slim over Alpine**: Use \`python:3.x-slim\` for ML applications
- **Security**: Non-root user, no hardcoded secrets, proper health checks

<details>
<summary><strong>Quick Commands Reference (Click to Expand)</strong></summary>

\`\`\`bash
# Build Docker image
docker build -t ml-api:latest .

# Run container
docker run -d -p 8000:8000 --name ml-api ml-api:latest

# View logs
docker logs -f ml-api

# Stop and remove
docker stop ml-api && docker rm ml-api

# Run with environment variables
docker run -d -p 8000:8000 -e API_KEY=$API_KEY ml-api:latest

# Interactive shell in running container
docker exec -it ml-api /bin/bash
\`\`\`

\`\`\`python
# Run FastAPI locally
uvicorn src.main:app --reload --port 8000

# Production server with multiple workers
gunicorn src.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
\`\`\`
</details>

**The Production Mantra:**
> "If it's not containerized, it's not production-ready."

---

## Additional Resources

**Documentation:**
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Comprehensive guide with tutorials
- [Pydantic Documentation](https://docs.pydantic.dev/) - Data validation and settings management
- [Docker Documentation](https://docs.docker.com/) - Official Docker guides
- [uv Package Manager](https://github.com/astral-sh/uv) - Modern, fast Python package installer

**Tools:**
- **Gunicorn**: Production-grade WSGI server with Uvicorn workers
- **Hadolint**: Dockerfile linter for best practices
- **Trivy**: Container vulnerability scanner
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "md-q1",
      question:
        "Why should you use `def` instead of `async def` for ML inference endpoints in FastAPI?",
      options: [
        "async def is slower than def",
        "ML inference is CPU-bound, and async def would block the event loop",
        "def provides better error handling",
        "FastAPI doesn't support async functions",
      ],
      correctAnswer: 1,
      explanation:
        "ML inference is CPU-bound work. Using async def for CPU-intensive tasks blocks the event loop, preventing other requests from being processed. FastAPI automatically runs regular def functions in a thread pool.",
      difficulty: "medium",
    },
    {
      id: "md-q2",
      question: "What is the purpose of Pydantic in a FastAPI application?",
      options: [
        "To speed up model inference",
        "To provide automatic data validation and type checking",
        "To connect to databases",
        "To create Docker containers",
      ],
      correctAnswer: 1,
      explanation:
        "Pydantic provides runtime data validation based on Python type hints. It automatically validates incoming request data and returns 422 errors for invalid input, ensuring type safety.",
      difficulty: "easy",
    },
    {
      id: "md-q3",
      question: "Where should ML models be loaded in a FastAPI application?",
      options: [
        "Inside each prediction endpoint function",
        "In a global variable at module import time",
        "In the lifespan context manager at application startup",
        "In a background task after the first request",
      ],
      correctAnswer: 2,
      explanation:
        "The lifespan context manager runs at application startup and shutdown. Loading models here ensures they're loaded once, stored in app.state, and available for all requests.",
      difficulty: "medium",
    },
    {
      id: "md-q4",
      question:
        "Why is `python:3.x-slim` preferred over `python:3.x-alpine` for ML applications?",
      options: [
        "Slim images are always smaller",
        "Alpine uses musl libc which causes compatibility issues with NumPy/Pandas",
        "Alpine doesn't support Python 3",
        "Slim images have better security",
      ],
      correctAnswer: 1,
      explanation:
        "Alpine Linux uses musl libc instead of glibc. Most Python ML libraries (NumPy, Pandas, scikit-learn) are compiled against glibc, causing compatibility issues or requiring slow recompilation on Alpine.",
      difficulty: "hard",
    },
    {
      id: "md-q5",
      question: "What is the main benefit of multi-stage Docker builds?",
      options: [
        "Faster build times",
        "Smaller final images by excluding build tools from runtime",
        "Better caching of layers",
        "Automatic security scanning",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-stage builds use separate stages for building (with compilers, headers) and runtime. Only the virtual environment and code are copied to the final image, excluding unnecessary build tools.",
      difficulty: "medium",
    },
    {
      id: "md-q6",
      question: "Why should containers not run as root user?",
      options: [
        "Root user is slower",
        "It's harder to debug as root",
        "A vulnerability could give attackers host-level access",
        "Docker doesn't allow root users",
      ],
      correctAnswer: 2,
      explanation:
        "Running as root means a security vulnerability (like a code injection) could give attackers full control of the container and potentially the host system. Non-root users limit the blast radius.",
      difficulty: "medium",
    },
    {
      id: "md-q7",
      question:
        "What HTTP status code does Pydantic return when input validation fails?",
      options: [
        "400 Bad Request",
        "422 Unprocessable Entity",
        "500 Internal Server Error",
        "503 Service Unavailable",
      ],
      correctAnswer: 1,
      explanation:
        "Pydantic validation errors in FastAPI return 422 Unprocessable Entity, indicating that the request was understood but couldn't be processed due to semantic errors in the input data.",
      difficulty: "easy",
    },
    {
      id: "md-q8",
      question: "What is the purpose of HEALTHCHECK in a Dockerfile?",
      options: [
        "To run tests during image build",
        "To allow orchestrators to know when the service is ready",
        "To reduce image size",
        "To encrypt container traffic",
      ],
      correctAnswer: 1,
      explanation:
        "HEALTHCHECK defines a command that Kubernetes and other orchestrators use to determine if a container is healthy and ready to receive traffic. Failed health checks can trigger container restarts.",
      difficulty: "easy",
    },
    {
      id: "md-q9",
      question:
        "What is the correct order for COPY instructions to optimize Docker layer caching?",
      options: [
        "Application code → Dependencies → Models",
        "Models → Application code → Dependencies",
        "Dependencies → Models → Application code",
        "Order doesn't matter for caching",
      ],
      correctAnswer: 2,
      explanation:
        "Docker caches each layer. Copy files from least to most frequently changed: dependencies (rarely change), models (occasionally), then application code (frequently). This prevents full reinstalls on code changes.",
      difficulty: "hard",
    },
    {
      id: "md-q10",
      question:
        "How should secrets like API keys be passed to Docker containers?",
      options: [
        "Hardcoded in the Dockerfile with ENV",
        "Stored in the application code",
        "Passed at runtime via environment variables or secret managers",
        "Embedded in the Docker image layers",
      ],
      correctAnswer: 2,
      explanation:
        "Secrets should never be hardcoded in Dockerfiles or code. Pass them at runtime using docker run -e flags, Docker secrets, or orchestration-level secret managers (Kubernetes Secrets, AWS Secrets Manager).",
      difficulty: "medium",
    },
  ],
};
