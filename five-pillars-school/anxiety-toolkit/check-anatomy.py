#!/usr/bin/env python3
"""
Quick anatomy checker for body maps
Run this to verify Claude didn't put organs in stupid places again
"""

def check_body_map_html(filepath):
    """Check if a body map HTML has organs in the right places"""
    
    with open(filepath, 'r') as f:
        content = f.read().lower()
    
    print("\n🔍 ANATOMY CHECK FOR:", filepath)
    print("=" * 50)
    
    errors = []
    
    # Check heart placement
    if 'point-chest' in content and 'heart' not in content[content.find('point-chest'):content.find('point-chest')+200]:
        if 'point-stomach' in content and 'heart' in content[content.find('point-stomach'):content.find('point-stomach')+200]:
            errors.append("❌ HEART IS IN THE STOMACH - Should be in CHEST!")
    else:
        print("✅ Heart appears to be in chest")
    
    # Check stomach placement  
    if 'top: 4' in content and 'stomach' in content:
        # Stomach should be around 40-45% down
        print("✅ Stomach appears to be in middle torso")
    elif 'top: 6' in content and 'stomach' in content:
        errors.append("❌ STOMACH IS TOO LOW - Might be in groin area!")
    else:
        print("⚠️  Can't verify stomach position")
    
    # Check for proper leg count
    leg_count = content.count('leg-left') + content.count('leg-right')
    if leg_count >= 2:
        print("✅ Two separate legs detected")
    elif 'point-leg' in content and leg_count < 2:
        errors.append("❌ ONLY ONE LEG DETECTED - Humans have TWO legs!")
    
    # Check hand placement
    if 'point-hand' in content:
        if 'left: 1' in content or 'left: 2' in content or 'right: 1' in content or 'right: 2' in content:
            print("✅ Hands appear to be on arms")
        elif 'top: 6' in content and 'hand' in content:
            errors.append("❌ HANDS ARE ON LEGS - Should be on ARMS!")
    
    print("\n" + "=" * 50)
    if errors:
        print("🚨 ANATOMY ERRORS FOUND:")
        for error in errors:
            print("  " + error)
        print("\n💡 FIX: Use lesson-1-1-ANATOMICALLY-CORRECT.html")
        return False
    else:
        print("✅ ANATOMY LOOKS CORRECT!")
        print("   Hearts in chests, stomachs in bellies,")
        print("   hands on arms, and two separate legs!")
        return True

if __name__ == "__main__":
    import sys
    import os
    
    if len(sys.argv) > 1:
        filepath = sys.argv[1]
    else:
        # Default to checking the most recent lesson file
        filepath = "lesson-1-1-ANATOMICALLY-CORRECT.html"
    
    if os.path.exists(filepath):
        is_correct = check_body_map_html(filepath)
        sys.exit(0 if is_correct else 1)
    else:
        print(f"❌ File not found: {filepath}")
        print("Usage: python3 check-anatomy.py [html-file]")
        sys.exit(1)
