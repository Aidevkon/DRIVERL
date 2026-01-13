import json
import os
import math

INPUT_FILE = "src/data/parsed_lessons.json"
OUTPUT_DIR = "src/data/chapters"

def generate_chapters():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        questions = json.load(f)

    # Filter out bad questions
    valid_questions = []
    for q in questions:
        if q["prompt"] and len(q["options"]) >= 2 and q["correctAnswer"]:
            valid_questions.append(q)
        # Relaxed filtering: if no correct answer is strictly found, pick the first one or mark TODO? 
        # For now, let's include only those with answers to be safe, or default to first.
        # Strict for quality: Only valid ones.
    
    print(f"Total valid questions: {len(valid_questions)} out of {len(questions)}")

    CHUNK_SIZE = 10
    total_chapters = math.ceil(len(valid_questions) / CHUNK_SIZE)

    lesson_imports = []
    
    for i in range(total_chapters):
        chunk = valid_questions[i*CHUNK_SIZE : (i+1)*CHUNK_SIZE]
        chapter_num = i + 1
        lesson_id = f"chapter-{chapter_num}"
        
        ts_content = f"""import {{ Lesson }} from '../../types';

export const chapter{chapter_num}: Lesson = {{
    id: '{lesson_id}',
    title: 'Κεφάλαιο {chapter_num}',
    status: 'locked',
    image: '/src/assets/signs/city-start.svg', // Placeholder
    questions: {json.dumps(chunk, ensure_ascii=False, indent=4)}
}};
"""
        # Fix JSON dumping of "type" field which might conflict or need to be exact string
        # The json dump is valid JS/TS object syntax mostly, but keys are quoted.
        # We can clean up quotes on keys if we want, but TS allows quoted keys.

        filename = f"chapter_{chapter_num}.ts"
        with open(os.path.join(OUTPUT_DIR, filename), "w", encoding="utf-8") as f:
            f.write(ts_content)
        
        lesson_imports.append(f"import {{ chapter{chapter_num} }} from './chapters/chapter_{chapter_num}';")

    print(f"Generated {total_chapters} chapters.")
    
    # Generate the aggregation in lessons.ts format snippet
    print("\nCopy into lessons.ts:")
    print('\n'.join(lesson_imports))
    print(f"\nexport const initialLessons: Lesson[] = [\n    // ... existing lessons ...")
    print(f"    {', '.join([f'chapter{i+1}' for i in range(total_chapters)])}")
    print("];")

if __name__ == "__main__":
    generate_chapters()
