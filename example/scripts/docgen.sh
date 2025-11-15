#!/usr/bin/env bash
dirname=$(dirname "$(realpath "$0")")
cd "$dirname/../../node_modules/react-activity-calendar/src/components" || exit 1
json=$(pnpm dlx @react-docgen/cli ActivityCalendar.tsx)
echo "$json" | jq '.["ActivityCalendar.tsx"][0]' > "$dirname/../src/docgen.json"
