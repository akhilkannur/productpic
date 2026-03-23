const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  try {
    const stylesPath = path.resolve(__dirname, '../styles.json');
    const stylesData = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

    console.log(`Seeding ${stylesData.length} styles...`);

    const transformedData = stylesData.map((style) => ({
      id: style.id,
      name: style.name,
      pillar: style.pillar,
      category: style.category,
      prompt: style.prompt,
      before_image: style.beforeImage,
      after_image: style.afterImage,
      is_free: style.isFree,
    }));

    const { error } = await supabase
      .from('styles')
      .upsert(transformedData, { onConflict: 'id' });

    if (error) {
      console.error('Error seeding styles:', error);
    } else {
      console.log('Seeding complete!');
    }
  } catch (err) {
    console.error('Error reading styles.json:', err);
  }
}

seed();
