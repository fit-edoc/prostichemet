# AI Evaluation

## 1. Evaluation Methodology
As described in 25-evaluation-system.md, AI pipelines must be continuously evaluated to ensure high accuracy and reduce hallucination.

## 2. Metrics to Track
- **Extraction Accuracy**: How often does the AI correctly extract factual information (e.g., industry, company size) from a source text?
- **Classification Accuracy**: How often does the AI correctly classify email replies (Positive, Negative, Not Interested)?
- **Hallucination Rate**: Measure the frequency of claims without backing evidence. Every claim must trace back to a source URL or raw text.

## 3. Continuous Evaluation
- Maintain a golden dataset of ~100 diverse companies and ~500 email replies.
- Before deploying a new prompt version or switching to a new LLM version (e.g., Gemini 1.5 to 2.0), run an evaluation script against this dataset.
- Block the PR if the accuracy drops below a threshold (e.g., 95%).
