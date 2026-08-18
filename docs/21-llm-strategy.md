# Llm Strategy
interface LLMProvider {
  generate<T>(input: LLMInput): Promise<T>;
}