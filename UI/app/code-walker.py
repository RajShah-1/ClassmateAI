import os

def dump_python_files(root_dir, output_file):
    """
    Walks through the directory tree starting at root_dir,
    finds all .py files, and writes their contents to output_file.
    Each file's content is preceded by a header containing its filename.
    """
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Exclude 'venv' directory and its subdirectories
            dirnames[:] = [d for d in dirnames if d != 'venv']
            for filename in filenames:
                if filename.endswith('.tsx'):
                    file_path = os.path.join(dirpath, filename)
                    # Write a header with the file path
                    out_file.write(f"===== {file_path} =====\n")
                    try:
                        with open(file_path, 'r', encoding='utf-8') as in_file:
                            out_file.write(in_file.read())
                    except Exception as e:
                        out_file.write(f"Error reading {file_path}: {e}\n")
                    out_file.write("\n\n")

if __name__ == '__main__':
    root_directory = "./components"
    output_filename = "code_dump.txt"
    dump_python_files(root_directory, output_filename)
    print(f"Python files have been consolidated into {output_filename}")