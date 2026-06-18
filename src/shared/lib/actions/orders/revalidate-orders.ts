"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateOrders(): Promise<void> {
  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");
}
