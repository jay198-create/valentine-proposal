import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertProposal, Proposal } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useProposal(id: string) {
  return useQuery({
    queryKey: [api.proposals.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.proposals.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch proposal");
      return api.proposals.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertProposal) => {
      const validated = api.proposals.create.input.parse(data);
      const res = await fetch(api.proposals.create.path, {
        method: api.proposals.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.proposals.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create proposal");
      }

      return api.proposals.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Proposal Created! 💕",
        description: "Your special link is ready to share.",
      });
    },
    onError: (error) => {
      toast({
        title: "Oops!",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useAcceptProposal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const url = buildUrl(api.proposals.accept.path, { id });
      const res = await fetch(url, {
        method: api.proposals.accept.method,
        headers: { "Content-Type": "application/json" },
        body: "{}", // Empty body
      });

      if (!res.ok) throw new Error("Failed to accept proposal");
      return api.proposals.accept.responses[200].parse(await res.json());
    },
    onSuccess: (_, id) => {
      // Invalidate the specific proposal query
      queryClient.invalidateQueries({ queryKey: [api.proposals.get.path, id] });
    },
    onError: () => {
      toast({
        title: "Connection Error",
        description: "Couldn't send your answer. Please try again!",
        variant: "destructive",
      });
    },
  });
}
