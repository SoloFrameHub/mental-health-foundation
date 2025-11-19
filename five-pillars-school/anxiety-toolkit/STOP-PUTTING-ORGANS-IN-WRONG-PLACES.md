# PERMANENT FIX FOR ANXIETY BODY MAP
## SAVE THIS - GIVE TO EVERY NEW CLAUDE SESSION

### THE PROBLEM THAT KEEPS HAPPENING:
Every new Claude session creates body maps with:
- Heart in the stomach
- Stomach in the genitals  
- Hands where legs should be
- One leg in the middle instead of two

### BASIC HUMAN ANATOMY (Since Claude Forgets):
1. **HEAD/BRAIN (🧠)**: Top of the body, in the skull
2. **HEART (❤️)**: In the CHEST, left side, behind ribs
3. **STOMACH (🦋)**: In the ABDOMEN, middle of torso, below chest
4. **HANDS (✋)**: At the END OF ARMS, not randomly on legs
5. **LEGS (🦵)**: TWO of them, one on each side, not one in middle

### THE FILES THAT ACTUALLY WORK:

#### Body Images (Mike created these):
- `/github-deployment/anxiety-toolkit/images/full-body-image.jpg`
- `/github-deployment/anxiety-toolkit/images/upper-body-image.jpg`

#### Working HTML File:
- `/github-deployment/anxiety-toolkit/lesson-1-1-ANATOMICALLY-CORRECT.html`

### CSS POSITIONS FOR THE BLUE BODY SILHOUETTE:

```css
/* COPY THESE EXACT POSITIONS - THEY'RE CORRECT */

.point-head { 
    top: 8%;        /* HEAD IS AT THE TOP */
    left: 50%; 
    transform: translateX(-50%); 
}

.point-chest { 
    top: 28%;       /* CHEST IS IN THE CHEST */
    left: 45%;      /* Slightly left for heart */
}

.point-stomach { 
    top: 42%;       /* STOMACH IS IN THE BELLY */
    left: 50%; 
    transform: translateX(-50%); 
}

.point-hand-left { 
    top: 45%;       /* HANDS ARE ON THE ARMS */
    left: 18%;      /* Left arm */
}

.point-hand-right { 
    top: 45%;       /* HANDS ARE ON THE ARMS */
    right: 18%;     /* Right arm */
}

.point-leg-left { 
    top: 65%;       /* LEGS ARE THE LOWER LIMBS */
    left: 40%;      /* Left leg */
}

.point-leg-right { 
    top: 65%;       /* LEGS ARE THE LOWER LIMBS */
    right: 40%;     /* Right leg */
}
```

### HOW TO USE THIS:

1. **New Claude Session?** Give it this file FIRST
2. **Body map broken?** Copy the positions above
3. **Starting over?** Use `lesson-1-1-ANATOMICALLY-CORRECT.html`

### STOP DOING THIS:
- Creating new "solutions"
- Rebuilding from scratch
- Making tracking systems
- Writing state managers

### START DOING THIS:
- Use Mike's existing images
- Copy the correct positions
- Deploy what works
- Stop recreating

### THE NUCLEAR OPTION:
If Claude starts putting hearts in stomachs again, just say:
"THE HEART GOES IN THE CHEST. Read STOP-PUTTING-ORGANS-IN-WRONG-PLACES.md"

### VERIFICATION CHECKLIST:
- [ ] Heart icon is on the CHEST (not stomach)
- [ ] Stomach icon is on the BELLY (not groin)
- [ ] Hand icons are on ACTUAL HANDS (not legs)
- [ ] TWO leg icons (not one in middle)
- [ ] All points clickable and working

### FILES TO NEVER DELETE:
1. `lesson-1-1-ANATOMICALLY-CORRECT.html` - The working version
2. `images/full-body-image.jpg` - Mike's body image
3. `images/upper-body-image.jpg` - Mike's upper body image
4. This document - The permanent fix guide

---

## IF CLAUDE SAYS "LET ME FIX THAT":
No. It's already fixed. Use the files above.

## IF CLAUDE SAYS "I'LL CREATE A BETTER SYSTEM":
No. The system works. Hearts go in chests.

## IF CLAUDE SAYS "LET ME REBUILD IT":
No. It's built. Deploy it.

---

Created: October 25, 2025
Last Organ Placement Disaster: October 25, 2025
Times Mike Had to Explain Basic Anatomy: Too Many
