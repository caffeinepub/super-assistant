import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, ChatMessage, QuizScore } from '../backend';

export function useGetProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getProfile();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrUpdateProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ username, avatar, theme }: { username: string; avatar: bigint; theme: string }) => {
      if (!actor) throw new Error('No actor');
      await actor.createOrUpdateProfile(username, avatar, theme);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useGetChatHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<ChatMessage[]>({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getChatHistory();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddChatMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error('No actor');
      await actor.addChatMessage(message);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chatHistory'] });
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useAddQuizScore() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (score: bigint) => {
      if (!actor) throw new Error('No actor');
      await actor.addQuizScore(score);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['quizScores'] });
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useGetQuizScores() {
  const { actor, isFetching } = useActor();
  return useQuery<QuizScore[]>({
    queryKey: ['quizScores'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getQuizScores();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSwitchTheme() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (theme: string) => {
      if (!actor) return;
      try {
        await actor.switchTheme(theme);
      } catch {
        // Profile may not exist yet
      }
    },
  });
}
