"use server";

import { revalidatePath } from "next/cache";

export type IngestionData = {
  urls: string[];
  goal?: string;
  outputFormat: "CSV" | "Excel" | "JSON";
};

export async function startIngestion(data: IngestionData) {
  // In a real-world scenario, this function would call your actual ingestion manager
  // For now, we'll simulate a delay and return a success message
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Starting ingestion with data:", data);

  // Revalidate the page to show updated data
  revalidatePath("/basket");

  return { success: true, message: "Basket ingestion started successfully" };
}
