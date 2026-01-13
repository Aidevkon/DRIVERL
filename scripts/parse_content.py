import re
import json

INPUT_FILE = "pdf_extracted_content.txt"
OUTPUT_FILE = "src/data/parsed_lessons.json"

def clean_text(text):
    # Fix common Greek OCR errors
    replacements = {
        r'lr\.': 'Γ.',
        r'Ir\.': 'Γ.',
        r'l\.': 'Γ.',
        r'A\.': 'Α.', # Latin A to Greek A
        r'B\.': 'Β.', # Latin B to Greek B
        r'~': '',
        r'\|': '',
        r'—': '',
    }
    for pattern, repl in replacements.items():
        text = re.sub(pattern, repl, text)
    return text.strip()

def parse_lessons():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    questions = []
    lines = content.split('\n')
    current_question = None
    question_counter = 1
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if line.startswith('--- Page'): continue # Skip page headers
        
        # Detect Question Start (number dot)
        # We enforce that the number must be reasonably close to the counter or just trust the format
        question_match = re.match(r'^(\d+)\.\s+(.+)', line)
        if question_match:
            # Save previous question
            if current_question:
                # If no correct answer found, try to guess or leave null
                questions.append(current_question)
            
            q_text = clean_text(question_match.group(2))
            current_question = {
                "id": f"q-{question_counter}",
                "type": "multiple-choice",
                "prompt": q_text,
                "options": [],
                "correctAnswer": None
            }
            question_counter += 1
            continue

        if current_question:
            # Detect Answer lines
            # Check for correct marker 'z' or '=' at start or end
            is_correct = False
            
            # Check prefix markers
            if line.startswith('= ') or line.startswith('z '):
                is_correct = True
                line = re.sub(r'^[=z]\s+', '', line)
            
            # Check suffix markers (common in this OCR)
            if line.endswith(' z') or line.endswith(' ='):
                is_correct = True
                line = re.sub(r'\s+[z=]$', '', line)

            # Check for checkbox markers "A" or "z" as standalone or prefix
            # e.g. "z Option text" or "A Option text"
            match_prefix = re.match(r'^([Az])\s+(.+)', line)
            if match_prefix:
                marker = match_prefix.group(1)
                text = match_prefix.group(2)
                if marker == 'z': is_correct = True
                line = text

            # Clean up Greek list bullets
            # a., B., y. (alpha, beta, gamma)
            # OCR often sees: a. or A., B., r. or lr.
            option_match = re.match(r'^([a-zA-ZΑ-ΩΓlr]+)\.\s+(.+)', line)
            if option_match:
                opt_text = clean_text(option_match.group(2))
                current_question["options"].append(opt_text)
                if is_correct:
                    current_question["correctAnswer"] = opt_text
            else:
                 # If it looks like an option but missed regex (short line?), treat as option if we have options
                 # OR append to prompt if no options yet
                 clean_line = clean_text(line)
                 if len(current_question["options"]) > 0:
                     # Likely a continuation of the last option
                     current_question["options"][-1] += " " + clean_line
                 else:
                     # Continuation of prompt
                     current_question["prompt"] += " " + clean_line
    
    if current_question:
        questions.append(current_question)

    print(f"Parsed {len(questions)} questions.")
    
    # Save JSON
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    parse_lessons()
