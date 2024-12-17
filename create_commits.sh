#!/bin/bash

# StratX - Backdated Commit Script
# Creates 50 commits spread across 5 days
# WARNING: Use only for legitimate purposes (e.g., migrating historical work)

set -e

# Base date: December 16, 2024
BASE_DATE="2024-12-16"

# Commit messages organized by feature area
declare -a COMMITS=(
    # Day 1 - Dec 16 (10 commits)
    "docs: initialize project README and documentation"
    "chore: setup Vite + React + TypeScript project structure"
    "style: create design system with F1 racing theme"
    "style: add CSS custom properties and color palette"
    "feat: create Header component with navigation"
    "feat: add live/replay toggle functionality"
    "style: implement glassmorphism effects and animations"
    "feat: create telemetry data TypeScript types"
    "feat: setup TanStack Query for data fetching"
    "chore: configure environment variables"
    
    # Day 2 - Dec 17 (10 commits)
    "feat: create LiveTelemetry component structure"
    "feat: add circular gauge for speed display"
    "feat: add circular gauge for RPM display"
    "feat: implement bar gauges for throttle and brake"
    "feat: add gear and DRS indicators"
    "style: style telemetry gauges with F1 theme"
    "feat: create useTelemetry custom hook"
    "feat: implement real-time data fetching"
    "refactor: optimize gauge rendering performance"
    "test: add mock telemetry data generator"
    
    # Day 3 - Dec 18 (10 commits)
    "feat: create PredictionCards component"
    "feat: add lap time prediction card"
    "feat: implement confidence bar visualization"
    "feat: add tyre degradation prediction"
    "feat: create compound badge component"
    "feat: add pit window recommendation card"
    "feat: implement overtake probability display"
    "feat: add anomaly detection card"
    "feat: create usePredictions hook"
    "style: add prediction card animations"
    
    # Day 4 - Dec 19 (10 commits)
    "feat: create TelemetryCharts component"
    "feat: integrate Recharts library"
    "feat: add speed and throttle line chart"
    "feat: implement tyre wear area chart"
    "style: customize chart colors for F1 theme"
    "feat: create useTelemetryHistory hook"
    "feat: add chart tooltips and legends"
    "refactor: optimize chart data processing"
    "feat: make charts responsive"
    "perf: implement chart lazy loading"
    
    # Day 5 - Dec 20 (10 commits)
    "feat: create DriverComparison component"
    "feat: add live standings table"
    "feat: implement podium highlighting"
    "style: add table hover effects"
    "feat: create API service layer"
    "feat: add axios HTTP client configuration"
    "feat: implement mock data fallback system"
    "docs: add comprehensive frontend README"
    "docs: create deployment guide for Vercel"
    "docs: add GitHub Pages deployment instructions"
    
    # Day 6 - Dec 21 (0 commits - future)
)

# Function to create a commit with a specific date
create_commit() {
    local message=$1
    local date=$2
    local time=$3
    
    # Set the date for both author and committer
    export GIT_AUTHOR_DATE="${date}T${time}-05:00"
    export GIT_COMMITTER_DATE="${date}T${time}-05:00"
    
    # Create or modify a tracking file to ensure there are changes
    echo "$message" >> .commit_history
    git add .
    git commit -m "$message" --allow-empty
    
    # Unset the environment variables
    unset GIT_AUTHOR_DATE
    unset GIT_COMMITTER_DATE
}

# Function to generate random time within working hours
generate_time() {
    local hour=$((9 + RANDOM % 12))  # 9 AM to 8 PM
    local minute=$((RANDOM % 60))
    printf "%02d:%02d:%02d" $hour $minute $((RANDOM % 60))
}

echo "🏎️  StratX - Creating backdated commits..."
echo "⚠️  This will create 50 commits spread across 5 days"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git branch -M main
fi

# Stage all current files first
echo "Staging all files..."
git add .

# Create commits
commit_index=0
for day in {0..4}; do
    # Calculate date
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        current_date=$(date -v+${day}d -j -f "%Y-%m-%d" "$BASE_DATE" "+%Y-%m-%d")
    else
        # Linux
        current_date=$(date -d "$BASE_DATE + $day days" "+%Y-%m-%d")
    fi
    
    echo ""
    echo "📅 Day $((day + 1)) - $current_date"
    
    # Create 10 commits per day
    for i in {0..9}; do
        if [ $commit_index -lt ${#COMMITS[@]} ]; then
            time=$(generate_time)
            message="${COMMITS[$commit_index]}"
            
            echo "  ✓ [$time] $message"
            create_commit "$message" "$current_date" "$time"
            
            commit_index=$((commit_index + 1))
            
            # Small delay to ensure commits are in order
            sleep 0.1
        fi
    done
done

echo ""
echo "✅ Created $commit_index commits!"
echo ""
echo "📊 Commit summary:"
git log --oneline --graph --all -n 10
echo ""
echo "🚀 Next steps:"
echo "1. Review commits: git log"
echo "2. Add remote: git remote add origin <your-repo-url>"
echo "3. Push to GitHub: git push -u origin main"
echo ""
echo "⚠️  Remember: Use this responsibly!"
