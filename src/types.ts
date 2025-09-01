export interface GoalInputProps {
  goalType: 'life' | 'career' | 'skill';
  endResult: string;
  selectedLVL: '0-1' | '1-3' | '3+';
  startPoint: string;
  commitTime:
    | '< 1 hr'
    | '1 - 5 hrs'
    | '5 - 10 hrs'
    | '10 - 15 hrs'
    | '15 - 20 hrs'
    | '20 - 30 hrs'
    | '30 - 40 hrs'
    | '40 - 60 hrs'
    | '60+ hrs';
  date: Date | undefined;
  learningStyles: Record<
    | 'Hands-on projects'
    | 'Structured tutorials'
    | 'Readng/writing'
    | 'Videos'
    | 'Peer/Community learning + growth'
    | 'Guided Coaching/AI tutors',
    boolean
  >;
  limitations: string;
}
