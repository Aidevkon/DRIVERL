import os

CHAPTERS_DIR = "src/data/chapters"

def fix_imports():
    for filename in os.listdir(CHAPTERS_DIR):
        if filename.endswith(".ts"):
            path = os.path.join(CHAPTERS_DIR, filename)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Replace the problematic import
            new_content = content.replace("import { Lesson } from '../../types';", "import type { Lesson } from '../../types';")
            
            if content != new_content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Fixed {filename}")
            else:
                print(f"Skipped {filename} (already correct or different)")

if __name__ == "__main__":
    fix_imports()
