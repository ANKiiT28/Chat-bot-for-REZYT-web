import json
import re

# Load existing data
try:
    with open("d:/Project/ANN clasification/chat boat/qa_data.js", "r", encoding="utf-8") as f:
        content = f.read()
        # Strip "const qaData = " and ";" to get valid JSON
        json_str = content.replace("const qaData = ", "").strip().rstrip(";")
        qa_list = json.loads(json_str)
except Exception as e:
    print(f"Error reading file: {e}")
    qa_list = []

# Synonyms for generation
synonyms = {
    "how": ["how do i", "how can i", "what is the way to", "tell me how to"],
    "find": ["locate", "see", "view", "discover", "search for"],
    "newest": ["latest", "recent", "fresh", "new"],
    "product": ["item", "launch", "offering"],
    "contact": ["reach", "call", "email", "support"],
    "invest": ["funding", "backing", "finance"],
    "brand": ["company", "business", "seller"]
}

def generate_phrasings(question):
    phrases = set()
    q_lower = question.lower().strip("?")
    
    # Rule 1: Simple reordering / question mark
    phrases.add(q_lower)
    phrases.add(question)
    
    # Rule 2: Synonym replacement
    for key, variants in synonyms.items():
        if key in q_lower:
            for var in variants:
                # Replace the key with the variant
                new_phrase = q_lower.replace(key, var)
                phrases.add(new_phrase)
                
    # Rule 3: "Can I" -> "Is it possible to"
    if "can i" in q_lower:
        phrases.add(q_lower.replace("can i", "is it possible to"))
        phrases.add(q_lower.replace("can i", "am i allowed to"))

    # Limit to 5 distinct phrases
    return list(phrases)[:5]

def determine_intent(category, question):
    # Simple heuristic for intent
    q_lower = question.lower()
    if "contact" in q_lower or "support" in q_lower:
        return "contact_support"
    if "price" in q_lower or "cost" in q_lower or "pay" in q_lower:
        return "pricing_billing"
    if "invest" in q_lower:
        return "investment_inquiry"
    if "brand" in q_lower and "join" in q_lower:
        return "brand_onboarding"
    return f"{category.lower()}_general"

# Process items
for item in qa_list:
    # Generate alternates
    item['alternate_phrasings'] = generate_phrasings(item['question'])
    
    # Add Intent
    item['intent'] = determine_intent(item['category'], item['question'])
    
    # Add Priority (Boost Brand/Investor/Technical)
    if item['category'] in ["Brand", "Investor"]:
        item['priority'] = 2
    else:
        item['priority'] = 1
        
    # Add Last Updated
    item['lastUpdated'] = "2025-11-19"

# Save back to file
js_content = "const qaData = " + json.dumps(qa_list, indent=4) + ";"

with open("d:/Project/ANN clasification/chat boat/qa_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully enhanced {len(qa_list)} items with alternate phrasings and metadata.")
