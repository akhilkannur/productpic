import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface Style {
  id: string;
  name: string;
  pillar: string;
  category: string;
  prompt: string;
  beforeImage: string;
  afterImage: string;
  isFree: boolean;
}

interface StyleRow {
  id: string;
  name: string;
  pillar: string;
  category: string;
  prompt: string;
  before_image: string;
  after_image: string;
  is_free: boolean;
  created_at?: string;
}

export async function getStyles() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from("styles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching styles:", error);
    return [];
  }

  const mappedStyles: Style[] = (data as StyleRow[]).map((item) => ({
    id: item.id,
    name: item.name,
    pillar: item.pillar,
    category: item.category,
    prompt: item.prompt,
    beforeImage: item.before_image,
    afterImage: item.after_image,
    isFree: item.is_free,
  }));

  return mappedStyles;
}

export async function getStyleById(id: string) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from("styles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching style ${id}:`, error);
    return null;
  }

  const style: Style = {
    id: data.id,
    name: data.name,
    pillar: data.pillar,
    category: data.category,
    prompt: data.prompt,
    beforeImage: data.before_image,
    afterImage: data.after_image,
    isFree: data.is_free,
  };

  return style;
}

export function disperseStyles(styles: Style[]) {
  const freeStyles = styles.filter((s) => s.isFree);
  const paidStyles = styles.filter((s) => !s.isFree);

  const dispersedStyles: Style[] = [];
  const totalCount = styles.length;
  const freeInterval = Math.max(2, Math.floor(totalCount / (freeStyles.length || 1)));
  
  let freeIdx = 0;
  let paidIdx = 0;

  for (let i = 0; i < totalCount; i++) {
    if ((i % freeInterval === 0 && freeIdx < freeStyles.length) || (paidIdx >= paidStyles.length && freeIdx < freeStyles.length)) {
      dispersedStyles.push(freeStyles[freeIdx++]);
    } else if (paidIdx < paidStyles.length) {
      dispersedStyles.push(paidStyles[paidIdx++]);
    }
  }

  return dispersedStyles;
}
