import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizScore {
    userId: Principal;
    score: bigint;
    timestamp: bigint;
}
export interface ChatMessage {
    userId: Principal;
    message: string;
}
export interface UserProfile {
    theme: string;
    username: string;
    gamesPlayed: bigint;
    chatsSent: bigint;
    totalScore: bigint;
    avatar: bigint;
}
export interface backendInterface {
    addChatMessage(message: string): Promise<void>;
    addQuizScore(score: bigint): Promise<void>;
    createOrUpdateProfile(username: string, avatar: bigint, theme: string): Promise<void>;
    getAllProfiles(): Promise<Array<[Principal, UserProfile]>>;
    getAllQuizScores(): Promise<Array<[Principal, Array<QuizScore>]>>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getProfile(): Promise<UserProfile>;
    getQuizScores(): Promise<Array<QuizScore>>;
    getTheme(): Promise<string>;
    switchTheme(theme: string): Promise<void>;
}
