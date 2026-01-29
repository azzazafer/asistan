#!/bin/bash
# Aura OS Smoke Test Script - Production Readiness Check

echo "🚀 Starting Aura OS Post-Deployment Smoke Test..."

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function check_endpoint() {
    local name=$1
    local url=$2
    echo -n "Checking $name ($url)... "
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$response" == "200" ]; then
        echo -e "${GREEN}PASS${NC}"
    else
        echo -e "${RED}FAIL (HTTP $response)${NC}"
        return 1
    fi
}

# 1. Health Checks
ALL_PASSED=0

check_endpoint "Main Dashboard" "http://localhost:3000" || ALL_PASSED=1
check_endpoint "Database Health" "http://localhost:3000/api/health" || ALL_PASSED=1
# Add more as they are implemented

if [ $ALL_PASSED -eq 0 ]; then
    echo -e "\n${GREEN}===== ALL SYSTEMS GO: AURA OS IS LIVE AND STABLE =====${NC}"
    exit 0
else
    echo -e "\n${RED}===== DEPLOYMENT BREACH: MANUAL INTERVENTION REQUIRED =====${NC}"
    exit 1
fi
