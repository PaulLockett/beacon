import { LiveMap, LiveObject } from "@liveblocks/client";
import { Document, User } from "./types";

export type Note = LiveObject<{
  x: number;
  y: number;
  text: string;
  selectedBy: Liveblocks["UserMeta"]["info"] | null;
  id: string;
}>;

export type Notes = LiveMap<string, Note>;

export type Files = LiveMap<
  string,
  LiveObject<{
    name: string;
    type: string;
    size: number;
    lastModified: number;
  }>
>;

export type Urls = LiveMap<
  string,
  LiveObject<{
    url: string;
    addedAt: string;
  }>
>;

declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      cursor: { x: number; y: number } | null; // Whiteboard
      presence: any; // Canvas
    };
    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      notes: Notes; // Whiteboard
      records: LiveMap<string, any>; // Canvas
      files: Files; // Basket
      urls: Urls; // Basket
    };
    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: Pick<User, "name" | "avatar" | "color">;
    };
    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent:
      | { type: "SHARE_DIALOG_UPDATE" }
      | { type: "DOCUMENT_NAME_UPDATE" };
    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      highlightId: string;
    };
    ActivitiesData: {
      $addedToDocument: {
        documentId: Document["id"];
      };
    };
  }
}

export function createInitialPresence(): Liveblocks["Presence"] {
  return {
    cursor: null, // Whiteboard
    presence: undefined, // Canvas
  };
}

export function createInitialStorage(): Liveblocks["Storage"] {
  return {
    notes: new LiveMap(), // Whiteboard
    records: new LiveMap(), // Canvas
    files: new LiveMap(), // Basket
    urls: new LiveMap(), // Basket
  };
}
