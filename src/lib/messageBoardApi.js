import { supabase } from "./supabaseClient";

const MESSAGE_SELECT_FIELDS = "id, name, status, message, created_at, local_date";

export async function fetchLatestMessages(limit = 5) {
  const { data, error } = await supabase
    .from("messages")
    .select(MESSAGE_SELECT_FIELDS)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function fetchFullMessageHistory() {
  const { data, error } = await supabase
    .from("messages")
    .select(MESSAGE_SELECT_FIELDS)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}