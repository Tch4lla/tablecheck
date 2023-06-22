import z from "zod";

const schema = z.object({
  API_URL: z.string(),
});

export const env = schema.parse(process.env);
