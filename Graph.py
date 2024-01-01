import subprocess
from datetime import datetime

# List of specific dates for commits (YYYY-MM-DD)
commit_dates = [
    "2024-01-01",
    "2024-01-02",
    "2024-01-03",
    "2024-01-04",
    "2024-01-05",
    "2024-01-06",
    "2024-01-07",
    "2024-01-08",
    "2024-01-09",
    "2024-02-10",
    "2024-02-11",
    "2024-02-12",
    "2024-02-13",
    "2024-02-14",
    "2024-05-15"
]

# Function to create a backdated commit
def create_backdated_commit(commit_message, commit_date):
    commands = [
        'git add .',
        'git commit --allow-empty -m "{} on {}" --date="{}T12:00:00"'.format(commit_message, commit_date, commit_date)
    ]
    for command in commands:
        subprocess.run(command, shell=True, check=True)
    print(f"Commit with date {commit_date} has been created.")

# Example file to modify (create or append)
example_file = "example.txt"

# Create or clear the example file
with open(example_file, 'w') as f:
    f.write("")

# Create commits for each specified date
for commit_date in commit_dates:
    with open(example_file, 'a') as f:
        f.write(f"Commit on {commit_date}\n")
    create_backdated_commit("Backdated commit for", commit_date)

# Push all commits
subprocess.run('git push -u origin master --force', shell=True, check=True)
print("All commits have been pushed to the remote repository.")