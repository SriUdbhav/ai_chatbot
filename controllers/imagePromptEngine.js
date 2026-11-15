/**
 * Image Prompt Understanding & Enhancement Engine
 * StudyMate AI — Phase 5 Image Generation Upgrade
 *
 * Accurately analyzes the user's image request:
 * - Understands the exact subject, objects, environment, actions, style, lighting, colors.
 * - Categorizes into educational diagrams, DS visualizations, vehicles, landscapes, animals, people, logos, abstract artwork.
 * - Converts into an optimized text-to-image diffusion prompt that strictly preserves the original subject.
 * - Supports both LLM-powered refinement (Gemini 3.5 Flash Lite) and deterministic offline rule-based enhancement.
 */

'use strict';

// Common conversational lead-in prefixes to clean up
const CONVERSATIONAL_PREFIXES = [
  /^\/image\s+/i,
  /^(can\s+you\s+)?(please\s+)?(generate|create|draw|paint|make|render|illustrate|produce|show\s+me)\s+(me\s+)?(an?\s+|the\s+|some\s+)?(image|picture|photo|photograph|illustration|drawing|artwork|wallpaper|poster|graphic|sketch|portrait|visual|diagram|visualization|flowchart)?(\s+of|\s+showing|\s+depicting|\s+with)?\s*/i,
  /^(i\s+want|i\s+need|give\s+me)\s+(an?\s+|the\s+)?(image|picture|photo|illustration|drawing|diagram|visualization)?(\s+of|\s+showing)?\s*/i,
];

/**
 * Cleans conversational wrappers from user prompt to extract the pure subject.
 * @param {string} rawPrompt
 * @returns {string}
 */
function cleanUserPrompt(rawPrompt) {
  if (!rawPrompt || typeof rawPrompt !== 'string') return '';
  let cleaned = rawPrompt.trim();

  // Strip slash command
  cleaned = cleaned.replace(/^\/image\s+/i, '').trim();

  // Strip conversational wrappers
  for (const prefix of CONVERSATIONAL_PREFIXES) {
    if (prefix.test(cleaned)) {
      const stripped = cleaned.replace(prefix, '').trim();
      // Only keep stripped if it left a meaningful subject
      if (stripped.length >= 3) {
        cleaned = stripped;
      }
      break;
    }
  }

  // Remove trailing periods or question marks if any
  cleaned = cleaned.replace(/[.?]+$/, '').trim();
  return cleaned || rawPrompt.trim();
}

/**
 * Classifies prompt into one of the 10 core domain categories.
 * @param {string} prompt
 * @returns {string}
 */
function classifyImageCategory(prompt) {
  const p = prompt.toLowerCase();

  // 1. Data Structures & Computer Science Diagrams
  if (
    /\b(binary\s+search|linked\s+list|singly|doubly|circular\s+queue|stack\s+overflow|binary\s+tree|bst|heap|sorting\s+algorithm|bubble\s+sort|merge\s+sort|quick\s+sort|hash\s+table|graph\s+traversal|bfs|dfs|algorithm\s+visualization|data\s+structure)\b/.test(p)
  ) {
    return 'data_structures_diagram';
  }

  // 2. Programming & Architecture Illustrations
  if (
    /\b(programming|developer|coding|software|client\s+server|git|branching\s+workflow|api(\s+architecture)?|cloud\s+computing|microservice|database\s+schema|syntax|terminal)\b/.test(p)
  ) {
    return 'programming_illustration';
  }

  // 3. Educational & Scientific Diagrams
  if (
    /\b(diagram|flowchart|cross[\s-]section|anatomy|human\s+heart|plant\s+cell|animal\s+cell|photosynthesis|solar\s+system|water\s+cycle|mitosis|dna\s+double\s+helix|earth['’]?s\s+layers|labeled|infographic)\b/.test(p)
  ) {
    return 'educational_diagram';
  }

  // 4. Vehicles
  if (
    /\b(car|sports\s+car|motorcycle|bike|supercar|vehicle|truck|airplane|jet|helicopter|train|boat|yacht|spaceship|ferrari|porsche|lamborghini|automobile)\b/.test(p)
  ) {
    return 'vehicle';
  }

  // 5. Animals (check before nature landscapes so focal animals in environments are classified as animal)
  if (
    /\b(dog|puppy|cat|kitten|bird|eagle|lion|tiger|elephant|fish|clownfish|whale|dolphin|horse|wolf|bear|fox|animal|wildlife|pet)\b/.test(p)
  ) {
    return 'animal';
  }

  // 6. Nature & Landscapes
  if (
    /\b(mountain|landscape|forest|beach|ocean|sea|river|lake|desert|waterfall|sunset|sunrise|canyon|valley|nature|autumn|winter|snow\s+peak|rainy\s+road)\b/.test(p)
  ) {
    return 'nature_landscape';
  }

  // 7. Human Subjects
  if (
    /\b(student|doctor|engineer|astronaut|teacher|person|woman|man|child|scientist|portrait|human|face|people|smiling|studying)\b/.test(p)
  ) {
    return 'human_subject';
  }

  // 8. Logos & Emblems
  if (
    /\b(logo|emblem|app\s+icon|brand\s+mark|insignia|symbol|vector\s+logo|minimalist\s+logo)\b/.test(p)
  ) {
    return 'logo';
  }

  // 9. Abstract Artwork
  if (
    /\b(abstract|fractal|surreal|surrealism|acrylic\s+pour|fluid\s+art|psychedelic|geometric\s+pattern|neon\s+abstract|watercolor\s+abstract)\b/.test(p)
  ) {
    return 'abstract_art';
  }

  // 10. General Realistic
  return 'general_realistic';
}

/**
 * Deterministic local fallback prompt refiner.
 * Preserves the exact user subject while adding precise stylistic modifiers.
 * @param {string} cleanedPrompt
 * @param {string} category
 * @param {'fast'|'quality'} mode
 * @returns {string}
 */
function getLocalFallbackRefinement(cleanedPrompt, category, mode = 'fast') {
  const isQuality = mode === 'quality';

  switch (category) {
    case 'data_structures_diagram':
      return `Clear educational computer science diagram illustrating ${cleanedPrompt}, showing indexed elements, clear pointer arrows, structured boxes, high-contrast labels, clean vector infographic design, flat academic layout on a pure white background, crisp typography, highly legible.`;

    case 'educational_diagram':
      return `Comprehensive educational textbook diagram of ${cleanedPrompt}, detailed labeled anatomical parts, clean vector illustration, arrows indicating flow and structure, high-contrast pedagogical infographic on a clean white background, sharp lines, highly legible.`;

    case 'programming_illustration':
      return `Modern technical illustration of ${cleanedPrompt}, sleek developer aesthetic, glowing neon accents, clean modern isometric or vector composition, professional software engineering concept art, high detail, high contrast.`;

    case 'vehicle':
      return `Photorealistic depiction of ${cleanedPrompt}, dramatic cinematic lighting, rich surface textures, glossy paint reflections, realistic environmental atmosphere, sharp focus, professional automotive photography, 8k resolution.`;

    case 'nature_landscape':
      return `Breathtaking realistic landscape of ${cleanedPrompt}, natural atmospheric lighting, rich environmental depth, authentic textures, vibrant natural colors, dramatic sky and terrain, wide-angle cinematic photography, ultra high definition.`;

    case 'animal':
      return `Detailed realistic wildlife portrait of ${cleanedPrompt}, sharp natural focus on fur or feathers, expressive eyes, authentic natural environment, soft ambient lighting, high-speed shutter wildlife photography, beautiful bokeh background.`;

    case 'human_subject':
      return `Realistic and expressive portrayal of ${cleanedPrompt}, authentic human facial anatomy and proportions, professional studio lighting, warm natural skin tones, clear depth of field, high-resolution editorial portrait photography.`;

    case 'logo':
      return `Modern minimalist vector logo of ${cleanedPrompt}, clean geometric shapes, balanced iconic silhouette, bold color contrast, isolated on a neutral background, professional branding design, sharp vector edges.`;

    case 'abstract_art':
      return `Vibrant abstract artistic composition of ${cleanedPrompt}, dynamic movement, harmonious color palette, complex textures and layered geometric depth, professional contemporary digital artwork.`;

    case 'general_realistic':
    default:
      return `${cleanedPrompt}, realistic scene, natural balanced lighting, rich environmental detail, sharp focus, professional photography composition, 8k resolution.`;
  }
}

/**
 * Intelligent prompt understanding and enhancement pipeline.
 * Attempts Gemini LLM prompt understanding first; falls back gracefully to deterministic rule-based refinement.
 *
 * @param {Object|null} ai - GoogleGenAI client instance
 * @param {string} rawPrompt - User's original input
 * @param {'fast'|'quality'} [mode='fast'] - Generation mode
 * @returns {Promise<{ refinedPrompt: string, originalPrompt: string, category: string, method: string }>}
 */
async function understandAndRefinePrompt(ai, rawPrompt, mode = 'fast') {
  const cleaned = cleanUserPrompt(rawPrompt);
  const category = classifyImageCategory(cleaned);

  // If AI client is not available or disabled, return instant local refinement
  if (!ai) {
    const localRefined = getLocalFallbackRefinement(cleaned, category, mode);
    return {
      refinedPrompt: localRefined,
      originalPrompt: cleaned,
      category,
      method: 'deterministic_local',
    };
  }

  const systemInstruction =
    'You are an expert AI prompt engineer for text-to-image diffusion models.\n' +
    'Your task is to convert the user\'s image request into a single, highly detailed, visually descriptive prompt.\n\n' +
    'CRITICAL RULES:\n' +
    '1. STRICTLY PRESERVE the exact subject, objects, people, environment, actions, and colors requested by the user. NEVER replace, alter, or omit the user\'s requested subject.\n' +
    '2. For Data Structures & Educational Diagrams (e.g. binary search, trees, linked lists, cells, organs), specify: labeled boxes, directional arrows, sorted values, clean vector flowchart/diagram layout, high-contrast white background, crisp typography, textbook infographic style.\n' +
    '3. For Realistic Scenes (vehicles, landscapes, animals, people), specify: photographic materials, lighting (cinematic, golden hour, reflections), atmosphere, depth of field, 8k resolution.\n' +
    '4. For Logos, specify: minimalist vector emblem, clean lines, centered composition, flat modern graphic design.\n' +
    '5. Output ONLY the refined prompt text. Do not include quotes, markdown, conversational intro, or explanations. Keep under 300 characters.';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: cleaned,
      config: {
        systemInstruction,
        temperature: 0.2,
        maxOutputTokens: 120,
        httpOptions: { timeout: 10000 },
      },
    });

    const candidate = response?.text?.trim();
    if (candidate && candidate.length >= 10) {
      // Clean quotes or markdown wrappers if model returned any
      const sanitized = candidate
        .replace(/^["'`]+|["'`]+$/g, '')
        .replace(/^\*\*.*?\*\*\s*/g, '')
        .trim();

      // Verify that the core subject was preserved (safety check)
      const coreWords = cleaned.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const matchedWords = coreWords.filter(w => sanitized.toLowerCase().includes(w));
      const isFaithful = coreWords.length === 0 || (matchedWords.length / coreWords.length) >= 0.4;

      if (isFaithful) {
        return {
          refinedPrompt: sanitized,
          originalPrompt: cleaned,
          category,
          method: 'gemini_llm',
        };
      }
    }
  } catch (err) {
    // Graceful fallback on LLM error/timeout
    console.warn('[Image Prompt Engine] Gemini prompt refinement unavailable:', err.message);
  }

  // Fallback to deterministic rule-based refinement
  const localRefined = getLocalFallbackRefinement(cleaned, category, mode);
  return {
    refinedPrompt: localRefined,
    originalPrompt: cleaned,
    category,
    method: 'deterministic_fallback',
  };
}

module.exports = {
  cleanUserPrompt,
  classifyImageCategory,
  getLocalFallbackRefinement,
  understandAndRefinePrompt,
};
