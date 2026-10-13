import type { Topic } from "./types";

export const topics18: Topic[] = [
  {
    "id": "18.1",
    "blockId": "18",
    "slug": "18-1",
    "title": "Understand an AI application's architecture",
    "subtopics": [
      {
        "id": "18.1.1",
        "title": "Components",
        "concepts": "model, prompt/context, tokenizer concept, retrieval/RAG, vector store, tool call, agent loop",
        "reading": {
          "label": "OWASP GenAI: application risks and guidance",
          "url": "https://genai.owasp.org/"
        },
        "video": {
          "label": "MSRC: Learn to Red Team AI Systems using PyRIT",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      },
      {
        "id": "18.1.2",
        "title": "Data boundaries",
        "concepts": "user/tenant, retrieved document, system instruction, tool credential, output consumer",
        "reading": {
          "label": "OWASP: AI Agent Security cheat sheet",
          "url": "https://cheatsheetseries.owasp.org/"
        },
        "video": {
          "label": "MSRC: AI red-teaming workshop",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      },
      {
        "id": "18.1.3",
        "title": "Evaluation scope",
        "concepts": "intended behavior, protected asset, attacker input, security invariant, false positive",
        "reading": {
          "label": "PyRIT: documentation and examples",
          "url": "https://github.com/Azure/PyRIT"
        },
        "video": {
          "label": "MSRC: PyRIT workshop methodology",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      }
    ],
    "task": "draw a fictional support assistant that retrieves documents and creates support tickets. Identify all data and action boundaries, including per-tenant access. Define five measurable invariants, such as “a user cannot retrieve another tenant's document,” and a synthetic test dataset. No paid model API is needed for this design work."
  },
  {
    "id": "18.2",
    "blockId": "18",
    "slug": "18-2",
    "title": "Prompt injection and connected-system failures",
    "subtopics": [
      {
        "id": "18.2.1",
        "title": "Prompt injection",
        "concepts": "direct/indirect input, untrusted retrieved text, authority confusion, instruction/data separation",
        "reading": {
          "label": "PortSwigger: Web LLM attacks",
          "url": "https://portswigger.net/web-security/llm-attacks"
        },
        "video": {
          "label": "MSRC: AI red-teaming workshop",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      },
      {
        "id": "18.2.2",
        "title": "Excessive authority",
        "concepts": "overprivileged tool, missing server authorization, unsafe tool arguments, missing approval",
        "reading": {
          "label": "OWASP GenAI: excessive agency and prompt injection",
          "url": "https://genai.owasp.org/"
        },
        "video": {
          "label": "MSRC: PyRIT attack/evaluation demonstrations",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      },
      {
        "id": "18.2.3",
        "title": "Output/data risks",
        "concepts": "unsafe HTML/SQL/shell consumption, secret exposure, cross-tenant retrieval, overreliance",
        "reading": {
          "label": "OWASP GenAI: output handling and disclosure",
          "url": "https://genai.owasp.org/"
        },
        "video": {
          "label": "MSRC: AI red-teaming workshop",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      }
    ],
    "task": "solve two available [PortSwigger Web LLM labs][PSLLM], using only their synthetic data and assigned targets. Build or diagram a local mock tool with strict argument validation and an independent authorization check. Demonstrate an allowed action and a rejected action without granting a model access to real email, files, payments, or credentials."
  },
  {
    "id": "18.3",
    "blockId": "18",
    "slug": "18-3",
    "title": "Repeatable evaluation and mitigation",
    "subtopics": [
      {
        "id": "18.3.1",
        "title": "Test harness",
        "concepts": "dataset, target wrapper, output capture, expected outcome, scoring, repeated trials, cost limits",
        "reading": {
          "label": "PyRIT: examples and architecture",
          "url": "https://github.com/Azure/PyRIT"
        },
        "video": {
          "label": "MSRC: PyRIT workshop",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      },
      {
        "id": "18.3.2",
        "title": "Mitigations",
        "concepts": "least-privileged tools, retrieval authorization, structured outputs, validation, human approval",
        "reading": {
          "label": "OWASP: AI Agent Security and GenAI guidance",
          "url": "https://genai.owasp.org/"
        },
        "video": {
          "label": "MSRC: AI security evaluation workshop",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      },
      {
        "id": "18.3.3",
        "title": "Reporting",
        "concepts": "model/app version, configuration, reproducibility rate, operational impact, uncertainty, retest drift",
        "reading": {
          "label": "PyRIT documentation",
          "url": "https://github.com/Azure/PyRIT"
        },
        "video": {
          "label": "MSRC: reporting high-quality AI bugs",
          "url": "https://www.youtube.com/watch?v=jq9DcEL3cHE"
        }
      }
    ],
    "task": "create a 20-case synthetic security-evaluation set with expected outcomes and clear positive/negative controls. Run it against a deterministic mock integration locally; for model behavior, use an authorized hosted lab or a compatible local model and record the version and repeated-trial results. Mock tests validate tool controls, not model robustness. Compare before/after results for a boundary fix and describe residual risk. Paid APIs are optional, with explicit spending limits."
  }
];
