import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

// We use the backend API to verify for consistency, even if lite mode.
// This allows the backend to potentially log attempts or change logic later.
export function useVerifySecret() {
  return useMutation({
    mutationFn: async (data: { type: 'main' | 'birthday', password: string }) => {
      // For this specific "lite" request where backend might not be fully wired with a DB 
      // in the generated code snippet context, we can include a fallback client-side check 
      // if the API fails, OR just rely on the API provided in the prompt.
      // Based on instructions, we should use the API route defined in shared/routes.
      
      const res = await fetch(api.verify.path, {
        method: api.verify.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Verification failed');
      }

      return await res.json();
    }
  });
}
