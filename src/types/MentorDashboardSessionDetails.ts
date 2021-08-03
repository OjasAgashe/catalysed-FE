export interface MentorDashboardSessionDetailsCardData {
  sessionNoteTitle: string;
  sessionNoteDescription: string;
  pinned: boolean;
  color: string;
}

export interface MentorUpdatesProgramDashboardState {
  noteCardArray: MentorDashboardSessionDetailsCardData[];
  showModal: boolean;
  selectedNoteCardData: MentorDashboardSessionDetailsCardData | null;
}

export type MentorUpdatesProgramDashboardActionType =
  | {
      type: "noteCardArray";
      payload: MentorDashboardSessionDetailsCardData[];
    }
  | { type: "showModal"; payload: boolean }
  | {
      type: "selectedNoteCardData";
      payload: MentorDashboardSessionDetailsCardData | null;
    };

export interface MentorDashboardSessionDetailsFormState {
  sessionNoteTitle: string;
  sessionNoteDescription: string;
  pinned: boolean;
  color: string;
  descriptionClicked: boolean;
  showColorPicker: boolean;
}

export type MentorDashboardSessionDetailsFormActionType =
  | { type: "sessionNoteTitle"; payload: string }
  | { type: "sessionNoteDescription"; payload: string }
  | { type: "pinned"; payload: boolean }
  | { type: "color"; payload: string }
  | { type: "descriptionClicked"; payload: boolean }
  | { type: "showColorPicker"; payload: boolean };
