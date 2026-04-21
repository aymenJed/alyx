-- Fix: OPTIONS_JSON contains {} (empty object) instead of NULL or []
-- This causes Hibernate to crash trying to deserialize an object as a List

-- Preview what will be fixed:
-- SELECT component_id, field_key, options_json
-- FROM UI_COMPONENT
-- WHERE options_json IS NOT NULL AND jsonb_typeof(options_json) = 'object';

UPDATE UI_COMPONENT
SET OPTIONS_JSON = NULL
WHERE OPTIONS_JSON IS NOT NULL
  AND jsonb_typeof(OPTIONS_JSON) = 'object';
