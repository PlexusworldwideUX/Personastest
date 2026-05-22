# Persona Template System - How It Works

## Overview
The persona data structure now has a **single source of truth**: the `PERSONA_TEMPLATE` constant in `/utils/personaTemplate.ts`.

## Architecture

### 1. Master Template (`/utils/personaTemplate.ts`)
- Contains the complete persona data structure as a code string
- All fields default to "N/A" or 0 values
- **This is the only place you need to edit to change defaults**

### 2. Template Parser (`/utils/parsePersonaTemplate.ts`)
- Reads the `PERSONA_TEMPLATE` string
- Extracts and parses the JavaScript object
- Returns a proper JavaScript object for use in the app
- Includes fallback hardcoded defaults in case parsing fails

### 3. Initial State (`/components/ShareStateButton.tsx`)
- `getInitialPersonaState()` function calls `getDefaultPersonaFromTemplate()`
- App.tsx uses this function to initialize personaData state
- All fields start with template values on first load

### 4. Blue FAB Code Editor (`/components/CodeEditorButton.tsx`)
- Opens dialog showing current persona data as code
- **Shows live values** (what's currently in the app state)
- On first load, these will be "N/A" from the template
- After editing and applying, shows your custom values
- Format matches the PERSONA_TEMPLATE structure

### 5. Green FAB LLM Instructions (`/components/LLMInstructionsButton.tsx`)
- Imports `PERSONA_TEMPLATE` directly
- Embeds it in the LLM prompt
- Any edits to the template automatically flow through

## Workflow

### On App Load:
1. App.tsx calls `getInitialPersonaState()`
2. Parser reads and evaluates `PERSONA_TEMPLATE`
3. Returns object with all "N/A" default values
4. App renders with clean slate

### Editing Data via Blue FAB:
1. Click Blue FAB → dialog opens
2. See current values formatted as code (initially "N/A")
3. Edit any values (e.g., change `name: "N/A"` to `name: "Sarah Johnson"`)
4. Click "Apply Changes"
5. App updates with new values
6. Blue FAB now shows "Sarah Johnson" when reopened

### Editing Template Defaults:
1. Open `/utils/personaTemplate.ts`
2. Edit any values in the template string
   - Example: Change `name: "N/A"` to `name: "John Doe"`
   - Example: Change `age: "N/A"` to `age: "35"`
3. Save file
4. Reload app
5. App loads with your new defaults
6. Blue FAB shows your new defaults
7. LLM instructions include your new defaults

## Benefits

✅ **Single Source of Truth**: Edit template in one place, changes flow everywhere

✅ **Easy Customization**: Manually edit the template to change defaults

✅ **Consistent Structure**: Blue FAB, LLM instructions, and initial state all match

✅ **Live Editing**: Blue FAB still allows runtime editing of individual persona instances

✅ **Persistent Defaults**: Template defaults persist across all new persona instances

## Important Notes

⚠️ **Keep Format**: The template must maintain the format:
```javascript
const [personaData, setPersonaData] = useState({ ... });
```

⚠️ **Valid JavaScript**: Template content must be valid JavaScript object syntax

⚠️ **Reload Required**: Changes to the template file require page reload to take effect

⚠️ **Instance vs Template**: 
- Template = default values for new personas
- Instance = current persona being edited in the app
- Blue FAB shows instance (which starts as template values)
