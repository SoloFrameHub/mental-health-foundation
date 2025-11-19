#!/bin/bash

echo "=== COURSE AUDIT ==="
echo ""

for dir in course-{1..19}-*; do
    if [ ! -d "$dir" ]; then continue; fi

    course_num=$(echo "$dir" | grep -o 'course-[0-9]*' | grep -o '[0-9]*')

    echo "Course $course_num ($dir):"

    # Check if index.html exists
    if [ ! -f "$dir/index.html" ]; then
        echo "  ❌ MISSING index.html"
        echo ""
        continue
    fi

    # Check line count
    lines=$(wc -l < "$dir/index.html")
    if [ $lines -lt 330 ]; then
        echo "  ⚠️  SHORT FILE: $lines lines (missing sidebar/footer?)"
    else
        echo "  ✓ Structure OK: $lines lines"
    fi

    # Check for growth mindset content (should only be in course-4)
    if [ "$course_num" != "4" ]; then
        if grep -qi "carol dweck\|growth mindset.*profoundly impacts" "$dir/index.html"; then
            echo "  ❌ WRONG CONTENT: Has growth mindset description"
        fi
    fi

    # Check pricing
    if grep -q '\$89' "$dir/index.html"; then
        echo "  ⚠️  WRONG PRICE: Shows \$89 instead of \$49.95"
    elif grep -q '\$29<' "$dir/index.html"; then
        echo "  ⚠️  WRONG PRICE: Shows \$29 instead of \$29.95"
    fi

    echo ""
done
