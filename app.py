import subprocess

def run_node_script(script_name):
    try:
        cmd = f"node {script_name}"
        result = subprocess.run(cmd, shell=True, text=True, capture_output=True)
        
        print("=== Node.js Output ===")
        print(result.stdout)

        if result.stderr:
            print("=== Node.js Errors ===")
            print(result.stderr)

    except FileNotFoundError:
        print("Node.js or the script was not found. Make sure Node is installed and in PATH.")
    except Exception as e:
        print("An unexpected error occurred:", e)

# Example usage
if __name__ == "__main__":
    print("running atbjb")
    run_node_script("index.js")
