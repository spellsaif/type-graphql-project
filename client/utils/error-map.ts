import { FieldError } from "@/generated/graphql";

export const errorMap = (errors: FieldError[]) => {
    const result: Record<string, string> = {}
    errors.forEach(({ field, message }) => {
        result[field] = message;
    })

    return result;
}