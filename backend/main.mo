import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type UserProfile = {
    username : Text;
    avatar : Nat;
    theme : Text;
    totalScore : Nat;
    gamesPlayed : Nat;
    chatsSent : Nat;
  };

  type QuizScore = {
    userId : Principal;
    score : Nat;
    timestamp : Int;
  };

  type ChatMessage = {
    userId : Principal;
    message : Text;
  };

  let profiles = Map.empty<Principal, UserProfile>();
  let quizScores = Map.empty<Principal, List.List<QuizScore>>();
  let chatHistory = Map.empty<Principal, List.List<ChatMessage>>();

  public shared ({ caller }) func createOrUpdateProfile(username : Text, avatar : Nat, theme : Text) : async () {
    let profile : UserProfile = {
      username;
      avatar;
      theme;
      totalScore = 0;
      gamesPlayed = 0;
      chatsSent = 0;
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getProfile() : async UserProfile {
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Caller does not have a profile.") };
      case (?profile) { profile };
    };
  };

  public shared ({ caller }) func addQuizScore(score : Nat) : async () {
    let userScore = {
      userId = caller;
      score;
      timestamp = Time.now();
    };

    let existingScores = switch (quizScores.get(caller)) {
      case (null) { List.empty<QuizScore>() };
      case (?scores) { scores };
    };

    existingScores.add(userScore);
    quizScores.add(caller, existingScores);

    // Update profile stats
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Caller does not have a profile.") };
      case (?profile) {
        let updatedProfile = { profile with totalScore = profile.totalScore + score; gamesPlayed = profile.gamesPlayed + 1 };
        profiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getQuizScores() : async [QuizScore] {
    switch (quizScores.get(caller)) {
      case (null) { [] };
      case (?scores) { scores.toArray() };
    };
  };

  public shared ({ caller }) func addChatMessage(message : Text) : async () {
    let chat = {
      userId = caller;
      message;
    };

    let existingChats = switch (chatHistory.get(caller)) {
      case (null) { List.empty<ChatMessage>() };
      case (?chats) { chats };
    };

    existingChats.add(chat);
    chatHistory.add(caller, existingChats);

    // Update profile stats
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Caller does not have a profile.") };
      case (?profile) {
        let updatedProfile = { profile with chatsSent = profile.chatsSent + 1 };
        profiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getChatHistory() : async [ChatMessage] {
    switch (chatHistory.get(caller)) {
      case (null) { [] };
      case (?chats) { chats.toArray() };
    };
  };

  public shared ({ caller }) func switchTheme(theme : Text) : async () {
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Caller does not have a profile.") };
      case (?profile) {
        let updatedProfile = { profile with theme };
        profiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getTheme() : async Text {
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Caller does not have a profile.") };
      case (?profile) { profile.theme };
    };
  };

  public query ({ caller }) func getAllProfiles() : async [(Principal, UserProfile)] {
    profiles.toArray();
  };

  public query ({ caller }) func getAllQuizScores() : async [(Principal, [QuizScore])] {
    let result = List.empty<(Principal, [QuizScore])>();
    for ((userId, scoreList) in quizScores.entries()) {
      result.add((userId, scoreList.toArray()));
    };
    result.toArray();
  };
};
